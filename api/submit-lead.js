export default async function handler(req, res) {
  // Set CORS headers so that client calls from any preview/prod work seamlessly
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse body (in case it comes as string or object)
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // keep as is
    }
  }

  const { intent, name, email, phone, company, country } = body || {};

  // Validation
  if (!name && !phone && !email) {
    return res.status(400).json({ error: 'Пожалуйста, заполните обязательные поля.' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });

  // 1. Send to Telegram
  let telegramPromise = Promise.resolve(null);
  if (BOT_TOKEN && CHAT_ID) {
    const messageText = 
      `🔔 <b>Новая заявка с сайта RES 2027 EXPO!</b>\n\n` +
      `🎯 <b>Цель:</b> ${escapeHtml(intent || 'Забронировать стенд')}\n` +
      `👤 <b>ФИО:</b> ${escapeHtml(name || '—')}\n` +
      `✉️ <b>Email:</b> ${escapeHtml(email || '—')}\n` +
      `📞 <b>Телефон:</b> ${escapeHtml(phone || '—')}\n` +
      `🏢 <b>Компания:</b> ${escapeHtml(company || '—')}\n` +
      `🌍 <b>Страна:</b> ${escapeHtml(country || '—')}\n\n` +
      `🕒 <i>${now} (Астана)</i>`;

    telegramPromise = fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: messageText,
        parse_mode: 'HTML'
      })
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          console.error('Telegram error:', data);
          throw new Error(data.description || 'Failed to send to Telegram');
        }
        return data;
      })
      .catch((err) => {
        console.error('Telegram notification error:', err);
      });
  } else {
    console.warn('Telegram env vars missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
  }

  // 2. Send to Google Sheets (Google Apps Script Webhook)
  let googlePromise = Promise.resolve(null);
  if (GOOGLE_SCRIPT_URL) {
    googlePromise = fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: now,
        intent: intent || 'Забронировать стенд',
        name: name || '',
        email: email || '',
        phone: phone || '',
        company: company || '',
        country: country || ''
      }),
      redirect: 'follow'
    })
      .then((r) => r.text().catch(() => 'ok'))
      .catch((err) => {
        console.error('Google Sheet error:', err);
      });
  } else {
    console.warn('Google Sheets env var missing: GOOGLE_SCRIPT_URL');
  }

  try {
    await Promise.allSettled([telegramPromise, googlePromise]);
    return res.status(200).json({ success: true, message: 'Заявка успешно отправлена!' });
  } catch (error) {
    console.error('General error:', error);
    return res.status(500).json({ error: 'Ошибка сервера при отправке' });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
