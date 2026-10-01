import React from 'react';
import { Leaf, Droplet, Cpu, Recycle, ShieldCheck, Banknote, Tractor, Building2 } from 'lucide-react';
import './Sections.css';
import { useLanguage } from '../contexts/LanguageContext';

const ThematicZones = () => {
  const { t } = useLanguage();
  const zonesText = t('thematic.zones') || [];
  const zones = [
    { iconImage: '/zones/energy.png', title: zonesText[0]?.title, desc: zonesText[0]?.desc },
    { iconImage: '/zones/water.png', title: zonesText[1]?.title, desc: zonesText[1]?.desc },
    { iconImage: '/zones/ai.png', title: zonesText[2]?.title, desc: zonesText[2]?.desc },
    { iconImage: '/zones/waste.png', title: zonesText[3]?.title, desc: zonesText[3]?.desc },
    { iconImage: '/zones/eco.png', title: zonesText[4]?.title, desc: zonesText[4]?.desc },
    { iconImage: '/zones/esg.png', title: zonesText[5]?.title, desc: zonesText[5]?.desc },
    { iconImage: '/zones/agro.png', title: zonesText[6]?.title, desc: zonesText[6]?.desc },
    { iconImage: '/zones/build.png', title: zonesText[7]?.title, desc: zonesText[7]?.desc },
  ];

  return (
    <section className="thematic-zones bg-green" id="zones" style={{ padding: '3rem 0 4rem 0', background: "linear-gradient(180deg, #12453a 0%, #18584b 100%)" }}>
      <div className="container">
        <h2 className="section-title" style={{ color: 'var(--text-yellow)', marginBottom: '0.5rem', fontSize: '2.5rem' }}>{t('thematic.title')}</h2>
        <p className="section-subtitle" style={{ color: 'white', marginBottom: '2rem', fontWeight: 400, fontSize: '1.2rem' }}>
          {t('thematic.subtitle')}
        </p>

        <div className="grid-4 mobile-carousel" style={{ gap: '1.5rem' }}>
          {zones.map((zone, index) => (
            <div key={index} className="zone-card-light" style={{ padding: '1.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="zone-icon-green" style={{ marginBottom: '1rem', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {zone.iconImage ? (
                  <img src={zone.iconImage} alt={zone.title} style={{ width: '110px', height: '110px', objectFit: 'contain' }} />
                ) : (
                  zone.icon
                )}
              </div>
              <h3 className="zone-title-light" style={{ fontSize: '1rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{zone.title}</h3>
              <p className="zone-desc-light" style={{ fontSize: '0.85rem', lineHeight: 1.4, margin: 0, textAlign: 'center', color: '#555' }}>{zone.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThematicZones;
