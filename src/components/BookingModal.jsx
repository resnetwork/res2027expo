import React, { useState, useEffect } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, initialOption = 'Забронировать стенд' }) => {
  const [formData, setFormData] = useState({
    intent: initialOption,
    name: '',
    email: '',
    phone: '',
    company: '',
    country: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (initialOption) {
      setFormData(prev => ({ ...prev, intent: initialOption }));
    }
  }, [initialOption]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    setFormData(prev => ({ ...prev, phone: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Ошибка при отправке заявки');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submit lead error:', err);
      if (window.location.hostname === 'localhost') {
        // Helpful fallback in local Vite without Vercel backend
        setSubmitted(true);
      } else {
        setSubmitError(err.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
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
    <div className="bm-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <button 
        className="bm-close-btn" 
        onClick={onClose} 
        aria-label="Закрыть"
      >
        &times;
      </button>

      <div className="bm-dialog">
        {/* Top Dark Green Banner with White Logo */}
        <div className="bm-header">
          <img src="/white-logo.png" alt="RES EXPO" className="bm-logo" />
        </div>

        {/* Modal Body */}
        <div className="bm-body">
          {submitted ? (
            <div className="bm-success-state">
              <div className="bm-success-icon">✓</div>
              <h3 className="bm-title">Заявка принята!</h3>
              <p className="bm-subtitle">Спасибо! Мы свяжемся с Вами в ближайшее время.</p>
              <button 
                type="button" 
                className="bm-submit-btn" 
                style={{ marginTop: '1.5rem' }} 
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <h3 className="bm-title">Оставьте заявку</h3>
              <p className="bm-subtitle">Мы обязательно с Вами свяжемся</p>

              <form onSubmit={handleSubmit} className="bm-form">
                <div className="bm-field">
                  <label htmlFor="bm-intent" className="bm-label">Вы хотите:</label>
                  <div className="bm-select-wrapper">
                    <select
                      id="bm-intent"
                      name="intent"
                      value={formData.intent}
                      onChange={handleChange}
                      className="bm-select"
                    >
                      <option value="Стать партнером">Стать партнером</option>
                      <option value="Забронировать стенд">Забронировать стенд</option>
                      <option value="Стать спикером">Стать спикером</option>
                    </select>
                  </div>
                </div>

                <div className="bm-field">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ФИО"
                    className="bm-input"
                    required
                  />
                </div>

                <div className="bm-field">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="bm-input"
                    required
                  />
                </div>

                <div className="bm-field">
                  <div className="bm-phone-box">
                    <div className="bm-flag-wrap">
                      <svg width="22" height="15" viewBox="0 0 24 16" className="bm-flag-svg">
                        <rect width="24" height="16" fill="#00afca" rx="2" />
                        <circle cx="12" cy="8" r="3.2" fill="#fed100" />
                        <path d="M7 8.5 C 9.5 11.2, 14.5 11.2, 17 8.5 C 14.5 9.8, 9.5 9.8, 7 8.5 Z" fill="#fed100" />
                      </svg>
                      <span className="bm-flag-caret">▾</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (000) 000-00-00"
                      className="bm-phone-input"
                      required
                    />
                  </div>
                </div>

                <div className="bm-field">
                  <textarea
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Название компании"
                    rows={2}
                    className="bm-textarea"
                  />
                </div>

                <div className="bm-field">
                  <textarea
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Страна"
                    rows={2}
                    className="bm-textarea"
                  />
                </div>

                {submitError && (
                  <div style={{ color: '#ef4444', fontSize: '0.88rem', textAlign: 'center', margin: '4px 0' }}>
                    {submitError}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="bm-submit-btn" 
                  disabled={isSubmitting}
                  style={isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
