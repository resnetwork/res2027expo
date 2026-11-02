import React, { useState, useEffect } from 'react';
import { ArrowLeft, Globe, ChevronDown, Send } from 'lucide-react';
import './ParticipationPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from './Footer';

const PAGE_TRANSLATIONS = {
  ru: {
    backToHome: 'На главную',
    pageTitle: 'Заявка на участие',
    pageSubtitle: 'Забронируйте выставочный стенд или заявите участие в качестве спикера, национального павильона или официального партнёра выставки.',
    card1Title: 'Контакты',
    card1Subtitle: 'Укажите информацию об организации и контактном лице',
    companyLabel: 'Компания / Организация',
    countryCityLabel: 'Страна и город',
    websiteLabel: 'Веб-сайт компании',
    nameLabel: 'ФИО представителя',
    jobTitleLabel: 'Должность',
    emailLabel: 'Рабочий Email',
    phoneLabel: 'Телефон или WhatsApp',
    card2Title: 'Кем вы хотите участвовать?',
    card2Subtitle: 'Можно выбрать несколько подходящих форматов',
    roles: [
      { id: 'stand', title: 'Экспонент (стенд)' },
      { id: 'pavilion', title: 'Национальный павильон или регион Казахстана' },
      { id: 'partner', title: 'Спонсор или партнёр' },
      { id: 'speaker', title: 'Спикер деловой программы или Green Invest Forum' },
      { id: 'startup', title: 'Участник Eco Startup Competition' },
      { id: 'media', title: 'Медиапартнёр' }
    ],
    otherRoleLabel: 'Другой формат участия',
    exhibitorSectionTitle: 'Параметры для экспонента (выставочный стенд)',
    standAreaLabel: 'Желаемая площадь стенда, м²',
    standAreaPlaceholder: 'Например: 18',
    standTypeLabel: 'Тип стенда',
    standTypes: [
      'со стандартной застройкой',
      'площадь без застройки',
      'в составе павильона'
    ],
    standDescLabel: 'Что планируете представить на выставке?',
    speakerSectionTitle: 'Параметры выступления спикера',
    speakerVenueLabel: 'Предпочтительная площадка',
    speakerVenues: [
      'пленарная сессия',
      'keynote спикер',
      'Green Invest Forum'
    ],
    speakerTopicLabel: 'Тема или тезисы выступления',
    card3Title: 'Направления',
    card3Subtitle: 'Выберите тематические треки, соответствующие вашей деятельности',
    thematics: [
      { id: 'green_energy', title: 'Green Energy', desc: 'Возобновляемая энергия, водород, энергоэффективность, энергопереход' },
      { id: 'water_future', title: 'Water Future', desc: 'Водная безопасность, ледники, Арал и Каспий и т.д.' },
      { id: 'circular_economy', title: 'Circular Economy', desc: 'Управление отходами, переработка, экономика замкнутого цикла' },
      { id: 'climate_action', title: 'Climate Action', desc: 'Декарбонизация промышленности, карбоновые рынки, адаптация' },
      { id: 'green_finance', title: 'Green Finance', desc: 'Инвестиции, ESG, зелёное финансирование' },
      { id: 'eco_culture', title: 'Eco Culture', desc: 'Эко-кино, устойчивая мода, образование и молодёжь' }
    ],
    card4Title: 'Side events, в которых хотите участвовать',
    card4Subtitle: 'Специальные форматы, программы и нетворкинг',
    sideEvents: [
      'Astana Eco Film Festival',
      'Green Runway Fashion Show',
      'Подкаст Green Talks',
      'B2B-встречи',
      'Награждение стендов',
      'VIP Gala Dinner',
      'Культурная программа'
    ],
    card5Title: 'Завершение и подтверждение',
    card5Subtitle: 'Дополнительные комментарии и согласие на обработку данных',
    commentLabel: 'Комментарий или пожелания',
    policyAgreement: 'Я согласен на',
    policyLink: 'обработку персональных данных',
    newsletterAgreement: 'Согласен получать новости, дайджесты и важные обновления выставки «RES+ EXPO»',
    submitBtn: 'ОТПРАВИТЬ ЗАЯВКУ',
    submittingBtn: 'ОТПРАВКА ЗАЯВКИ...',
    successTitle: 'Заявка успешно принята!',
    successDesc: 'Благодарим за интерес к Международной выставке зеленых технологий «RES+ EXPO 2027». Наш оргкомитет свяжется с вами в течение рабочего дня для согласования деталей и бронирования.',
    backBtn: 'Вернуться на главную',
    summaryCompany: 'Компания',
    summaryContact: 'Контактное лицо',
    summaryEmailPhone: 'Email / Телефон',
    summaryRoles: 'Формат участия',
    summaryArea: 'Площадь стенда'
  },
  kk: {
    backToHome: 'Басты бетке',
    pageTitle: 'Қатысуға өтінім беру',
    pageSubtitle: 'Көрме стендін брондаңыз немесе спикер, ұлттық павильон немесе ресми серіктес ретінде қатысуға өтінім беріңіз.',
    card1Title: 'Байланыс деректері',
    card1Subtitle: 'Ұйым және жауапты тұлға туралы ақпаратты көрсетіңіз',
    companyLabel: 'Компания / Ұйым',
    countryCityLabel: 'Ел және қала',
    websiteLabel: 'Компанияның веб-сайты',
    nameLabel: 'Өкілдің аты-жөні',
    jobTitleLabel: 'Лауазымы',
    emailLabel: 'Жұмыс Email',
    phoneLabel: 'Телефон немесе WhatsApp',
    card2Title: 'Кім ретінде қатысқыңыз келеді?',
    card2Subtitle: 'Бірнеше қолайлы форматты таңдауға болады',
    roles: [
      { id: 'stand', title: 'Экспонент (стенд)' },
      { id: 'pavilion', title: 'Ұлттық павильон немесе Қазақстан өңірі' },
      { id: 'partner', title: 'Демеуші немесе серіктес' },
      { id: 'speaker', title: 'Іскерлік бағдарлама немесе Green Invest Forum спикері' },
      { id: 'startup', title: 'Eco Startup Competition қатысушысы' },
      { id: 'media', title: 'Медиасеріктес' }
    ],
    otherRoleLabel: 'Басқа қатысу форматы',
    exhibitorSectionTitle: 'Экспонент үшін параметрлер (көрме стенді)',
    standAreaLabel: 'Қажетті стенд ауданы, м²',
    standAreaPlaceholder: 'Мысалы: 18',
    standTypeLabel: 'Стенд түрі',
    standTypes: [
      'стандартты құрылысы бар',
      'құрылыссыз аудан',
      'павильон құрамында'
    ],
    standDescLabel: 'Көрмеде не ұсынуды жоспарлайсыз?',
    speakerSectionTitle: 'Спикердің баяндама параметрлері',
    speakerVenueLabel: 'Қалаған алаң',
    speakerVenues: [
      'пленарлық сессия',
      'keynote спикер',
      'Green Invest Forum'
    ],
    speakerTopicLabel: 'Баяндама тақырыбы немесе тезистері',
    card3Title: 'Бағыттар',
    card3Subtitle: 'Қызметіңізге сәйкес келетін тақырыптық бағыттарды таңдаңыз',
    thematics: [
      { id: 'green_energy', title: 'Green Energy', desc: 'Жаңартылатын энергия, сутегі, энергия тиімділігі, энергетикалық көшу' },
      { id: 'water_future', title: 'Water Future', desc: 'Су қауіпсіздігі, мұздықтар, Арал және Каспий т.б.' },
      { id: 'circular_economy', title: 'Circular Economy', desc: 'Қалдықтарды басқару, қайта өңдеу, тұйық цикл экономикасы' },
      { id: 'climate_action', title: 'Climate Action', desc: 'Өнеркәсіпті декарбонизациялау, көміртегі нарығы, бейімделу' },
      { id: 'green_finance', title: 'Green Finance', desc: 'Инвестициялар, ESG, жасыл қаржыландыру' },
      { id: 'eco_culture', title: 'Eco Culture', desc: 'Эко-кино, тұрақты сән, білім және жастар' }
    ],
    card4Title: 'Қатысқыңыз келетін Side events',
    card4Subtitle: 'Арнайы форматтар, бағдарламалар және нетворкинг',
    sideEvents: [
      'Astana Eco Film Festival',
      'Green Runway Fashion Show',
      'Подкаст Green Talks',
      'B2B-встречи',
      'Награждение стендов',
      'VIP Gala Dinner',
      'Мәдени бағдарлама'
    ],
    card5Title: 'Аяқтау және растау',
    card5Subtitle: 'Қосымша түсініктемелер және деректерді өңдеуге келісім',
    commentLabel: 'Пікір немесе тілектер',
    policyAgreement: 'Мен келісім беремін:',
    policyLink: 'дербес деректерді өңдеу',
    newsletterAgreement: '«RES+ EXPO» жаңалықтары мен маңызды хабарламаларын алуға келісемін',
    submitBtn: 'ӨТІНІМ ЖІБЕРУ',
    submittingBtn: 'ӨТІНІМ ЖІБЕРІЛУДЕ...',
    successTitle: 'Өтінім сәтті қабылданды!',
    successDesc: '«RES+ EXPO 2027» халықаралық көрмесіне қызығушылық танытқаныңызға рақмет. Ұйымдастыру комитеті жұмыс күні ішінде сізбен байланысады.',
    backBtn: 'Басты бетке оралу',
    summaryCompany: 'Компания',
    summaryContact: 'Байланыс тұлғасы',
    summaryEmailPhone: 'Email / Телефон',
    summaryRoles: 'Қатысу форматы',
    summaryArea: 'Стенд ауданы'
  },
  en: {
    backToHome: 'Back to Main',
    pageTitle: 'Application for Participation',
    pageSubtitle: 'Book an exhibition stand or apply to participate as a speaker, national pavilion or official partner.',
    card1Title: 'Contact Information',
    card1Subtitle: 'Enter information about the organization and contact person',
    companyLabel: 'Company / Organization',
    countryCityLabel: 'Country and City',
    websiteLabel: 'Company Website',
    nameLabel: 'Representative Full Name',
    jobTitleLabel: 'Job Title',
    emailLabel: 'Business Email',
    phoneLabel: 'Phone or WhatsApp',
    card2Title: 'How would you like to participate?',
    card2Subtitle: 'You can choose multiple suitable formats',
    roles: [
      { id: 'stand', title: 'Exhibitor (stand)' },
      { id: 'pavilion', title: 'National pavilion or region of Kazakhstan' },
      { id: 'partner', title: 'Sponsor or partner' },
      { id: 'speaker', title: 'Speaker of business program or Green Invest Forum' },
      { id: 'startup', title: 'Eco Startup Competition participant' },
      { id: 'media', title: 'Media partner' }
    ],
    otherRoleLabel: 'Other format of participation',
    exhibitorSectionTitle: 'Exhibitor Parameters (Exhibition Stand)',
    standAreaLabel: 'Desired stand area, m²',
    standAreaPlaceholder: 'e.g.: 18',
    standTypeLabel: 'Stand type',
    standTypes: [
      'with standard shell scheme',
      'space only (custom build)',
      'as part of pavilion'
    ],
    standDescLabel: 'What do you plan to present at the exhibition?',
    speakerSectionTitle: 'Speaker Presentation Parameters',
    speakerVenueLabel: 'Preferred venue',
    speakerVenues: [
      'plenary session',
      'keynote speaker',
      'Green Invest Forum'
    ],
    speakerTopicLabel: 'Presentation topic or key takeaways',
    card3Title: 'Thematic Tracks',
    card3Subtitle: 'Select the thematic tracks relevant to your business',
    thematics: [
      { id: 'green_energy', title: 'Green Energy', desc: 'Renewable energy, hydrogen, energy efficiency, energy transition' },
      { id: 'water_future', title: 'Water Future', desc: 'Water security, glaciers, Aral & Caspian Sea, etc.' },
      { id: 'circular_economy', title: 'Circular Economy', desc: 'Waste management, recycling, circular economy solutions' },
      { id: 'climate_action', title: 'Climate Action', desc: 'Industrial decarbonization, carbon markets, climate adaptation' },
      { id: 'green_finance', title: 'Green Finance', desc: 'Investments, ESG, green financing mechanisms' },
      { id: 'eco_culture', title: 'Eco Culture', desc: 'Eco-cinema, sustainable fashion, education and youth' }
    ],
    card4Title: 'Side events you wish to join',
    card4Subtitle: 'Special formats, parallel programs and networking',
    sideEvents: [
      'Astana Eco Film Festival',
      'Green Runway Fashion Show',
      'Green Talks Podcast',
      'B2B Meetings',
      'Stand Awards Ceremony',
      'VIP Gala Dinner',
      'Cultural Program'
    ],
    card5Title: 'Completion and Consent',
    card5Subtitle: 'Additional comments and personal data consent',
    commentLabel: 'Comments or special requests',
    policyAgreement: 'I agree to the',
    policyLink: 'processing of personal data',
    newsletterAgreement: 'I agree to receive news, digests and updates from «RES+ EXPO»',
    submitBtn: 'SUBMIT APPLICATION',
    submittingBtn: 'SUBMITTING...',
    successTitle: 'Application Submitted Successfully!',
    successDesc: 'Thank you for your interest in «RES+ EXPO 2027». Our organizing committee will contact you within one business day.',
    backBtn: 'Return to Main Page',
    summaryCompany: 'Company',
    summaryContact: 'Contact person',
    summaryEmailPhone: 'Email / Phone',
    summaryRoles: 'Participation format',
    summaryArea: 'Stand area'
  },
  zh: {
    backToHome: '返回首页',
    pageTitle: '参会及参展申请',
    pageSubtitle: '预订展位或以演讲嘉宾、国家展团或官方合作伙伴身份申请参与。',
    card1Title: '联系方式',
    card1Subtitle: '请填写组织机构与代表人的联络信息',
    companyLabel: '公司 / 机构名称',
    countryCityLabel: '国家与城市',
    websiteLabel: '公司官方网站',
    nameLabel: '代表姓名',
    jobTitleLabel: '职位',
    emailLabel: '商务邮箱',
    phoneLabel: '电话或 WhatsApp',
    card2Title: '您希望以何种形式参会？',
    card2Subtitle: '可多选适合的参会形式',
    roles: [
      { id: 'stand', title: '参展商（展位）' },
      { id: 'pavilion', title: '国家馆或哈萨克斯坦地区展团' },
      { id: 'partner', title: '赞助商或合作伙伴' },
      { id: 'speaker', title: '商务论坛或绿色投资论坛演讲嘉宾' },
      { id: 'startup', title: '生态创新初创企业大赛参赛者' },
      { id: 'media', title: '媒体合作伙伴' }
    ],
    otherRoleLabel: '其他参展/参会形式',
    exhibitorSectionTitle: '参展商展位参数',
    standAreaLabel: '期望展位面积 (m²)',
    standAreaPlaceholder: '例如: 18',
    standTypeLabel: '展位类型',
    standTypes: [
      '标准展位',
      '光地展位（自搭建）',
      '国家/联合展团成员'
    ],
    standDescLabel: '您计划在展会上展示什么？',
    speakerSectionTitle: '演讲嘉宾方案',
    speakerVenueLabel: '意向演讲平台',
    speakerVenues: [
      '全体大会',
      '主旨演讲嘉宾',
      '绿色投资论坛'
    ],
    speakerTopicLabel: '演讲主题或要点',
    card3Title: '重点领域',
    card3Subtitle: '请选择与您业务相符的主题方向',
    thematics: [
      { id: 'green_energy', title: 'Green Energy', desc: '可再生能源、氢能、能效提升、能源转型' },
      { id: 'water_future', title: 'Water Future', desc: '水资源安全、冰川保护、咸海及里海治理等' },
      { id: 'circular_economy', title: 'Circular Economy', desc: '固废管理、资源循环、循环经济' },
      { id: 'climate_action', title: 'Climate Action', desc: '工业脱碳、碳市场、气候适应' },
      { id: 'green_finance', title: 'Green Finance', desc: '绿色投资、ESG、绿色金融机制' },
      { id: 'eco_culture', title: 'Eco Culture', desc: '生态电影节、可持续时尚、环保教育与青年' }
    ],
    card4Title: '意向参与的配套活动 (Side events)',
    card4Subtitle: '特别活动、平行论坛与商务对接',
    sideEvents: [
      'Astana Eco Film Festival',
      'Green Runway Fashion Show',
      'Green Talks 播客',
      'B2B 商务对接会',
      '优秀展台颁奖典礼',
      'VIP 招待晚宴',
      '文化体验项目'
    ],
    card5Title: '完成与确认',
    card5Subtitle: '备注留言及个人信息授权',
    commentLabel: '备注或特殊需求',
    policyAgreement: '我同意',
    policyLink: '个人信息保护政策',
    newsletterAgreement: '我同意接收 «RES+ EXPO» 的最新资讯与官方简报',
    submitBtn: '提交申请',
    submittingBtn: '正在提交...',
    successTitle: '申请已成功提交！',
    successDesc: '感谢您对 «RES+ EXPO 2027» 的关注与支持。组委会工作人员将在一个工作日内与您联系，推进后续合作事宜。',
    backBtn: '返回首页',
    summaryCompany: '公司名称',
    summaryContact: '联系人',
    summaryEmailPhone: '邮箱 / 电话',
    summaryRoles: '参会形式',
    summaryArea: '展位面积'
  }
};

const ParticipationPage = ({ onBackToHome, initialArea = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Sync language from hash if URL contains #bookstandru, #bookstandkk, #bookstanden, #bookstandzh
  useEffect(() => {
    const syncLangFromHash = () => {
      const h = (window.location.hash || '').toLowerCase();
      if (h.includes('bookstandru')) {
        setLanguage('ru');
      } else if (h.includes('bookstandkk') || h.includes('bookstandkz')) {
        setLanguage('kk');
      } else if (h.includes('bookstanden')) {
        setLanguage('en');
      } else if (h.includes('bookstandzh') || h.includes('bookstandcn')) {
        setLanguage('zh');
      }
    };
    syncLangFromHash();
    window.addEventListener('hashchange', syncLangFromHash);
    return () => window.removeEventListener('hashchange', syncLangFromHash);
  }, [setLanguage]);

  // Current translation dictionary
  const currentLang = PAGE_TRANSLATIONS[language] ? language : 'ru';
  const t = PAGE_TRANSLATIONS[currentLang];

  // Form State
  const [formData, setFormData] = useState(() => {
    let areaFromUrl = '';
    try {
      areaFromUrl = new URLSearchParams(window.location.search).get('area') || '';
    } catch (e) {
      // ignore
    }
    return {
      company: '',
      countryCity: '',
      website: '',
      name: '',
      jobTitle: '',
      email: '',
      phone: '',
      roles: ['stand'], // Using stable role IDs
      otherRole: '',
      // If Exhibitor
      standArea: initialArea || areaFromUrl,
      standType: 0, // Index into standTypes array
      standDescription: '',
      // If Speaker
      speakerVenue: 0, // Index into speakerVenues array
      speakerTopic: '',
      // Thematics & Side Events (stored by ID or text)
      thematics: [],
      sideEvents: [],
      // Final
      comment: '',
      agreementPolicy: false,
      agreementNewsletter: true
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setLangDropdownOpen(false);
    // Update hash to #bookstand{code}
    window.location.hash = `#bookstand${code}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleRoleId = (roleId) => {
    setFormData(prev => {
      const exists = prev.roles.includes(roleId);
      const updated = exists ? prev.roles.filter(r => r !== roleId) : [...prev.roles, roleId];
      return { ...prev, roles: updated };
    });
  };

  const toggleThematicId = (thematicId) => {
    setFormData(prev => {
      const exists = prev.thematics.includes(thematicId);
      const updated = exists ? prev.thematics.filter(id => id !== thematicId) : [...prev.thematics, thematicId];
      return { ...prev, thematics: updated };
    });
  };

  const toggleSideEventIndex = (index) => {
    setFormData(prev => {
      const exists = prev.sideEvents.includes(index);
      const updated = exists ? prev.sideEvents.filter(i => i !== index) : [...prev.sideEvents, index];
      return { ...prev, sideEvents: updated };
    });
  };

  const isExhibitorSelected =
    formData.roles.includes('stand') ||
    formData.roles.includes('pavilion');

  const isSpeakerSelected = formData.roles.includes('speaker');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreementPolicy) {
      setSubmitError(
        currentLang === 'kk' ? 'Дербес деректерді өңдеуге келісім беру қажет.' :
        currentLang === 'en' ? 'Consent to personal data processing is required.' :
        currentLang === 'zh' ? '必须确认同意个人信息处理政策。' :
        'Необходимо подтвердить согласие на обработку персональных данных.'
      );
      return;
    }

    if (formData.roles.length === 0 && !formData.otherRole) {
      setSubmitError(
        currentLang === 'kk' ? 'Кем дегенде бір қатысу форматын таңдаңыз.' :
        currentLang === 'en' ? 'Please select at least one format of participation.' :
        currentLang === 'zh' ? '请至少选择一种参会形式。' :
        'Пожалуйста, выберите хотя бы один формат участия.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Map role IDs to current localized titles
    const rolesCompiled = formData.roles.map(rId => {
      const rObj = t.roles.find(item => item.id === rId);
      return rObj ? rObj.title : rId;
    });

    if (formData.otherRole.trim()) {
      rolesCompiled.push(`${t.otherRoleLabel}: ${formData.otherRole.trim()}`);
    }

    // Map thematics IDs to titles
    const thematicsCompiled = formData.thematics.map(thId => {
      const thObj = t.thematics.find(item => item.id === thId);
      return thObj ? thObj.title : thId;
    });

    // Map side events indices to titles
    const sideEventsCompiled = formData.sideEvents.map(idx => t.sideEvents[idx] || `Event ${idx}`);

    const payload = {
      name: formData.name,
      company: formData.company,
      jobTitle: formData.jobTitle,
      countryCity: formData.countryCity,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      roles: rolesCompiled,
      standArea: isExhibitorSelected ? formData.standArea : '',
      standType: isExhibitorSelected ? t.standTypes[formData.standType] : '',
      standDescription: isExhibitorSelected ? formData.standDescription : '',
      speakerVenue: isSpeakerSelected ? t.speakerVenues[formData.speakerVenue] : '',
      speakerTopic: isSpeakerSelected ? formData.speakerTopic : '',
      thematics: thematicsCompiled,
      sideEvents: sideEventsCompiled,
      comment: formData.comment,
      agreementNewsletter: formData.agreementNewsletter
    };

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Ошибка при отправке заявки');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submit lead error:', err);
      // In local dev without Vercel Serverless runtime, provide friendly simulation
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(err.message || 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="part-page">
      {/* Top Sticky Navigation */}
      <nav className="part-nav">
        <div className="part-nav-container">
          <div className="part-nav-left">
            <a 
              href="/" 
              className="part-nav-logo" 
              onClick={(e) => {
                e.preventDefault();
                if (onBackToHome) onBackToHome();
                else window.location.href = '/';
              }}
            >
              <img src="/white-logo.png" alt="RES+ EXPO 2027" />
            </a>

            <button 
              type="button" 
              className="part-back-btn" 
              onClick={() => {
                if (onBackToHome) onBackToHome();
                else {
                  window.history.pushState(null, '', '/');
                  window.location.hash = '';
                  window.location.reload();
                }
              }}
            >
              <ArrowLeft size={16} />
              <span>{t.backToHome}</span>
            </button>
          </div>

          <div className="part-nav-right">
            <a 
              href="https://resnetwork.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="part-network-link"
              title="RES Network"
            >
              <Globe size={16} />
              <span>RES Network</span>
            </a>

            {/* Language Selector Dropdown */}
            <div 
              style={{ position: 'relative' }} 
              onMouseEnter={() => setLangDropdownOpen(true)}
              onMouseLeave={() => setLangDropdownOpen(false)}
            >
              <div 
                className="lang-switch" 
                onClick={() => setLangDropdownOpen(prev => !prev)}
                style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {currentLang === 'ru' ? 'RUS' : currentLang === 'kk' ? 'KAZ' : currentLang === 'zh' ? '中文' : 'ENG'}
                <ChevronDown size={14} />
              </div>
              {langDropdownOpen && (
                <div className="part-lang-dropdown">
                  {[
                    { code: 'kk', label: 'Қазақша' },
                    { code: 'ru', label: 'Русский' },
                    { code: 'en', label: 'English' },
                    { code: 'zh', label: '中文' }
                  ].map(l => (
                    <div 
                      key={l.code} 
                      className={`part-lang-item ${currentLang === l.code ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(l.code)}
                    >
                      {l.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Top Banner Image (Item 5, matching Screenshot 2) */}
      <div className="part-banner-container">
        <img 
          src="/participation-banner.png" 
          alt="RES+ EXPO 2027 • 5-7th May, 2027 • Astana, Kazakhstan" 
          className="part-banner-img" 
        />
      </div>

      {/* Title & Subtitle Below Banner (Item 5, matching Screenshot 2) */}
      <div className="part-header-text">
        <h1 className="part-page-title">{t.pageTitle}</h1>
        <p className="part-page-subtitle">{t.pageSubtitle}</p>
      </div>

      {/* Main Form Content */}
      <main className="part-content">
        {submitted ? (
          <div className="part-card part-success-card">
            <div className="part-success-icon">✓</div>
            <h2 className="part-success-title">{t.successTitle}</h2>
            <p className="part-success-desc">{t.successDesc}</p>

            <div className="part-summary-box">
              <div className="part-summary-item">
                <span className="part-summary-label">{t.summaryCompany}:</span>
                <span className="part-summary-val">{formData.company}</span>
              </div>
              <div className="part-summary-item">
                <span className="part-summary-label">{t.summaryContact}:</span>
                <span className="part-summary-val">{formData.name} ({formData.jobTitle})</span>
              </div>
              <div className="part-summary-item">
                <span className="part-summary-label">{t.summaryEmailPhone}:</span>
                <span className="part-summary-val">{formData.email} / {formData.phone}</span>
              </div>
              {formData.roles.length > 0 && (
                <div className="part-summary-item">
                  <span className="part-summary-label">{t.summaryRoles}:</span>
                  <span className="part-summary-val">
                    {formData.roles.map(rId => {
                      const rObj = t.roles.find(i => i.id === rId);
                      return rObj ? rObj.title : rId;
                    }).join(', ')}
                  </span>
                </div>
              )}
              {formData.standArea && (
                <div className="part-summary-item">
                  <span className="part-summary-label">{t.summaryArea}:</span>
                  <span className="part-summary-val">{formData.standArea} м²</span>
                </div>
              )}
            </div>

            <button 
              type="button" 
              className="part-submit-btn"
              onClick={() => {
                if (onBackToHome) onBackToHome();
                else window.location.href = '/';
              }}
            >
              <ArrowLeft size={18} />
              <span>{t.backBtn}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Card 1: Контакты (все плейсхолдеры убраны по пункту 1) */}
            <div className="part-card">
              <div className="part-card-header">
                <div className="part-card-num">1</div>
                <div>
                  <h2 className="part-card-title">{t.card1Title}</h2>
                  <div className="part-card-subtitle">{t.card1Subtitle}</div>
                </div>
              </div>

              <div className="part-grid-2">
                <div className="part-field">
                  <label className="part-label" htmlFor="inp-company">
                    {t.companyLabel} <span className="part-req">*</span>
                  </label>
                  <input
                    id="inp-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="part-input"
                    required
                  />
                </div>

                <div className="part-field">
                  <label className="part-label" htmlFor="inp-countryCity">
                    {t.countryCityLabel} <span className="part-req">*</span>
                  </label>
                  <input
                    id="inp-countryCity"
                    type="text"
                    name="countryCity"
                    value={formData.countryCity}
                    onChange={handleInputChange}
                    className="part-input"
                    required
                  />
                </div>

                <div className="part-field full-width">
                  <label className="part-label" htmlFor="inp-website">
                    {t.websiteLabel}
                  </label>
                  <input
                    id="inp-website"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="part-input"
                  />
                </div>

                <div className="part-field">
                  <label className="part-label" htmlFor="inp-name">
                    {t.nameLabel} <span className="part-req">*</span>
                  </label>
                  <input
                    id="inp-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="part-input"
                    required
                  />
                </div>

                <div className="part-field">
                  <label className="part-label" htmlFor="inp-jobTitle">
                    {t.jobTitleLabel} <span className="part-req">*</span>
                  </label>
                  <input
                    id="inp-jobTitle"
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="part-input"
                    required
                  />
                </div>

                <div className="part-field">
                  <label className="part-label" htmlFor="inp-email">
                    {t.emailLabel} <span className="part-req">*</span>
                  </label>
                  <input
                    id="inp-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="part-input"
                    required
                  />
                </div>

                <div className="part-field">
                  <label className="part-label" htmlFor="inp-phone">
                    {t.phoneLabel} <span className="part-req">*</span>
                  </label>
                  <input
                    id="inp-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="part-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Кем вы хотите участвовать? */}
            <div className="part-card">
              <div className="part-card-header">
                <div className="part-card-num">2</div>
                <div>
                  <h2 className="part-card-title">{t.card2Title}</h2>
                  <div className="part-card-subtitle">{t.card2Subtitle}</div>
                </div>
              </div>

              <div className="part-options-grid">
                {t.roles.map((role) => {
                  const isChecked = formData.roles.includes(role.id);
                  return (
                    <label key={role.id} className={`part-opt-card ${isChecked ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRoleId(role.id)}
                        className="part-opt-checkbox"
                      />
                      <div className="part-opt-text">
                        <div className="part-opt-title">{role.title}</div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Other role option (плейсхолдер убран по пункту 2) */}
              <div style={{ marginTop: '1.25rem' }}>
                <label className="part-label" htmlFor="inp-otherRole">
                  {t.otherRoleLabel}
                </label>
                <input
                  id="inp-otherRole"
                  type="text"
                  name="otherRole"
                  value={formData.otherRole}
                  onChange={handleInputChange}
                  className="part-input"
                  style={{ marginTop: '0.4rem' }}
                />
              </div>

              {/* EXPANDABLE: Если Экспонент */}
              {isExhibitorSelected && (
                <div className="part-subblock">
                  <div className="part-subblock-title">
                    <span>📐</span>
                    <span>{t.exhibitorSectionTitle}</span>
                  </div>

                  <div className="part-grid-2">
                    <div className="part-field">
                      <label className="part-label" htmlFor="inp-standArea">
                        {t.standAreaLabel}
                      </label>
                      <input
                        id="inp-standArea"
                        type="number"
                        min="6"
                        max="2000"
                        step="1"
                        name="standArea"
                        value={formData.standArea}
                        onChange={handleInputChange}
                        placeholder={t.standAreaPlaceholder || 'Например: 18'}
                        className="part-input"
                      />
                    </div>

                    <div className="part-field">
                      <label className="part-label">{t.standTypeLabel}</label>
                      <div className="part-pills-row">
                        {t.standTypes.map((type, idx) => (
                          <button
                            type="button"
                            key={type}
                            className={`part-pill-btn ${formData.standType === idx ? 'active' : ''}`}
                            onClick={() => setFormData(p => ({ ...p, standType: idx }))}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="part-field full-width">
                      <label className="part-label" htmlFor="inp-standDescription">
                        {t.standDescLabel}
                      </label>
                      <textarea
                        id="inp-standDescription"
                        name="standDescription"
                        value={formData.standDescription}
                        onChange={handleInputChange}
                        className="part-textarea"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* EXPANDABLE: Если Спикер */}
              {isSpeakerSelected && (
                <div className="part-subblock">
                  <div className="part-subblock-title">
                    <span>🎤</span>
                    <span>{t.speakerSectionTitle}</span>
                  </div>

                  <div className="part-grid-1">
                    <div className="part-field">
                      <label className="part-label">{t.speakerVenueLabel}</label>
                      <div className="part-pills-row">
                        {t.speakerVenues.map((venue, idx) => (
                          <button
                            type="button"
                            key={venue}
                            className={`part-pill-btn ${formData.speakerVenue === idx ? 'active' : ''}`}
                            onClick={() => setFormData(p => ({ ...p, speakerVenue: idx }))}
                          >
                            {venue}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="part-field">
                      <label className="part-label" htmlFor="inp-speakerTopic">
                        {t.speakerTopicLabel}
                      </label>
                      <textarea
                        id="inp-speakerTopic"
                        name="speakerTopic"
                        value={formData.speakerTopic}
                        onChange={handleInputChange}
                        className="part-textarea"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Card 3: Направления */}
            <div className="part-card">
              <div className="part-card-header">
                <div className="part-card-num">3</div>
                <div>
                  <h2 className="part-card-title">{t.card3Title}</h2>
                  <div className="part-card-subtitle">{t.card3Subtitle}</div>
                </div>
              </div>

              <div className="part-options-grid">
                {t.thematics.map((dir) => {
                  const isChecked = formData.thematics.includes(dir.id);
                  return (
                    <label key={dir.id} className={`part-opt-card ${isChecked ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleThematicId(dir.id)}
                        className="part-opt-checkbox"
                      />
                      <div className="part-opt-text">
                        <div className="part-opt-title">{dir.title}</div>
                        <div className="part-opt-desc">{dir.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Card 4: Side events */}
            <div className="part-card">
              <div className="part-card-header">
                <div className="part-card-num">4</div>
                <div>
                  <h2 className="part-card-title">{t.card4Title}</h2>
                  <div className="part-card-subtitle">{t.card4Subtitle}</div>
                </div>
              </div>

              <div className="part-options-grid">
                {t.sideEvents.map((event, idx) => {
                  const isChecked = formData.sideEvents.includes(idx);
                  return (
                    <label key={idx} className={`part-opt-card ${isChecked ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSideEventIndex(idx)}
                        className="part-opt-checkbox"
                      />
                      <div className="part-opt-text">
                        <div className="part-opt-title">{event}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Card 5: Завершение */}
            <div className="part-card">
              <div className="part-card-header">
                <div className="part-card-num">5</div>
                <div>
                  <h2 className="part-card-title">{t.card5Title}</h2>
                  <div className="part-card-subtitle">{t.card5Subtitle}</div>
                </div>
              </div>

              <div className="part-field" style={{ marginBottom: '1.75rem' }}>
                <label className="part-label" htmlFor="inp-comment">{t.commentLabel}</label>
                <textarea
                  id="inp-comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="part-textarea"
                  rows={3}
                />
              </div>

              <label className="part-consent-row">
                <input
                  type="checkbox"
                  name="agreementPolicy"
                  checked={formData.agreementPolicy}
                  onChange={handleInputChange}
                  className="part-opt-checkbox"
                  required
                />
                <span className="part-consent-text">
                  {t.policyAgreement} <a href="/policy" target="_blank" rel="noopener noreferrer">{t.policyLink}</a> <span className="part-req">*</span>
                </span>
              </label>

              <label className="part-consent-row">
                <input
                  type="checkbox"
                  name="agreementNewsletter"
                  checked={formData.agreementNewsletter}
                  onChange={handleInputChange}
                  className="part-opt-checkbox"
                />
                <span className="part-consent-text">
                  {t.newsletterAgreement}
                </span>
              </label>
            </div>

            {/* Submit error if any */}
            {submitError && (
              <div className="part-error-box">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <div className="part-actions">
              <button
                type="submit"
                className="part-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="video-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px', display: 'inline-block' }}></div>
                    <span>{t.submittingBtn}</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenModal={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  );
};

export default ParticipationPage;
