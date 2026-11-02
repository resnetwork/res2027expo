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
    <section className="ways-to-participate section-padding bg-white" style={{ paddingBottom: '2.5rem' }}>
      <div className="container text-center">
        <h2 className="section-title" style={{ color: 'var(--bg-dark-green)' }}>
          {t('ways.title')}
        </h2>

        {/* Desktop Layout: Horizontal Row */}
        <div className="ways-grid-desktop">
          {ways.map((way, index) => (
            <div key={index} className="way-card">
              <div className="way-icon-circle">
                {way.icon}
              </div>
              <h4 className="way-title">
                {way.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Mobile Layout: Native Touch-Swipe Carousel (No Cheap Buttons) */}
        <div className="ways-carousel-mobile">
          <div className="ways-scroll-track">
            {ways.map((way, index) => (
              <div key={index} className="way-carousel-card">
                <div className="way-icon-circle">
                  {way.icon}
                </div>
                <h4 className="way-title">
                  {way.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WaysToParticipate;
