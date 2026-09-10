import React from 'react';
import { Globe, MessageCircle, Send, AtSign, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-ws" id="footer">
      <div className="container footer-ws-content">
        <div className="footer-ws-top">
          <div className="footer-ws-left">
            <img src="/logo.png" alt="RES 2027" className="footer-ws-logo" />
            <p className="footer-ws-copyright">&copy; Regional Ecological Summit EXPO 2027</p>
          </div>
          
          <div className="footer-ws-middle">
            <button className="btn-ws-primary footer-ws-btn">ЗАБРОНИРОВАТЬ СТЕНД</button>
            <div className="footer-ws-contacts">
              <p>+ 7 775 026 66 88</p>
              <p>office@res2026expo.kz</p>
              <p>pr@res2026expo.kz</p>
            </div>
          </div>

          <div className="footer-ws-right">
            <div className="footer-ws-info">
              <p className="footer-ws-date">5-7 мая, 2027</p>
              <p className="footer-ws-location">Астана, МВЦ "EXPO"</p>
            </div>
          </div>
        </div>
        
        <div className="footer-ws-bottom">
          <div className="footer-ws-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Договор оферты</a>
          </div>
          <button className="footer-ws-up" onClick={scrollToTop}>наверх &uarr;</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
