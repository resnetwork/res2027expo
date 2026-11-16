// Shared hardening helpers for the form endpoints.
// Files under api/_lib are not exposed as routes by Vercel (underscore prefix).

const ALLOWED_ORIGINS = new Set([
  'https://res-expo.com',
  'https://www.res-expo.com',
  // Old domain redirects to res-expo.com; keep it for pages still open in browsers.
  'https://res2027expo.kz',
  'https://www.res2027expo.kz',
]);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 20; // submissions per IP per window (per warm instance; venue Wi-Fi shares IPs)
const rateBuckets = new Map();

export const MAX_BODY_CHARS = 20000;

/**
 * Applies CORS + method checks. Returns true when the request was already
 * answered (preflight / rejected) and the handler must stop.
 */
export function guardRequest(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({ error: 'Method not allowed' });
    return true;
  }
  // Only JSON: blocks cross-site "simple" (text/plain, form) submissions.
  const contentType = String(req.headers['content-type'] || '').toLowerCase();
  if (!contentType.startsWith('application/json')) {
    res.status(415).json({ error: 'Unsupported content type' });
    return true;
  }
  if (isRateLimited(clientIp(req))) {
    res.setHeader('Retry-After', String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
    res.status(429).json({ error: 'Слишком много запросов. Пожалуйста, попробуйте позже.' });
    return true;
  }
  return false;
}

export function parseBody(req) {
  let body = req.body;
  if (typeof body === 'string') {
    if (body.length > MAX_BODY_CHARS) return null;
    try {
      body = JSON.parse(body);
    } catch {
      return null;
    }
  } else if (body && JSON.stringify(body).length > MAX_BODY_CHARS) {
    return null;
  }
  return body && typeof body === 'object' && !Array.isArray(body) ? body : null;
}

/** Trimmed string limited to maxLen characters ('' for non-strings). */
export function str(value, maxLen) {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLen);
}

/** Array of short strings (also accepts a single string). */
export function strList(value, maxItems = 20, maxLen = 200) {
  const arr = Array.isArray(value) ? value : value ? [value] : [];
  return arr.slice(0, maxItems).map((v) => str(v, maxLen)).filter(Boolean);
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
export function isValidEmail(email) {
  return email.length <= 254 && EMAIL_RE.test(email);
}

// Lenient on purpose: people add notes like "(WhatsApp)"; we only need real digits.
export function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return phone.length <= 50 && digits.length >= 5 && digits.length <= 20;
}

/** Honeypot: real users never see or fill this field. */
export function isBot(body) {
  return Boolean(body && typeof body.hpField === 'string' && body.hpField.trim() !== '');
}

export function escapeHtml(value) {
  if (!value) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Posts a row to a Google Apps Script webhook. Resolves true only when the
 * script confirms the write ({ status: 'success' }).
 */
export async function postToSheet(url, payload) {
  const secret = process.env.WEBHOOK_SECRET;
  if (!url) {
    console.error('Sheet webhook URL is not configured');
    return false;
  }
  if (!secret) {
    console.error('WEBHOOK_SECRET is not configured');
    return false;
  }
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ...payload, secret }),
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });
    const text = await r.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch {
      // non-JSON (e.g. Google login page) => failure
    }
    if (r.ok && data && data.status === 'success') return true;
    console.error('Sheet webhook rejected the request:', r.status, data ? data.message : text.slice(0, 200));
    return false;
  } catch (err) {
    console.error('Sheet webhook error:', err);
    return false;
  }
}

function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '');
  return fwd.split(',')[0].trim() || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

// Best-effort, per serverless instance. For a hard limit configure
// Vercel Firewall rate limiting on /api/* as well.
function isRateLimited(ip) {
  const now = Date.now();
  if (rateBuckets.size > 5000) {
    for (const [key, b] of rateBuckets) if (now - b.start > RATE_LIMIT_WINDOW_MS) rateBuckets.delete(key);
  }
  const bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.start > RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(ip, { start: now, count: 1 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}
