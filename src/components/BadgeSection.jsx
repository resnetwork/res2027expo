import React from 'react';
import './Sections.css';

const BadgeSection = () => {
  return (
    <section className="badge-section bg-white" style={{ padding: '3rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            backgroundColor: '#18584b', 
            borderRadius: '50px', 
            padding: '1.5rem 3rem 1.5rem 8rem', 
            width: '100%', 
            marginLeft: '40px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ 
              color: 'white', 
              margin: 0, 
              fontSize: '1.1rem', 
              textTransform: 'uppercase', 
              textAlign: 'center',
              fontWeight: 700,
              lineHeight: 1.4
            }}>
              МЫ — ОБЛАДАТЕЛИ ЗОЛОТОГО ЗНАЧКА SMART PLASTIC ZONE: ПОДТВЕРЖДЁННАЯ ЭКОЛОГИЧЕСКАЯ ОТВЕТСТВЕННОСТЬ
            </h3>
          </div>
          <img 
            src="/badge.png" 
            alt="Smart Plastic Zone Gold" 
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              width: '130px', 
              height: '130px',
              zIndex: 2,
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))'
            }} 
          />
        </div>
      </div>
    </section>
  );
};

export default BadgeSection;
