import React from 'react';
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

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <HeroSection />
        <QuoteSection />
        <AboutSection />
        <ThematicZones />
        <WhyParticipate />
        <ReviewsSection />
        <WaysToParticipate />
        <PartnersInvite />
        <BadgeSection />
        <LogosSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
