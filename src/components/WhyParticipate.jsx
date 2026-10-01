import React from 'react';
import { Users, LayoutGrid, Handshake, Rocket } from 'lucide-react';
import './Participate.css';
import { useLanguage } from '../contexts/LanguageContext';

const WhyParticipate = () => {
  const { t } = useLanguage();
  const itemsText = t('whyParticipate.items') || [];
  
  const reasons = [
    { icon: <Users size={40} />, title: itemsText[0]?.title || '20 000+ ПОСЕТИТЕЛЕЙ', desc: itemsText[0]?.desc },
    { icon: <LayoutGrid size={40} />, title: itemsText[1]?.title || '8 ТЕМАТИЧЕСКИХ ЗОН', desc: itemsText[1]?.desc },
    { icon: <Handshake size={40} />, title: itemsText[2]?.title || 'ДОСТУП К ИНВЕСТОРАМ', desc: itemsText[2]?.desc },
    { icon: <Rocket size={40} />, title: itemsText[3]?.title || 'НОВЫЕ ПАРТНЕРСТВА', desc: itemsText[3]?.desc }
  ];

  return (
    <section className="why-participate section-padding bg-green" id="participate">
      <div className="why-overlay"></div>
      <div className="container" style={{position: 'relative', zIndex: 2}}>
        <h2 className="section-title text-inverse">{t('whyParticipate.title')}</h2>
        <p className="section-subtitle" style={{color: '#ccc', marginBottom: '4rem'}}>
          {t('whyParticipate.subtitle')}
        </p>
        
        <div className="grid-4 text-center mobile-carousel">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{r.icon}</div>
              <h4 className="why-title text-inverse">{r.title}</h4>
              <p className="why-desc text-inverse">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyParticipate;
