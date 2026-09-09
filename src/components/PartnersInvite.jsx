import React from 'react';
import { Play } from 'lucide-react';
import './Participate.css';

const PartnersInvite = () => {
  const partners = [
    { name: 'ОШУРБАЕВ\nМАНСУР', role: 'ВИЦЕ-МИНИСТР ЭКОЛОГИИ И ПРИРОДНЫХ РЕСУРСОВ РЕСПУБЛИКИ КАЗАХСТАН', url: '@WWW.RES2026EXPO.KZ' },
    { name: 'АЙГЕРИМ\nКЕНЕСОВА', role: 'ОФИЦИАЛЬНЫЙ ПРЕДСТАВИТЕЛЬ ASIAFILTER INC.', url: '@WWW.RES2026EXPO.KZ' },
    { name: 'ТАЛГАТ\nТОРЕБЕКОВ', role: 'ДИРЕКТОР ДЕПАРТАМЕНТА ОХРАНЫ ОКРУЖАЮЩЕЙ СРЕДЫ МЕЖДУНАРОДНОЙ ГОРНО-МЕТАЛЛУРГИЧЕСКОЙ КОМПАНИИ ERG В КАЗАХСТАНЕ', url: '@WWW.RES2026EXPO.KZ' },
    { name: 'YAUY WU', role: 'РУКОВОДИТЕЛЬ LI AUTO ЦЕНТРАЛЬНОЙ АЗИИ', url: '@WWW.RES2026EXPO.KZ' }
  ];

  return (
    <section className="partners-invite section-padding bg-green">
      <div className="container text-center">
        <h2 className="section-title text-inverse">НАШИ ПАРТНЕРЫ ПРИГЛАШАЮТ</h2>
        <p className="section-subtitle text-inverse" style={{marginBottom: '4rem', fontWeight: 400}}>
          Видео обращения участников мероприятия
        </p>

        <div className="grid-4">
          {partners.map((p, i) => (
            <div key={i} className="partner-video-card" style={{borderRadius: '20px', background: 'rgba(255,255,255,0.1)', aspectRatio: '9/16'}}>
              {/* Image placeholder */}
              <div style={{width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)'}}></div>
              
              <div className="play-button" style={{background: 'white', color: 'var(--bg-dark-green)'}}>
                <Play fill="var(--bg-dark-green)" size={24} />
              </div>
              <div className="partner-info" style={{background: 'linear-gradient(to top, rgba(24,88,75,1) 10%, rgba(24,88,75,0.8) 50%, transparent)', padding: '2rem 1rem 1.5rem'}}>
                <h4 style={{fontSize: '1.2rem', marginBottom: '0.5rem', whiteSpace: 'pre-line', fontWeight: 800, textTransform: 'uppercase'}}>{p.name}</h4>
                <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '1rem', lineHeight: 1.4}}>{p.role}</p>
                <p style={{fontSize: '0.65rem', color: 'var(--text-yellow)'}}>{p.url}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersInvite;
