import React from 'react';
import { Leaf, Droplet, Cpu, Recycle, ShieldCheck, Banknote, Tractor, Building2 } from 'lucide-react';
import './Sections.css';

const ThematicZones = () => {
  const zones = [
    { iconImage: '/zones/energy.png', title: 'НОВАЯ ЭНЕРГИЯ', desc: 'Решения для перехода к низкоуглеродной экономике' },
    { iconImage: '/zones/water.png', title: 'ВОДА', desc: 'Эффективное орошение, фильтрация и повторное использование' },
    { iconImage: '/zones/ai.png', title: 'ИИ И УМНЫЙ ГОРОД', desc: 'Решения для энергоэффективных и цифровых городов' },
    { iconImage: '/zones/waste.png', title: 'УПРАВЛЕНИЕ ОТХОДАМИ', desc: 'Новые решения для эффективного использования ресурсов' },
    { iconImage: '/zones/eco.png', title: 'ЭКОЛОГИЧНЫЕ ТЕХНОЛОГИИ', desc: 'Улавливание углерода и адаптация к климатическим изменениям' },
    { iconImage: '/zones/esg.png', title: 'ESG И ЗЕЛЕНЫЕ ФИНАНСЫ', desc: 'Инвестиции и практики для перехода к экологичной экономике' },
    { iconImage: '/zones/agro.png', title: 'СЕЛЬСКОЕ ХОЗЯЙСТВО', desc: 'Технологии точного земледелия и устойчивого производства' },
    { iconImage: '/zones/build.png', title: 'ЗЕЛЕНОЕ СТРОИТЕЛЬСТВО', desc: 'Природные решения для сохранения и восстановления экоресурсов' },
  ];

  return (
    <section className="thematic-zones bg-green" id="zones" style={{ padding: '3rem 0 4rem 0', background: "linear-gradient(180deg, #12453a 0%, #18584b 100%)" }}>
      <div className="container">
        <h2 className="section-title" style={{ color: 'var(--text-yellow)', marginBottom: '0.5rem', fontSize: '2.5rem' }}>ТЕМАТИЧЕСКИЕ ЗОНЫ</h2>
        <p className="section-subtitle" style={{ color: 'white', marginBottom: '2rem', fontWeight: 400, fontSize: '1.2rem' }}>
          Каждая зона - новая идея для <span style={{ color: 'var(--text-yellow)', fontWeight: 700 }}>зелёного будущего</span>
        </p>

        <div className="grid-4" style={{ gap: '1.5rem' }}>
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
