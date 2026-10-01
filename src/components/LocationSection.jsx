import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './LocationSection.css';
import { useLanguage } from '../contexts/LanguageContext';

const LocationSection = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const totalImages = 29;

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 1 ? totalImages : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === totalImages ? 1 : prev + 1));
  };

  return (
    <section className="location-section" id="location">
      <div className="container">
        <div className="location-grid">
          
          {/* 1. Map Image */}
          <div className="location-item map-container">
            <img src="/map-location.png" alt="Карта" className="location-map-img" />
          </div>

          {/* 2. Photo Gallery Slider */}
          <div className="location-item gallery-container">
            <div className="gallery-slider">
              <img 
                src={`/gallery/${currentImageIndex}.jpg`} 
                alt={`Gallery ${currentImageIndex}`} 
                className="gallery-img" 
              />
              <button className="slider-btn prev-btn" onClick={handlePrev} aria-label="Previous image">
                <ChevronLeft size={24} color="#333" />
              </button>
              <button className="slider-btn next-btn" onClick={handleNext} aria-label="Next image">
                <ChevronRight size={24} color="#333" />
              </button>
            </div>
          </div>

          {/* 3. Text Info */}
          <div className="location-item info-container">
            <h3 className="info-title">{t('location.title')}</h3>
            <p className="info-text" dangerouslySetInnerHTML={{ __html: t('location.address') }} />

            <h3 className="info-title" style={{ marginTop: '1.5rem' }}>{t('location.workingHoursTitle')}</h3>
            <ul className="info-list">
              <li>{t('location.day1')}</li>
              <li>{t('location.day2')}</li>
              <li>{t('location.day3')}</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
