import React from 'react';
import { Presentation, DollarSign, Briefcase, Handshake, Users } from 'lucide-react';
import './Participate.css';

const WaysToParticipate = () => {
  const ways = [
    { icon: <Presentation size={30} />, title: 'УЧАСТИЕ СО\nСТЕНДОМ' },
    { icon: <DollarSign size={30} />, title: 'СПОНСОРСКОЕ\nУЧАСТИЕ' },
    { icon: <Briefcase size={30} />, title: 'УЧАСТИЕ В ДЕЛОВОЙ\nПРОГРАММЕ' },
    { icon: <Handshake size={30} />, title: 'ПАРТНЕРСТВО' },
    { icon: <Users size={30} />, title: 'ДЕЛЕГАТСКОЕ\nУЧАСТИЕ' }
  ];

  return (
    <section className="ways-to-participate section-padding bg-white" style={{paddingBottom: '2.5rem'}}>
      <div className="container text-center">
        <h2 className="section-title" style={{color: 'var(--bg-dark-green)'}}>СПОСОБЫ УЧАСТИЯ</h2>

        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem'}}>
          {ways.map((way, index) => (
            <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', minWidth: '90px'}}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'var(--bg-dark-green)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '0.75rem'
              }}>
                {way.icon}
              </div>
              <h4 style={{color: 'var(--bg-dark-green)', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'pre-line', textTransform: 'uppercase', lineHeight: '1.2'}}>
                {way.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaysToParticipate;
