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

  // Parse body
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
    email,
    phone,
    category,
    interests,
    thematics,
    sideEvents,
    source,
    agreementNewsletter
  } = body || {};

  // Validation
  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Пожалуйста, заполните обязательные поля (ФИО, Компания, Email).' });
  }

  const VISITOR_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzpIZPIHWEzQd46lLBEVoQxFiTaFgBKrf54glLtpf9hI2z1ltyhxtpbYGRKwXEEWo5F/exec';
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });

  // Send to Visitor Google Sheets Webhook if configured
  let googlePromise = Promise.resolve(null);
  if (VISITOR_GOOGLE_SCRIPT_URL) {
    googlePromise = fetch(VISITOR_GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        date: now,
        name: name || '',
        company: company || '',
        jobTitle: jobTitle || '',
        countryCity: countryCity || '',
        email: email || '',
        phone: phone || '',
        category: category || '',
        interests: Array.isArray(interests) ? interests : (interests ? [interests] : []),
        thematics: Array.isArray(thematics) ? thematics : (thematics ? [thematics] : []),
        sideEvents: Array.isArray(sideEvents) ? sideEvents : (sideEvents ? [sideEvents] : []),
        source: source || '',
        agreementNewsletter: !!agreementNewsletter
      }),
      redirect: 'follow'
    })
      .then((r) => r.text().catch(() => 'ok'))
      .catch((err) => {
        console.error('Visitor Google Sheet webhook error:', err);
      });
  } else {
    console.log('Visitor registration received. VISITOR_GOOGLE_SCRIPT_URL not configured yet, awaiting webhook URL.');
  }

  try {
    await googlePromise;
    return res.status(200).json({ success: true, message: 'Вы успешно зарегистрированы!' });
  } catch (error) {
    console.error('General visitor registration error:', error);
    return res.status(500).json({ error: 'Ошибка сервера при регистрации' });
  }
}
