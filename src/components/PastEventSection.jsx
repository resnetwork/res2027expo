import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, FileText, ExternalLink, Images } from 'lucide-react';
import './PastEventSection.css';
import { useLanguage } from '../contexts/LanguageContext';
import allPhotos from '../data/galleryData.json';

const PastEventSection = ({ onOpenGallery }) => {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [scale, setScale] = useState(0.75);
  const iframeRef = useRef(null);
  const cardRef = useRef(null);
  const hasStartedPlaying = useRef(false);

  // Curated 18 photos for "Как это было" showcase grid (balanced mix of stands, summit, and heads of state)
  // First 6 photos: exactly 3 presidents + 3 stands/pavilions as requested
  const SHOWCASE_PHOTO_IDS = [
    // --- Slide 1 (First 6 photos: 3 presidents, 3 stands) ---
    1,   // Официальное общее фото глав государств (Президенты)
    76,  // Высокотехнологичный стенд КазМунайГаз с сотрудниками (Стенд)
    6,   // Президент Токаев и лидеры государств на аллее выставки (Президенты)
    90,  // Павильон Швейцарии и Leica Geosystems с посетителями (Стенд)
    2,   // Президенты осматривают зелёные технологии на стенде (Президенты)
    75,  // Оживлённая аллея выставки с павильонами Meros и Узбекистан (Стенд)

    // --- Slide 2 (Photos 7 - 12: стенды, площадки и атмосфера) ---
    18,  // Национальный павильон Узбекистана с макетом ракеты и экранами (Стенд)
    11,  // Главы государств на стенде NCOC / ERG с презентацией (Президенты + стенд)
    88,  // Стенд Пермского края с представителями и экспозицией (Стенд)
    16,  // Центральный павильон с каскадными водопадами и посетителями (Атмосфера/стенды)
    4,   // Президенты Токаев и Мирзиёев у павильона (Президенты)
    72,  // Интерактивный стенд UNICEF «School of the Future» (Стенд)

    // --- Slide 3 (Photos 13 - 18: пленарная сессия, павильоны и сцена) ---
    85,  // Панорама пленарного саммита с водным зеркалом и павильонами (Саммит/Экспо)
    15,  // Павильоны-деревья Казахстана и Кыргызстана (Стенды)
    10,  // Президенты изучают зелёный макет (Президенты + стенд)
    74,  // Входной портал в выставочный зал RES+ EXPO (Атмосфера)
    21,  // Торжественное награждение на главной зелёной сцене (Сцена/награды)
    3    // Зелёный оазис у павильона Азербайджана (Зелёная экспозиция)
  ];

  const showcasePhotos = SHOWCASE_PHOTO_IDS
    .map(id => allPhotos.find(p => p.id === id) || allPhotos[id - 1])
    .filter(Boolean);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items per slide: 6 on desktop, 2 on mobile
  const itemsPerSlide = isMobile ? 2 : 6;
  const totalSlides = Math.ceil(showcasePhotos.length / itemsPerSlide);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset slide if itemsPerSlide changes
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handleGalleryClick = () => {
    if (onOpenGallery) {
      onOpenGallery();
    } else {
      window.location.hash = '#gallery';
    }
  };

  const sendCommand = (func, args = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func,
          args: Array.isArray(args) ? args : [args]
        }),
        '*'
      );
    }
  };

  const enforceQuality = () => {
    sendCommand('setPlaybackQuality', ['hd1080']);
    sendCommand('setPlaybackQualityRange', ['hd1080', 'hd1080']);
    sendCommand('setPlaybackQualityRange', ['hd1080', 'highres']);
    sendCommand('setSuggestedQuality', ['hd1080']);
  };

  const togglePlay = () => {
    const nextState = !playing;
    setPlaying(nextState);
    sendCommand(nextState ? 'playVideo' : 'pauseVideo');
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const nextMute = !muted;
    setMuted(nextMute);
    sendCommand(nextMute ? 'mute' : 'unMute');
  };

  useEffect(() => {
    // Dynamic scale calculation to fit 1920x1080 viewport into container with ~35% extra zoom to crop YouTube chrome
    const updateScale = () => {
      if (!cardRef.current) return;
      const { clientWidth, clientHeight } = cardRef.current;
      if (!clientWidth || !clientHeight) return;
      const s = Math.max(clientWidth / 1920, clientHeight / 1080) * 1.35;
      setScale(s);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (cardRef.current) {
      ro.observe(cardRef.current);
    }
    window.addEventListener('resize', updateScale);

    const handleMessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (!data) return;

        if (data.event === 'onReady' || data.event === 'initialDelivery') {
          enforceQuality();
        }

        if (data.info === 1 || (data.event === 'onStateChange' && data.info === 1) || data.info?.playerState === 1) {
          enforceQuality();
          if (!hasStartedPlaying.current) {
            hasStartedPlaying.current = true;
            setIsVideoPlaying(true);
            sendCommand('seekTo', [0, true]);
          }
        }
      } catch (e) {
        // ignore parsing errors
      }
    };
    window.addEventListener('message', handleMessage);

    const qTimer1 = setTimeout(enforceQuality, 400);
    const qTimer2 = setTimeout(enforceQuality, 1200);
    const qTimer3 = setTimeout(enforceQuality, 2500);

    const fallbackTimer = setTimeout(() => {
      if (!hasStartedPlaying.current) {
        hasStartedPlaying.current = true;
        setIsVideoPlaying(true);
        enforceQuality();
      }
    }, 3500);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('message', handleMessage);
      clearTimeout(qTimer1);
      clearTimeout(qTimer2);
      clearTimeout(qTimer3);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const reportUrl = 'https://drive.google.com/drive/folders/1VCIN5dLyig12NlLoKUpv2EEnM4VWZ8C_?usp=sharing';

  // Group photos into slides
  const slides = [];
  for (let i = 0; i < showcasePhotos.length; i += itemsPerSlide) {
    slides.push(showcasePhotos.slice(i, i + itemsPerSlide));
  }

  return (
    <section className="past-event-section" id="past-event">
      <div className="container past-event-container">
        
        {/* Title */}
        <h2 className="section-title past-event-heading">
          {t('pastEvent.title')}
        </h2>

        {/* 1. Gallery Grid Showcase with Auto-sliding */}
        <div 
          className="past-event-showcase-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="showcase-slider-track-window">
            <div 
              className="showcase-slider-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((group, slideIdx) => (
                <div 
                  key={slideIdx} 
                  className={`showcase-slide-page ${isMobile ? 'mobile-slide' : 'desktop-slide'}`}
                >
                  <div className={`showcase-photo-grid ${isMobile ? 'grid-2' : 'grid-6'}`}>
                    {group.map((item, idx) => (
                      <div 
                        key={item.id || idx} 
                        className="showcase-photo-card"
                        onClick={handleGalleryClick}
                        title="Нажмите, чтобы открыть всю галерею"
                      >
                        <img 
                          src={item.src} 
                          alt={`RES EXPO Photo ${item.id}`} 
                          className="showcase-photo-img"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Pagination Dots */}
          {totalSlides > 1 && (
            <div className="showcase-dots">
              {Array.from({ length: totalSlides }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`showcase-dot ${currentSlide === dotIdx ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(dotIdx)}
                  aria-label={`Слайд ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 2. Action Buttons Under Gallery */}
        <div className="past-event-buttons-row">
          {/* Left: View All Photos Button */}
          <button 
            type="button"
            onClick={handleGalleryClick}
            className="past-event-btn past-event-btn-gallery"
          >
            <Images size={22} />
            <span>{t('pastEvent.seeAll')}</span>
          </button>

          {/* Right: Open Report Button */}
          <a 
            href={reportUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="past-event-btn past-event-btn-report"
          >
            <FileText size={22} />
            <span>{t('pastEvent.button')}</span>
            <ExternalLink size={18} className="btn-external-icon" />
          </a>
        </div>

        {/* 3. Video Player Card (Clean video player, zero YouTube UI, 1080p) */}
        <div className="past-event-player-wrapper">
          <div className="past-event-video-card" ref={cardRef}>
            
            {/* Scaled 1920x1080 iframe hiding YouTube chrome/watermark while forcing 1080p */}
            <div className="past-event-scale-wrapper">
              <iframe
                ref={iframeRef}
                width="1920"
                height="1080"
                src="https://www.youtube.com/embed/pnlASh029Rs?autoplay=1&mute=1&loop=1&playlist=pnlASh029Rs&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0&vq=hd1080"
                title={t('pastEvent.title')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="past-event-iframe"
                style={{
                  transform: `translate(-50%, -50%) scale(${scale})`
                }}
              />
            </div>

            {/* Loading cover with spinner */}
            <div className={`video-loading-cover ${isVideoPlaying ? 'fade-out' : ''}`}>
              <div className="video-spinner"></div>
            </div>

            {/* Click blocker for play/pause */}
            <div className="video-blocker" onClick={togglePlay}></div>

            {/* Video Controls Overlay */}
            <div className="video-controls-overlay">
              <button className="control-btn" onClick={togglePlay} aria-label="Воспроизвести / Пауза">
                {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>
              <button className="control-btn" onClick={toggleMute} aria-label="Звук">
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PastEventSection;
