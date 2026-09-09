import React from 'react';
import './NewsSection.css';

const NewsSection = () => {
  const news = [
    { 
      title: 'Фонд Булата Утемуратова поддержал проект газификации Алматы', 
      desc: 'Фонд Булата Утемуратова оказал благотворительную помощь в размере 460 млн тенге для реализации социально значимого проекта по газификации жилых домов города Алматы.' 
    },
    { 
      title: 'Казахмыс усиливает ESG-трансформацию и экологические инициативы', 
      desc: 'Корпорация Казахмыс продолжает внедрять принципы устойчивого развития, объединяя экологию, социальную ответственность и прозрачное управление.' 
    },
    { 
      title: 'Тенгизшевройл принял участие в Региональном экологическом саммите ЭКСПО 2026', 
      desc: 'В Астане прошла международная выставка зеленых технологий и устойчивых решений «RES 2026 EXPO» с участием глав государств Центральной Азии, посвященная переходу к экологически ответственному развитию и зеленой экономике.' 
    },
  ];

  return (
    <section className="news-section section-padding bg-green" id="news">
      <div className="container">
        <h2 className="section-title text-inverse" style={{marginBottom: '3rem'}}>НОВОСТИ</h2>

        <div className="grid-3">
          {news.map((item, i) => (
            <div key={i} className="news-card" style={{background: 'white', color: 'var(--text-main)', display: 'flex', flexDirection: 'column'}}>
              <div className="news-img-placeholder" style={{height: '250px', background: '#eee'}}></div>
              <div className="news-content" style={{padding: '2rem', flexGrow: 1}}>
                <h3 className="news-title" style={{color: 'var(--bg-dark-green)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem'}}>
                  {item.title}
                </h3>
                <p style={{color: '#666', fontSize: '0.95rem', lineHeight: 1.5}}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
