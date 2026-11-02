import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import './StartupCompetitionSection.css';
import { useLanguage } from '../contexts/LanguageContext';

const StartupCompetitionSection = ({ onOpenStand }) => {
  const { t } = useLanguage();

  const handleApplyClick = () => {
    if (onOpenStand) {
      onOpenStand('Eco Startup Competition');
    } else {
      window.location.hash = '#bookstand';
    }
  };

  const focusAreas = t('startupCompetition.focusAreas') || [
    'Солнечная и ветровая энергетика',
    'Био- и гидроэнергетика',
    'Накопители энергии и батареи',
    'Зеленый водород и CleanTech',
    'Управление отходами и водой',
    'Эко-транспорт и умные города'
  ];

  return (
    <section className="startup-competition-section" id="startup-competition">
      <div className="container startup-competition-container">
        
        {/* Main Banner Card */}
        <div className="startup-banner-card">
          
          {/* Left Decorative Eco Illustration */}
          <div className="startup-banner-left">
            <div className="startup-left-illustration">
              <svg 
                viewBox="0 0 220 220" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="startup-eco-svg"
                aria-hidden="true"
              >
                {/* City skyline outlines */}
                <path d="M20 180 V120 H50 V180" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
                <path d="M28 135 H42 M28 150 H42 M28 165 H42" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                
                <path d="M50 180 V90 H90 V180" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                <path d="M62 105 H78 M62 120 H78 M62 135 H78 M62 150 H78 M62 165 H78" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                
                <path d="M90 180 V130 H120 V180" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
                <path d="M98 145 H112 M98 160 H112" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

                {/* Base ground line */}
                <path d="M10 180 H210" stroke="#15803d" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

                {/* Sprout & Curved Eco Vine */}
                <path 
                  d="M100 180 C100 140 120 100 160 80 C150 105 130 145 125 180" 
                  stroke="#16a34a" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />
                {/* Big Leaf Top Right */}
                <path 
                  d="M160 80 C190 60 210 20 205 15 C190 20 145 40 140 75 C139 76 150 78 160 80 Z" 
                  fill="rgba(34, 197, 94, 0.12)" 
                  stroke="#16a34a" 
                  strokeWidth="3" 
                  strokeLinejoin="round" 
                />
                <path d="M160 80 C175 60 195 35 205 15" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                {/* Secondary Leaf Left */}
                <path 
                  d="M125 125 C100 110 80 90 85 70 C105 75 130 95 130 120 Z" 
                  fill="rgba(34, 197, 94, 0.12)" 
                  stroke="#16a34a" 
                  strokeWidth="2.5" 
                  strokeLinejoin="round" 
                />
                
                {/* Sun / Energy rings */}
                <circle cx="185" cy="45" r="14" stroke="#eab308" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
                <circle cx="185" cy="45" r="6" fill="#facc15" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* Center Column: Logo, Date, Title, Subtitle, CTA */}
          <div className="startup-banner-center">
            
            {/* Brand Logo */}
            <img 
              src="/logo.png" 
              alt="RES+ EXPO" 
              className="startup-brand-logo" 
            />

            {/* Date & Venue Pill */}
            <div className="startup-date-pill">
              <span className="date-highlight">{t('startupCompetition.dates')}</span>
              <span className="venue-highlight">{t('startupCompetition.venue')}</span>
            </div>

            {/* Main Headline */}
            <h2 className="startup-main-title">
              {t('startupCompetition.title')}
            </h2>

            {/* Subtitle Pitch */}
            <p className="startup-subtitle">
              {t('startupCompetition.subtitle')}
            </p>

            {/* CTA Button Group */}
            <div className="startup-cta-group">
              <button 
                type="button" 
                onClick={handleApplyClick} 
                className="startup-apply-btn"
                aria-label="Подать заявку"
              >
                <span>{t('startupCompetition.cta')}</span>
                <ArrowRight size={20} className="apply-btn-arrow" />
              </button>
              <div className="startup-slots-tag">
                <Sparkles size={14} className="slots-icon" />
                <span>{t('startupCompetition.limitedSlots')}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Key Focus Areas List */}
          <div className="startup-banner-right">
            <ul className="focus-areas-list">
              {focusAreas.map((area, idx) => (
                <li key={idx} className="focus-area-item">
                  <CheckCircle2 size={16} className="focus-item-icon" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StartupCompetitionSection;
