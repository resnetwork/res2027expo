# RES+ EXPO 2027 — сайт выставки

Сайт международной выставки зелёных технологий RES+ EXPO 2027 (5–7 мая 2027, Астана, МВЦ «EXPO»).
Боевой адрес: **https://res-expo.com** (с ноября 2026). Репозиторий публичный — не коммитить секреты,
адреса вебхуков, персональные данные.

Пользователь общается на русском. Объяснять простым языком, пошагово, с таблицами «что → куда».
Служебные детали (Google Workspace, DNS, аккаунты) — в `CLAUDE.local.md` (не в git).

## Стек и структура

- **Фронтенд:** React 19 + Vite 8, SPA без роутера. Навигация через `#hash` и `?query` в `src/App.jsx`
  (`#bookstand{ru|kk|en|zh}`, `#registration…`, `#gallery…`, пути `/policy`, `/oferta`, `/gallery`, `/bookstand`).
  4 языка: `src/contexts/LanguageContext.jsx`, тексты в `src/locales/translations.js` и внутри компонентов.
- **Формы:** `src/components/ParticipationPage.jsx` (заявка участника/экспонента) и
  `src/components/VisitorRegistrationModal.jsx` (регистрация посетителя). `BookingModal.jsx` не используется.
- **Бэкенд:** Vercel serverless функции
  - `api/submit-lead.js` → Telegram-бот + Google Таблица заявок;
  - `api/submit-visitor.js` → Google Таблица посетителей;
  - `api/_lib/security.js` — общие проверки (папка `_lib` не публикуется как маршрут).
- **Хранилище:** Google Таблицы через веб-приложения Apps Script. Код скриптов лежит в репо:
  `google-script/Code.gs` (заявки, проект «RES 2027 Leads») и
  `google-script/VisitorRegistrationCode.gs` (посетители, проект «RES 2027 Visitors»).
  Изменения в `.gs` НЕ деплоятся автоматически — пользователь вставляет код вручную и делает
  Deploy → Manage deployments → карандаш → New version (URL при этом сохраняется).
- **Деплой:** push в `main` → Vercel собирает автоматически (~30 с). Заголовки безопасности в `vercel.json`.
- **Аналитика:** LinkedIn Insight Tag в `index.html` (конверсия `lintrk('track', { conversion_id: 32660553 })`
  после успешной отправки форм). Баннера cookies нет (осознанно, см. «Открытые вопросы»).
- **Соцсети:** один список `SOCIAL_LINKS` в `src/components/Header.jsx` (шапка + мобильное меню), аккаунты
  `@resplusexpo` (TG, IG, YT, FB, Threads, LinkedIn showcase) + WhatsApp. В шапке на десктопе места мало:
  ≤1439px скрыта кнопка «RES Network», ≤1250px — иконки соцсетей (см. `Header.css`); в мобильном меню всё есть.
  Блок после отправки формы (`TelegramCommunityInvite.jsx`, QR `public/telegram-qr.svg`) ведёт на канал
  RES Network Community `t.me/resnetworkorg` — намеренно не менялся.
- **Главный экран:** дата и место под подзаголовком (`hero.date`, `hero.venue` в переводах), порядок фото
  галереи «Как это было» — `SHOWCASE_PHOTO_IDS` в `PastEventSection.jsx` (номер = файл `photo-N.webp`).
- Утилиты `scratch/`, `scripts/`, `copy_speakers.cjs` — разовые локальные скрипты, на сайт не влияют.

## Переменные окружения Vercel (Production + Preview)

| Переменная | Назначение |
|---|---|
| `GOOGLE_SCRIPT_URL` | URL веб-приложения Apps Script заявок |
| `VISITOR_GOOGLE_SCRIPT_URL` | URL веб-приложения Apps Script посетителей |
| `WEBHOOK_SECRET` | Общий секрет. Тот же самый должен быть в Script Properties **обоих** Apps Script (`WEBHOOK_SECRET`) |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Уведомления о заявках участников |

После изменения переменной в Vercel нужен Redeploy. Значение секрета Vercel повторно не показывает.

## Защита (аудит и исправления, ноябрь 2026, коммит `0b80c81`)

- Сервер подписывает запросы к Apps Script полем `secret`; скрипты без верного секрета отвечают
  `{"status":"error","message":"Unauthorized"}` и ничего не пишут. Если свойство `WEBHOOK_SECRET` в
  скрипте не задано — отклоняются ВСЕ запросы (так однажды и сломалось — первым делом проверять это).
- Apps Script экранирует каждую ячейку, начинающуюся с `= + - @ \t \r` (защита от formula injection).
- API: только `POST` с `Content-Type: application/json` (иначе 415), лимит тела 20 КБ, лимиты длины полей,
  проверка email/телефона (телефон мягко: 5–20 цифр), скрытое поле-ловушка `hpField` (бот получает
  фальшивый «успех»), rate limit 20 запросов / 10 мин на IP (в памяти инстанса), CORS только для
  `res-expo.com`, `www.res-expo.com` и старых `res2027expo.kz`, `www.res2027expo.kz`.
- `submit-lead` отвечает 200, если заявка дошла хотя бы в Telegram ИЛИ в таблицу; 502 — если никуда.
  `submit-visitor` — 200 только при подтверждённой записи в таблицу. Поэтому 200 у заявки участника
  не доказывает запись в таблицу — проверять таблицу глазами.
- Заголовки: `frame-ancestors 'self'`, `X-Frame-Options: SAMEORIGIN`, `nosniff`, `Referrer-Policy`,
  `Permissions-Policy`. Полной CSP нет (чтобы не сломать YouTube/LinkedIn/Google Fonts).
- `npm audit` = 0 уязвимостей на момент аудита; `cheerio` — devDependency, `node-fetch` удалён.

## Домены (переезд 16.11.2026, коммит `d586a70`)

| Домен | Состояние |
|---|---|
| `res-expo.com` | **Основной.** Vercel, Production |
| `www.res-expo.com` | 308 → `res-expo.com` |
| `res2027expo.kz`, `www.res2027expo.kz` | 308 → `res-expo.com` (путь, query и `#hash` сохраняются). Продлевать домен! |
| `res2026expo.kz` | Сайт прошлой выставки на Тильде, **без переадресации** (решение пользователя). Почта Google Workspace |

В коде: canonical/OG/Twitter → `https://res-expo.com/`, `public/robots.txt`, `public/sitemap.xml`.
Ссылки в `NewsSection.jsx` на страницы `res2026expo.kz` и LinkedIn `company/res2026expo` — намеренно старые.

## Почта (Google Workspace, общий для res2026expo.kz и res-expo.com)

`res-expo.com` добавлен как **дополнительный домен** (не alias-домен). Ящики **переименованы**,
старые адреса стали псевдонимами тех же ящиков (это не пересылка — один ящик, вся история на месте).

| Старый адрес | Ящик сейчас |
|---|---|
| office@res2026expo.kz | office@res-expo.com |
| sales@res2026expo.kz | sales@res-expo.com |
| partnership@res2026expo.kz | partnership@res-expo.com |
| tech@res2026expo.kz | tech@res-expo.com |
| marketing@res2026expo.kz | marketing@res-expo.com |
| pr@res2026expo.kz | **media@res-expo.com** |
| accounting@res2026expo.kz | accounting@res-expo.com |

DNS `res-expo.com`: MX `smtp.google.com` (1), SPF `v=spf1 include:_spf.google.com ~all`,
DKIM `google._domainkey` (2048, аутентификация включена), DMARC `p=none` с отчётами на tech@res-expo.com.
На сайте показаны `office@res-expo.com` и `media@res-expo.com`.
Нельзя: удалять res2026expo.kz из Workspace, менять его MX, давать домену истечь.

## Открытые вопросы / возможные следующие шаги

- Google Search Console для res-expo.com + отправка sitemap; «Смена адреса» для res2027expo.kz.
- Плашка «RES+ EXPO 2027 → res-expo.com» на сайте 2026 (Тильда); смена URL страницы LinkedIn.
- Пиксель Meta и тег Google Ads с сайта 2026 на новый сайт (перенос рекламных аудиторий) — ждёт решения.
- Cloudflare Turnstile — только если появится спам. Лимит запросов в Vercel Firewall на `/api/*`.
- Баннер cookies — не обязателен для РК, нужен при работе с аудиторией ЕС (GDPR).
- Полная Content-Security-Policy — сначала в режиме Report-Only.
- Старые развёртывания Apps Script — архивировать, если остались.

## Соглашения

- Коммиты: `fix: website vX.Y (кратко)` / `feat: website vX.Y (кратко)`, последняя версия — **v6.1**.
- Коммитить и пушить только по просьбе пользователя; push в `main` = выкладка на боевой сайт.
- Проверять API на боевом сайте только запросами, которые ничего не пишут (GET → 405, OPTIONS → 204,
  `hpField` → фальшивый 200). Тестовые заявки — только с согласия пользователя и с пометкой «ТЕСТ — удалить».
- Сборка: `npm run build`; линт: `npm run lint` (предупреждения в App.jsx/ParticipationPage.jsx — старые).
