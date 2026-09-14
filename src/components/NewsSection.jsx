import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './NewsSection.css';

const NewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const news = [
    { 
      title: 'Фонд Булата Утемуратова поддержал проект газификации Алматы', 
      desc: 'Фонд Булата Утемуратова оказал благотворительную помощь в размере 460 млн тенге для реализации социально значимого проекта по газификации жилых домов города Алматы.',
      image: '/news/news1.png',
      url: 'https://res2026expo.kz/page221633103.html'
    },
    { 
      title: 'Казахмыс усиливает ESG-трансформацию и экологические инициативы', 
      desc: 'Корпорация Казахмыс продолжает внедрять принципы устойчивого развития, объединяя экологию, социальную ответственность и прозрачное управление.',
      image: '/news/news2.png',
      url: 'https://res2026expo.kz/page139192823.html'
    },
    { 
      title: 'Тенгизшевройл принял участие в Региональном экологическом саммите ЭКСПО 2026', 
      desc: 'В Астане прошла международная выставка зеленых технологий и устойчивых решений «RES 2026 EXPO» с участием глав государств Центральной Азии, посвященная переходу к экологически ответственному развитию и зеленой экономике.',
      image: '/news/news3.png',
      url: 'https://res2026expo.kz/page139165293.html'
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
  };

  return (
    <section className="news-section section-padding bg-green" id="news">
      <div className="container">
        <h2 className="section-title text-inverse" style={{marginBottom: '3rem', textAlign: 'center'}}>НОВОСТИ</h2>

        <div className="news-carousel-container" style={{ position: 'relative' }}>
          {isMobile && (
            <button onClick={prevSlide} style={{
              position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              background: 'rgba(0,0,0,0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}>
              <ChevronLeft size={20} />
            </button>
          )}

          <div className={isMobile ? "news-mobile-view" : "grid-3"}>
            {news.map((item, i) => (
              <div 
                key={i} 
                className="news-card" 
                style={{
                  background: 'white', color: 'var(--text-main)', display: (isMobile && i !== currentIndex) ? 'none' : 'flex', 
                  flexDirection: 'column', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  margin: isMobile ? '0 15px' : '0'
                }}
              >
                {item.image ? (
                  <img src={item.image} alt={item.title} style={{width: '100%', height: '250px', objectFit: 'cover'}} />
                ) : (
                  <div className="news-img-placeholder" style={{height: '250px', background: '#eee'}}></div>
                )}
                <div className="news-content" style={{padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                  <h3 className="news-title" style={{color: 'var(--bg-dark-green)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0'}}>
                    {item.title}
                  </h3>
                  <p style={{color: '#666', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem', flexGrow: 1}}>
                    {item.desc}
                  </p>
                  <a href={item.url} target="_blank" rel="noreferrer" style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    alignSelf: 'flex-start',
                    transition: 'background-color 0.2s'
                  }}>
                    Подробнее
                  </a>
                </div>
              </div>
            ))}
          </div>

          {isMobile && (
            <button onClick={nextSlide} style={{
              position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              background: 'rgba(0,0,0,0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
