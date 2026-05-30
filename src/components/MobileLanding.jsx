import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Globe, Brain, Home, Search, Building } from 'lucide-react';

function MobileLanding() {
  const menuItems = [
    {
      icon: <Home size={24} />,
      title: 'الرئيسية',
      description: 'تصفح الوظائف المتاحة',
      link: '/home',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: <Search size={24} />,
      title: 'الوظائف',
      description: 'جميع الفرص الوظيفية',
      link: '/home',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: <Building size={24} />,
      title: 'الشركات',
      description: 'استكشف الشركات',
      link: '/companies',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: <FileText size={24} />,
      title: 'فحص السيرة الذاتية',
      description: 'تحسين CV الخاص بك',
      link: '/ats-checker',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: <Globe size={24} />,
      title: 'دليل المهني',
      description: 'خططك المهنية',
      link: '/pathways',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: <Brain size={24} />,
      title: 'عن مسار',
      description: 'تعرف علينا',
      link: '/about-masar',
      color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Logo */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#667eea'
        }}>
          مسار
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          منصة مسار
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1rem'
        }}>
          بوابتك لعالم الفرص الوظيفية
        </p>
      </div>

      {/* Menu Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        {menuItems.map((item) => (
          <Link
            key={item.link}
            to={item.link}
            style={{
              textDecoration: 'none',
              color: 'white'
            }}
          >
            <div style={{
              background: item.color,
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              minHeight: '150px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                marginBottom: '1rem'
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                opacity: 0.9,
                margin: 0
              }}>
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        <p style={{ fontSize: '0.9rem' }}>
          © 2024 منصة مسار - كل الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}

export default MobileLanding;
