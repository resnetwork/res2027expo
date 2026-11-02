import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BadgeSection from './components/BadgeSection';
import QuoteSection from './components/QuoteSection';
import AboutSection from './components/AboutSection';
import ThematicZones from './components/ThematicZones';
import PastEventSection from './components/PastEventSection';
import SpeakersSection from './components/SpeakersSection';
import WhyParticipate from './components/WhyParticipate';
import WaysToParticipate from './components/WaysToParticipate';
import ReviewsSection from './components/ReviewsSection';
import PartnersInvite from './components/PartnersInvite';
import StartupCompetitionSection from './components/StartupCompetitionSection';
import LogosSection from './components/LogosSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';

import ParticipationPage from './components/ParticipationPage';
import VisitorRegistrationModal from './components/VisitorRegistrationModal';

import PolicyPage from './components/PolicyPage';
import OfertaPage from './components/OfertaPage';
import LocationSection from './components/LocationSection';
import GalleryPage from './components/GalleryPage';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { language, setLanguage } = useLanguage();
  const [isStandPage, setIsStandPage] = useState(false);
  const [isGalleryPage, setIsGalleryPage] = useState(false);
  const [standArea, setStandArea] = useState('');
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  
  const currentPath = window.location.pathname;

  const handleOpenGallery = () => {
    setIsGalleryPage(true);
    setIsStandPage(false);
    setIsVisitorModalOpen(false);
    const langSuffix = language === 'kk' ? 'kk' : language === 'en' ? 'en' : language === 'zh' ? 'zh' : 'ru';
    window.location.hash = `#gallery${langSuffix}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseGallery = () => {
    setIsGalleryPage(false);
    const cleanUrl = window.location.pathname === '/gallery' ? '/' : window.location.pathname + window.location.search;
    window.history.pushState(null, '', cleanUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStand = (area = '') => {
    if (area) setStandArea(area);
    setIsStandPage(true);
    setIsGalleryPage(false);
    setIsVisitorModalOpen(false);
    const langSuffix = language === 'kk' ? 'kk' : language === 'en' ? 'en' : language === 'zh' ? 'zh' : 'ru';
    window.location.hash = `#bookstand${langSuffix}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseStand = () => {
    setIsStandPage(false);
    // Remove #bookstand from URL without page reload
    const cleanUrl = window.location.pathname + window.location.search;
    window.history.pushState(null, '', cleanUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVisitor = () => {
    setIsVisitorModalOpen(true);
    const langSuffix = language === 'kk' ? 'kk' : language === 'en' ? 'en' : language === 'zh' ? 'zh' : 'ru';
    window.location.hash = `#registration${langSuffix}`;
  };

  const handleCloseVisitor = () => {
    setIsVisitorModalOpen(false);
    const hash = (window.location.hash || '').toLowerCase();
    if (
      hash === '#registration' ||
      hash.startsWith('#registration') ||
      hash === '#visitor' ||
      hash === '#preregistration'
    ) {
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, '', cleanUrl);
    }
  };

  useEffect(() => {
    const checkHashAndParams = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const search = window.location.search;
      const params = new URLSearchParams(search);

      // Check if area was specified in query or hash (e.g. #bookstand?area=18 or #bookstand&area=18)
      let areaParam = params.get('area') || '';
      if (!areaParam && hash.includes('area=')) {
        const match = hash.match(/area=([0-9.]+)/i);
        if (match) areaParam = match[1];
      }

      const isStandHash =
        hash === '#bookstand' ||
        hash.startsWith('#bookstand') ||
        hash === '#book-stand' ||
        hash.startsWith('#book-stand') ||
        hash === '#stand' ||
        hash === '#booking' ||
        currentPath === '/bookstand' ||
        params.has('bookstand') ||
        params.get('modal') === 'bookstand' ||
        params.get('modal') === 'stand';

      const isGalleryHash =
        hash === '#gallery' ||
        hash.startsWith('#gallery') ||
        currentPath === '/gallery' ||
        params.has('gallery');

      const isVisitorHash =
        hash === '#registration' ||
        hash.startsWith('#registration') ||
        hash === '#visitor' ||
        hash === '#preregistration';

      if (isStandHash) {
        if (hash.includes('bookstandru')) {
          setLanguage('ru');
        } else if (hash.includes('bookstandkk') || hash.includes('bookstandkz')) {
          setLanguage('kk');
        } else if (hash.includes('bookstanden')) {
          setLanguage('en');
        } else if (hash.includes('bookstandzh') || hash.includes('bookstandcn')) {
          setLanguage('zh');
        }

        if (areaParam) setStandArea(areaParam);
        setIsStandPage(true);
        setIsGalleryPage(false);
        setIsVisitorModalOpen(false);
      } else {
        setIsStandPage(false);
      }

      if (isGalleryHash) {
        if (hash.includes('galleryru')) {
          setLanguage('ru');
        } else if (hash.includes('gallerykk') || hash.includes('gallerykz')) {
          setLanguage('kk');
        } else if (hash.includes('galleryen')) {
          setLanguage('en');
        } else if (hash.includes('galleryzh') || hash.includes('gallerycn')) {
          setLanguage('zh');
        }
        setIsGalleryPage(true);
        setIsStandPage(false);
        setIsVisitorModalOpen(false);
      } else {
        setIsGalleryPage(false);
      }

      if (isVisitorHash) {
        if (hash.includes('registrationru')) {
          setLanguage('ru');
        } else if (hash.includes('registrationkk') || hash.includes('registrationkz')) {
          setLanguage('kk');
        } else if (hash.includes('registrationen')) {
          setLanguage('en');
        } else if (hash.includes('registrationzh') || hash.includes('registrationcn')) {
          setLanguage('zh');
        }
        setIsVisitorModalOpen(true);
      } else if (!isStandHash && !isGalleryHash) {
        setIsVisitorModalOpen(false);
      }
    };

    checkHashAndParams();
    window.addEventListener('hashchange', checkHashAndParams);
    window.addEventListener('popstate', checkHashAndParams);
    return () => {
      window.removeEventListener('hashchange', checkHashAndParams);
      window.removeEventListener('popstate', checkHashAndParams);
    };
  }, [currentPath]);

  // Policy Page
  if (currentPath === '/policy') {
    return (
      <>
        <PolicyPage
          onOpenModal={handleOpenStand}
          onOpenStand={handleOpenStand}
          onOpenVisitor={handleOpenVisitor}
        />
        <VisitorRegistrationModal
          isOpen={isVisitorModalOpen}
          onClose={handleCloseVisitor}
        />
      </>
    );
  }

  // Oferta Page
  if (currentPath === '/oferta') {
    return (
      <>
        <OfertaPage
          onOpenModal={handleOpenStand}
          onOpenStand={handleOpenStand}
          onOpenVisitor={handleOpenVisitor}
        />
        <VisitorRegistrationModal
          isOpen={isVisitorModalOpen}
          onClose={handleCloseVisitor}
        />
      </>
    );
  }

  // Dedicated Gallery Full Page (#gallery or /gallery)
  if (isGalleryPage) {
    return (
      <>
        <GalleryPage
          onBackToHome={handleCloseGallery}
          onOpenModal={handleOpenStand}
          onOpenStand={handleOpenStand}
          onOpenVisitor={handleOpenVisitor}
        />
        <VisitorRegistrationModal
          isOpen={isVisitorModalOpen}
          onClose={handleCloseVisitor}
        />
      </>
    );
  }

  // Dedicated Participation / Stand Booking Full Page (#bookstand or /bookstand)
  if (isStandPage) {
    return (
      <>
        <ParticipationPage
          onBackToHome={handleCloseStand}
          initialArea={standArea}
        />
        <VisitorRegistrationModal
          isOpen={isVisitorModalOpen}
          onClose={handleCloseVisitor}
        />
      </>
    );
  }

  // Main Landing Page
  return (
    <div className="app-container">
      <Header
        onOpenModal={handleOpenStand}
        onOpenStand={handleOpenStand}
        onOpenVisitor={handleOpenVisitor}
      />
      <main>
        <HeroSection
          onOpenModal={handleOpenStand}
          onOpenStand={handleOpenStand}
          onOpenVisitor={handleOpenVisitor}
        />
        <QuoteSection />
        <AboutSection />
        <PastEventSection onOpenGallery={handleOpenGallery} />
        <ThematicZones />
        <SpeakersSection />
        <WhyParticipate />
        <ReviewsSection />
        <WaysToParticipate />
        <BadgeSection />
        <PartnersInvite />
        <StartupCompetitionSection onOpenStand={handleOpenStand} />
        <LogosSection />
        <NewsSection />
        <LocationSection />
      </main>
      <Footer
        onOpenModal={handleOpenStand}
        onOpenStand={handleOpenStand}
        onOpenVisitor={handleOpenVisitor}
      />

      <VisitorRegistrationModal
        isOpen={isVisitorModalOpen}
        onClose={handleCloseVisitor}
      />
    </div>
  );
}

export default App;
