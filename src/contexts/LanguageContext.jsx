import React, { createContext, useState, useContext } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ru';
  });

  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    let found = true;
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        found = false;
        break;
      }
    }
    if (found && result !== undefined) return result;

    // Fallback to Russian if translation is missing
    let fallback = translations['ru'];
    for (const k of keys) {
      if (fallback && fallback[k] !== undefined) {
        fallback = fallback[k];
      } else {
        return key;
      }
    }
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
