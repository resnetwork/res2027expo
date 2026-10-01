import React, { useState } from 'react';
import './SpeakersSection.css';
import { useLanguage } from '../contexts/LanguageContext';

const speakers = [
  {
    name: 'Саясат Нурбек',
    title: 'Министр науки и высшего образования Республики Казахстан',
    image: '/speakers/speaker1.jpeg'
  },
  {
    name: 'Жомарт Алиев',
    title: 'Вице-министр экологии и природных ресурсов Республики Казахстан',
    image: '/speakers/speaker2.jpg'
  },
  {
    name: 'Tomas Lamanauskas',
    title: 'Заместитель Генерального секретаря Международного союза электросвязи (ITU), ООН',
    image: '/speakers/speaker3.jpg'
  },
  {
    name: 'Gayane Minasyan',
    title: 'Региональный менеджер по вопросам окружающей среды, регион Европы и Центральной Азии, Всемирный банк',
    image: '/speakers/speaker4.webp'
  },
  {
    name: 'Rashad Allahverdiyev',
    title: 'Руководитель аппарата Министерства экологии и природных ресурсов Азербайджанской Республики',
    image: '/speakers/speaker5.jpg'
  },
  {
    name: 'Gulnoza Callens',
    title: 'Директор представительства Французского агентства развития (AFD) в Казахстане',
    image: '/speakers/speaker6.jpg'
  },
  {
    name: 'Giorgio Pompilio',
    title: 'Временный поверенный в делах Швейцарии в Республике Казахстан и Республике Таджикистан',
    image: '/speakers/speaker7.jpg'
  },
  {
    name: 'Асель Тасмагамбетова',
    title: 'Основатель Центрально-Азиатского института экологических исследований (ЦАИЭИ)',
    image: '/speakers/speaker8.jpeg'
  },
  {
    name: 'Талгат Торебеков',
    title: 'Директор департамента охраны окружающей среды, Eurasian Resources Group (ERG) в Казахстане',
    image: '/speakers/speaker9.jpeg'
  },
  {
    name: 'Айжан Балабатырова',
    title: 'Председатель правления, ТОО «KAZ Minerals Management»',
    image: '/speakers/speaker10.jpg'
  },
  {
    name: 'Цзоминь У (Ziomin Wu)',
    title: 'Руководитель международного бизнеса, Li Auto',
    image: '/speakers/speaker11.jpeg'
  },
  {
    name: 'Юлия Якупбаева',
    title: 'Председатель Совета по устойчивому развитию, НПП «Атамекен»',
    image: '/speakers/speaker12.webp'
  },
  {
    name: 'Арман Кашкинбеков',
    title: 'Генеральный директор SUNEL Energy Kazakhstan, почётный гендиректор Ассоциации возобновляемой энергетики Казахстана',
    image: '/speakers/speaker13.jpg'
  },
  {
    name: 'Кундус Кырбашева',
    title: 'Председатель Ассоциации зелёных электростанций ВИЭ Кыргызской Республики',
    image: '/speakers/speaker14.jpg'
  },
  {
    name: 'Жулдыз Саулебекова',
    title: 'Генеральный директор, Almaty Air Initiative / Taza Initiative',
    image: '/speakers/speaker15.jpg'
  },
  {
    name: 'Манас Гиждуаниев',
    title: 'Генеральный директор Центра зеленых финансов МФЦА',
    image: '/speakers/speaker16.png'
  }
];

const SpeakersSection = () => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useLanguage();
  
  const displayedSpeakers = showAll ? speakers : speakers.slice(0, 10);

  return (
    <section className="speakers-section bg-white section-padding" id="speakers">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">{t('speakers.title')}</h2>
          <p className="section-subtitle" style={{ color: 'var(--text-muted)' }}>
            {t('speakers.subtitle')}
          </p>
        </div>

        <div className="speakers-grid">
          {displayedSpeakers.map((speaker, idx) => {
            const roles = t('speakers.roles');
            const names = t('speakers.names');
            const roleText = Array.isArray(roles) ? roles[idx] : speaker.title;
            const nameText = Array.isArray(names) ? names[idx] : speaker.name;
            return (
              <div className="speaker-card" key={idx}>
                <div className="speaker-image-wrapper">
                  <img src={speaker.image} alt={nameText} className="speaker-image" />
                </div>
                <div className="speaker-info">
                  <h4 className="speaker-name">{nameText}</h4>
                  <p className="speaker-title">{roleText}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="speakers-action">
          {!showAll ? (
            <button 
              className="btn btn-outline" 
              onClick={() => setShowAll(true)}
            >
              {t('speakers.showAll')}
            </button>
          ) : (
            <button 
              className="btn btn-outline" 
              onClick={() => {
                setShowAll(false);
                // Optionally scroll back to the top of the speakers section
                document.getElementById('speakers')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('speakers.hide')}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
