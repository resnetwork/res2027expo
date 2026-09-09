import React from 'react';
import './Sections.css';

const AboutSection = () => {
  return (
    <section className="about-section section-padding bg-green" id="about">
      <div className="container">
        <h2 className="section-title">О ВЫСТАВКЕ</h2>
        <p className="section-subtitle" style={{color: 'white', maxWidth: '1000px'}}>
          Главная задача <strong>RES 2027 EXPO</strong> - объединить государства, бизнес, научное сообщество и международные организации вокруг общей цели: <strong>перехода к экологически ответственному развитию и зеленой экономике.</strong> Выставка призвана стать точкой соприкосновения стратегических решений и практических действий, где глобальные экологические вызовы трансформируются в конкретные технологии, проекты и инвестиции.
        </p>

        <div className="stats-grid-about">
          <div className="stat-card-about">
            <div className="stat-number-about">20 000+</div>
            <div className="stat-label-about">посетителей</div>
          </div>
          <div className="stat-card-about">
            <div className="stat-number-about">300+</div>
            <div className="stat-label-about">участников</div>
          </div>
          <div className="stat-card-about">
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
