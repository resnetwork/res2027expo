import React from 'react';
import './Sections.css';
import { useLanguage } from '../contexts/LanguageContext';

const QuoteSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="quote-section">
      <div className="container">
        <div className="quote-container">
          <div className="quote-image-wrapper">
            <img src="/president.png" alt="Касым-Жомарт Токаев" className="quote-image" />
          </div>
        <div className="quote-content">
          <h3 className="quote-title">
            {t('quote.title')}
          </h3>
          <p className="quote-text">
            {t('quote.text')}
          </p>
          <p className="quote-author">
            {t('quote.author')}
          </p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default QuoteSection;
