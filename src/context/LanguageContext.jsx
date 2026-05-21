import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  ar: {
    // Header
    home: 'الرئيسية',
    jobs: 'تصفح الوظائف',
    ats: 'فحص ATS',
    companies: 'الشركات',
    about: 'عن مسار',
    login: 'دخول / تسجيل',
    postJob: 'انشر وظيفة',
    dashboard: 'لوحة التحكم',
    logout: 'تسجيل خروج',

    // Hero
    heroTitle: 'منصة مسار لمستقبلك المهني',
    heroSubtitle: 'بوابتك الذكية للوصول إلى آلاف الفرص الوظيفية في كبرى شركات الوطن العربي. ابدأ مسارك المهني بأفضل الأدوات المهنية.',
    searchPlaceholder: 'المسمى الوظيفي أو الشركة...',
    searchBtn: 'ابدأ البحث',

    // Stats
    statJobs: 'وظيفة متاحة',
    statCompanies: 'شركة مسجلة',
    statUsers: 'باحث عن عمل',

    // UI General
    loading: 'جاري التحميل...',
    noResults: 'لا توجد نتائج مطابقة لبحثك.',
    applyNow: 'قدم الآن',
    details: 'التفاصيل',

    // Career Paths
    careerGuide: 'دليل المسارات',
    startPath: 'ابدأ مسارك التعليمي هنا',

    // Notifications
    notifications: 'التنبيهات',
    noNotifications: 'لا توجد تنبيهات جديدة',
    viewAll: 'عرض الكل',
  },
  en: {
    // Header
    home: 'Home',
    jobs: 'Jobs',
    ats: 'ATS Check',
    companies: 'Companies',
    about: 'About',
    login: 'Login / Register',
    postJob: 'Post a Job',
    dashboard: 'Dashboard',
    logout: 'Logout',

    // Hero
    heroTitle: 'Masar Platform for Your Future',
    heroSubtitle: 'Your smart gateway to thousands of job opportunities in top Arab companies. Start your career path with the best professional tools.',
    searchPlaceholder: 'Job title or company...',
    searchBtn: 'Search',

    // Stats
    statJobs: 'Available Jobs',
    statCompanies: 'Registered Companies',
    statUsers: 'Job Seekers',

    // UI General
    loading: 'Loading...',
    noResults: 'No results found matching your search.',
    applyNow: 'Apply Now',
    details: 'Details',

    // Career Paths
    careerGuide: 'Career Guide',
    startPath: 'Start your learning path here',

    // Notifications
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    viewAll: 'View All',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('masarLanguage') || 'ar');

  useEffect(() => {
    localStorage.setItem('masarLanguage', language);
    // Set document direction based on language
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
