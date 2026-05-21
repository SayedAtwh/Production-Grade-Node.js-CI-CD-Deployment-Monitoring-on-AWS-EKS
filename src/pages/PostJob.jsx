import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Building2, MapPin, Briefcase, AlignLeft, Link as LinkIcon, CheckCircle, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getCurrentDateTime } from '../utils/timeUtils';

export default function PostJob({ handleAddJob, handleDeleteJob }) {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  console.log('PostJob component loaded, user:', user);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'مصر',
    city: '',
    category: 'تكنولوجيا المعلومات',
    type: 'دوام كامل',
    experience: 'مبتدئ',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    applyUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Redirect to login if not logged in
  React.useEffect(() => {
    console.log('PostJob useEffect - User:', user);
  }, [user]);

  if (!user) {
    console.log('PostJob - Showing login required message');
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '500px'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: '#ef4444' }}>
            ⚠️ يجب تسجيل الدخول أولاً
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            لإضافة وظيفة جديدة، يجب أن تسجل دخولك أولاً في الموقع.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '1rem 2rem',
                background: '#6b7280',
                color: 'white',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('يجب تسجيل الدخول أولاً');
      return;
    }

    // Construct new job object
    const newJob = {
      id: Date.now(),
      ...formData,
      date: getCurrentDateTime(),
      logo: formData.company.substring(0, 2).toUpperCase(),
      owner: user.username,
      ownerId: user.username
    };

    // Add to global state
    handleAddJob(newJob);

    console.log('New Job Added:', newJob);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{
          background: 'white',
          padding: '4rem',
          borderRadius: '32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'var(--accent)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            color: 'var(--primary)'
          }}>
            <CheckCircle size={40} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>تم استلام طلبك! ✨</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            شكراً لانضمامك إلينا. سيقوم فريق مسار بمراجعة تفاصيل الوظيفة ونشرها خلال 24 ساعة.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              padding: '1rem 2.5rem',
              background: 'var(--primary)',
              color: 'white',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '1.1rem'
            }}
          >
            نشر وظيفة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', padding: '4rem 0', background: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            padding: '0.8rem 1.5rem',
            background: 'var(--accent)',
            color: 'var(--primary)',
            borderRadius: '50px',
            fontWeight: '800',
            marginBottom: '1.5rem',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Rocket size={18} />
            <span>لأصحاب الأعمال</span>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem' }}>اجذب أفضل المواهب</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>انشر وظيفتك الآن لتصل إلى الملايين من الكوادر المؤهلة في الوطن العربي.</p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                <Briefcase size={18} color="var(--primary)" /> المسمى الوظيفي
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="مثال: مطور ويب جافاسكريبت"
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                <Building2 size={18} color="var(--primary)" /> اسم الشركة
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="مثال: شركة مسار للتقنية"
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                <MapPin size={18} color="var(--primary)" /> الدولة
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
              >
                <option value="السعودية">السعودية</option>
                <option value="مصر">مصر</option>
                <option value="الإمارات">الإمارات</option>
                <option value="الكويت">الكويت</option>
                <option value="قطر">قطر</option>
                <option value="الجزائر">الجزائر</option>
                <option value="المغرب">المغرب</option>
                <option value="تونس">تونس</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                <MapPin size={18} color="var(--primary)" /> المدينة
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="مثال: الرياض"
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                <Briefcase size={18} color="var(--primary)" /> المجال
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
              >
                {['تكنولوجيا المعلومات', 'تسويق', 'محاسبة', 'مبيعات', 'هندسة', 'إدارة', 'تصميم'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.8rem' }}>
              <AlignLeft size={18} color="var(--primary)" /> وصف الوظيفة
            </label>
            <textarea
              name="description"
              required
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="دخل تفاصيل الوظيفة والمهارات المطلوبة..."
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit', resize: 'vertical' }}
            ></textarea>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.8rem' }}>
              <LinkIcon size={18} color="var(--primary)" /> رابط التقديم
            </label>
            <input
              type="url"
              name="applyUrl"
              required
              value={formData.applyUrl}
              onChange={handleChange}
              placeholder="https://example.com/apply"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
            />
          </div>

          <button type="submit" style={{
            marginTop: '1rem',
            padding: '1.2rem',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            transition: 'var(--transition)'
          }}>
            <Send size={20} />
            نشر الوظيفة الآن
          </button>
        </form>
      </div>
    </div>
  );
}
