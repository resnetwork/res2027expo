import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import galleryPhotos from '../data/galleryData.json';
import { useLanguage } from '../contexts/LanguageContext';
import './GalleryPage.css';

const GalleryPage = ({ onOpenModal, onOpenStand, onOpenVisitor }) => {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Close lightbox on Escape, navigate with Arrow keys
  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0));
      }
    },
    [lightboxIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, lightboxIndex]);

  // Touch swipe support
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setLightboxIndex((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0));
    }
    if (isRightSwipe) {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1));
    }
  };

  return (
    <div className="gallery-page-wrapper">
      <Header
        onOpenModal={onOpenModal}
        onOpenStand={onOpenStand}
        onOpenVisitor={onOpenVisitor}
      />

      <main className="gallery-page-main">
        {/* Hero Banner Header (Matching GITEX clean style) */}
        <div className="gallery-hero-banner">
          <div className="container">
            <h1 className="gallery-hero-title">
              {t('pastEvent.galleryTitle')}
            </h1>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-content-section">
          <div className="container">
            <div className="gallery-full-grid">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={photo.id || index}
                  className="gallery-card-item"
                  onClick={() => setLightboxIndex(index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Открыть фото ${index + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxIndex(index);
                    }
                  }}
                >
                  <div className="gallery-card-img-wrapper">
                    <img
                      src={photo.src}
                      alt={`RES Expo Photo ${index + 1}`}
                      loading="lazy"
                      className="gallery-card-img"
                    />
                    <div className="gallery-card-overlay">
                      <span className="gallery-zoom-icon">
                        <Maximize2 size={24} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="gallery-lightbox-overlay" 
          onClick={() => setLightboxIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="gallery-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            {/* Top Toolbar */}
            <div className="lightbox-top-toolbar">
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {galleryPhotos.length}
              </span>
              <button 
                className="lightbox-close-btn" 
                onClick={() => setLightboxIndex(null)} 
                aria-label="Закрыть"
              >
                <X size={26} />
              </button>
            </div>

            {/* Main Image Display */}
            <div className="lightbox-img-stage">
              <button
                className="lightbox-nav-btn prev-btn"
                onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1))}
                aria-label="Предыдущее фото"
              >
                <ChevronLeft size={36} />
              </button>

              <div className="lightbox-img-wrapper">
                <img
                  src={galleryPhotos[lightboxIndex].src}
                  alt={`RES Expo Full Photo ${lightboxIndex + 1}`}
                  className="lightbox-full-img"
                />
              </div>

              <button
                className="lightbox-nav-btn next-btn"
                onClick={() => setLightboxIndex((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0))}
                aria-label="Следующее фото"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer
        onOpenModal={onOpenModal}
        onOpenStand={onOpenStand}
        onOpenVisitor={onOpenVisitor}
      />
    </div>
  );
};

export default GalleryPage;
