import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import OfertaPageRU from './OfertaPageRU';
import OfertaPageKK from './OfertaPageKK';
import OfertaPageEN from './OfertaPageEN';
import OfertaPageZH from './OfertaPageZH';

const OfertaPage = ({ onOpenModal }) => {
  const { language } = useLanguage();

  if (language === 'kk') return <OfertaPageKK onOpenModal={onOpenModal} />;
  if (language === 'en') return <OfertaPageEN onOpenModal={onOpenModal} />;
  if (language === 'zh') return <OfertaPageZH onOpenModal={onOpenModal} />;
  return <OfertaPageRU onOpenModal={onOpenModal} />;
};

export default OfertaPage;
