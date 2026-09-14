import React from 'react';
import './Sections.css';

const BadgeSection = () => {
  return (
    <section className="badge-section bg-white">
      <div className="container">
        <div className="badge-wrapper">
          <div className="badge-pill">
            <h3 className="badge-text">
              МЫ — ОБЛАДАТЕЛИ ЗОЛОТОГО ЗНАЧКА SMART PLASTIC ZONE: ПОДТВЕРЖДЁННАЯ ЭКОЛОГИЧЕСКАЯ ОТВЕТСТВЕННОСТЬ
            </h3>
          </div>
          <img 
            src="/badge.png" 
            alt="Smart Plastic Zone Gold" 
            className="badge-img"
          />
        </div>
      </div>
    </section>
  );
};

export default BadgeSection;
