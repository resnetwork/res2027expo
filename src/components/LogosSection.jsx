import React, { useState } from 'react';
import './LogosSection.css';
import partnerData from '../data/partner_logos.json';

const LogosCategory = ({ category }) => {
  const { name, logos } = category;
  const [showAll, setShowAll] = useState(false);

  // Layout type
  let layoutClass = 'logos-grid-multi';
  if (name === 'ОРГАНИЗАТОРЫ') layoutClass = 'logos-row-organizers';
  else if (logos.length <= 2) layoutClass = 'logos-row-single';
  else if (name === 'GOLDEN SPONSOR') layoutClass = 'logos-row-golden';
  else if (name === 'BRONZE SPONSOR') layoutClass = 'logos-row-bronze';
  else if (name === 'VIP LOUNGE SPONSOR') layoutClass = 'logos-row-vip';
  else if (name === 'OFFICIAL PARTNER') layoutClass = 'logos-grid-official';
  else if (name === 'ECO-SYSTEM ПАРТНЕРЫ' || name === 'Участники' || name.includes('Медиа')) layoutClass = 'logos-grid-5col';

  const isGrid = layoutClass.startsWith('logos-grid');
  // 2 rows initially: 10 logos for 5-col grid, 12 logos for 6-col grid
  const initialCount = layoutClass === 'logos-grid-5col' ? 10 : 12;
  const visibleLogos = (isGrid && logos.length > initialCount && !showAll)
    ? logos.slice(0, initialCount)
    : logos;

  return (
    <div className="logos-category">
      <h3 className="category-title">{name}</h3>
      <div className={layoutClass}>
        {visibleLogos.map((logo, idx) => (
          <div key={idx} className="logo-card">
            {logo.url && logo.url !== '#' ? (
              <a href={logo.url} target="_blank" rel="noopener noreferrer">
                <img src={logo.image} alt={`${name} ${idx + 1}`} loading="lazy" />
              </a>
            ) : (
              <img src={logo.image} alt={`${name} ${idx + 1}`} loading="lazy" />
            )}
          </div>
        ))}
      </div>
      {isGrid && logos.length > initialCount && (
        <button className="show-more-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Скрыть' : 'Показать еще'}
        </button>
      )}
    </div>
  );
};

const LogosSection = () => (
  <section className="logos-section section-padding" id="logos">
    <div className="logos-container">
      {partnerData.map((category, i) => (
        <LogosCategory key={i} category={category} />
      ))}
    </div>
  </section>
);

export default LogosSection;
