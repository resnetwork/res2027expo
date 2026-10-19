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
import LogosSection from './components/LogosSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

import PolicyPage from './components/PolicyPage';
import OfertaPage from './components/OfertaPage';
import LocationSection from './components/LocationSection';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState('Забронировать стенд');
  const [modalArea, setModalArea] = useState('');
  
  const currentPath = window.location.pathname;

  const handleOpenModal = (option = 'Забронировать стенд', area = '') => {
    setModalOption(option);
    setModalArea(area);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    const hash = (window.location.hash || '').toLowerCase();
    if (
      hash === '#bookstand' ||
      hash.startsWith('#bookstand') ||
      hash === '#book-stand' ||
      hash.startsWith('#book-stand') ||
      hash === '#stand' ||
      hash === '#booking'
    ) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
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
        params.has('bookstand') ||
        params.get('modal') === 'bookstand' ||
        params.get('modal') === 'stand';

      if (isStandHash) {
        setModalOption('Забронировать стенд');
        if (areaParam) setModalArea(areaParam);
        setIsModalOpen(true);
      }
    };

    checkHashAndParams();
    window.addEventListener('hashchange', checkHashAndParams);
    window.addEventListener('popstate', checkHashAndParams);
    return () => {
      window.removeEventListener('hashchange', checkHashAndParams);
      window.removeEventListener('popstate', checkHashAndParams);
    };
  }, []);

  if (currentPath === '/policy') {
    return (
      <>
        <PolicyPage onOpenModal={handleOpenModal} />
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialOption={modalOption}
          initialArea={modalArea}
        />
      </>
    );
  }

  if (currentPath === '/oferta') {
    return (
      <>
        <OfertaPage onOpenModal={handleOpenModal} />
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialOption={modalOption}
          initialArea={modalArea}
        />
      </>
    );
  }

  return (
    <div className="app-container">
      <Header onOpenModal={handleOpenModal} />
      <main>
        <HeroSection onOpenModal={handleOpenModal} />
        <QuoteSection />
        <AboutSection />
        <PastEventSection />
        <ThematicZones />
        <SpeakersSection />
        <WhyParticipate />
        <ReviewsSection />
        <WaysToParticipate />
        <BadgeSection />
        <PartnersInvite />
        <LogosSection />
        <NewsSection />
        <LocationSection />
      </main>
      <Footer onOpenModal={handleOpenModal} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialOption={modalOption}
        initialArea={modalArea}
      />
    </div>
  );
}

export default App;
