import React, { useRef, useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import './Participate.css';
import { useLanguage } from '../contexts/LanguageContext';

const PartnersInvite = () => {
  const { t } = useLanguage();
  const [playingIndex, setPlayingIndex] = useState(null);
  const scrollRef = useRef(null);

  const translatedPartners = t('partnersInvite.list') || [];
  const mediaData = [
    { url: 'iB3IymXl59g', image: '/partners/oshurbaev.png' },
    { url: 'jAU1aWs9oYA', image: '/partners/kenesova.png' },
    { url: 'q4mT-CuxSXQ', image: '/partners/torebekov.png' },
    { url: 'IGq8L-DmRMk', image: '/partners/wu.png' },
    { url: 'ngMzlE68Z40', image: '/partners/chan.png' },
    { url: '9qR1eA5_jCg', image: '/partners/sahmetov.png' },
    { url: 'r0r9B2xZ-uQ', image: '/partners/sadirov.png' },
    { url: 'k8d9R4mF_pM', image: '/partners/altaev.png' },
    { url: 'b2m5K8lP_xN', image: '/partners/izbasarov.png' },
    { url: 'v7n4C1sT_bV', image: '/partners/serikov.png' }
  ];

  const partners = Array.isArray(translatedPartners) 
    ? translatedPartners.map((p, i) => ({
        ...p,
        ...mediaData[i]
      }))
    : [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="partners-invite bg-green" style={{ padding: '3rem 0' }}>
      <div className="container text-center" style={{position: 'relative'}}>
        <h2 className="section-title text-inverse" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t('partnersInvite.title')}</h2>
        <p className="section-subtitle" style={{marginBottom: '2.5rem', fontWeight: 400, color: 'rgba(255,255,255,0.8)'}}>
          {t('partnersInvite.subtitle')}
        </p>

        <div className="carousel-wrapper">
          <button className="carousel-arrow carousel-arrow-left" onClick={() => scroll('left')}>
            <ChevronLeft size={28} />
          </button>
          
          <div className="partners-carousel" ref={scrollRef}>
            {partners.map((p, i) => (
              <div key={i} className="partner-video-card">
                {playingIndex === i && p.url && (
                  <iframe 
                    src={`https://www.youtube.com/embed/${p.url}?autoplay=1`} 
                    title={p.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="partner-iframe"
                  ></iframe>
                )}
                
                <div className="partner-thumbnail-container" onClick={() => p.url && setPlayingIndex(i)}>
                  {p.url ? (
                    <img 
                      src={p.image ? p.image : `https://img.youtube.com/vi/${p.url}/hqdefault.jpg`} 
                      alt={p.name} 
                      className="partner-thumbnail" 
                    />
                  ) : (
                    <div className="partner-placeholder"></div>
                  )}
                  
                  {p.url && (
                    <div className="play-button-center">
                      <Play fill="var(--bg-dark-green)" stroke="var(--bg-dark-green)" size={32} />
                    </div>
                  )}
                </div>
                
                <div className="partner-info" onClick={() => p.url && setPlayingIndex(i)}>
                  <h4 className="partner-name">{p.name}</h4>
                  <p className="partner-role">{p.role}</p>
                  <p className="partner-link">@WWW.RES2027EXPO.KZ</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-arrow carousel-arrow-right" onClick={() => scroll('right')}>
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnersInvite;
