import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, FileText, ExternalLink } from 'lucide-react';
import './PastEventSection.css';
import { useLanguage } from '../contexts/LanguageContext';

const PastEventSection = () => {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [scale, setScale] = useState(0.75);
  const iframeRef = useRef(null);
  const cardRef = useRef(null);
  const hasStartedPlaying = useRef(false);

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

  const reportUrl = 'https://drive.google.com/file/d/1qOGnpm9-26V8-SQrBwGDMst7UXKJFlqo/view?usp=drive_link';

  return (
    <section className="past-event-section" id="past-event">
      <div className="container">
        
        {/* Title */}
        <h2 className="section-title past-event-heading">
          {t('pastEvent.title')}
        </h2>

        {/* Video Player Card (Clean video player, zero YouTube UI, 1080p) */}
        <div className="past-event-player-wrapper">
          <div className="past-event-video-card" ref={cardRef}>
            
            {/* Scaled 1920x1080 iframe hiding YouTube chrome/watermark while forcing 1080p */}
            <div className="past-event-scale-wrapper">
              <iframe
                ref={iframeRef}
                width="1920"
                height="1080"
                src="https://www.youtube.com/embed/znMwr3uSecU?autoplay=1&mute=1&loop=1&playlist=znMwr3uSecU&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0&vq=hd1080"
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

        {/* Framed Report Card */}
        <div className="past-event-report-card">
          <div className="report-card-left">
            <div className="report-icon-wrapper">
              <FileText size={28} className="report-icon" />
            </div>
            <div className="report-text-block">
              <h3 className="report-card-heading">{t('pastEvent.reportHeading')}</h3>
              <p className="report-card-subtitle">{t('pastEvent.subtitle')}</p>
            </div>
          </div>

          <div className="report-card-right">
            <a 
              href={reportUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-ws-primary past-event-action-btn"
            >
              <span>{t('pastEvent.button')}</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PastEventSection;
