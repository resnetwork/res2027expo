import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef(null);

  const togglePlay = () => {
    const nextState = !playing;
    setPlaying(nextState);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: nextState ? 'playVideo' : 'pauseVideo',
          args: ''
        }),
        '*'
      );
    }
  };

  const toggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: nextMute ? 'mute' : 'unMute',
          args: ''
        }),
        '*'
      );
    }
  };

  return (
    <>
      <section className="hero-websummit">
        <div className="hero-grid container">
          {/* Left Card: Video */}
          <div className="hero-card hero-video-card">
            
            <div className="video-scale-wrapper">
              <iframe
                ref={iframeRef}
                src="https://www.youtube.com/embed/y8pZx1hrPmI?autoplay=1&mute=1&loop=1&playlist=y8pZx1hrPmI&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1"
                title="RES 2027 EXPO Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="hero-iframe"
              />
            </div>
            
            <div className="video-blocker" onClick={togglePlay}></div>

            <div className="video-controls-overlay">
              <button className="control-btn" onClick={togglePlay} aria-label="Воспроизвести / Пауза">
                {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>
              <button className="control-btn" onClick={toggleMute} aria-label="Звук">
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            
          </div>

          {/* Right Card: Content */}
          <div className="hero-card hero-content-card">
            <h1 className="hero-title-ws">
              Международная выставка зеленых технологий и устойчивых решений «RES 2027 EXPO»
            </h1>
            
            <p className="hero-subtitle-ws">
              От видения к реализации: будущее устойчивого развития начинается здесь
            </p>
            
            <div className="countdown-ws">
              <div className="count-item-ws">
                <span className="count-num-ws">00</span>
                <span className="count-label-ws">Дней</span>
              </div>
              <div className="count-item-ws">
                <span className="count-num-ws">00</span>
                <span className="count-label-ws">Часов</span>
              </div>
              <div className="count-item-ws">
                <span className="count-num-ws">00</span>
                <span className="count-label-ws">Минут</span>
              </div>
              <div className="count-item-ws">
                <span className="count-num-ws">00</span>
                <span className="count-label-ws">Секунд</span>
              </div>
            </div>

            <div className="hero-actions-ws">
              <button className="btn-ws-primary">ЗАБРОНИРОВАТЬ СТЕНД</button>
              <button className="btn-ws-secondary">ПОСЕТИТЬ ВЫСТАВКУ</button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sub-banner">
        МЫ — ОБЛАДАТЕЛИ ЗОЛОТОГО ЗНАЧКА SMART PLASTIC ZONE: ПОДТВЕРЖДЁННАЯ ЭКОЛОГИЧЕСКАЯ ОТВЕТСТВЕННОСТЬ
      </div>
    </>
  );
};

export default HeroSection;
