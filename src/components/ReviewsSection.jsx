import React from 'react';
import './Participate.css';

const ReviewsSection = () => {
  const reviews = [
    { 
      name: 'Ергулан Талгатович Дуйсекеев', 
      title: 'Руководитель Фонда "Global Nature Initiatives"', 
      text: '«Региональный экологический саммит 2026 является одной из ключевых международных платформ для принятия реальных решений в сфере экологии, климата и устойчивого развития, способных менять экологическую ситуацию в регионе. Для меня принципиально важно, что Казахстан сегодня является центром «зелёной» трансформации Центральной Азии, объединяя государства, бизнес и инвесторов вокруг будущего, которое формируется уже сейчас.»' 
    },
    { 
      name: 'Кабдолданов Нуржан Кенесбаевич', 
      title: 'Заместитель Председателя Правления АО "Жасыл Даму"', 
      text: '"Это будет масштабное мероприятие, объединяющее шесть глав государств стран Центральной Азии. Запланированы крупные панельные сессии на высоком уровне с участием представителей правительств, профильных министерств и ведущих международных партнёров. Выставка предоставит возможность странам Центральной Азии объединиться для обмена технологиями, опытом и передовыми знаниями."' 
    },
    { 
      name: 'Якупбаева Юлия Константиновна', 
      title: 'Председатель совета...', 
      text: '"Региональный экологический саммит Центральной Азии - это стратегическая платформа для объединения усилий бизнеса и международных партнеров для практических решений экологических проблем региона. Проведение саммита в Астане подчёркивает роль Казахстана как активного участника формирования устойчивой экологической повестки и продвижения зелёных технологий."' 
    }
  ];

  return (
    <section className="reviews-section section-padding bg-green">
      <div className="container">
        <h2 className="section-title text-inverse" style={{textAlign: 'center', marginBottom: '3rem'}}>ОТЗЫВЫ УЧАСТНИКОВ И ПАРТНЕРОВ</h2>
        <div className="grid-3">
          {reviews.map((rev, i) => (
            <div key={i} className="review-card" style={{background: 'white', borderRadius: '20px', padding: '2rem'}}>
              <div className="review-author" style={{marginBottom: '1.5rem', alignItems: 'flex-start'}}>
                <div style={{width: '60px', height: '60px', borderRadius: '50%', background: '#eee', flexShrink: 0}}></div>
                <div>
                  <div style={{fontWeight: 700, color: 'var(--bg-dark-green)', fontSize: '1.1rem', marginBottom: '0.5rem'}}>{rev.name}</div>
                  <div style={{fontSize: '0.85rem', color: '#666', lineHeight: 1.4}}>{rev.title}</div>
                </div>
              </div>
              <p className="review-quote" style={{color: 'var(--accent-light)', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.6}}>
                {rev.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
