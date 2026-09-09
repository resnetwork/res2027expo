import React from 'react';
import { Globe, MessageCircle, Send, AtSign, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section-padding">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo-text" style={{marginBottom: '1rem'}}>RES<span className="text-gradient">2027</span></div>
            <p className="footer-desc">
              Главное событие будущего в Центральной Азии. Присоединяйтесь к нам, чтобы создавать инновации вместе.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><Globe size={20}/></a>
              <a href="#" className="social-link"><MessageCircle size={20}/></a>
              <a href="#" className="social-link"><Send size={20}/></a>
              <a href="#" className="social-link"><AtSign size={20}/></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">Навигация</h4>
            <ul className="footer-links">
              <li><a href="#about">О выставке</a></li>
              <li><a href="#zones">Тематические зоны</a></li>
              <li><a href="#participate">Участие</a></li>
              <li><a href="#news">Новости</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">Информация</h4>
            <ul className="footer-links">
              <li><a href="#">Для экспонентов</a></li>
              <li><a href="#">Для спонсоров</a></li>
              <li><a href="#">Пресс-центр</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">Контакты</h4>
            <ul className="footer-contacts">
              <li><MapPin size={16}/> г. Астана, EXPO Center</li>
              <li><Phone size={16}/> +7 (7172) 123-456</li>
              <li><Mail size={16}/> info@res2027expo.kz</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2027 RES EXPO. Все права защищены.</p>
          <div className="footer-bottom-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
