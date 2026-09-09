import React from 'react';
import { Leaf, Droplet, Cpu, Recycle, ShieldCheck, Banknote, Tractor, Building2 } from 'lucide-react';
import './Sections.css';

const ThematicZones = () => {
  const zones = [
    { icon: <Leaf size={40} />, title: 'НОВАЯ ЭНЕРГИЯ', desc: 'Решения для перехода к низкоуглеродной экономике' },
    { icon: <Droplet size={40} />, title: 'ВОДА', desc: 'Эффективное орошение, фильтрация и повторное использование' },
    { icon: <Cpu size={40} />, title: 'ИИ И УМНЫЙ ГОРОД', desc: 'Решения для энергоэффективных и цифровых городов' },
    { icon: <Recycle size={40} />, title: 'УПРАВЛЕНИЕ ОТХОДАМИ', desc: 'Новые решения для эффективного использования ресурсов' },
    { icon: <ShieldCheck size={40} />, title: 'ЭКОЛОГИЧНЫЕ ТЕХНОЛОГИИ', desc: 'Улавливание углерода и адаптация к климатическим изменениям' },
    { icon: <Banknote size={40} />, title: 'ESG И ЗЕЛЕНЫЕ ФИНАНСЫ', desc: 'Инвестиции и практики для перехода к экологичной экономике' },
    { icon: <Tractor size={40} />, title: 'СЕЛЬСКОЕ ХОЗЯЙСТВО', desc: 'Технологии точного земледелия и устойчивого производства' },
    { icon: <Building2 size={40} />, title: 'ЗЕЛЕНОЕ СТРОИТЕЛЬСТВО', desc: 'Природные решения для сохранения и восстановления экоресурсов' },
  ];

  return (
    <section className="thematic-zones section-padding bg-green" id="zones">
      <div className="container">
        <h2 className="section-title text-yellow">ТЕМАТИЧЕСКИЕ ЗОНЫ</h2>
        <p className="section-subtitle text-inverse">
          Каждая зона - новая идея для <span className="text-yellow">зеленого будущего</span>
        </p>

        <div className="grid-4">
          {zones.map((zone, index) => (
            <div key={index} className="zone-card-light">
              <div className="zone-icon-green">{zone.icon}</div>
              <h3 className="zone-title-light">{zone.title}</h3>
              <p className="zone-desc-light">{zone.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThematicZones;
