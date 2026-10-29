import React, { useState, useEffect } from 'react';
import './BookingModal.css';
import { useLanguage } from '../contexts/LanguageContext';

const BookingModal = ({ isOpen, onClose, initialOption = 'Забронировать стенд', initialArea = '' }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    intent: initialOption,
    standArea: initialArea || '',
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
      setFormData(prev => ({
        ...prev,
        intent: initialOption,
        ...(initialArea ? { standArea: initialArea } : {})
      }));
    }
  }, [initialOption, initialArea]);

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

  const isStandBooking =
    formData.intent === 'Забронировать стенд' ||
    formData.intent?.toLowerCase().includes('стенд') ||
    formData.intent?.toLowerCase().includes('stand') ||
    formData.intent?.toLowerCase().includes('展位');

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
              <h3 className="bm-title">{t('bookingModal.successTitle')}</h3>
              <p className="bm-subtitle">{t('bookingModal.successSubtitle')}</p>
              <button 
                type="button" 
                className="bm-submit-btn" 
                style={{ marginTop: '1.5rem' }} 
                onClick={onClose}
              >
                {t('bookingModal.closeBtn')}
              </button>
            </div>
          ) : (
            <>
              <h3 className="bm-title">{t('bookingModal.title')}</h3>
              <p className="bm-subtitle">{t('bookingModal.subtitle')}</p>

              <form onSubmit={handleSubmit} className="bm-form">
                <div className="bm-field">
                  <label htmlFor="bm-intent" className="bm-label">{t('bookingModal.intentLabel')}</label>
                  <div className="bm-select-wrapper">
                    <select
                      id="bm-intent"
                      name="intent"
                      value={formData.intent}
                      onChange={handleChange}
                      className="bm-select"
                    >
                      <option value="Стать партнером">{t('bookingModal.intentOptions.partner')}</option>
                      <option value="Забронировать стенд">{t('bookingModal.intentOptions.stand')}</option>
                      <option value="Стать спикером">{t('bookingModal.intentOptions.speaker')}</option>
                    </select>
                  </div>
                </div>

                {isStandBooking && (
                  <div className="bm-field bm-area-field">
                    <label htmlFor="bm-area" className="bm-label">
                      {t('bookingModal.standAreaLabel')}
                    </label>
                    <div className="bm-area-box">
                      <input
                        type="number"
                        id="bm-area"
                        name="standArea"
                        value={formData.standArea}
                        onChange={handleChange}
                        placeholder={t('bookingModal.standAreaPlaceholder')}
                        min="1"
                        max="10000"
                        step="1"
                        inputMode="numeric"
                        className="bm-input bm-area-input"
                        required
                      />
                      <span className="bm-area-unit">{t('bookingModal.standAreaUnit') || 'м²'}</span>
                    </div>
                    <span className="bm-hint">{t('bookingModal.standAreaHint')}</span>
                  </div>
                )}

                <div className="bm-field">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('bookingModal.namePlaceholder')}
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
                    placeholder={t('bookingModal.emailPlaceholder')}
                    className="bm-input"
                    required
                  />
                </div>

                <div className="bm-field">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={t('bookingModal.phonePlaceholder') || 'Номер телефона'}
                    className="bm-input"
                    required
                  />
                </div>

                <div className="bm-field">
                  <textarea
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('bookingModal.companyPlaceholder')}
                    rows={2}
                    className="bm-textarea"
                  />
                </div>

                <div className="bm-field">
                  <textarea
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder={t('bookingModal.countryPlaceholder')}
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
                  {isSubmitting ? t('bookingModal.submittingBtn') : t('bookingModal.submitBtn')}
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
