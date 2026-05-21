import React, { useState } from 'react';
import { X, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginModal.css';

function LoginModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.username.trim()) {
      newErrors.username = 'اسم المستخدم مطلوب';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let result;

      if (isLogin) {
        // Login
        result = login(formData.email, formData.password);
      } else {
        // Register
        result = register(formData.username, formData.email, formData.password);
      }

      if (result.success) {
        setSuccessMessage(result.message);
        // Reset form
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setErrors({});

        // Close modal after 1.5 seconds
        setTimeout(() => {
          onClose();
          setSuccessMessage('');
        }, 1500);
      } else {
        // Show error
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'حدث خطأ. حاول مرة أخرى.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>{isLogin ? 'دخول' : 'تسجيل حساب جديد'}</h2>
          <p>{isLogin ? 'رحباً بعودتك' : 'انضم إلى مسار اليوم'}</p>
        </div>

        {successMessage && (
          <div style={{
            padding: '1rem',
            background: '#dcfce7',
            border: '1px solid #86efac',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#166534'
          }}>
            <CheckCircle size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {errors.submit && (
          <div style={{
            padding: '1rem',
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#991b1b'
          }}>
            <AlertCircle size={18} />
            <span>{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">اسم المستخدم</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="أدخل اسم المستخدم"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={errors.username ? 'error' : ''}
                  disabled={isSubmitting}
                />
              </div>
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                disabled={isSubmitting}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="أعد إدخال كلمة المرور"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  disabled={isSubmitting}
                />
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'جاري المعالجة...' : isLogin ? 'دخول' : 'تسجيل'}
          </button>
        </form>

        <div className="modal-footer">
          <span>
            {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
          </span>
          <button
            type="button"
            className="toggle-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ username: '', email: '', password: '', confirmPassword: '' });
              setErrors({});
              setSuccessMessage('');
            }}
            disabled={isSubmitting}
          >
            {isLogin ? 'سجل هنا' : 'ادخل هنا'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
