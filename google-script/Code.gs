/**
 * =========================================================================
 * RES+ EXPO 2027 — Webhook для приёма заявок на участие (Стенды, Спикеры, Партнёры)
 * Файл: google-script/Code.gs
 * =========================================================================
 * 
 * Особенности скрипта:
 * 1. Автоматическое восстановление заголовков и брендовых стилей RES+ EXPO при пустой таблице.
 * 2. Исправление ошибки #ERROR! при добавлении номеров телефонов с плюсом (+).
 * 3. Поиск ближайшей свободной строки (не пропускает строки даже при наличии форматирования ниже).
 * 4. Полная поддержка новых полей: Роли, Стенды (площадь, тип, описание), Спикеры (площадка, тема), Направления, Side events.
 * 5. Блокировка LockService для защиты от одновременных запросов.
 */

// Название листа для заявок на участие
var SHEET_NAME = 'Заявки на участие';

// Заголовки таблицы (18 колонок)
var HEADERS = [
  'Дата и время',
  'ФИО',
  'Компания',
  'Должность',
  'Страна и город',
  'Email',
  'Телефон / WhatsApp',
  'Сайт',
  'Кем хотите участвовать',
  'Площадь стенда (м²)',
  'Тип стенда',
  'Что планируют представить',
  'Площадка спикера',
  'Тема выступления',
  'Направления',
  'Side events',
  'Комментарий',
  'Согласие на рассылку'
];

/**
 * Обработка входящих POST-запросов от сайта
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Сервер занят, повторите попытку позже.'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getTargetSheet(ss);

    // 1. Проверяем наличие строки заголовков. Если таблица пуста — создаем шапку
    ensureHeaders(sheet);

    // 2. Извлекаем данные из запроса (JSON или URL-encoded)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 3. Форматируем телефон, чтобы Google Таблицы не воспринимали '+' как формулу (#ERROR!)
    var rawPhone = data.phone ? String(data.phone).trim() : '';
    var safePhone = rawPhone;
    if (safePhone) {
      if (safePhone.charAt(0) === '+' || safePhone.charAt(0) === '=' || safePhone.charAt(0) === '-') {
        safePhone = "'" + safePhone;
      }
    }

    // 4. Форматируем площадь стенда
    var standArea = data.standArea ? String(data.standArea).trim() : '';
    if (standArea && !standArea.toLowerCase().includes('м') && !standArea.toLowerCase().includes('m')) {
      standArea = standArea + ' м²';
    }

    // 5. Текущая дата и время
    var rawDate = data.date ? String(data.date).trim() : Utilities.formatDate(new Date(), 'Asia/Almaty', 'dd.MM.yyyy, HH:mm:ss');
    var dateStr = rawDate.replace(/\s*\(?Астана\)?/gi, '').trim();

    // Преобразуем массивы в строки
    var rolesStr = Array.isArray(data.roles) ? data.roles.join(', ') : (data.roles || data.intent || '—');
    var thematicsStr = Array.isArray(data.thematics) ? data.thematics.join('\n') : (data.thematics || '—');
    var sideEventsStr = Array.isArray(data.sideEvents) ? data.sideEvents.join('\n') : (data.sideEvents || '—');

    // 6. Формируем строку для записи
    var newRow = [
      dateStr,
      data.name || '—',
      data.company || '—',
      data.jobTitle || '—',
      data.countryCity || data.country || '—',
      data.email || '—',
      safePhone || '—',
      data.website || '—',
      rolesStr,
      standArea || '—',
      data.standType || '—',
      data.standDescription || '—',
      data.speakerVenue || '—',
      data.speakerTopic || '—',
      thematicsStr,
      sideEventsStr,
      data.comment || '—',
      data.agreementNewsletter ? 'Да' : 'Нет'
    ];

    // 7. Находим ближайшую свободную строку
    var targetRow = findNextEmptyRow(sheet);

    // 8. Записываем данные в целевую строку
    var range = sheet.getRange(targetRow, 1, 1, newRow.length);
    range.setValues([newRow]);

    // Задаем текстовый формат отображения для телефона
    sheet.getRange(targetRow, 7).setNumberFormat('@');

    // Центрируем дату и площадь
    sheet.getRange(targetRow, 1).setHorizontalAlignment('center');
    sheet.getRange(targetRow, 10).setHorizontalAlignment('center');
    sheet.getRange(targetRow, 18).setHorizontalAlignment('center');

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      row: targetRow,
      message: 'Заявка успешно записана'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Для быстрой проверки работоспособности через браузер (GET)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'RES+ EXPO 2027 Application Webhook is active and ready!'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Получает лист 'Заявки на участие' или использует текущий активный лист
 */
function getTargetSheet(ss) {
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;
  var firstSheet = ss.getActiveSheet() || ss.getSheets()[0];
  try {
    firstSheet.setName(SHEET_NAME);
  } catch (e) {}
  return firstSheet;
}

/**
 * Проверяет наличие строки заголовков. Если пусто — строит стилизованную шапку
 */
function ensureHeaders(sheet) {
  var lastRow = sheet.getLastRow();
  var needsHeader = false;

  if (lastRow === 0) {
    needsHeader = true;
  } else {
    var firstCell = sheet.getRange(1, 1).getValue();
    if (!firstCell || firstCell.toString().trim() === '') {
      needsHeader = true;
    }
  }

  if (needsHeader) {
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);

    // Фирменное оформление шапки RES+ EXPO 2027
    headerRange
      .setBackground('#12453a') // Темно-зеленый брендовый цвет
      .setFontColor('#ffffff') // Белый текст
      .setFontWeight('bold')
      .setFontSize(10)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setWrap(true);

    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 42);

    // Устанавливаем удобную ширину колонок
    sheet.setColumnWidth(1, 160);  // Дата и время
    sheet.setColumnWidth(2, 200);  // ФИО
    sheet.setColumnWidth(3, 200);  // Компания
    sheet.setColumnWidth(4, 170);  // Должность
    sheet.setColumnWidth(5, 170);  // Страна и город
    sheet.setColumnWidth(6, 200);  // Email
    sheet.setColumnWidth(7, 170);  // Телефон / WhatsApp
    sheet.setColumnWidth(8, 160);  // Сайт
    sheet.setColumnWidth(9, 220);  // Роли
    sheet.setColumnWidth(10, 140); // Площадь стенда
    sheet.setColumnWidth(11, 180); // Тип стенда
    sheet.setColumnWidth(12, 240); // Что планируют представить
    sheet.setColumnWidth(13, 180); // Площадка спикера
    sheet.setColumnWidth(14, 240); // Тема выступления
    sheet.setColumnWidth(15, 260); // Направления
    sheet.setColumnWidth(16, 240); // Side events
    sheet.setColumnWidth(17, 240); // Комментарий
    sheet.setColumnWidth(18, 140); // Рассылка
  }
}

/**
 * Ищет ближайшую пустую строку в таблице
 */
function findNextEmptyRow(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return 2;
  }

  var dateColValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < dateColValues.length; i++) {
    var val = dateColValues[i][0];
    if (!val || val.toString().trim() === '') {
      return i + 2;
    }
  }

  return lastRow + 1;
}
