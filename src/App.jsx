import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BadgeSection from './components/BadgeSection';
import QuoteSection from './components/QuoteSection';
import AboutSection from './components/AboutSection';
import ThematicZones from './components/ThematicZones';
import WhyParticipate from './components/WhyParticipate';
import WaysToParticipate from './components/WaysToParticipate';
import ReviewsSection from './components/ReviewsSection';
import PartnersInvite from './components/PartnersInvite';
import LogosSection from './components/LogosSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState('Забронировать стенд');

  const handleOpenModal = (option = 'Забронировать стенд') => {
    setModalOption(option);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <Header onOpenModal={handleOpenModal} />
      <main>
        <HeroSection onOpenModal={handleOpenModal} />
        <QuoteSection />
        <AboutSection />
        <ThematicZones />
        <WhyParticipate />
        <ReviewsSection />
        <WaysToParticipate />
        <BadgeSection />
        <PartnersInvite />
        <LogosSection />
        <NewsSection />
      </main>
      <Footer onOpenModal={handleOpenModal} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialOption={modalOption}
      />
    </div>
  );
}

export default App;
