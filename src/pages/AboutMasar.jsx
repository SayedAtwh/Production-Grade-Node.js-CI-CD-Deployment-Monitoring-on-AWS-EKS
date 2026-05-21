import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Target, Brain, Globe, Briefcase, Star } from 'lucide-react';

function AboutMasar() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      paddingTop: '80px'
    }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 0',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          marginBottom: '3rem'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem', 
            color: '#1e293b',
            fontWeight: 'bold'
          }}>
            🌟 ما هي منصة مسار؟
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            lineHeight: '1.8',
            color: '#475569',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <strong>مسار</strong> هي بوابتك الذكية لعالم الفرص الوظيفية في الوطن العربي! 🚀
            منصة متكاملة تجمع بين <strong>الذكاء الاصطناعي</strong> و<strong>الخبرة البشرية</strong> 
            لوصولك لأحلامك المهنية.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#0066cc' }}>🎯</div>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.3rem' }}>دقة عالية</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
              وظائف مطابقة لمهاراتك وخبراتك بدقة متناهية باستخدام خوارزميات متقدمة
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#8b5cf6' }}>🤖</div>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.3rem' }}>ذكاء اصطناعي</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
              فحص السيرة الذاتية ATS وتحليلها لزيادة فرص قبولك في الشركات الكبرى
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#10b981' }}>🌍</div>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.3rem' }}>تغطية عربية</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
              8 دول عربية تشمل مصر، السعودية، الإمارات، الكويت، قطر، الجزائر، المغرب، تونس
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#f59e0b' }}>💼</div>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.3rem' }}>فرص حقيقية</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
              وظائف موثوقة من شركات حقيقية مع فرص حقيقية للنمو المهني
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          background: 'linear-gradient(135deg, #0066cc, #8b5cf6)',
          borderRadius: '20px',
          padding: '3rem',
          color: 'white',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>أرقام تثق فينا</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>+10,000</div>
              <div>وظيفة</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>+5,000</div>
              <div>شركة</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>+50,000</div>
              <div>مستخدم</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>8</div>
              <div>دول عربية</div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#0066cc' }}>🎓</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
            مشروع تخرج مقدم بجودة عالمية
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#475569',
            fontStyle: 'italic',
            marginBottom: '2rem',
            lineHeight: '1.8'
          }}>
            "مسار - ليس مجرد منصة، بل هو مسارك نحو النجاح المهني"
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link 
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(45deg, #0066cc, #8b5cf6)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 102, 204, 0.3)'
              }}
            >
              ابدأ رحلتك الآن <ArrowRight size={20} />
            </Link>
            
            <Link 
              to="/ats-checker"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'white',
                color: '#0066cc',
                padding: '1rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
                border: '2px solid #0066cc',
                transition: 'all 0.3s ease'
              }}
            >
              فحص السيرة الذاتية <Brain size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMasar;
