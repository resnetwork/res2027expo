import {
  guardRequest,
  parseBody,
  str,
  strList,
  isValidEmail,
  isValidPhone,
  isBot,
  postToSheet,
} from './_lib/security.js';

export default async function handler(req, res) {
  if (guardRequest(req, res)) return;

  const body = parseBody(req);
  if (!body) {
    return res.status(400).json({ error: 'Некорректный запрос.' });
  }

  // Honeypot filled => pretend success, drop silently.
  if (isBot(body)) {
    return res.status(200).json({ success: true, message: 'Вы успешно зарегистрированы!' });
  }

  const visitor = {
    name: str(body.name, 200),
    company: str(body.company, 200),
    jobTitle: str(body.jobTitle, 200),
    countryCity: str(body.countryCity, 200),
    email: str(body.email, 254),
    phone: str(body.phone, 50),
    category: str(body.category, 200),
    interests: strList(body.interests, 20, 200),
    thematics: strList(body.thematics, 20, 200),
    sideEvents: strList(body.sideEvents, 20, 200),
    source: str(body.source, 300),
    agreementNewsletter: body.agreementNewsletter === true,
  };

  if (!visitor.name || !visitor.email || !visitor.company) {
    return res.status(400).json({ error: 'Пожалуйста, заполните обязательные поля (ФИО, Компания, Email).' });
  }
  if (!isValidEmail(visitor.email)) {
    return res.status(400).json({ error: 'Пожалуйста, укажите корректный Email.' });
  }
  if (visitor.phone && !isValidPhone(visitor.phone)) {
    return res.status(400).json({ error: 'Пожалуйста, укажите корректный номер телефона.' });
  }

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  const ok = await postToSheet(process.env.VISITOR_GOOGLE_SCRIPT_URL, { date: now, ...visitor });

  if (ok) {
    return res.status(200).json({ success: true, message: 'Вы успешно зарегистрированы!' });
  }
  return res.status(502).json({ error: 'Ошибка сервера при регистрации. Пожалуйста, попробуйте позже.' });
}
