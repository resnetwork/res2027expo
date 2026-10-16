import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Globe } from 'lucide-react';
import './HeroSection.css';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [scale, setScale] = useState(1.35);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

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

  const toggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    sendCommand(nextMute ? 'mute' : 'unMute');
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
    // Dynamic scale calculation to fit 1920x1080 viewport into container with ~35% extra zoom to crop YouTube chrome
    const updateScale = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (!clientWidth || !clientHeight) return;
      const s = Math.max(clientWidth / 1920, clientHeight / 1080) * 1.35;
      setScale(s);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', updateScale);

    // Listen to YouTube IFrame API messages to know when video actually starts playing
    const handleMessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (!data) return;

        if (data.event === 'onReady' || data.event === 'initialDelivery') {
          enforceQuality();
        }

        // YouTube API sends info: 1 or playerState: 1 when playing
        if (data.info === 1 || (data.event === 'onStateChange' && data.info === 1) || data.info?.playerState === 1) {
          enforceQuality();
          if (!hasStartedPlaying.current) {
            hasStartedPlaying.current = true;
            setIsVideoPlaying(true);
            // Restart video from beginning so user doesn't miss the first seconds during load
            sendCommand('seekTo', [0, true]);
          }
        }
      } catch (e) {
        // ignore parsing errors from non-json messages
      }
    };
    window.addEventListener('message', handleMessage);

    // Initial quality enforcement timeouts
    const qTimer1 = setTimeout(enforceQuality, 400);
    const qTimer2 = setTimeout(enforceQuality, 1200);
    const qTimer3 = setTimeout(enforceQuality, 2500);

    // Fallback: reveal after 3.5s in case postMessage is blocked
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

  return (
    <>
      <section className="hero-slush">
        
        {/* Background Video Elements */}
        <div className="video-scale-wrapper" ref={containerRef}>
          <iframe
            ref={iframeRef}
            width="1920"
            height="1080"
            src="https://www.youtube.com/embed/y8pZx1hrPmI?autoplay=1&mute=1&loop=1&playlist=y8pZx1hrPmI&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1&disablekb=1&iv_load_policy=3&vq=hd1080"
            title="RES+ EXPO 2027 Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="hero-iframe"
            style={{
              transform: `translate(-50%, -50%) scale(${scale})`
            }}
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
        
        {/* Dark overlay for readability */}
        <div className="hero-overlay"></div>

        {/* Foreground Content */}
        <div className="hero-content-slush container">
          <div className="hero-text-wrapper">
            <h1 className="hero-title-slush">
              <span className="hero-highlight" style={{ display: 'block', marginBottom: '0.2em' }}>«RES+&nbsp;EXPO&nbsp;2027»</span>
              <span dangerouslySetInnerHTML={{ __html: t('hero.title') }} style={{ display: 'block', lineHeight: '1.2' }} />
            </h1>
            
            <p className="hero-subtitle-slush">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div className="hero-bottom-bar">
            <div className="countdown-slush">
              <div className="count-item-slush">
                <span className="count-num-slush">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="count-label-slush">{t('hero.days')}</span>
              </div>
              <div className="count-item-slush">
                <span className="count-num-slush">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="count-label-slush">{t('hero.hours')}</span>
              </div>
              <div className="count-item-slush">
                <span className="count-num-slush">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="count-label-slush">{t('hero.minutes')}</span>
              </div>
              <div className="count-item-slush">
                <span className="count-num-slush">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="count-label-slush">{t('hero.seconds')}</span>
              </div>
            </div>

            <div className="hero-actions-slush">
              <button 
                className="btn-ws-primary"
                onClick={() => onOpenModal && onOpenModal('Забронировать стенд')}
              >
                {t('hero.bookStand')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
