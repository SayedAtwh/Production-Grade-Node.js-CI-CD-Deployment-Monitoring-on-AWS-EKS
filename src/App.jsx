import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { Globe, ChevronDown, Bell, Menu, X, Rocket, Users, LogOut, Bookmark, CheckSquare, Moon, Sun, Settings } from 'lucide-react';

import { AuthProvider, useAuth } from './context/AuthContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { ATSProvider } from './context/ATSContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Companies from './pages/Companies';
import SavedJobs from './pages/SavedJobs';
import ATSChecker from './pages/ATSChecker';
import Profile from './pages/Profile';
import SalaryIndicators from './pages/SalaryIndicators';
import PostJob from './pages/PostJob';
import Blog from './pages/Blog';
import EmployerDashboard from './pages/EmployerDashboard';
import CareerPathways from './pages/CareerPathways';
import AboutMasar from './pages/AboutMasar';
import LoginModal from './components/LoginModal';
import EmailNotification from './components/EmailNotification';
import BottomNav from './components/BottomNav';
import logoImg from './assets/logo.jpg';
import { jobsData as initialJobsData } from './data/jobsData';
import { parseArabicRelativeTimeToTimestamp } from './utils/timeUtils';

// Admin code for dashboard access
const ADMIN_CODE = 'nada2020';

// Check if admin code is in URL
const getAdminCodeFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('admin');
};

function AppContent() {
  const [selectedCountry, setSelectedCountry] = useState('السعودية');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [allJobs, setAllJobs] = useState(() => {
    const savedJobs = localStorage.getItem('masar_jobs');
    if (savedJobs) {
      return JSON.parse(savedJobs);
    }
    // Initialize properly with timestamps so they decay correctly
    const initializedJobs = initialJobsData.map(job => ({
      ...job,
      date: parseArabicRelativeTimeToTimestamp(job.date)
    }));
    return initializedJobs;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check URL parameter first, then localStorage
    const urlCode = getAdminCodeFromURL();
    const storedAdmin = localStorage.getItem('masar_admin') === 'true';
    return urlCode === ADMIN_CODE || storedAdmin;
  });
  const [adminCode, setAdminCode] = useState('');

  // Persist jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('masar_jobs', JSON.stringify(allJobs));
  }, [allJobs]);

  // Handle Smart Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide if scrolling down, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menu and other dropdowns on route change
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
    setIsNotificationsOpen(false);
    setIsCountryDropdownOpen(false);
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [location]);

  const handleAddJob = (newJob) => {
    // Add owner information to the job
    const jobWithOwner = {
      ...newJob,
      owner: user?.username || 'anonymous',
      ownerId: user?.username || 'anonymous'
    };
    setAllJobs(prevJobs => [jobWithOwner, ...prevJobs]);
  };

  const handleDeleteJob = (jobId, currentUser = null) => {
    const username = currentUser || user?.username;

    // Security check: Only allow deletion if user is logged in
    if (!username && !isAdmin) {
      console.log('Delete blocked: User not logged in');
      return;
    }

    setAllJobs(prevJobs => {
      const jobToDelete = prevJobs.find(job => job.id === jobId);

      // Allow deletion if:
      // 1. User is admin (can delete any job)
      // 2. User is the owner of the job
      // 3. Job has no owner AND user is admin (old jobs can only be deleted by admin)
      if (isAdmin || jobToDelete?.owner === username) {
        const updatedJobs = prevJobs.filter(job => job.id !== jobId);
        localStorage.setItem('masar_jobs', JSON.stringify(updatedJobs));
        console.log('Job deleted successfully:', jobId);
        return updatedJobs;
      }

      // If not authorized, return original jobs
      console.log('Delete blocked: Not authorized');
      return prevJobs;
    });
  };

  const handleAdminLogin = () => {
    if (adminCode === ADMIN_CODE) {
      setIsAdmin(true);
      localStorage.setItem('masar_admin', 'true');
      setAdminCode('');
      // Remove admin parameter from URL
      const url = new URL(window.location);
      url.searchParams.delete('admin');
      window.history.replaceState({}, '', url);
      setIsMenuOpen(false);
    } else {
      alert('الكود غير صحيح');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('masar_admin');
    setIsMenuOpen(false);
  };

  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const countries = [
    { name: 'مصر', flag: '🇪🇬' },
    { name: 'السعودية', flag: '🇸🇦' },
    { name: 'الإمارات', flag: '🇦🇪' },
    { name: 'الكويت', flag: '🇰🇼' },
    { name: 'قطر', flag: '🇶🇦' },
    { name: 'الجزائر', flag: '🇩🇿' },
    { name: 'المغرب', flag: '🇲🇦' },
    { name: 'تونس', flag: '🇹🇳' }
  ];

  const categories = ['الكل', 'تكنولوجيا المعلومات', 'تسويق', 'محاسبة', 'مبيعات', 'هندسة', 'إدارة', 'تصميم'];

  return (
      <div className="app-container" style={{ overflowX: 'hidden', position: 'relative' }}>
        {/* Menu Overlay for Mobile */}
        <div 
          className={`menu-overlay ${isMenuOpen ? 'visible' : ''}`} 
          onClick={() => setIsMenuOpen(false)}
        ></div>
        {/* Mobile-only Navigation Side Menu */}
        <nav className={`nav ${isMenuOpen ? 'open' : ''} mobile-only`}>
          <ul>
            <li><Link to="/" className="active">{t('home')}</Link></li>
            <li><Link to="/">{t('jobs')}</Link></li>
            <li><Link to="/pathways">{t('careerGuide')}</Link></li>
            <li><Link to="/ats-checker">{t('ats')}</Link></li>
            <li><Link to="/companies">{t('companies')}</Link></li>
            {isAdmin && <li><Link to="/dashboard">لوحة التحكم</Link></li>}
            <li><Link to="/about-masar">عن مسار</Link></li>
          </ul>

          {/* Mobile-only secondary controls */}
          <div className="mobile-only-nav-controls mobile-only" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.8rem 1rem',
                background: 'var(--accent)',
                border: '1px solid var(--primary)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: 'var(--primary)',
                fontSize: '1rem',
                width: '100%',
              }}
            >
              <span>تغيير اللغة / Language</span>
              <span style={{ fontSize: '1.1rem' }}>{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Country Switcher */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.8rem 1rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  width: '100%',
                }}
              >
                <span>الدولة: {selectedCountry}</span>
                <Globe size={18} />
              </button>
              {isCountryDropdownOpen && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.5rem',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}>
                  {countries.map(c => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedCountry(c.name);
                        setIsCountryDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.6rem 0.8rem',
                        background: selectedCountry === c.name ? 'var(--accent)' : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: selectedCountry === c.name ? '700' : '500',
                        color: selectedCountry === c.name ? 'var(--primary)' : 'var(--text-main)',
                        textAlign: 'right',
                        width: '100%',
                        fontSize: '0.95rem',
                      }}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button className="icon-btn" onClick={toggleTheme} style={{ background: 'var(--accent)', border: '1px solid #e2e8f0', width: '100%', padding: '0.8rem', justifyContent: 'center', gap: '0.5rem', borderRadius: '10px' }}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDark ? 'الوضع المضيء' : 'الوضع الليلي'}</span>
            </button>

            {/* Admin Input for Mobile Sidebar */}
            {!isAdmin && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                  type="password"
                  placeholder="كود الإدمن..."
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  style={{
                    padding: '0.8rem',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    width: '100%',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  onClick={handleAdminLogin}
                  style={{
                    padding: '0.8rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                  }}
                >
                  دخول كإدمن
                </button>
              </div>
            )}
            {isAdmin && (
              <button
                onClick={handleAdminLogout}
                style={{
                  padding: '0.8rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                }}
              >
                خروج الإدمن
              </button>
            )}
          </div>
        </nav>

        {/* Header (Always Visible) */}
        <header className={`header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
          <div className="container header-content">
            <div className="logo-section">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src={logoImg} alt="Masar Logo" className="logo-img" />
              </Link>
              <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav desktop-only">
              <ul>
                <li><Link to="/" className="active">{t('home')}</Link></li>
                <li><Link to="/">{t('jobs')}</Link></li>
                <li><Link to="/pathways">{t('careerGuide')}</Link></li>
                <li><Link to="/ats-checker">{t('ats')}</Link></li>
                <li><Link to="/companies">{t('companies')}</Link></li>
                {isAdmin && <li><Link to="/dashboard">لوحة التحكم</Link></li>}
                <li><Link to="/about-masar">عن مسار</Link></li>
              </ul>
            </nav>

            <div className="user-section">
              <div className="country-switcher-container desktop-only" style={{ position: 'relative' }}>
                <div className="country-switcher" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}>
                  <Globe size={18} />
                  <span>{selectedCountry}</span>
                  <ChevronDown size={14} />
                </div>

                {isCountryDropdownOpen && (
                  <div className="glass-card country-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '10px',
                    width: '200px',
                    zIndex: 2000,
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    backgroundColor: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    borderRadius: '8px'
                  }}>
                    {countries.map(c => (
                      <div
                        key={c.name}
                        className={`dropdown-item ${selectedCountry === c.name ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCountry(c.name);
                          setIsCountryDropdownOpen(false);
                        }}
                        style={{
                          padding: '0.8rem',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          background: selectedCountry === c.name ? 'var(--accent)' : 'transparent',
                          fontWeight: '600',
                          color: selectedCountry === c.name ? 'var(--primary)' : 'var(--text-main)'
                        }}
                        onMouseOver={(e) => {
                          if (selectedCountry !== c.name) {
                            e.currentTarget.style.background = '#f1f5f9';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (selectedCountry !== c.name) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="desktop-only" style={{ position: 'relative' }}>
                <button
                  className={`icon-btn ${isNotificationsOpen ? 'active' : ''}`}
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <Bell size={22} />
                  <div className="badge"></div>
                </button>

                {isNotificationsOpen && (
                  <div className="glass-card notifications-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '10px',
                    width: '300px',
                    zIndex: 2000,
                    backgroundColor: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                  }}>
                    <h4 style={{ margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: '0.8rem' }}>التنبيهات</h4>
                    <div className="notification-item" style={{ fontSize: '0.9rem', padding: '0.5rem', borderRadius: '8px', background: '#f8fafc' }}>
                      <strong>وظيفة جديدة!</strong> تم إضافة وظيفة Node.js في تونس.
                    </div>
                    <div className="notification-item" style={{ fontSize: '0.9rem', padding: '0.5rem', borderRadius: '8px', background: '#f8fafc' }}>
                      <strong>تحديث:</strong> تم قبول طلبك للمراجعة في شركة Masar Dev.
                    </div>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--primary)',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textAlign: 'center',
                      marginTop: '0.5rem'
                    }}>عرض كل التنبيهات</button>
                  </div>
                )}
              </div>

              <button className="icon-btn desktop-only" onClick={toggleTheme} title={isDark ? 'تبديل للوضع الفاتح' : 'تبديل للوضع الليلي'}>
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
              </button>

              <button
                className="icon-btn language-toggle desktop-only"
                onClick={toggleLanguage}
                title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--primary)', background: 'var(--accent)' }}
              >
                {language === 'ar' ? 'EN' : 'AR'}
              </button>

              {/* Admin Code Input - Hidden on mobile, added classes for control */}
              <div className="admin-section desktop-only">
                {!isAdmin ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="password"
                      placeholder="كود الإدمن"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      style={{
                        padding: '0.5rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        width: '120px'
                      }}
                    />
                    <button
                      onClick={handleAdminLogin}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}
                    >
                      دخول
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAdminLogout}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    خروج إدمن
                  </button>
                )}
              </div>

              {/* Login / User Section */}
              <div style={{ position: 'relative' }}>
                {user ? (
                  <>
                    <button
                      className="user-btn"
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'var(--accent)',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        transition: 'var(--transition)',
                      }}
                      onMouseOver={(e) => e.target.style.background = '#e0e7ff'}
                      onMouseOut={(e) => e.target.style.background = 'var(--accent)'}
                    >
                      <Users size={18} />
                      <span>{user.username}</span>
                    </button>

                    {isUserDropdownOpen && (
                      <div
                        className="glass-card user-dropdown"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          marginTop: '10px',
                          minWidth: '200px',
                          zIndex: 2000,
                          padding: '0.8rem',
                          backgroundColor: 'white',
                          boxShadow: 'var(--shadow-lg)',
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        <div style={{ padding: '0.5rem 0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)', borderBottom: '1px solid #e2e8f0' }}>
                          {user.email}
                        </div>
                        <Link
                          to="/profile"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            color: 'var(--text-main)',
                            textDecoration: 'none',
                            transition: 'var(--transition)',
                            cursor: 'pointer',
                          }}
                          onMouseOver={(e) => e.target.style.background = '#f1f5f9'}
                          onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                          <Settings size={16} />
                          <span>إعدادات الحساب</span>
                        </Link>
                        <Link
                          to="/saved-jobs"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            color: 'var(--text-main)',
                            textDecoration: 'none',
                            transition: 'var(--transition)',
                            cursor: 'pointer',
                          }}
                          onMouseOver={(e) => e.target.style.background = '#f1f5f9'}
                          onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                          <Bookmark size={16} />
                          <span>وظائفي المحفوظة</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'var(--transition)',
                            textAlign: 'right',
                          }}
                          onMouseOver={(e) => e.target.style.background = '#fee2e2'}
                          onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                          <LogOut size={16} />
                          <span>خروج</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    className="login-btn"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    دخول / تسجيل
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Email Notification Modal */}
        <EmailNotification />

        {/* Dynamic Pages */}
        <Routes>
          <Route path="/" element={<Home selectedCountry={selectedCountry} searchTerm={searchTerm} setSearchTerm={setSearchTerm} activeCategory={activeCategory} setActiveCategory={setActiveCategory} countries={countries.map(c => c.name)} categories={categories} jobsData={allJobs} handleDeleteJob={handleDeleteJob} />} />
          <Route path="/job/:id" element={<JobDetails jobsData={allJobs} />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/salary-indicators" element={<SalaryIndicators selectedCountry={selectedCountry} />} />
          <Route path="/post-job" element={<PostJob handleAddJob={handleAddJob} handleDeleteJob={handleDeleteJob} />} />
          <Route path="/dashboard" element={isAdmin ? <EmployerDashboard jobsData={allJobs} handleDeleteJob={handleDeleteJob} currentUser={user?.username} isAdmin={isAdmin} /> : <Navigate to="/" replace />} />
          <Route path="/pathways" element={<CareerPathways />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/companies" element={<Companies selectedCountry={selectedCountry} jobsData={allJobs} />} />
          <Route path="/about-masar" element={<AboutMasar />} />
        </Routes>

        {/* Login Modal */}
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

        {/* Mobile Bottom Navigation Component */}
        <BottomNav />

        {/* Footer (Always Visible) */}
        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand">
                <img src={logoImg} alt="Masar" style={{ height: '60px', marginBottom: '1.5rem', filter: 'brightness(10)' }} />
                <p style={{ opacity: 0.7, maxWidth: '300px' }}>مسار هي المنصة الرائدة في الشرق الأوسط لربط الباحثين عن عمل بالفرص الحقيقية بأحدث تقنيات البحث المهني.</p>
              </div>
              <div className="footer-links">
                <h4>روابط سريعة</h4>
                <ul>
                  <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>تصفح الوظائف</Link></li>
                  <li><Link to="/pathways" style={{ color: 'inherit', textDecoration: 'none' }}>دليل المسارات</Link></li>
                  <li><Link to="/about-masar" style={{ color: 'inherit', textDecoration: 'none' }}>عن مسار</Link></li>
                  <li><Link to="/companies" style={{ color: 'inherit', textDecoration: 'none' }}>الشركات</Link></li>
                </ul>
              </div>
              <div className="footer-links">
                <h4>خدماتنا</h4>
                <ul>
                  <li>فحص السيرة الذاتية</li>
                  <li>كتابة السيرة الذاتية</li>
                  <li>شركاء النجاح</li>
                  <li>وظائف الحكومية</li>
                </ul>
              </div>
              <div className="footer-links">
                <h4>تابعنا</h4>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <Globe size={24} />
                  <Rocket size={24} />
                  <Users size={24} />
                </div>
              </div>
            </div>
            <div className="copyright">
              <p>&copy; 2026 مسار - منظومة ذكية لإدارة فرص العمل. مشروع تخرج مقدم بجودة عالمية.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <BookmarkProvider>
              <ATSProvider>
                <AppContent />
              </ATSProvider>
            </BookmarkProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
