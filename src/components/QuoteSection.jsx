import React from 'react';
import './Sections.css';

const QuoteSection = () => {
  return (
    <section className="quote-section section-padding bg-green">
      <div className="container" style={{display: 'flex', gap: '3rem', alignItems: 'center'}}>
        <div style={{flex: 1}}>
          <h3 className="text-yellow" style={{fontSize: '1.2rem', marginBottom: '2rem'}}>
            ЦИТАТА ПРЕЗИДЕНТА РЕСПУБЛИКИ КАЗАХСТАН:
          </h3>
          <p style={{fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', fontWeight: 500, textAlign: 'justify'}}>
            «МНОГИЕ РАЗВИВАЮЩИЕСЯ СТРАНЫ, НЕ ИМЕЮЩИЕ ВЫХОДА К МОРЮ, СТАЛКИВАЮТСЯ С НЕХВАТКОЙ ВОДЫ, ТАЯНИЕМ ЛЕДНИКОВ, ОПУСТЫНИВАНИЕМ И ДРУГИМИ ЭКСТРЕМАЛЬНЫМИ ПОГОДНЫМИ ЯВЛЕНИЯМИ. РЕШЕНИЕ ЭТИХ ПРОБЛЕМ ТРЕБУЕТ СКООРДИНИРОВАННЫХ РЕГИОНАЛЬНЫХ УСИЛИЙ И АКТИВНОЙ МЕЖДУНАРОДНОЙ ПОДДЕРЖКИ. В ТО ЖЕ ВРЕМЯ, Я СЧИТАЮ, ЧТО МЕРЫ ПО БОРЬБЕ С ИЗМЕНЕНИЕМ КЛИМАТА ДОЛЖНЫ ОСТАВАТЬСЯ СБАЛАНСИРОВАННЫМИ И ИНКЛЮЗИВНЫМИ, ОТВЕЧАТЬ ОБОСНОВАННЫМ ПОТРЕБНОСТЯМ СТРАН В ОБЛАСТИ РАЗВИТИЯ. ДЛЯ УКРЕПЛЕНИЯ НАШИХ СОВМЕСТНЫХ УСИЛИЙ ПО БОРЬБЕ С ИЗМЕНЕНИЕМ КЛИМАТА Я ПРИГЛАШАЮ ВАС НА РЕГИОНАЛЬНЫЙ ЭКОЛОГИЧЕСКИЙ САММИТ, КОТОРЫЙ ПРОЙДЕТ В АСТАНЕ В ПАРТНЕРСТВЕ С ОРГАНИЗАЦИЕЙ ОБЪЕДИНЕННЫХ НАЦИЙ В АПРЕЛЕ СЛЕДУЮЩЕГО ГОДА».
          </p>
          <p className="text-yellow" style={{fontSize: '0.9rem', fontWeight: 600}}>
            ИЗ ВЫСТУПЛЕНИЯ ПРЕЗИДЕНТА КАЗАХСТАНА КАСЫМ-ЖОМАРТА ТОКАЕВА НА III КОНФЕРЕНЦИИ ОРГАНИЗАЦИИ ОБЪЕДИНЕННЫХ НАЦИЙ ПО РАЗВИВАЮЩИМСЯ СТРАНАМ, НЕ ИМЕЮЩИМ ВЫХОДА К МОРЮ, ТУРКМЕНИСТАН, Г. АВАЗА, 2025 ГОД
          </p>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <img 
            src="/president.png" 
            alt="Касым-Жомарт Токаев" 
            style={{width: '100%', maxWidth: '480px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', objectFit: 'cover'}}
          />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
