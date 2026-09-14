import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Globe } from 'lucide-react';
import './HeroSection.css';

const HeroSection = ({ onOpenModal }) => {
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
  const targetDate = new Date('2027-05-05T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const hasStartedPlaying = useRef(false);

  useEffect(() => {
    // Listen to YouTube IFrame API messages to know when video actually starts playing
    const handleMessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        // YouTube API sends info: 1 when playing
        if (data && (data.info === 1 || (data.event === 'onStateChange' && data.info === 1))) {
          if (!hasStartedPlaying.current) {
            hasStartedPlaying.current = true;
            setIsVideoPlaying(true);
            // Restart video from beginning so user doesn't miss the first seconds during load
            if (iframeRef.current && iframeRef.current.contentWindow) {
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                  event: 'command',
                  func: 'seekTo',
                  args: [0, true]
                }),
                '*'
              );
            }
          }
        }
      } catch (e) {
        // ignore parsing errors from non-json messages
      }
    };
    window.addEventListener('message', handleMessage);

    // Fallback: reveal after 3.5s in case postMessage is blocked
    const fallbackTimer = setTimeout(() => {
      if (!hasStartedPlaying.current) {
        hasStartedPlaying.current = true;
        setIsVideoPlaying(true);
      }
    }, 3500);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <section className="hero-websummit">
        <div className="hero-grid container">
          {/* Left Card: Video */}
          <div className="hero-card hero-video-card">
            
            <div className="video-scale-wrapper">
              <iframe
                ref={iframeRef}
                src="https://www.youtube.com/embed/y8pZx1hrPmI?autoplay=1&mute=1&loop=1&playlist=y8pZx1hrPmI&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1&disablekb=1&iv_load_policy=3"
                title="RES 2027 EXPO Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="hero-iframe"
              />
            </div>
            
            <div className={`video-loading-cover ${isVideoPlaying ? 'fade-out' : ''}`}>
              <div className="video-spinner"></div>
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
              Международная выставка зеленых технологий и устойчивых решений «RES&nbsp;2027&nbsp;EXPO»
            </h1>
            
            <p className="hero-subtitle-ws">
              От видения к реализации: будущее устойчивого развития начинается здесь
            </p>
            
            <div className="countdown-ws">
              <div className="count-item-ws">
                <span className="count-num-ws">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="count-label-ws">Дней</span>
              </div>
              <div className="count-item-ws">
                <span className="count-num-ws">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="count-label-ws">Часов</span>
              </div>
              <div className="count-item-ws">
                <span className="count-num-ws">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="count-label-ws">Минут</span>
              </div>
              <div className="count-item-ws">
                <span className="count-num-ws">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="count-label-ws">Секунд</span>
              </div>
            </div>

            <div className="hero-actions-ws">
              <button 
                className="btn-ws-primary"
                onClick={() => onOpenModal && onOpenModal('Забронировать стенд')}
              >
                ЗАБРОНИРОВАТЬ СТЕНД
              </button>
              <a 
                href="https://resnetwork.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-ws-network"
                style={{ textDecoration: 'none' }}
              >
                <Globe size={18} />
                RES Network
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
