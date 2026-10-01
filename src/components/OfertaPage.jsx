import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import OfertaPageRU from './OfertaPageRU';
import OfertaPageKK from './OfertaPageKK';
import OfertaPageEN from './OfertaPageEN';

const OfertaPage = ({ onOpenModal }) => {
  const { language } = useLanguage();

  if (language === 'kk') return <OfertaPageKK onOpenModal={onOpenModal} />;
  if (language === 'en') return <OfertaPageEN onOpenModal={onOpenModal} />;
  return <OfertaPageRU onOpenModal={onOpenModal} />;
};

export default OfertaPage;
