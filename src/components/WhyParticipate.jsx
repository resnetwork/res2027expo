import React from 'react';
import { Users, LayoutGrid, Handshake, Rocket } from 'lucide-react';
import './Participate.css';

const WhyParticipate = () => {
  const reasons = [
    { icon: <Users size={40} />, title: '20 000+ ПОСЕТИТЕЛЕЙ', desc: 'Лица, принимающие решения: государство, инвесторы, крупный бизнес и международные институты.' },
    { icon: <LayoutGrid size={40} />, title: '8 ТЕМАТИЧЕСКИХ ЗОН', desc: 'Энергетика, ESG, водные технологии, агротехнологии, циркулярная экономика, AI и другие направления.' },
    { icon: <Handshake size={40} />, title: 'ДОСТУП К ИНВЕСТОРАМ', desc: 'Переговоры с лицами, принимающими решения. Возможность включения в международные проекты.' },
    { icon: <Rocket size={40} />, title: 'НОВЫЕ ПАРТНЕРСТВА', desc: 'Запуск совместных инициатив и укрепление позиций компании в международной повестке устойчивого развития.' }
  ];

  return (
    <section className="why-participate section-padding bg-green" id="participate">
      <div className="why-overlay"></div>
      <div className="container" style={{position: 'relative', zIndex: 2}}>
        <h2 className="section-title text-inverse">ПОЧЕМУ СТОИТ УЧАСТВОВАТЬ</h2>
        <p className="section-subtitle" style={{color: '#ccc', marginBottom: '4rem'}}>
          Будущее устойчивой экономики формируется здесь - в RES 2027 EXPO
        </p>
        
        <div className="grid-4 text-center">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{r.icon}</div>
              <h4 className="why-title text-inverse">{r.title}</h4>
              <p className="why-desc text-inverse">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyParticipate;
