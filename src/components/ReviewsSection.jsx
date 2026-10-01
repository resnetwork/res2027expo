import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Participate.css';
import { useLanguage } from '../contexts/LanguageContext';

const ReviewsSection = () => {
  const scrollRef = useRef(null);
  const { t } = useLanguage();

  const translatedReviews = t('reviews.list') || [];
  const images = [
    '/reviews/torebekov.jpg',
    '/reviews/bekmaganbetov.jpg',
    '/reviews/kaliev.png',
    '/reviews/duisekeev.png',
    '/reviews/kabdoldanov.png',
    '/reviews/yakupbaeva.png',
    '/reviews/zhang.png'
  ];
  
  const reviews = Array.isArray(translatedReviews) 
    ? translatedReviews.map((rev, index) => ({
        ...rev,
        image: images[index]
      }))
    : [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="reviews-section bg-green" id="reviews" style={{ padding: '5rem 0' }}>
      <div className="container" style={{ position: 'relative' }}>
        <h2 className="section-title text-inverse" style={{textAlign: 'center', marginBottom: '3rem'}}>{t('reviews.title')}</h2>
        
        <div className="carousel-wrapper">
          <button className="carousel-arrow carousel-arrow-left" onClick={() => scroll('left')}>
            <ChevronLeft size={28} />
          </button>
          
          <div className="reviews-carousel" ref={scrollRef}>
            {reviews.map((rev, i) => (
              <div key={i} className="review-card-carousel">
                <div className="review-author" style={{ display: 'flex', marginBottom: '1rem', alignItems: 'flex-start', gap: '1rem', minHeight: '110px' }}>
                  <div style={{ width: '85px', height: '85px', borderRadius: '50%', background: '#eee', flexShrink: 0, overflow: 'hidden' }}>
                    {rev.image ? (
                      <img src={rev.image} alt={rev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#ddd' }}></div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <div style={{ fontWeight: 700, color: 'var(--bg-dark-green)', fontSize: '1rem', marginBottom: '0.3rem', lineHeight: 1.2 }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.4, fontWeight: 500 }}>
                      {rev.title}
                    </div>
                  </div>
                </div>
                <p className="review-quote" style={{ color: '#1a594f', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5, flexGrow: 1 }}>
                  {rev.text}
                </p>
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

export default ReviewsSection;
