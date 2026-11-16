import {
  guardRequest,
  parseBody,
  str,
  strList,
  isValidEmail,
  isValidPhone,
  isBot,
  escapeHtml,
  postToSheet,
} from './_lib/security.js';

const TELEGRAM_MAX_CHARS = 4096;

export default async function handler(req, res) {
  if (guardRequest(req, res)) return;

  const body = parseBody(req);
  if (!body) {
    return res.status(400).json({ error: 'Некорректный запрос.' });
  }

  // Honeypot filled => pretend success, drop silently.
  if (isBot(body)) {
    return res.status(200).json({ success: true, message: 'Заявка успешно отправлена!' });
  }

  const lead = {
    name: str(body.name, 200),
    company: str(body.company, 200),
    jobTitle: str(body.jobTitle, 200),
    countryCity: str(body.countryCity || body.country, 200),
    email: str(body.email, 254),
    phone: str(body.phone, 50),
    website: str(body.website, 300),
    roles: strList(body.roles || body.intent, 10, 300),
    standArea: str(body.standArea, 20),
    standType: str(body.standType, 200),
    standDescription: str(body.standDescription, 1000),
    speakerVenue: str(body.speakerVenue, 200),
    speakerTopic: str(body.speakerTopic, 500),
    thematics: strList(body.thematics, 20, 200),
    sideEvents: strList(body.sideEvents, 20, 200),
    comment: str(body.comment, 1500),
    agreementNewsletter: body.agreementNewsletter === true,
  };

  if (!lead.name || !lead.email) {
    return res.status(400).json({ error: 'Пожалуйста, заполните обязательные поля (ФИО, Email).' });
  }
  if (!isValidEmail(lead.email)) {
    return res.status(400).json({ error: 'Пожалуйста, укажите корректный Email.' });
  }
  if (lead.phone && !isValidPhone(lead.phone)) {
    return res.status(400).json({ error: 'Пожалуйста, укажите корректный номер телефона.' });
  }

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  const rolesText = lead.roles.length > 0 ? lead.roles.join(', ') : 'Экспонент (стенд)';

  const [telegramOk, sheetOk] = await Promise.all([
    sendTelegram(lead, rolesText, now),
    postToSheet(process.env.GOOGLE_SCRIPT_URL, {
      date: now,
      ...lead,
      roles: rolesText,
    }),
  ]);

  // The lead is safe as long as at least one destination received it.
  if (telegramOk || sheetOk) {
    if (!telegramOk || !sheetOk) {
      console.error('Lead delivered partially:', { telegramOk, sheetOk });
    }
    return res.status(200).json({ success: true, message: 'Заявка успешно отправлена!' });
  }
  return res.status(502).json({
    error: 'Не удалось отправить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по WhatsApp.',
  });
}

async function sendTelegram(lead, rolesText, now) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram env vars missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return false;
  }

  let text = buildTelegramMessage(lead, rolesText, now);
  let parseMode = 'HTML';
  if (text.length > TELEGRAM_MAX_CHARS) {
    // Fallback: plain text (cutting HTML could break tags and make Telegram reject it).
    text = htmlToPlain(text).slice(0, TELEGRAM_MAX_CHARS - 1) + '…';
    parseMode = undefined;
  }

  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        ...(parseMode ? { parse_mode: parseMode } : {}),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      console.error('Telegram error:', r.status, data.description);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Telegram notification error:', err);
    return false;
  }
}

function buildTelegramMessage(lead, rolesText, now) {
  let exhibitorSection = '';
  if (lead.standArea || lead.standType || lead.standDescription) {
    exhibitorSection =
      `\n📐 <b>Параметры стенда (Экспонент):</b>\n` +
      (lead.standArea ? `• <b>Площадь:</b> ${escapeHtml(lead.standArea)} м²\n` : '') +
      (lead.standType ? `• <b>Тип стенда:</b> ${escapeHtml(lead.standType)}\n` : '') +
      (lead.standDescription ? `• <b>Что представят:</b> ${escapeHtml(lead.standDescription)}\n` : '');
  }

  let speakerSection = '';
  if (lead.speakerVenue || lead.speakerTopic) {
    speakerSection =
      `\n🎤 <b>Параметры выступления (Спикер):</b>\n` +
      (lead.speakerVenue ? `• <b>Площадка:</b> ${escapeHtml(lead.speakerVenue)}\n` : '') +
      (lead.speakerTopic ? `• <b>Тема:</b> ${escapeHtml(lead.speakerTopic)}\n` : '');
  }

  const thematicsSection = lead.thematics.length
    ? `\n🌱 <b>Направления:</b>\n• ${escapeHtml(lead.thematics.join('\n• '))}\n`
    : '';
  const sideEventsSection = lead.sideEvents.length
    ? `\n✨ <b>Side events:</b>\n• ${escapeHtml(lead.sideEvents.join('\n• '))}\n`
    : '';
  const commentSection = lead.comment ? `\n💬 <b>Комментарий:</b> ${escapeHtml(lead.comment)}\n` : '';

  return (
    `🔔 <b>Новая заявка на участие в RES+ EXPO 2027!</b>\n\n` +
    `👤 <b>ФИО:</b> ${escapeHtml(lead.name)}\n` +
    `🏢 <b>Компания:</b> ${escapeHtml(lead.company || '—')}\n` +
    `💼 <b>Должность:</b> ${escapeHtml(lead.jobTitle || '—')}\n` +
    `🌍 <b>Страна и город:</b> ${escapeHtml(lead.countryCity || '—')}\n` +
    `✉️ <b>Email:</b> ${escapeHtml(lead.email)}\n` +
    `📞 <b>Телефон / WhatsApp:</b> ${escapeHtml(lead.phone || '—')}\n` +
    (lead.website ? `🌐 <b>Сайт:</b> ${escapeHtml(lead.website)}\n` : '') +
    `\n🎯 <b>Кем хочет участвовать:</b>\n<b>${escapeHtml(rolesText)}</b>\n` +
    exhibitorSection +
    speakerSection +
    thematicsSection +
    sideEventsSection +
    commentSection +
    `\n📬 <b>Подписка на новости:</b> ${lead.agreementNewsletter ? 'Да' : 'Нет'}\n\n` +
    `🕒 <i>${now} (Астана)</i>`
  );
}

function htmlToPlain(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}
