import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, Smartphone, Palette, ShieldCheck, Megaphone, Laptop, Code } from 'lucide-react';

const paths = [
  {
    id: 'frontend',
    title_ar: 'مطور واجهات أمامية',
    title_en: 'Frontend Developer',
    icon: <Code size={24} />,
    color: 'var(--primary)',
    steps: [
      { name_ar: 'أساسيات الويب', name_en: 'Web Basics', desc_ar: 'HTML5, CSS3, Modern Javascript (ES6+)', desc_en: 'HTML5, CSS3, Modern Javascript (ES6+)' },
      { name_ar: 'إطارات العمل', name_en: 'Frameworks', desc_ar: 'React.js, Tailwind CSS, State Management', desc_en: 'React.js, Tailwind CSS, State Management' },
      { name_ar: 'الأداء والتحسين', name_en: 'Performance', desc_ar: 'Next.js, SEO, Bundle Optimization', desc_en: 'Next.js, SEO, Bundle Optimization' },
      { name_ar: 'الجاهزية للعمل', name_en: 'Job Ready', desc_ar: 'TypeScript, Testing, CI/CD basic', desc_en: 'TypeScript, Testing, CI/CD basic' }
    ]
  },
  {
    id: 'backend',
    title_ar: 'مطور خوادم',
    title_en: 'Backend Developer',
    icon: <Laptop size={24} />,
    color: '#10b981',
    steps: [
      { name_ar: 'لغة البرمجة', name_en: 'Programming', desc_ar: 'Node.js, Python, or Go & Execution flow', desc_en: 'Node.js, Python, or Go & Execution flow' },
      { name_ar: 'قواعد البيانات', name_en: 'Databases', desc_ar: 'SQL (Postgres), NoSQL (MongoDB), Redis', desc_en: 'SQL (Postgres), NoSQL (MongoDB), Redis' },
      { name_ar: 'هيكلة البيانات', name_en: 'Architecture', desc_ar: 'REST, GraphQL, microservices', desc_en: 'REST, GraphQL, microservices' },
      { name_ar: 'السحاب والنشر', name_en: 'Cloud/DevOps', desc_ar: 'Docker, AWS/GCP, CI/CD Pipelines', desc_en: 'Docker, AWS/GCP, CI/CD Pipelines' }
    ]
  },
  {
    id: 'mobile',
    title_ar: 'تطوير تطبيقات الموبايل',
    title_en: 'Mobile Developer',
    icon: <Smartphone size={24} />,
    color: '#8b5cf6',
    steps: [
      { name_ar: 'أساسيات النظم', name_en: 'Platform Basics', desc_ar: 'Swift (iOS) or Kotlin (Android)', desc_en: 'Swift (iOS) or Kotlin (Android)' },
      { name_ar: 'تطبيقات الهجين', name_en: 'Cross-Platform', desc_ar: 'Flutter or React Native', desc_en: 'Flutter or React Native' },
      { name_ar: 'التعامل مع البيانات', name_en: 'Data sync', desc_ar: 'Local storage, Push Notifications, API', desc_en: 'Local storage, Push Notifications, API' },
      { name_ar: 'النشر للمتجر', name_en: 'App Stores', desc_ar: 'App Store Connect, Play Console', desc_en: 'App Store Connect, Play Console' }
    ]
  },
  {
    id: 'design',
    title_ar: 'تصميم واجهات المستخدم',
    title_en: 'UI/UX Design',
    icon: <Palette size={24} />,
    color: '#f59e0b',
    steps: [
      { name_ar: 'أساسيات التصميم', name_en: 'Design Basics', desc_ar: 'Typography, Color Theory, Layout', desc_en: 'Typography, Color Theory, Layout' },
      { name_ar: 'أدوات التصميم', name_en: 'Design Tools', desc_ar: 'Figma, Adobe XD, Design Systems', desc_en: 'Figma, Adobe XD, Design Systems' },
      { name_ar: 'تجربة المستخدم', name_en: 'UX Research', desc_ar: 'User Flow, Wireframing, Prototypes', desc_en: 'User Flow, Wireframing, Prototypes' },
      { name_ar: 'التسليم للمطورين', name_en: 'Developer Handoff', desc_ar: 'Assets export, Inspect, Documentation', desc_en: 'Assets export, Inspect, Documentation' }
    ]
  },
  {
    id: 'security',
    title_ar: 'الأمن السيبراني',
    title_en: 'Cyber Security',
    icon: <ShieldCheck size={24} />,
    color: '#ef4444',
    steps: [
      { name_ar: 'أساسيات الشبكات', name_en: 'Networking', desc_ar: 'TCP/IP, HTTP/S, Linux Basics', desc_en: 'TCP/IP, HTTP/S, Linux Basics' },
      { name_ar: 'تأمين الويب', name_en: 'Web Security', desc_ar: 'OWASP Top 10, Auth, Encryption', desc_en: 'OWASP Top 10, Auth, Encryption' },
      { name_ar: 'اختبار الاختراق', name_en: 'Pen-Testing', desc_ar: 'Vulnerability assessment, Kali Linux', desc_en: 'Vulnerability assessment, Kali Linux' },
      { name_ar: 'الامتثال التقني', name_en: 'Governance', desc_ar: 'ISO 27001, GDPR, Risk Management', desc_en: 'ISO 27001, GDPR, Risk Management' }
    ]
  },
  {
    id: 'marketing',
    title_ar: 'التسويق الرقمي',
    title_en: 'Digital Marketing',
    icon: <Megaphone size={24} />,
    color: '#ec4899',
    steps: [
      { name_ar: 'التواجد الرقمي', name_en: 'Social Media', desc_ar: 'Content Strategy, Facebook/IG Ads', desc_en: 'Content Strategy, Facebook/IG Ads' },
      { name_ar: 'محركات البحث', name_en: 'SEO/SEM', desc_ar: 'Google Ads, Keyword Research', desc_en: 'Google Ads, Keyword Research' },
      { name_ar: 'البيانات والنتائج', name_en: 'Analytics', desc_ar: 'Google Analytics, Pixel, Conversion', desc_en: 'Google Analytics, Pixel, Conversion' },
      { name_ar: 'أتمتة التسويق', name_en: 'Automation', desc_ar: 'Email Marketing, CRM, Growth Hacking', desc_en: 'Email Marketing, CRM, Growth Hacking' }
    ]
  }
];

export default function CareerPathways() {
  const { language, t } = useLanguage();
  const [activePath, setActivePath] = useState(paths[0]);

  return (
    <div className="career-pathways-page" style={{
      minHeight: '90vh', backgroundColor: '#fdfdfd', padding: '4rem 0'
    }}>
      <div className="container">

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.8rem 1.5rem', background: 'var(--accent)', borderRadius: '50px', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            {language === 'ar' ? 'رحلة تعلمك تبدأ هنا' : 'Your Learning Journey Starts Here'}
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            {language === 'ar' ? 'دليل المسار المهني الذكي' : 'Smart Career Pathways Guide'}
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>
            {language === 'ar'
              ? 'اختر التخصص الذي تحبه واتبع خارطة الطريق المهنية الموصى بها للوصول إلى الاحترافية والحصول على وظيفة أحلامك.'
              : 'Choose the specialty you love and follow the recommended career roadmap to reach professionalism and land your dream job.'}
          </p>
        </div>

        {/* Path Selectors */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginBottom: '5rem'
        }}>
          {paths.map(path => (
            <button
              key={path.id}
              onClick={() => setActivePath(path)}
              style={{
                padding: '1.5rem 1rem',
                borderRadius: '20px',
                border: activePath.id === path.id ? `2px solid ${path.color}` : '1px solid #eee',
                background: activePath.id === path.id ? `${path.color}08` : 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s var(--transition)',
                boxShadow: activePath.id === path.id ? '0 10px 25px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '15px',
                background: activePath.id === path.id ? path.color : '#f8fafc',
                color: activePath.id === path.id ? 'white' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {path.icon}
              </div>
              <span style={{ fontWeight: '800', fontSize: '0.9rem', color: activePath.id === path.id ? 'black' : 'var(--text-muted)' }}>
                {language === 'ar' ? path.title_ar : path.title_en}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Roadmap */}
        <div className="glass-card animate-fade" style={{
          padding: '4rem 3rem',
          borderRadius: '30px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Background Pattern */}
          <div style={{
            position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px',
            background: `${activePath.color}15`, borderRadius: '50%', filter: 'blur(60px)', zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '20px', background: activePath.color,
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {activePath.icon}
              </div>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>
                  {language === 'ar' ? activePath.title_ar : activePath.title_en}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>
                  {language === 'ar' ? 'خارطة طريق مكونة من 4 مراحل أساسية' : '4 Core phases roadmap'}
                </p>
              </div>
            </div>

            <div className="roadmap-flow" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '3rem',
              position: 'relative'
            }}>
              {/* Optional Connector Line Desktop */}
              <div style={{
                position: 'absolute', top: '40px', left: '0', right: '0', height: '2px',
                background: `linear-gradient(90deg, ${activePath.color} 30%, transparent 100%)`,
                opacity: 0.1, zIndex: 0, display: window.innerWidth > 992 ? 'block' : 'none'
              }} />

              {activePath.steps.map((step, index) => (
                <div key={index} className="roadmap-step" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'white',
                    border: `6px solid ${activePath.color}`,
                    color: activePath.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease'
                  }}>
                    {index + 1}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>
                    {language === 'ar' ? step.name_ar : step.name_en}
                  </h3>
                  <div style={{
                    padding: '1.2rem', background: '#f8fafc', borderRadius: '15px', fontSize: '0.95rem',
                    color: 'var(--text-muted)', lineHeight: '1.6'
                  }}>
                    {language === 'ar' ? step.desc_ar : step.desc_en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <button style={{
            padding: '1.2rem 3rem', background: 'var(--text-main)', color: 'white',
            borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.8rem'
          }}>
            {language === 'ar' ? 'ابدأ رحلة التعلم الآن' : 'Start Learning Voyage Now'}
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
