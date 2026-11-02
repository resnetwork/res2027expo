/**
 * =========================================================================
 * RES+ EXPO 2027 — Webhook для Предрегистрации Посетителей (Code.gs)
 * Файл: google-script/VisitorRegistrationCode.gs
 * =========================================================================
 * 
 * ИНСТРУКЦИЯ ПО ПОДКЛЮЧЕНИЮ К НОВОЙ GOOGLE ТАБЛИЦЕ:
 * 1. Создайте новую Google Таблицу (например, "RES+ EXPO 2027 — Посетители").
 * 2. В верхнем меню выберите: Расширения (Extensions) -> Apps Script.
 * 3. Удалите весь существующий код в окне и вставьте код из этого файла.
 * 4. Нажмите «Сохранить» (значок дискеты).
 * 5. В правом верхнем углу нажмите синюю кнопку «Развернуть» (Deploy) -> «Новое развертывание» (New deployment).
 * 6. Нажмите на значок шестерёнки рядом с "Выберите тип" -> выберите «Веб-приложение» (Web app).
 * 7. В поле «Кто имеет доступ» (Who has access) ОБЯЗАТЕЛЬНО выберите: «Все» (Anyone).
 * 8. Нажмите «Развернуть» (Deploy), разрешите доступ (Authorize access), если потребуется.
 * 9. Скопируйте полученный URL веб-приложения (заканчивается на /exec) и передайте мне для подключения.
 */

// Название листа для посетителей
var SHEET_NAME = 'Посетители';

// Заголовки таблицы
var HEADERS = [
  'Дата и время',
  'ФИО',
  'Компания',
  'Должность',
  'Страна и город',
  'Email',
  'Телефон',
  'Кто вы (Категория)',
  'Что интересует',
  'Направления',
  'Side events',
  'Откуда узнали о выставке',
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

    // 3. Форматируем телефон, чтобы Google Таблицы не выдавали #ERROR!
    var rawPhone = data.phone ? String(data.phone).trim() : '';
    var safePhone = rawPhone;
    if (safePhone) {
      if (safePhone.charAt(0) === '+' || safePhone.charAt(0) === '=' || safePhone.charAt(0) === '-') {
        safePhone = "'" + safePhone;
      }
    }

    // 4. Текущая дата и время
    var rawDate = data.date ? String(data.date).trim() : Utilities.formatDate(new Date(), 'Asia/Almaty', 'dd.MM.yyyy, HH:mm:ss');
    var dateStr = rawDate.replace(/\s*\(?Астана\)?/gi, '').trim();

    // Преобразуем массивы в читаемый текст
    var interestsStr = Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || '—');
    var thematicsStr = Array.isArray(data.thematics) ? data.thematics.join('\n') : (data.thematics || '—');
    var sideEventsStr = Array.isArray(data.sideEvents) ? data.sideEvents.join('\n') : (data.sideEvents || '—');

    // 5. Формируем строку для записи
    var newRow = [
      dateStr,
      data.name || '—',
      data.company || '—',
      data.jobTitle || '—',
      data.countryCity || '—',
      data.email || '—',
      safePhone || '—',
      data.category || '—',
      interestsStr,
      thematicsStr,
      sideEventsStr,
      data.source || '—',
      data.agreementNewsletter ? 'Да' : 'Нет'
    ];

    // 6. Находим свободную строку
    var targetRow = findNextEmptyRow(sheet);

    // 7. Записываем данные
    var range = sheet.getRange(targetRow, 1, 1, newRow.length);
    range.setValues([newRow]);

    // Текстовый формат для телефона
    sheet.getRange(targetRow, 7).setNumberFormat('@');

    // Центрируем дату и рассылку
    sheet.getRange(targetRow, 1).setHorizontalAlignment('center');
    sheet.getRange(targetRow, 13).setHorizontalAlignment('center');

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      row: targetRow,
      message: 'Регистрация посетителя успешно записана'
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
 * Проверка доступности вебхука через браузер (GET)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'RES+ EXPO 2027 Visitor Pre-registration Webhook is active and ready!'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Получает целевой лист или настраивает первый лист таблицы
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
 * Автоматически создает красивую брендированную шапку при первом запуске
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

    // Фирменное изумрудно-зеленое оформление RES+ EXPO 2027
    headerRange
      .setBackground('#064e3b')
      .setFontColor('#ffffff')
      .setFontWeight('bold')
      .setFontSize(10)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setWrap(true);

    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 40);

    sheet.setColumnWidth(1, 160); // Дата и время
    sheet.setColumnWidth(2, 200); // ФИО
    sheet.setColumnWidth(3, 200); // Компания
    sheet.setColumnWidth(4, 180); // Должность
    sheet.setColumnWidth(5, 180); // Страна и город
    sheet.setColumnWidth(6, 200); // Email
    sheet.setColumnWidth(7, 160); // Телефон
    sheet.setColumnWidth(8, 220); // Кто вы
    sheet.setColumnWidth(9, 240); // Что интересует
    sheet.setColumnWidth(10, 260); // Направления
    sheet.setColumnWidth(11, 240); // Side events
    sheet.setColumnWidth(12, 180); // Откуда узнали
    sheet.setColumnWidth(13, 140); // Рассылка
  }
}

/**
 * Ищет ближайшую свободную строку
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
