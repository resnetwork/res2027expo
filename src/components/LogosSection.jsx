import React, { useState } from 'react';
import './LogosSection.css';

const LogosCategory = ({ title, count }) => {
  const [showAll, setShowAll] = useState(false);
  const logos = Array(count).fill(0);
  const visibleLogos = showAll ? logos : logos.slice(0, 12);

  return (
    <div className="logos-category">
      <h3 className="category-title" style={{color: 'var(--bg-dark-green)', fontWeight: 800, textTransform: 'uppercase'}}>{title}</h3>
      <div className="grid-6 logos-grid">
        {visibleLogos.map((_, idx) => (
          <div key={idx} className="logo-card" style={{border: '1px solid #eee', background: 'white'}}>
            <span className="logo-placeholder">Logo {idx + 1}</span>
          </div>
        ))}
      </div>
      {logos.length > 12 && (
        <button 
          className="btn btn-outline show-more-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Скрыть' : `Показать еще (${logos.length - 12})`}
        </button>
      )}
    </div>
  );
};

const LogosSection = () => {
  return (
    <section className="logos-section section-padding bg-light-gray">
      <div className="container">
        <LogosCategory title="ОНИ БЫЛИ НАШИМИ ОРГАНИЗАТОРАМИ" count={2} />
        <LogosCategory title="ОНИ БЫЛИ НАШИМИ GOLDEN СПОНСОРАМИ" count={8} />
        <LogosCategory title="ОНИ БЫЛИ НАШИМИ BRONZE СПОНСОРАМИ" count={4} />
        <LogosCategory title="ЭКСКЛЮЗИВНЫЕ ЭКО-ПАРТНЕРЫ" count={1} />
        {/* Added a big category to test the "Show More" functionality as requested */}
        <LogosCategory title="ИНФОРМАЦИОННЫЕ ПАРТНЕРЫ" count={18} />
      </div>
    </section>
  );
};

export default LogosSection;
