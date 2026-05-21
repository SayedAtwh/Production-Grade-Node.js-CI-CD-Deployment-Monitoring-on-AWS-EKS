import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Users, CheckCircle, XCircle, Clock, ExternalLink, ChevronRight, Trash2, Globe, MapPin, TrendingUp, Eye } from 'lucide-react';
import '../App.css';

export default function EmployerDashboard({ jobsData, handleDeleteJob, currentUser, isAdmin }) {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState('الكل');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'jobs', 'applicants'

  // Get all unique countries from jobs data
  const allCountries = ['الكل', ...new Set(jobsData.map(job => job.location))];

  // Filter jobs by selected country
  const filteredJobs = selectedCountry === 'الكل' 
    ? jobsData 
    : jobsData.filter(job => job.location === selectedCountry);

  // Group jobs by country for overview
  const jobsByCountry = allCountries.slice(1).map(country => ({
    name: country,
    jobs: jobsData.filter(job => job.location === country),
    count: jobsData.filter(job => job.location === country).length
  }));

  const mockApplicants = [
    { id: 1, name: 'أحمد علي', email: 'ahmed@example.com', job: 'Frontend Developer', date: '2024-03-01', status: 'pending', match: 85 },
    { id: 2, name: 'سارة حسن', email: 'sara@example.com', job: 'Backend Developer', date: '2024-03-02', status: 'interview', match: 92 },
    { id: 3, name: 'محمد محمود', email: 'mo@example.com', job: 'UI/UX Designer', date: '2024-03-03', status: 'rejected', match: 45 },
  ];

  const canDeleteJob = (job) => {
    // Admin can delete any job
    // Owner can delete their own job
    // Jobs without owner can only be deleted by admin
    return isAdmin || (user && job.owner === currentUser);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="status-badge" style={{ background: '#fef3c7', color: '#92400e' }}>قيد الانتظار</span>;
      case 'interview': return <span className="status-badge" style={{ background: '#dcfce7', color: '#166534' }}>مقابلة</span>;
      case 'rejected': return <span className="status-badge" style={{ background: '#fee2e2', color: '#991b1b' }}>مرفوض</span>;
      default: return null;
    }
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem' }}>
      {/* Header */}
      <header className="dashboard-header" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)', padding: '1.5rem', borderRadius: '20px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>لوحة تحكم مسار</h1>
            <p style={{ fontSize: '1rem', opacity: 0.9, margin: 0 }}>أهلاً بك، {user?.username}. إدارة شاملة لكل الوظائف والبلدان</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(10px)', minWidth: '100px', flex: '1' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>{jobsData.length}</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>إجمالي الوظائف</p>
            </div>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(10px)', minWidth: '100px', flex: '1' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>{allCountries.length - 1}</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>بلد نشط</p>
            </div>
            <div className="stat-card" style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(10px)', minWidth: '100px', flex: '1' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>{mockApplicants.length}</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>متقدم جديد</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0', overflowX: 'auto', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('overview')}
          className={`dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`}
          style={{
            padding: '0.75rem 1rem',
            background: activeTab === 'overview' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'overview' ? 'white' : 'var(--text-main)',
            border: 'none',
            borderRadius: '12px 12px 0 0',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'var(--transition)',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap'
          }}
        >
          <TrendingUp size={16} style={{ marginLeft: '0.5rem' }} />
          نظرة عامة
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`dashboard-tab ${activeTab === 'jobs' ? 'active' : ''}`}
          style={{
            padding: '0.75rem 1rem',
            background: activeTab === 'jobs' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'jobs' ? 'white' : 'var(--text-main)',
            border: 'none',
            borderRadius: '12px 12px 0 0',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'var(--transition)',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap'
          }}
        >
          <Briefcase size={16} style={{ marginLeft: '0.5rem' }} />
          كل الوظائف
        </button>
        <button
          onClick={() => setActiveTab('applicants')}
          className={`dashboard-tab ${activeTab === 'applicants' ? 'active' : ''}`}
          style={{
            padding: '0.75rem 1rem',
            background: activeTab === 'applicants' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'applicants' ? 'white' : 'var(--text-main)',
            border: 'none',
            borderRadius: '12px 12px 0 0',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'var(--transition)',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap'
          }}
        >
          <Users size={16} style={{ marginLeft: '0.5rem' }} />
          المتقدمين
        </button>
      </div>

      {/* Content */}
      {activeTab === 'overview' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {jobsByCountry.map(country => (
            <div key={country.name} className="glass-card" style={{ padding: '2rem', borderRadius: '20px', transition: 'var(--transition)', cursor: 'pointer' }}
                 onClick={() => { setSelectedCountry(country.name); setActiveTab('jobs'); }} >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Globe size={24} color="var(--primary)" />
                  {country.name}
                </h3>
                <span style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: '700' }}>
                  {country.count} وظيفة
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {country.jobs.slice(0, 3).map(job => (
                  <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: '#f8fafc', borderRadius: '8px' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem' }}>{job.title}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{job.company} • {job.city}</p>
                    </div>
                    <ChevronRight size={16} color="var(--primary)" />
                  </div>
                ))}
                {country.jobs.length > 3 && (
                  <p style={{ margin: '1rem 0 0 0', textAlign: 'center', color: 'var(--primary)', fontWeight: '600' }}>
                    +{country.jobs.length - 3} وظائف أخرى
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'jobs' ? (
        <div>
          {/* Country Filter */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {allCountries.map(country => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: selectedCountry === country ? 'var(--primary)' : 'white',
                  color: selectedCountry === country ? 'white' : 'var(--text-main)',
                  border: selectedCountry === country ? 'none' : '1px solid #e2e8f0',
                  borderRadius: '25px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {country === 'الكل' ? <Globe size={16} /> : <MapPin size={16} />}
                {country}
                {country !== 'الكل' && (
                  <span style={{ background: selectedCountry === country ? 'rgba(255,255,255,0.3)' : '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '10px', fontSize: '0.8rem' }}>
                    {jobsData.filter(job => job.location === country).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Jobs List */}
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredJobs.map(job => (
              <div key={job.id} className="glass-card" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'var(--transition)' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
                  {canDeleteJob(job) && (
                    <button
                      onClick={() => handleDeleteJob(job.id, currentUser)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        transition: 'var(--transition)'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#fee2e2'}
                      onMouseOut={(e) => e.target.style.background = 'none'}
                      title="حذف الوظيفة"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontSize: '1.2rem',
                    fontWeight: '900'
                  }}>
                    {job.logo || job.company.substring(0, 2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: '800' }}>{job.title}</h3>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {job.company} • {job.city}, {job.location}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span>{job.category}</span>
                      <span>•</span>
                      <span>{job.date}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" style={{ color: 'var(--primary)' }}>
                    <Eye size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ overflowX: 'auto', borderRadius: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ padding: '1rem' }}>الاسم</th>
                <th style={{ padding: '1rem' }}>الوظيفة</th>
                <th style={{ padding: '1rem' }}>نسبة المطابقة</th>
                <th style={{ padding: '1rem' }}>الحالة</th>
                <th style={{ padding: '1rem' }}>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {mockApplicants.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>
                    <strong>{app.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{app.email}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{app.job}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{
                      width: '60px',
                      height: '6px',
                      background: '#e2e8f0',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      marginTop: '5px'
                    }}>
                      <div style={{ width: `${app.match}%`, height: '100%', background: app.match > 80 ? '#10b981' : app.match > 60 ? '#f59e0b' : '#ef4444', borderRadius: '10px' }}></div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '3px' }}>{app.match}%</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{getStatusBadge(app.status)}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="icon-btn" style={{ color: '#10b981' }}>
                        <CheckCircle size={16} />
                      </button>
                      <button className="icon-btn" style={{ color: '#ef4444' }}>
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
