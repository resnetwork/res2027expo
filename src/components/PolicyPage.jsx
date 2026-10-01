import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PolicyPageRU from './PolicyPageRU';
import PolicyPageKK from './PolicyPageKK';
import PolicyPageEN from './PolicyPageEN';

const PolicyPage = ({ onOpenModal }) => {
  const { language } = useLanguage();

  if (language === 'kk') return <PolicyPageKK onOpenModal={onOpenModal} />;
  if (language === 'en') return <PolicyPageEN onOpenModal={onOpenModal} />;
  return <PolicyPageRU onOpenModal={onOpenModal} />;
};

export default PolicyPage;
