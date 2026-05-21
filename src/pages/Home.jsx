import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, ChevronRight, TrendingUp, Rocket, FileText, Building2, ChevronLeft, Clock, Trash2 } from 'lucide-react';
import { useBookmark } from '../context/BookmarkContext';
import { useAuth } from '../context/AuthContext';
import { formatTimeAgo } from '../utils/timeUtils';

function Home({ selectedCountry, searchTerm, setSearchTerm, activeCategory, setActiveCategory, countries, categories, jobsData, handleDeleteJob }) {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCity, setActiveCity] = useState('الكل');
  const { toggleBookmark, isBookmarked } = useBookmark();
  const { user } = useAuth();

  const canDeleteJob = (job) => {
    return user && job.owner === user?.username;
  };
  const jobsPerPage = 10;

  useEffect(() => {
    if (!jobsData || jobsData.length === 0) return;

    let filtered = jobsData.filter(job => job.location === selectedCountry);

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeCategory !== 'الكل') {
      filtered = filtered.filter(job => job.category === activeCategory);
    }

    if (activeCity !== 'الكل') {
      filtered = filtered.filter(job => job.city === activeCity);
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [selectedCountry, searchTerm, activeCategory, activeCity, jobsData]);

  const countryCities = ['الكل', ...new Set(jobsData?.filter(j => j.location === selectedCountry).map(j => j.city) || [])];

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  if (!jobsData || jobsData.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0066cc 0%, #8b5cf6 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem'
          }}></div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>جاري التحميل...</h2>
          <p style={{ opacity: 0.8 }}>يتم تحميل بيانات الوظائف</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade">
          <h1>منصة مسار للوظائف</h1>
          <p>اكتشف أفضل الفرص الوظيفية في 8 دول عربية</p>

          <div className="search-box glass-card animate-fade" style={{ animationDelay: '0.1s' }}>
            <div className="search-input">
              <Briefcase className="input-icon" size={24} />
              <input
                type="text"
                placeholder="ابحث عن وظيفة أو شركة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="divider"></div>
            <div className="country-select">
              <MapPin className="input-icon" size={24} />
              <select value={activeCity} onChange={(e) => setActiveCity(e.target.value)}>
                {countryCities.map(city => (
                  <option key={city} value={city}>{city === 'الكل' ? `كل مدن ${selectedCountry}` : city}</option>
                ))}
              </select>
            </div>
            <button className="search-btn">
              <Search size={24} />
              <span>بحث</span>
            </button>
          </div>

          <div className="stats-container animate-fade" style={{ animationDelay: '0.2s' }}>
            <div className="stat-item">
              <h3>+10,000</h3>
              <p>وظيفة</p>
            </div>
            <div className="stat-item">
              <h3>+5,000</h3>
              <p>شركة</p>
            </div>
            <div className="stat-item">
              <h3>+50,000</h3>
              <p>مستخدم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container">
        <div className="services-grid">
          <Link to="/pathways" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="service-card" style={{ borderTop: '4px solid #8b5cf6' }}>
              <TrendingUp className="service-icon" size={40} color="#8b5cf6" />
              <h4>دليل المسارات المهنية</h4>
              <p>استكشف خريطة طريق لكل تخصص مهني لتصل إلى القمة في مجالك.</p>
              <button className="details-btn" style={{ color: '#8b5cf6' }}>عرض المسارات <ChevronRight size={16} /></button>
            </div>
          </Link>
          <Link to="/ats-checker" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="service-card" style={{ borderTop: '4px solid #6366f1' }}>
              <FileText className="service-icon" size={40} color="#6366f1" />
              <h4>فاحص السيرة الذاتية (ATS)</h4>
              <p>تأكد من توافق سيرتك الذاتية مع أنظمة الفرز الآلي لزيادة فرص قبولك.</p>
              <button className="details-btn" style={{ color: '#6366f1' }}>ابدأ الفحص الآن <ChevronRight size={16} /></button>
            </div>
          </Link>
          <Link to="/salary-indicators" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="service-card" style={{ borderTop: '4px solid #f59e0b', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold' }}>مهم للمفاوضات</div>
              <TrendingUp className="service-icon" size={40} color="#f59e0b" />
              <h4>مؤشرات الرواتب 2025</h4>
              <p>بيانات حقيقية لمتوسط الأجور في 5 دول عربية لتضمن حصولك على الراتب العادل.</p>
              <button className="details-btn" style={{ color: '#f59e0b' }}>استكشف الرواتب <ChevronRight size={16} /></button>
            </div>
          </Link>
          <Link to="/post-job" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="service-card" style={{ borderTop: '4px solid #10b981' }}>
              <Rocket className="service-icon" size={40} color="#10b981" />
              <h4>نشر الوظائف للشركات</h4>
              <p>هل تبحث عن مواهب؟ انشر وظيفتك الآن لتصل إلى الملايين من الكوادر المؤهلة.</p>
              <button className="details-btn" style={{ color: '#10b981' }}>انشر وظيفة <ChevronRight size={16} /></button>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Content (Jobs) */}
      <main className="container main-content">
        <div className="section-header">
          <h2 className="section-title">أحدث الوظائف في {selectedCountry}</h2>
          <span className="results-count">{filteredJobs.length} فرصة وجدناها لك</span>
        </div>

        {/* Category Filter */}
        <div className="categories-filter" style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                whiteSpace: 'nowrap',
                fontWeight: '700',
                background: activeCategory === cat ? '#0066cc' : '#ffffff',
                color: activeCategory === cat ? '#ffffff' : '#64748b',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                border: '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredJobs.length > 0 ? (
          <>
            <div className="jobs-grid">
              {currentJobs.map((job) => {
                const isPlaceholder = !job.applyUrl || job.applyUrl === '#';

                const CardContent = (
                  <>
                    <div className="job-header">
                      <div style={{ display: 'flex', gap: '1.2rem', flex: 1, minWidth: 0 }}>
                        <div className="company-logo">
                          {job.logo || job.company.substring(0, 2)}
                        </div>
                        <div className="job-title-info">
                          <h3>{job.title}</h3>
                          <p className="company-name">{job.company}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleBookmark(job);
                        }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          fontSize: '1.5rem',
                          transition: 'all 0.3s ease',
                          opacity: isBookmarked(job.id) ? 1 : 0.5,
                          flexShrink: 0,
                          zIndex: 10,
                        }}
                        title={isBookmarked(job.id) ? 'إزالة من المحفوظات' : 'حفظ الوظيفة'}
                      >
                        {isBookmarked(job.id) ? '⭐' : '☆'}
                      </button>
                      {canDeleteJob(job) && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (window.confirm('هل أنت متأكد من حذف هذه الوظيفة؟')) {
                              handleDeleteJob(job.id);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.3rem',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            zIndex: 10
                          }}
                          title="حذف وظيفتك"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="job-meta">
                      <span><MapPin size={16} /> {job.city}، {job.location}</span>
                      <span><Building2 size={16} /> {job.category}</span>
                      <span><Clock size={16} /> {formatTimeAgo(job.date)}</span>
                    </div>
                    <div className="job-footer">
                      <span className="category-tag">بدوام كامل</span>
                      <div className="details-btn" style={{ display: 'flex', alignItems: 'center' }}>
                        التفاصيل <ChevronLeft size={16} style={{ marginRight: '5px' }} />
                      </div>
                    </div>
                  </>
                );

                return isPlaceholder ? (
                  <div key={job.id} className="job-card animate-fade no-link" style={{ display: 'block' }}>
                    {CardContent}
                  </div>
                ) : (
                  <Link
                    key={job.id}
                    to={`/job/${job.id}`}
                    className="job-card animate-fade"
                    style={{ display: 'block' }}
                  >
                    {CardContent}
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: currentPage === 1 ? '#f8fafc' : '#ffffff',
                    color: currentPage === 1 ? '#94a3b8' : '#0066cc',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  السابق
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      border: 'none',
                      background: currentPage === i + 1 ? '#0066cc' : '#ffffff',
                      color: currentPage === i + 1 ? '#ffffff' : '#1e293b',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: currentPage === totalPages ? '#f8fafc' : '#ffffff',
                    color: currentPage === totalPages ? '#94a3b8' : '#0066cc',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  التالي
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results animate-fade">
            <Search size={60} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>لم نجد وظائف مطابقة</h3>
            <p>جرب تغيير معايير البحث أو تصفح جميع الوظائف</p>
          </div>
        )}
      </main>

      {/* Floating Action Button (Mobile Only) */}
      <Link to="/post-job" className="mobile-fab mobile-only">
        <Briefcase size={24} />
      </Link>
    </>
  );
}

export default Home;
