import React from 'react';
import { Presentation, DollarSign, Briefcase, Handshake, Users } from 'lucide-react';
import './Participate.css';

const WaysToParticipate = () => {
  const ways = [
    { icon: <Presentation size={40} />, title: 'УЧАСТИЕ СО\nСТЕНДОМ' },
    { icon: <DollarSign size={40} />, title: 'СПОНСОРСКОЕ\nУЧАСТИЕ' },
    { icon: <Briefcase size={40} />, title: 'УЧАСТИЕ В ДЕЛОВОЙ\nПРОГРАММЕ' },
    { icon: <Handshake size={40} />, title: 'ПАРТНЕРСТВО' },
    { icon: <Users size={40} />, title: 'ДЕЛЕГАТСКОЕ\nУЧАСТИЕ' }
  ];

  return (
    <>
      <section className="ways-to-participate section-padding bg-white" style={{paddingBottom: '3rem'}}>
        <div className="container text-center">
          <h2 className="section-title" style={{color: 'var(--bg-dark-green)'}}>СПОСОБЫ УЧАСТИЯ</h2>

          <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '4rem'}}>
            {ways.map((way, index) => (
              <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '160px'}}>
                <div style={{
                  width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--bg-dark-green)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '1.5rem'
                }}>
                  {way.icon}
                </div>
                <h4 style={{color: 'var(--bg-dark-green)', fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'pre-line'}}>
                  {way.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="running-line" style={{background: 'var(--text-yellow)', color: 'var(--bg-dark-green)', padding: '1rem 0', fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap'}}>
        <span style={{paddingRight: '2rem'}}>Каждая зона - шаг к зелёному будущему! - Every zone is a step toward a green future!</span>
        <span style={{paddingRight: '2rem'}}>Каждая зона - шаг к зелёному будущему! - Every zone is a step toward a green future!</span>
        <span style={{paddingRight: '2rem'}}>Каждая зона - шаг к зелёному будущему! - Every zone is a step toward a green future!</span>
      </div>
    </>
  );
};

export default WaysToParticipate;
