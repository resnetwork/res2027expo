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

  const {
    name,
    company,
    jobTitle,
    countryCity,
    country,
    email,
    phone,
    website,
    roles,
    intent,
    standArea,
    standType,
    standDescription,
    speakerVenue,
    speakerTopic,
    thematics,
    sideEvents,
    comment,
    agreementNewsletter
  } = body || {};

  // Validation: at least name, email, and (company or phone)
  if (!name || !email) {
    return res.status(400).json({ error: 'Пожалуйста, заполните обязательные поля (ФИО, Email).' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybNPcZtEDiZHcTecJik8DdAnQlil-_mRfImirLav7cCAQwCks461GtI_zDifs3FNjkOA/exec';

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });

  // Format arrays for text output
  const rolesList = Array.isArray(roles) && roles.length > 0 ? roles.join(', ') : (roles || intent || 'Экспонент (стенд)');
  const thematicsList = Array.isArray(thematics) && thematics.length > 0 ? thematics.join('\n• ') : (thematics || '');
  const sideEventsList = Array.isArray(sideEvents) && sideEvents.length > 0 ? sideEvents.join('\n• ') : (sideEvents || '');

  // 1. Send to Telegram
  let telegramPromise = Promise.resolve(null);
  if (BOT_TOKEN && CHAT_ID) {
    let exhibitorSection = '';
    if (standArea || standType || standDescription) {
      exhibitorSection =
        `\n📐 <b>Параметры стенда (Экспонент):</b>\n` +
        (standArea ? `• <b>Площадь:</b> ${escapeHtml(standArea)} м²\n` : '') +
        (standType ? `• <b>Тип стенда:</b> ${escapeHtml(standType)}\n` : '') +
        (standDescription ? `• <b>Что представят:</b> ${escapeHtml(standDescription)}\n` : '');
    }

    let speakerSection = '';
    if (speakerVenue || speakerTopic) {
      speakerSection =
        `\n🎤 <b>Параметры выступления (Спикер):</b>\n` +
        (speakerVenue ? `• <b>Площадка:</b> ${escapeHtml(speakerVenue)}\n` : '') +
        (speakerTopic ? `• <b>Тема:</b> ${escapeHtml(speakerTopic)}\n` : '');
    }

    let thematicsSection = thematicsList ? `\n🌱 <b>Направления:</b>\n• ${escapeHtml(thematicsList)}\n` : '';
    let sideEventsSection = sideEventsList ? `\n✨ <b>Side events:</b>\n• ${escapeHtml(sideEventsList)}\n` : '';
    let commentSection = comment ? `\n💬 <b>Комментарий:</b> ${escapeHtml(comment)}\n` : '';

    const messageText =
      `🔔 <b>Новая заявка на участие в RES+ EXPO 2027!</b>\n\n` +
      `👤 <b>ФИО:</b> ${escapeHtml(name)}\n` +
      `🏢 <b>Компания:</b> ${escapeHtml(company || '—')}\n` +
      `💼 <b>Должность:</b> ${escapeHtml(jobTitle || '—')}\n` +
      `🌍 <b>Страна и город:</b> ${escapeHtml(countryCity || country || '—')}\n` +
      `✉️ <b>Email:</b> ${escapeHtml(email)}\n` +
      `📞 <b>Телефон / WhatsApp:</b> ${escapeHtml(phone || '—')}\n` +
      (website ? `🌐 <b>Сайт:</b> ${escapeHtml(website)}\n` : '') +
      `\n🎯 <b>Кем хочет участвовать:</b>\n<b>${escapeHtml(rolesList)}</b>\n` +
      exhibitorSection +
      speakerSection +
      thematicsSection +
      sideEventsSection +
      commentSection +
      `\n📬 <b>Подписка на новости:</b> ${agreementNewsletter ? 'Да' : 'Нет'}\n\n` +
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
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        date: now,
        name: name || '',
        company: company || '',
        jobTitle: jobTitle || '',
        countryCity: countryCity || country || '',
        email: email || '',
        phone: phone || '',
        website: website || '',
        roles: rolesList,
        standArea: standArea || '',
        standType: standType || '',
        standDescription: standDescription || '',
        speakerVenue: speakerVenue || '',
        speakerTopic: speakerTopic || '',
        thematics: Array.isArray(thematics) ? thematics : (thematics ? [thematics] : []),
        sideEvents: Array.isArray(sideEvents) ? sideEvents : (sideEvents ? [sideEvents] : []),
        comment: comment || '',
        agreementNewsletter: !!agreementNewsletter
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
