/**
 * =========================================================================
 * RES+ EXPO 2027 — Webhook для приёма заявок в Google Таблицу (Code.gs)
 * =========================================================================
 * 
 * Особенности скрипта:
 * 1. Автоматическое восстановление заголовков и стилей, если таблица очищена.
 * 2. Исправление ошибки #ERROR! при добавлении номера телефона с плюсом (+).
 * 3. Поиск ближайшей пустой строки (не пропускает строки даже при форматировании).
 * 4. Поддержка нового поля «Площадь стенда (м²)».
 * 5. Блокировка LockService для защиты от одновременных заявок.
 */

// Название листа (если хотите записывать в конкретный лист, например "Заявки")
var SHEET_NAME = 'Заявки';

// Заголовки таблицы
var HEADERS = [
  'Дата и время',
  'Цель заявки',
  'Площадь стенда (м²)',
  'ФИО',
  'Email',
  'Телефон',
  'Компания',
  'Страна'
];

/**
 * Обработка входящих POST-запросов от сайта
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Ждём до 10 секунд освобождения блокировки при одновременных запросах
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
      // Одиночная кавычка ' в начале ячейки говорит Google Таблице хранить значение строго как текст
      if (safePhone.charAt(0) === '+' || safePhone.charAt(0) === '=' || safePhone.charAt(0) === '-') {
        safePhone = "'" + safePhone;
      }
    }

    // 4. Форматируем площадь стенда
    var standArea = data.standArea ? String(data.standArea).trim() : '';
    if (standArea && !standArea.toLowerCase().includes('м') && !standArea.toLowerCase().includes('m')) {
      standArea = standArea + ' м²';
    }

    // 5. Текущая дата и время (без суффикса «Астана»)
    var rawDate = data.date ? String(data.date).trim() : Utilities.formatDate(new Date(), 'Asia/Almaty', 'dd.MM.yyyy, HH:mm:ss');
    var dateStr = rawDate.replace(/\s*\(?Астана\)?/gi, '').trim();

    // 6. Формируем строку для записи
    var newRow = [
      dateStr,
      data.intent || 'Забронировать стенд',
      standArea || '—',
      data.name || '—',
      data.email || '—',
      safePhone || '—',
      data.company || '—',
      data.country || '—'
    ];

    // 7. Находим ближайшую свободную строку
    var targetRow = findNextEmptyRow(sheet);

    // 8. Записываем данные в целевую строку
    var range = sheet.getRange(targetRow, 1, 1, newRow.length);
    range.setValues([newRow]);

    // Для столбца телефона дополнительно задаем текстовый формат отображения
    sheet.getRange(targetRow, 6).setNumberFormat('@');

    // Центрируем дату, площадь и телефон
    sheet.getRange(targetRow, 1).setHorizontalAlignment('center');
    sheet.getRange(targetRow, 3).setHorizontalAlignment('center');
    sheet.getRange(targetRow, 6).setHorizontalAlignment('left');

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
    message: 'RES+ EXPO 2027 Google Apps Script webhook is active and ready!'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Получает лист 'Заявки' или использует текущий активный лист таблицы
 */
function getTargetSheet(ss) {
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;
  return ss.getActiveSheet() || ss.getSheets()[0];
}

/**
 * Проверяет наличие строки заголовков.
 * Если таблица стёрта или пуста — заново строит шапку с оформлением.
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
    // Устанавливаем заголовки
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

    // Закрепляем верхнюю строку, чтобы она оставалась при прокрутке
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 38);

    // Устанавливаем удобную ширину колонок
    sheet.setColumnWidth(1, 180); // Дата и время
    sheet.setColumnWidth(2, 170); // Цель
    sheet.setColumnWidth(3, 140); // Площадь стенда
    sheet.setColumnWidth(4, 200); // ФИО
    sheet.setColumnWidth(5, 200); // Email
    sheet.setColumnWidth(6, 170); // Телефон
    sheet.setColumnWidth(7, 200); // Компания
    sheet.setColumnWidth(8, 140); // Страна
  }
}

/**
 * Ищет ближайшую пустую строку в таблице.
 * Не пропускает строки, даже если внизу таблицы есть пустое форматирование.
 */
function findNextEmptyRow(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return 2; // Если только шапка или пусто — пишем во вторую строку
  }

  // Считываем первый столбец (Дата) для поиска первой пустой ячейки
  var dateColValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < dateColValues.length; i++) {
    var val = dateColValues[i][0];
    if (!val || val.toString().trim() === '') {
      return i + 2; // Возвращаем индекс строки (с учетом смещения на 2)
    }
  }

  return lastRow + 1;
}
