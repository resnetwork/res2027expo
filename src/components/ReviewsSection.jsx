import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Participate.css';

const ReviewsSection = () => {
  const scrollRef = useRef(null);

  const reviews = [
    {
      name: 'Талгат Торебеков',
      title: 'Директор Департамента Охраны Окружающей Среды ERG в Казахстане',
      text: '«Экология - это не только технологии. Это еще и культура будущих поколений. Наш проект по бережному отношению к воде уже объединил более 100 школ, а в Рудном мы открыли новую школу с солнечными панелями. Именно поэтому для нас важно участвовать в RES 2026 EXPO - площадке, где обсуждают устойчивое развитие промышленности...»',
      image: '/reviews/torebekov.jpg'
    },
    {
      name: 'Сырым Бекмаганбетов',
      title: 'Исполнительный Директор ТОО "Orkin"',
      text: '«Мы считаем важным участвовать в профессиональных отраслевых событиях, которые формируют требования к санитарной и экологической безопасности. Мы рассчитываем на диалог с представителями промышленности и инфраструктурных проектов, а также на международный обмен опытом, чтобы внедрять комплексные решения по управлению санитарными рисками.»',
      image: '/reviews/bekmaganbetov.jpg'
    },
    {
      name: 'Асет Калиев',
      title: 'Первый Заместитель Генерального Директора РГП "Казгидромет"',
      text: '«Мы продемонстрируем, как современная наука обеспечивает национальную безопасность и устойчивое развитие регионов Казахстана. Приглашаем вас посетить наш стенд. Вас ждет экспертная информация, открытый диалог и только достоверные данные о гидрометеорологическом и экологическом состоянии нашей страны. Будем рады встрече!»',
      image: '/reviews/kaliev.png'
    },
    {
      name: 'Ергулан Талгатович Дуйсекеев',
      title: 'Руководитель Фонда "Global Nature Initiatives"',
      text: '«Региональный экологический саммит 2026 является одной из ключевых международных платформ для принятия реальных решений в сфере экологии, климата и устойчивого развития, способных менять экологическую ситуацию в регионе. Для меня принципиально важно, что Казахстан сегодня является центром «зелёной» трансформации Центральной Азии, объединяя государства, бизнес и инвесторов вокруг будущего, которое формируется уже сейчас.»',
      image: '/reviews/duisekeev.png'
    },
    {
      name: 'Кабдолданов Нуржан Кенесбаевич',
      title: 'Заместитель Председателя Правления АО "Жасыл Даму"',
      text: '«Это будет масштабное мероприятие, объединяющее шесть глав государств стран Центральной Азии. Запланированы крупные панельные сессии на высоком уровне с участием представителей правительств, профильных министерств и ведущих международных партнёров. Выставка предоставит возможность странам Центральной Азии объединиться для обмена технологиями, опытом и передовыми знаниями.»',
      image: '/reviews/kabdoldanov.png'
    },
    {
      name: 'Якупбаева Юлия Константиновна',
      title: 'Председатель совета по устойчивому развитию национальной палаты «Атамекен»',
      text: '«Региональный экологический саммит Центральной Азии — это стратегическая платформа для объединения усилий государств, бизнеса и международных партнёров в поиске практических решений экологических вызовов региона. Проведение саммита в Астане подчёркивает роль Казахстана как активного участника формирования устойчивой экологической повестки и продвижения зелёных технологий.»',
      image: '/reviews/yakupbaeva.png'
    },
    {
      name: 'Zhang Tao',
      title: 'China International Water & Electric Corp. (CWE)',
      text: '«Я с нетерпением жду этого события. Более того, наша компания планирует активно участвовать в выставке, поскольку сфера нашей деятельности в основном связана с водными ресурсами, электроэнергетикой и чистой энергетикой. Мы будем рады внести свой вклад в развитие зелёного сотрудничества между Китаем и Казахстаном.»',
      image: '/reviews/zhang.png'
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="reviews-section bg-green" id="reviews" style={{ padding: '5rem 0' }}>
      <div className="container" style={{ position: 'relative' }}>
        <h2 className="section-title text-inverse" style={{textAlign: 'center', marginBottom: '3rem'}}>ОТЗЫВЫ УЧАСТНИКОВ И ПАРТНЕРОВ</h2>
        
        <div className="carousel-wrapper">
          <button className="carousel-arrow carousel-arrow-left" onClick={() => scroll('left')}>
            <ChevronLeft size={28} />
          </button>
          
          <div className="reviews-carousel" ref={scrollRef}>
            {reviews.map((rev, i) => (
              <div key={i} className="review-card-carousel">
                <div className="review-author" style={{ display: 'flex', marginBottom: '1rem', alignItems: 'flex-start', gap: '1rem', minHeight: '110px' }}>
                  <div style={{ width: '85px', height: '85px', borderRadius: '50%', background: '#eee', flexShrink: 0, overflow: 'hidden' }}>
                    {rev.image ? (
                      <img src={rev.image} alt={rev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#ddd' }}></div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <div style={{ fontWeight: 700, color: 'var(--bg-dark-green)', fontSize: '1rem', marginBottom: '0.3rem', lineHeight: 1.2 }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.4, fontWeight: 500 }}>
                      {rev.title}
                    </div>
                  </div>
                </div>
                <p className="review-quote" style={{ color: '#1a594f', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5, flexGrow: 1 }}>
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
          
          <button className="carousel-arrow carousel-arrow-right" onClick={() => scroll('right')}>
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
