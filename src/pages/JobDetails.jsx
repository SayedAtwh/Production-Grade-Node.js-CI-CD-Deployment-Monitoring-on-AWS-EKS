import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Building2, Clock, ChevronRight, Briefcase, Share2, ExternalLink, FileText, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { formatTimeAgo } from '../utils/timeUtils';
import '../App.css';

function JobDetails({ jobsData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [applyStatus, setApplyStatus] = useState(null); // null, 'pending', 'applied'

  // Find the exact job by ID
  const job = jobsData.find(j => j.id === parseInt(id));

  // Scroll to top when loading the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!job) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2>عذراً، الوظيفة غير موجودة!</h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>قد تكون الوظيفة قد حذفت أو انتهت فترة التقديم عليها.</p>
        <button
          onClick={() => navigate('/')}
          className="search-btn"
          style={{ margin: '2rem auto', display: 'flex', width: 'fit-content' }}>
          العودة للرئيسية
        </button>
      </div>
    );
  }

  const generateRequirements = (category) => {
    switch (category) {
      case 'تكنولوجيا المعلومات':
        return ['خبرة عملية في تطوير البرمجيات', 'إجادة لغات البرمجة المطلوبة للمنصب', 'القدرة على حل المشكلات التقنية المعقدة', 'مهارات تواصل ممتازة والقدرة على العمل ضمن فريق'];
      case 'تسويق':
        return ['خبرة في إطلاق وإدارة الحملات الإعلانية', 'فهم عميق لتحليل البيانات (Google Analytics)', 'مهارات الإبداع والابتكار في كتابة المحتوى', 'إجادة التعامل مع منصات التواصل الاجتماعي'];
      default:
        return ['خبرة مثبتة في نفس المجال لا تقل عن سنتين', 'القدرة على تحمل ضغط العمل وتحقيق الأهداف', 'مهارات تواصل فائقة وروح المبادرة', 'إجادة اللغتين العربية والإنجليزية'];
    }
  };

  const requirements = generateRequirements(job.category);

  return (
    <div className="job-details-page" style={{ minHeight: '80vh', padding: '2rem 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>{t('home')}</Link>
          <ChevronRight size={14} />
          <span>{job.title}</span>
        </div>

        <div className="details-grid-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>

          {/* Main Content */}
          <div className="main-details" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>

            {/* Header Info */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '12px', backgroundColor: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)',
                fontSize: '1.5rem', fontWeight: '900', flexShrink: 0
              }}>
                {job.logo || job.company.substring(0, 2)}
              </div>

              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  {job.title}
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem' }}>
                  {job.company}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={16} /> {job.city}، {job.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Building2 size={16} /> {job.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> {formatTimeAgo(job.date)}</span>
                </div>
              </div>
            </div>

            {/* Description section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={20} color="var(--primary)" />
                وصف الوظيفة
              </h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                {job.description ? job.description : (
                  <>
                    نحن في شركة <strong>{job.company}</strong> نبحث عن <strong>{job.title}</strong> موهوب ومتحمس للانضمام إلى فريقنا المتنامي في <strong>{job.city}</strong>. ستلعب دوراً رئيسياً في تطوير أعمالنا وتحقيق أهدافنا الاستراتيجية. نحن نوفر بيئة عمل محفزة وفرصاً حقيقية للنمو والتطور المهني.
                  </>
                )}
              </p>
            </div>

            {/* Requirements section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="var(--primary)" />
                المهارات والمتطلبات
              </h3>
              <ul style={{ paddingRight: '1.5rem', lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                {requirements.map((req, idx) => (
                  <li key={`req-${idx}-${req.substring(0, 10)}`} style={{ marginBottom: '0.5rem' }}>{req}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="apply-external-btn" style={{ padding: '1rem 2rem', background: '#f1f5f9', color: 'var(--text-main)', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                الموقع الأصلي <ExternalLink size={18} />
              </a>
              <button className="icon-btn" style={{ background: '#f1f5f9', borderRadius: '50px', padding: '1rem' }}>
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-details" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>


            {/* Apply Card */}
            <div className="glass-card" style={{ padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem' }}>تقديم سريع</h3>
              {applyStatus === 'applied' ? (
                <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                  <CheckCircle size={32} style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 'bold' }}>تم التقديم بنجاح!</p>
                </div>
              ) : (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-link-btn"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '50px',
                    background: 'var(--primary)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  لينك التقديم <ExternalLink size={18} />
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
