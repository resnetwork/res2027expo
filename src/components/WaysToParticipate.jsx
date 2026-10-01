import React from 'react';
import { Presentation, DollarSign, Briefcase, Handshake, Users } from 'lucide-react';
import './Participate.css';
import { useLanguage } from '../contexts/LanguageContext';

const WaysToParticipate = () => {
  const { t } = useLanguage();
  const ways = [
    { icon: <Presentation size={45} />, title: t('ways.stand') },
    { icon: <DollarSign size={45} />, title: t('ways.sponsor') },
    { icon: <Briefcase size={45} />, title: t('ways.program') },
    { icon: <Handshake size={45} />, title: t('ways.partner') },
    { icon: <Users size={45} />, title: t('badges.title') }
  ];

  return (
    <section className="ways-to-participate section-padding bg-white" style={{paddingBottom: '2.5rem'}}>
      <div className="container text-center">
        <h2 className="section-title" style={{color: 'var(--bg-dark-green)'}}>{t('ways.title')}</h2>

        <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '3.5rem'}}>
          {ways.map((way, index) => (
            <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', minWidth: '180px'}}>
              <div style={{
                width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'var(--bg-dark-green)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '1.25rem',
                boxShadow: '0 8px 24px rgba(4, 120, 87, 0.2)'
              }}>
                {way.icon}
              </div>
              <h4 style={{color: 'var(--bg-dark-green)', fontSize: '0.85rem', fontWeight: 800, whiteSpace: 'pre-line', textTransform: 'uppercase', lineHeight: '1.4'}}>
                {way.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaysToParticipate;
