import React from 'react';
import './TelegramCommunityInvite.css';

const TELEGRAM_URL = 'https://t.me/resnetworkorg';

const texts = {
  ru: {
    badge: 'Telegram Community',
    title: 'Переходите в наш Telegram-канал RES Network Community',
    desc: 'Оперативные новости выставки, анонсы участников и спикеров, аналитика отрасли и нетворкинг.',
    button: 'Перейти в Telegram-канал',
    qrTitle: 'Или отсканируйте QR-код',
    qrHint: 'Наведите камеру смартфона'
  },
  kk: {
    badge: 'Telegram Community',
    title: 'RES Network Community Telegram арнамызға өтіңіз',
    desc: 'Көрменің жедел жаңалықтары, қатысушылар мен спикерлер хабарландырулары және салалық нетворкинг.',
    button: 'Telegram арнасына өту',
    qrTitle: 'Немесе QR-кодты сканерлеңіз',
    qrHint: 'Смартфон камерасын бағыттаңыз'
  },
  en: {
    badge: 'Telegram Community',
    title: 'Join our Telegram channel RES Network Community',
    desc: 'Latest expo updates, speaker announcements, renewable energy insights, and industry networking.',
    button: 'Join Telegram Channel',
    qrTitle: 'Or scan the QR code',
    qrHint: 'Point your phone camera'
  },
  zh: {
    badge: 'Telegram Community',
    title: '欢迎加入我们的 Telegram 频道 RES Network Community',
    desc: '获取最新展会动态、参展商与演讲嘉宾资讯、可再生能源行业洞察与交流。',
    button: '前往 Telegram 频道',
    qrTitle: '或扫描二维码关注',
    qrHint: '使用手机相机扫码'
  }
};

const TelegramCommunityInvite = ({ lang = 'ru' }) => {
  const currentLang = texts[lang] ? lang : 'ru';
  const t = texts[currentLang];

  return (
    <div className="tg-invite-card">
      <div className="tg-invite-content">
        <div className="tg-invite-badge">
          <span className="tg-invite-dot"></span>
          <svg className="tg-badge-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.672c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.411z"/>
          </svg>
          <span>{t.badge}</span>
        </div>

        <h4 className="tg-invite-title">{t.title}</h4>
        <p className="tg-invite-desc">{t.desc}</p>

        <a 
          href={TELEGRAM_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="tg-invite-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.672c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.411z"/>
          </svg>
          <span>{t.button}</span>
        </a>
      </div>

      <div className="tg-invite-qr-wrap">
        <div className="tg-qr-box">
          <img 
            src="/telegram-qr.svg" 
            alt="Telegram QR code: RES Network Community" 
            className="tg-qr-img" 
            width="120" 
            height="120"
            loading="lazy"
          />
          <div className="tg-qr-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.672c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.411z"/>
            </svg>
          </div>
        </div>
        <div className="tg-qr-labels">
          <span className="tg-qr-title">{t.qrTitle}</span>
          <span className="tg-qr-hint">{t.qrHint}</span>
        </div>
      </div>
    </div>
  );
};

export default TelegramCommunityInvite;
