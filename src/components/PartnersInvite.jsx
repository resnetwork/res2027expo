import React, { useRef, useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import './Participate.css';

const PartnersInvite = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const scrollRef = useRef(null);

  const partners = [
    { name: 'ОШУРБАЕВ\nМАНСУР', role: 'ВИЦЕ-МИНИСТР ЭКОЛОГИИ И ПРИРОДНЫХ РЕСУРСОВ РЕСПУБЛИКИ КАЗАХСТАН', url: 'iB3IymXl59g', image: '/partners/oshurbaev.png' },
    { name: 'АЙГЕРИМ\nКЕНЕСОВА', role: 'ОФИЦИАЛЬНЫЙ ПРЕДСТАВИТЕЛЬ ASIAFILTER INC.', url: 'jAU1aWs9oYA', image: '/partners/kenesova.png' },
    { name: 'ТАЛГАТ\nТОРЕБЕКОВ', role: 'ДИРЕКТОР ДЕПАРТАМЕНТА ОХРАНЫ ОКРУЖАЮЩЕЙ СРЕДЫ МЕЖДУНАРОДНОЙ ГОРНО-МЕТАЛЛУРГИЧЕСКОЙ КОМПАНИИ ERG В КАЗАХСТАНЕ', url: 'q4mT-CuxSXQ', image: '/partners/torebekov.png' },
    { name: 'YAYU WU', role: 'РУКОВОДИТЕЛЬ LI AUTO ЦЕНТРАЛЬНОЙ АЗИИ', url: 'IGq8L-DmRMk', image: '/partners/wu.png' },
    { name: 'ЧАН ХЭ\nЧУНЬ', role: 'ГЕНЕРАЛЬНЫЙ МЕНЕДЖЕР ФИЛИАЛА "ENERGY CHINA" В КАЗАХСТАНЕ', url: 'ngMzlE68Z40', image: '/partners/chan.png' },
    { name: 'КАЙЫРБОЛАТ\nСАХМЕТОВ', role: 'РУКОВОДИТЕЛЬ УПРАВЛЕНИЯ ПРИРОДНЫХ РЕСУРСОВ', url: '9qR1eA5_jCg', image: '/partners/sahmetov.png' },
    { name: 'НУРЛАН\nСАДИРОВ', role: 'ДИРЕКТОР ТОО "GREEN LINE"', url: 'r0r9B2xZ-uQ', image: '/partners/sadirov.png' },
    { name: 'УЛУГБЕК\nАЛЬТАЕВ', role: 'ГЛАВНЫЙ ИНЖЕНЕР ПО ЭКОЛОГИИ АО "QAZAQ ENERGY"', url: 'k8d9R4mF_pM', image: '/partners/altaev.png' },
    { name: 'МЕРГЕН\nИЗБАСАРОВ', role: 'ВЕДУЩИЙ ЭКСПЕРТ ПО УСТОЙЧИВОМУ РАЗВИТИЮ', url: 'b2m5K8lP_xN', image: '/partners/izbasarov.png' },
    { name: 'АХМЕД\nСЕРИКОВ', role: 'ПРЕЗИДЕНТ ФОНДА "ЭКО-КАЗАХСТАН"', url: 'v7n4C1sT_bV', image: '/partners/serikov.png' }
  ];

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
        <h2 className="section-title text-inverse" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>НАШИ ПАРТНЕРЫ ПРИГЛАШАЮТ</h2>
        <p className="section-subtitle" style={{marginBottom: '2.5rem', fontWeight: 400, color: 'rgba(255,255,255,0.8)'}}>
          Видео обращения участников мероприятия
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
