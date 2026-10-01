import React from 'react';
import './Sections.css';
import { useLanguage } from '../contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section className="about-section section-padding" id="about" style={{ background: "linear-gradient(180deg, #18584b 0%, #12453a 100%)" }}>
      <div className="container">
        <h2 className="section-title" style={{ color: 'white' }}>{t('about.title')}</h2>
        <p className="section-subtitle" style={{color: 'white', maxWidth: '1000px'}} dangerouslySetInnerHTML={{ __html: t('about.text') }} />

        <div className="stats-grid-about" style={{ position: 'relative', zIndex: 2 }}>
          <div className="stat-card-about" style={{ position: 'relative' }}>
            <div className="stat-number-about">{t('about.stat1_num')}</div>
            <div className="stat-label-about">{t('about.stat1_desc')}</div>
            <div className="stat-badge" style={{ position: 'absolute', left: 'calc(100% + 1rem)', top: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#18584b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10, fontSize: '1.2rem' }}>{t('about.badge_plus')}</div>
          </div>
          <div className="stat-card-about" style={{ position: 'relative' }}>
            <div className="stat-number-about">{t('about.stat4_num')}</div>
            <div className="stat-label-about">{t('about.stat4_desc')}</div>
            <div className="stat-badge" style={{ position: 'absolute', left: 'calc(100% + 1rem)', top: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#18584b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10, fontSize: '0.9rem' }}>{t('about.badge_iz')}</div>
            <div className="stat-badge" style={{ position: 'absolute', left: '50%', top: 'calc(100% + 1rem)', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#18584b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10, fontSize: '0.9rem' }}>{t('about.badge_na')}</div>
          </div>
          <div className="stat-card-about" style={{ position: 'relative' }}>
            <div className="stat-number-about">{t('about.stat_countries_num')}</div>
            <div className="stat-label-about">{t('about.stat_countries_desc')}</div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
           <div className="stat-card-about" style={{width: '100%', maxWidth: '600px'}}>
              <div className="stat-number-about">{t('about.stat3_num')}</div>
              <div className="stat-label-about">{t('about.stat3_desc')}</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
