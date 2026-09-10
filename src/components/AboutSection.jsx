import React from 'react';
import './Sections.css';

const AboutSection = () => {
  return (
    <section className="about-section section-padding" id="about" style={{ background: "linear-gradient(180deg, #18584b 0%, #12453a 100%)" }}>
      <div className="container">
        <h2 className="section-title" style={{ color: 'white' }}>О ВЫСТАВКЕ</h2>
        <p className="section-subtitle" style={{color: 'white', maxWidth: '1000px'}}>
          Главная задача <strong>RES 2026 EXPO</strong> - объединить государства, бизнес, научное сообщество и международные организации вокруг общей цели: <strong>перехода к экологически ответственному развитию и зеленой экономике.</strong> Выставка призвана стать точкой соприкосновения стратегических решений и практических действий, где глобальные экологические вызовы трансформируются в конкретные технологии, проекты и инвестиции.
        </p>

        <div className="stats-grid-about" style={{ position: 'relative', zIndex: 2 }}>
          <div className="stat-card-about" style={{ position: 'relative' }}>
            <div className="stat-number-about">20 000+</div>
            <div className="stat-label-about">посетителей</div>
            <div className="stat-badge" style={{ position: 'absolute', left: 'calc(100% + 1rem)', top: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#18584b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10, fontSize: '1.2rem' }}>+</div>
          </div>
          <div className="stat-card-about" style={{ position: 'relative' }}>
            <div className="stat-number-about">300+</div>
            <div className="stat-label-about">участников</div>
            <div className="stat-badge" style={{ position: 'absolute', left: 'calc(100% + 1rem)', top: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#18584b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10, fontSize: '0.9rem' }}>ИЗ</div>
            <div className="stat-badge" style={{ position: 'absolute', left: '50%', top: 'calc(100% + 1rem)', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#18584b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10, fontSize: '0.9rem' }}>НА</div>
          </div>
          <div className="stat-card-about" style={{ position: 'relative' }}>
            <div className="stat-number-about">30+</div>
            <div className="stat-label-about">стран</div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
           <div className="stat-card-about" style={{width: '100%', maxWidth: '600px'}}>
              <div className="stat-number-about">12 000 М2</div>
              <div className="stat-label-about">площадь экспозиции</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
