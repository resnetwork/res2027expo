import React from 'react';
import './Sections.css';

const QuoteSection = () => {
  return (
    <section className="quote-section section-padding bg-white">
      <div className="container" style={{display: 'flex', gap: '4rem', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{flex: '0 0 55%', paddingRight: '1rem'}}>
          <h3 className="text-main" style={{fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 800}}>
            ЦИТАТА ПРЕЗИДЕНТА РЕСПУБЛИКИ КАЗАХСТАН:
          </h3>
          <p style={{fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', fontWeight: 500, color: 'var(--text-main)', fontStyle: 'italic'}}>
            «Многие развивающиеся страны, не имеющие выхода к морю, сталкиваются с нехваткой воды, таянием ледников, опустыниванием и другими экстремальными погодными явлениями. Решение этих проблем требует скоординированных региональных усилий и активной международной поддержки. В то же время, я считаю, что меры по борьбе с изменением климата должны оставаться сбалансированными и инклюзивными, отвечать обоснованным потребностям стран в области развития. Для укрепления наших совместных усилий по борьбе с изменением климата я приглашаю вас на Региональный экологический саммит, который пройдет в Астане в партнерстве с Организацией Объединенных Наций в апреле следующего года».
          </p>
          <p className="text-muted" style={{fontSize: '0.9rem', fontWeight: 600, lineHeight: '1.5', maxWidth: '90%'}}>
            Из выступления Президента Казахстана Касым-Жомарта Токаева на III Конференции Организации Объединенных Наций по развивающимся странам, не имеющим выхода к морю, Туркменистан, г. Аваза, 2025 год
          </p>
        </div>
        <div style={{flex: '0 0 40%', display: 'flex', justifyContent: 'flex-end'}}>
          <img 
            src="/president.png" 
            alt="Касым-Жомарт Токаев" 
            style={{width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', objectFit: 'cover'}}
          />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
