import React, { useState, useEffect } from 'react';
import { X, Check, Send } from 'lucide-react';
import './VisitorRegistrationModal.css';
import { useLanguage } from '../contexts/LanguageContext';

const VISITOR_TRANSLATIONS = {
  ru: {
    title: 'Предрегистрация посетителей',
    subtitle: 'Бесплатный вход на Международную выставку зеленых технологий и деловую программу RES+ EXPO 2027',
    contactTitle: '👤 Контактные данные',
    nameLabel: 'ФИО',
    companyLabel: 'Компания / Организация',
    jobTitleLabel: 'Должность',
    countryCityLabel: 'Страна и город',
    emailLabel: 'Email',
    phoneLabel: 'Телефон',
    whoAreYouTitle: '🎯 Кто вы?',
    categories: [
      { id: 'business', title: 'бизнес или закупщик' },
      { id: 'gov', title: 'госорган' },
      { id: 'investor', title: 'инвестор' },
      { id: 'intl', title: 'международная организация' },
      { id: 'expert', title: 'эксперт или учёный' },
      { id: 'student', title: 'студент' },
      { id: 'media', title: 'СМИ' },
      { id: 'other', title: 'другое' }
    ],
    otherCategoryPlaceholder: 'Укажите вашу сферу деятельности...',
    interestsTitle: '🔍 Что интересует? (можно несколько)',
    interests: [
      'выставка',
      'пленарная сессия',
      'панельные сессии',
      'Green Invest Forum',
      'B2B-встречи'
    ],
    thematicsTitle: '🌱 Направления (можно несколько)',
    thematics: [
      {
        id: 'green_energy',
        title: 'Green Energy',
        desc: 'возобновляемая энергия, водород, энергоэффективность, энергопереход'
      },
      {
        id: 'water_future',
        title: 'Water Future',
        desc: 'водная безопасность, ледники, Арал и Каспий и т.д.'
      },
      {
        id: 'circular_economy',
        title: 'Circular Economy',
        desc: 'управление отходами, переработка, экономика замкнутого цикла'
      },
      {
        id: 'climate_action',
        title: 'Climate Action',
        desc: 'декарбонизация промышленности, карбоновые рынки, адаптация'
      },
      {
        id: 'green_finance',
        title: 'Green Finance',
        desc: 'инвестиции, ESG, зелёное финансирование'
      },
      {
        id: 'eco_culture',
        title: 'Eco Culture',
        desc: 'эко-кино, устойчивая мода, образование и молодёжь'
      }
    ],
    sideEventsTitle: '✨ Side events (можно несколько)',
    sideEvents: [
      'Astana Eco Film Festival',
      'Green Runway Fashion Show',
      'Подкаст Green Talks',
      'B2B-встречи',
      'Награждение стендов',
      'VIP Gala Dinner',
      'Культурная программа'
    ],
    sourceTitle: '📢 Откуда узнали о выставке?',
    sources: [
      { id: 'social', title: 'соцсети' },
      { id: 'email', title: 'email' },
      { id: 'partners', title: 'партнёры' },
      { id: 'media', title: 'СМИ' },
      { id: 'other', title: 'другое' }
    ],
    otherSourcePlaceholder: 'Уточните источник...',
    policyAgreement: 'Согласен на',
    policyLink: 'обработку персональных данных',
    newsletterAgreement: 'Согласен получать новости и рассылку RES+ EXPO',
    submitBtn: 'Зарегистрироваться бесплатно',
    submittingBtn: 'Регистрация...',
    successTitle: 'Вы успешно зарегистрированы!',
    successDesc: 'Спасибо за интерес к выставке «RES+ EXPO 2027». Электронный бейдж и подробная информация о посещении будут направлены на указанный Email накануне мероприятия.',
    closeBtn: 'Закрыть',
    policyRequiredError: 'Необходимо подтвердить согласие на обработку персональных данных.'
  },
  kk: {
    title: 'Келушілерді алдын ала тіркеу',
    subtitle: 'RES+ EXPO 2027 халықаралық жасыл технологиялар көрмесі мен іскерлік бағдарламасына тегін кіру',
    contactTitle: '👤 Байланыс деректері',
    nameLabel: 'Аты-жөні',
    companyLabel: 'Компания / Ұйым',
    jobTitleLabel: 'Лауазымы',
    countryCityLabel: 'Ел және қала',
    emailLabel: 'Email',
    phoneLabel: 'Телефон',
    whoAreYouTitle: '🎯 Сіз кімсіз?',
    categories: [
      { id: 'business', title: 'бизнес немесе сатып алушы' },
      { id: 'gov', title: 'мемлекеттік орган' },
      { id: 'investor', title: 'инвестор' },
      { id: 'intl', title: 'халықаралық ұйым' },
      { id: 'expert', title: 'сарапшы немесе ғалым' },
      { id: 'student', title: 'студент' },
      { id: 'media', title: 'БАҚ' },
      { id: 'other', title: 'басқа' }
    ],
    otherCategoryPlaceholder: 'Қызмет саласын көрсетіңіз...',
    interestsTitle: '🔍 Не қызықтырады? (бірнешеуін таңдауға болады)',
    interests: [
      'көрме',
      'пленарлық сессия',
      'панельдік сессиялар',
      'Green Invest Forum',
      'B2B кездесулер'
    ],
    thematicsTitle: '🌱 Бағыттар (бірнешеуін таңдауға болады)',
    thematics: [
      {
        id: 'green_energy',
        title: 'Green Energy',
        desc: 'жаңартылатын энергия, сутегі, энергия тиімділігі, энергетикалық көшу'
      },
      {
        id: 'water_future',
        title: 'Water Future',
        desc: 'су қауіпсіздігі, мұздықтар, Арал және Каспий т.б.'
      },
      {
        id: 'circular_economy',
        title: 'Circular Economy',
        desc: 'қалдықтарды басқару, қайта өңдеу, тұйық цикл экономикасы'
      },
      {
        id: 'climate_action',
        title: 'Climate Action',
        desc: 'өнеркәсіпті декарбонизациялау, көміртегі нарығы, бейімделу'
      },
      {
        id: 'green_finance',
        title: 'Green Finance',
        desc: 'инвестициялар, ESG, жасыл қаржыландыру'
      },
      {
        id: 'eco_culture',
        title: 'Eco Culture',
        desc: 'эко-кино, тұрақты сән, білім және жастар'
      }
    ],
    sideEventsTitle: '✨ Side events (бірнешеуін таңдауға болады)',
    sideEvents: [
      'Astana Eco Film Festival',
      'Green Runway Fashion Show',
      'Подкаст Green Talks',
      'B2B-встречи',
      'Награждение стендов',
      'VIP Gala Dinner',
      'Мәдени бағдарлама'
    ],
    sourceTitle: '📢 Көрме туралы қайдан білдіңіз?',
    sources: [
      { id: 'social', title: 'әлеуметтік желілер' },
      { id: 'email', title: 'email' },
      { id: 'partners', title: 'серіктестер' },
      { id: 'media', title: 'БАҚ' },
      { id: 'other', title: 'басқа' }
    ],
    otherSourcePlaceholder: 'Ақпарат көзін көрсетіңіз...',
    policyAgreement: 'Келісемін:',
    policyLink: 'дербес деректерді өңдеуге',
    newsletterAgreement: 'RES+ EXPO жаңалықтары мен хабарламаларын алуға келісемін',
    submitBtn: 'Тегін тіркелу',
    submittingBtn: 'Тіркелуде...',
    successTitle: 'Сіз сәтті тіркелдіңіз!',
    successDesc: '«RES+ EXPO 2027» көрмесіне қызығушылық танытқаныңыз үшін рақмет. Электронды бейдж бен толық ақпарат іс-шара қарсаңында Email-ге жіберіледі.',
    closeBtn: 'Жабу',
    policyRequiredError: 'Дербес деректерді өңдеуге келісім беру қажет.'
  },
  en: {
    title: 'Visitor Pre-registration',
    subtitle: 'Free admission to the International Green Technologies Exhibition & Business Program RES+ EXPO 2027',
    contactTitle: '👤 Contact Details',
    nameLabel: 'Full Name',
    companyLabel: 'Company / Organization',
    jobTitleLabel: 'Job Title',
    countryCityLabel: 'Country and City',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    whoAreYouTitle: '🎯 Who are you?',
    categories: [
      { id: 'business', title: 'business or buyer' },
      { id: 'gov', title: 'government agency' },
      { id: 'investor', title: 'investor' },
      { id: 'intl', title: 'international organization' },
      { id: 'expert', title: 'expert or scientist' },
      { id: 'student', title: 'student' },
      { id: 'media', title: 'media' },
      { id: 'other', title: 'other' }
    ],
    otherCategoryPlaceholder: 'Specify your field of activity...',
    interestsTitle: '🔍 What interests you? (select multiple)',
    interests: [
      'exhibition',
      'plenary session',
      'panel sessions',
      'Green Invest Forum',
      'B2B meetings'
    ],
    thematicsTitle: '🌱 Tracks (select multiple)',
    thematics: [
      {
        id: 'green_energy',
        title: 'Green Energy',
        desc: 'renewable energy, hydrogen, energy efficiency, transition'
      },
      {
        id: 'water_future',
        title: 'Water Future',
        desc: 'water security, glaciers, Aral & Caspian Sea, etc.'
      },
      {
        id: 'circular_economy',
        title: 'Circular Economy',
        desc: 'waste management, recycling, circular economy solutions'
      },
      {
        id: 'climate_action',
        title: 'Climate Action',
        desc: 'industrial decarbonization, carbon markets, adaptation'
      },
      {
        id: 'green_finance',
        title: 'Green Finance',
        desc: 'investments, ESG, green financing mechanisms'
      },
      {
        id: 'eco_culture',
        title: 'Eco Culture',
        desc: 'eco-cinema, sustainable fashion, education and youth'
      }
    ],
    sideEventsTitle: '✨ Side events (select multiple)',
    sideEvents: [
      'Astana Eco Film Festival',
      'Green Runway Fashion Show',
      'Green Talks Podcast',
      'B2B Meetings',
      'Stand Awards Ceremony',
      'VIP Gala Dinner',
      'Cultural Program'
    ],
    sourceTitle: '📢 How did you hear about the exhibition?',
    sources: [
      { id: 'social', title: 'social media' },
      { id: 'email', title: 'email' },
      { id: 'partners', title: 'partners' },
      { id: 'media', title: 'media' },
      { id: 'other', title: 'other' }
    ],
    otherSourcePlaceholder: 'Specify the source...',
    policyAgreement: 'I agree to the',
    policyLink: 'processing of personal data',
    newsletterAgreement: 'I agree to receive news and updates from RES+ EXPO',
    submitBtn: 'Register for Free',
    submittingBtn: 'Registering...',
    successTitle: 'You are successfully registered!',
    successDesc: 'Thank you for your interest in «RES+ EXPO 2027». Your electronic badge and visiting details will be sent to your email prior to the event.',
    closeBtn: 'Close',
    policyRequiredError: 'Consent to personal data processing is required.'
  },
  zh: {
    title: '观众预登记',
    subtitle: '免费入场参加RES+ EXPO 2027国际绿色技术展览会及商务活动',
    contactTitle: '👤 联系方式',
    nameLabel: '姓名',
    companyLabel: '公司 / 机构',
    jobTitleLabel: '职务',
    countryCityLabel: '国家及城市',
    emailLabel: '电子邮箱',
    phoneLabel: '电话',
    whoAreYouTitle: '🎯 您的身份？',
    categories: [
      { id: 'business', title: '企业或采购商' },
      { id: 'gov', title: '政府机构' },
      { id: 'investor', title: '投资者' },
      { id: 'intl', title: '国际组织' },
      { id: 'expert', title: '专家学者' },
      { id: 'student', title: '学生' },
      { id: 'media', title: '媒体' },
      { id: 'other', title: '其他' }
    ],
    otherCategoryPlaceholder: '请注明所在领域...',
    interestsTitle: '🔍 您的兴趣方向？（可多选）',
    interests: [
      '展览',
      '全体大会',
      '专题论坛',
      '绿色投资论坛',
      'B2B洽谈'
    ],
    thematicsTitle: '🌱 专题板块（可多选）',
    thematics: [
      {
        id: 'green_energy',
        title: 'Green Energy',
        desc: '可再生能源、氢能、能效提升、能源转型'
      },
      {
        id: 'water_future',
        title: 'Water Future',
        desc: '水资源安全、冰川保护、咸海与里海治理'
      },
      {
        id: 'circular_economy',
        title: 'Circular Economy',
        desc: '固废管理、资源循环、循环经济解决方案'
      },
      {
        id: 'climate_action',
        title: 'Climate Action',
        desc: '工业脱碳、碳交易市场、气候适应'
      },
      {
        id: 'green_finance',
        title: 'Green Finance',
        desc: '绿色投资、ESG评估、绿色金融工具'
      },
      {
        id: 'eco_culture',
        title: 'Eco Culture',
        desc: '生态电影节、可持续时尚、环保教育与青年'
      }
    ],
    sideEventsTitle: '✨ 边会活动（可多选）',
    sideEvents: [
      '阿斯塔纳生态电影节',
      '绿色T台生态时装秀',
      'Green Talks播客访谈',
      'B2B精准商务对接',
      '展位颁奖盛典',
      'VIP贵宾晚宴',
      '文化体验项目'
    ],
    sourceTitle: '📢 从何处获悉本届展会？',
    sources: [
      { id: 'social', title: '社交媒体' },
      { id: 'email', title: '邮件资讯' },
      { id: 'partners', title: '合作伙伴' },
      { id: 'media', title: '新闻媒体' },
      { id: 'other', title: '其他途径' }
    ],
    otherSourcePlaceholder: '请注明信息来源...',
    policyAgreement: '同意',
    policyLink: '个人信息处理政策',
    newsletterAgreement: '同意接收RES+ EXPO展会资讯与电子简报',
    submitBtn: '免费登记',
    submittingBtn: '正在提交...',
    successTitle: '登记成功！',
    successDesc: '感谢您关注«RES+ EXPO 2027»。电子入场胸牌及详细参会指南将在展会开幕前发送至您的电子邮箱。',
    closeBtn: '关闭',
    policyRequiredError: '请先勾选并同意个人信息处理政策。'
  }
};

const VisitorRegistrationModal = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useLanguage();
  const currentLang = VISITOR_TRANSLATIONS[language] ? language : 'ru';
  const t = VISITOR_TRANSLATIONS[currentLang];

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    jobTitle: '',
    countryCity: '',
    email: '',
    phone: '',
    category: 'business',
    otherCategory: '',
    interests: ['exhibition'],
    thematics: [],
    sideEvents: [],
    source: 'social',
    otherSource: '',
    agreementPolicy: false,
    agreementNewsletter: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
      setSubmitError(null);
      setIsSubmitting(false);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    window.location.hash = `#registration${langCode}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleInterest = (item) => {
    setFormData(prev => {
      const exists = prev.interests.includes(item);
      const updated = exists ? prev.interests.filter(i => i !== item) : [...prev.interests, item];
      return { ...prev, interests: updated };
    });
  };

  const toggleThematic = (title) => {
    setFormData(prev => {
      const exists = prev.thematics.includes(title);
      const updated = exists ? prev.thematics.filter(t => t !== title) : [...prev.thematics, title];
      return { ...prev, thematics: updated };
    });
  };

  const toggleSideEvent = (event) => {
    setFormData(prev => {
      const exists = prev.sideEvents.includes(event);
      const updated = exists ? prev.sideEvents.filter(e => e !== event) : [...prev.sideEvents, event];
      return { ...prev, sideEvents: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreementPolicy) {
      setSubmitError(t.policyRequiredError);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const selectedCategoryObj = t.categories.find(c => c.id === formData.category) || { title: formData.category };
    const chosenCategory =
      formData.category === 'other' && formData.otherCategory.trim()
        ? `${selectedCategoryObj.title}: ${formData.otherCategory.trim()}`
        : selectedCategoryObj.title;

    const selectedSourceObj = t.sources.find(s => s.id === formData.source) || { title: formData.source };
    const chosenSource =
      formData.source === 'other' && formData.otherSource.trim()
        ? `${selectedSourceObj.title}: ${formData.otherSource.trim()}`
        : selectedSourceObj.title;

    const payload = {
      lang: currentLang,
      name: formData.name,
      company: formData.company,
      jobTitle: formData.jobTitle,
      countryCity: formData.countryCity,
      email: formData.email,
      phone: formData.phone,
      category: chosenCategory,
      interests: formData.interests,
      thematics: formData.thematics,
      sideEvents: formData.sideEvents,
      source: chosenSource,
      agreementNewsletter: formData.agreementNewsletter
    };

    try {
      const res = await fetch('/api/submit-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Ошибка при отправке');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Visitor registration error:', err);
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setSubmitted(true);
      } else {
        setSubmitError(err.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте снова.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="vrm-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <button 
        type="button" 
        className="vrm-close-btn" 
        onClick={onClose} 
        aria-label="Закрыть"
      >
        <X size={24} />
      </button>

      <div className="vrm-dialog">
        {/* Top Branded Header with Language Switcher and Close Button */}
        <div className="vrm-header">
          <img src="/white-logo.png" alt="RES+ EXPO 2027" className="vrm-logo" />
          
          <div className="vrm-header-actions">
            <div className="vrm-lang-bar">
              {[
                { code: 'kk', label: 'ҚАЗ' },
                { code: 'ru', label: 'РУС' },
                { code: 'en', label: 'ENG' },
                { code: 'zh', label: '中文' }
              ].map(l => (
                <button
                  key={l.code}
                  type="button"
                  className={`vrm-lang-btn ${currentLang === l.code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button 
              type="button" 
              className="vrm-header-close-btn" 
              onClick={onClose} 
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="vrm-body">
          {submitted ? (
            <div className="vrm-success">
              <div className="vrm-success-icon">✓</div>
              <h3 className="vrm-title">{t.successTitle}</h3>
              <p className="vrm-subtitle">{t.successDesc}</p>
              <button 
                type="button" 
                className="vrm-submit-btn" 
                style={{ maxWidth: '240px', margin: '20px auto 0' }}
                onClick={onClose}
              >
                {t.closeBtn}
              </button>
            </div>
          ) : (
            <>
              <h2 className="vrm-title">{t.title}</h2>
              <p className="vrm-subtitle">{t.subtitle}</p>

              <form onSubmit={handleSubmit} className="vrm-form" noValidate>
                {/* 1. Контакты */}
                <div className="vrm-section">
                  <div className="vrm-sec-title">{t.contactTitle}</div>
                  <div className="vrm-grid-2">
                    <div className="vrm-field full-width">
                      <label className="vrm-label" htmlFor="vrm-name">
                        {t.nameLabel} <span className="vrm-req">*</span>
                      </label>
                      <input
                        id="vrm-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="vrm-input"
                        required
                      />
                    </div>

                    <div className="vrm-field">
                      <label className="vrm-label" htmlFor="vrm-company">
                        {t.companyLabel} <span className="vrm-req">*</span>
                      </label>
                      <input
                        id="vrm-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="vrm-input"
                        required
                      />
                    </div>

                    <div className="vrm-field">
                      <label className="vrm-label" htmlFor="vrm-jobTitle">
                        {t.jobTitleLabel} <span className="vrm-req">*</span>
                      </label>
                      <input
                        id="vrm-jobTitle"
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="vrm-input"
                        required
                      />
                    </div>

                    <div className="vrm-field full-width">
                      <label className="vrm-label" htmlFor="vrm-countryCity">
                        {t.countryCityLabel} <span className="vrm-req">*</span>
                      </label>
                      <input
                        id="vrm-countryCity"
                        type="text"
                        name="countryCity"
                        value={formData.countryCity}
                        onChange={handleInputChange}
                        className="vrm-input"
                        required
                      />
                    </div>

                    <div className="vrm-field">
                      <label className="vrm-label" htmlFor="vrm-email">
                        {t.emailLabel} <span className="vrm-req">*</span>
                      </label>
                      <input
                        id="vrm-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="vrm-input"
                        required
                      />
                    </div>

                    <div className="vrm-field">
                      <label className="vrm-label" htmlFor="vrm-phone">
                        {t.phoneLabel}
                      </label>
                      <input
                        id="vrm-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="vrm-input"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Кто вы */}
                <div className="vrm-section">
                  <div className="vrm-sec-title">{t.whoAreYouTitle}</div>
                  <div className="vrm-chips-grid">
                    {t.categories.map((cat) => (
                      <label
                        key={cat.id}
                        className={`vrm-chip ${formData.category === cat.id ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={cat.id}
                          checked={formData.category === cat.id}
                          onChange={() => setFormData(p => ({ ...p, category: cat.id }))}
                          className="vrm-chip-radio"
                        />
                        <span>{cat.title}</span>
                      </label>
                    ))}
                  </div>

                  {formData.category === 'other' && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        name="otherCategory"
                        value={formData.otherCategory}
                        onChange={handleInputChange}
                        className="vrm-input"
                      />
                    </div>
                  )}
                </div>

                {/* 3. Что интересует */}
                <div className="vrm-section">
                  <div className="vrm-sec-title">{t.interestsTitle}</div>
                  <div className="vrm-chips-grid">
                    {t.interests.map((item) => {
                      const isChecked = formData.interests.includes(item);
                      return (
                        <label
                          key={item}
                          className={`vrm-chip ${isChecked ? 'selected' : ''}`}
                          onClick={() => toggleInterest(item)}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="vrm-chip-radio"
                          />
                          <span>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Направления */}
                <div className="vrm-section">
                  <div className="vrm-sec-title">{t.thematicsTitle}</div>
                  <div className="vrm-checklist">
                    {t.thematics.map((dir) => {
                      const isChecked = formData.thematics.includes(dir.title);
                      return (
                        <label
                          key={dir.id}
                          className={`vrm-check-item ${isChecked ? 'selected' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleThematic(dir.title)}
                            className="vrm-checkbox"
                          />
                          <div className="vrm-check-text">
                            <div className="vrm-check-title">{dir.title}</div>
                            <div className="vrm-check-desc">{dir.desc}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Side events */}
                <div className="vrm-section">
                  <div className="vrm-sec-title">{t.sideEventsTitle}</div>
                  <div className="vrm-chips-grid">
                    {t.sideEvents.map((event) => {
                      const isChecked = formData.sideEvents.includes(event);
                      return (
                        <label
                          key={event}
                          className={`vrm-chip ${isChecked ? 'selected' : ''}`}
                          onClick={() => toggleSideEvent(event)}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="vrm-chip-radio"
                          />
                          <span>{event}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Откуда узнали */}
                <div className="vrm-section">
                  <div className="vrm-sec-title">{t.sourceTitle}</div>
                  <div className="vrm-chips-grid">
                    {t.sources.map((src) => (
                      <label
                        key={src.id}
                        className={`vrm-chip ${formData.source === src.id ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="source"
                          value={src.id}
                          checked={formData.source === src.id}
                          onChange={() => setFormData(p => ({ ...p, source: src.id }))}
                          className="vrm-chip-radio"
                        />
                        <span>{src.title}</span>
                      </label>
                    ))}
                  </div>

                  {formData.source === 'other' && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        name="otherSource"
                        value={formData.otherSource}
                        onChange={handleInputChange}
                        className="vrm-input"
                      />
                    </div>
                  )}
                </div>

                {/* 7. Согласие */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                  <label className="vrm-consent">
                    <input
                      type="checkbox"
                      name="agreementPolicy"
                      checked={formData.agreementPolicy}
                      onChange={handleInputChange}
                      className="vrm-checkbox"
                      required
                    />
                    <span>
                      {t.policyAgreement} <a href="/policy" target="_blank" rel="noopener noreferrer">{t.policyLink}</a> <span className="vrm-req">*</span>
                    </span>
                  </label>

                  <label className="vrm-consent">
                    <input
                      type="checkbox"
                      name="agreementNewsletter"
                      checked={formData.agreementNewsletter}
                      onChange={handleInputChange}
                      className="vrm-checkbox"
                    />
                    <span>{t.newsletterAgreement}</span>
                  </label>
                </div>

                {submitError && (
                  <div style={{ color: '#ef4444', fontSize: '0.88rem', textAlign: 'center', background: '#fee2e2', padding: '8px 12px', borderRadius: '6px' }}>
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  className="vrm-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t.submittingBtn
                  ) : (
                    <>
                      <Send size={18} />
                      <span>{t.submitBtn}</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorRegistrationModal;
