import React from 'react';
import './Sections.css';
import { useLanguage } from '../contexts/LanguageContext';

const BadgeSection = () => {
  const { t } = useLanguage();
  return (
    <section className="badge-section bg-white">
      <div className="container">
        <div className="badge-wrapper">
          <img 
            src="/badge.png" 
            alt="Smart Plastic Zone Gold" 
            className="badge-img"
          />
          <div className="badge-pill">
            <h3 className="badge-text">
              {t('smartPlastic')}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BadgeSection;
