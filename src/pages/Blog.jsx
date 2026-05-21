import React from 'react';
import { Calendar, User, Clock, ChevronLeft, Newspaper, TrendingUp, Lightbulb, Target } from 'lucide-react';

function Blog() {
  const articles = [
    {
      id: 1,
      title: 'كيف تنجح في المقابلة الشخصية التقنية في 2026؟',
      excerpt: 'تعرف على أهم الأسئلة والتقنيات التي يركز عليها أصحاب العمل في المنطقة العربية حالياً وكيف تستعد لها...',
      author: 'د. أحمد علي',
      date: '4 مارس 2026',
      readTime: '8 دقائق',
      category: 'نصائح مهنية',
      icon: <Target size={24} color="var(--primary)" />
    },
    {
      id: 2,
      title: 'أهم 5 مهارات تقنية يحتاجها سوق العمل السعودي العام القادم',
      excerpt: 'من الذكاء الاصطناعي إلى الحوسبة السحابية، استعرض المهارات الأكثر طلباً في رؤية 2030...',
      author: 'م. سارة محمود',
      date: '2 مارس 2026',
      readTime: '12 دقيقة',
      category: 'اتجاهات السوق',
      icon: <TrendingUp size={24} color="#10b981" />
    },
    {
      id: 3,
      title: 'دليلك الشامل لكتابة سيرة ذاتية تتخطى أنظمة الـ ATS',
      excerpt: 'تعلم كيف تختار الكلمات المفتاحية الصحيحة وتصمم سيرتك الذاتية بطريقة رقمية حديثة...',
      author: 'أ. ليلى حسن',
      date: '28 فبراير 2026',
      readTime: '10 دقائق',
      category: 'السيرة الذاتية',
      icon: <Newspaper size={24} color="#f59e0b" />
    },
    {
      id: 4,
      title: 'التوازن بين العمل والحياة في عصر العمل عن بعد',
      excerpt: 'استراتيجيات فعالة للحفاظ على إنتاجيتك وصحتك النفسية عند العمل من المنزل...',
      author: 'سامي خالد',
      date: '25 فبراير 2026',
      readTime: '6 دقائق',
      category: 'نمط الحياة المهني',
      icon: <Lightbulb size={24} color="#8b5cf6" />
    }
  ];

  return (
    <div style={{ minHeight: '80vh', padding: '4rem 0', background: '#f8fafc' }}>
      <div className="container">
        {/* Blog Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.5rem' }}>المدونة المهنية 📖</h1>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
            مصدرك الأول لنصائح التوظيف، اتجاهات الرواتب، وتطوير المهارات القيادية والتقنية.
          </p>
        </div>

        {/* Featured Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
          {articles.map(article => (
            <div key={article.id} className="glass-card" style={{
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'var(--transition)',
              cursor: 'pointer',
              background: 'white',
              border: 'none',
              boxShadow: 'var(--shadow-md)'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                padding: '1.5rem',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '140px'
              }}>
                <div style={{ transform: 'scale(1.5)' }}>{article.icon}</div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{
                    padding: '0.4rem 1rem',
                    background: '#f1f5f9',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: 'var(--primary)'
                  }}>
                    {article.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.2rem', lineHeight: '1.4' }}>
                  {article.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1, fontSize: '1.05rem' }}>
                  {article.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #f1f5f9'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Calendar size={16} />
                    <span>{article.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Clock size={16} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <button style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--primary)',
                  fontWeight: '800',
                  background: 'none',
                  padding: 0,
                  fontSize: '1rem'
                }}>
                  اقرأ المزيد <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div style={{
          marginTop: '6rem',
          padding: '4rem',
          background: 'var(--primary)',
          borderRadius: '40px',
          color: 'white',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>اشترك في نشرتنا البريدية 📧</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2.5rem' }}>كن أول من يعرف بجديد الوظائف وتحديثات سوق العمل.</p>

          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: 'white',
            padding: '0.5rem',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <input
              type="email"
              placeholder="بريدك الإلكتروني..."
              style={{
                flex: 1,
                border: 'none',
                padding: '1rem 1.5rem',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '1rem',
                color: 'var(--text-main)'
              }}
            />
            <button style={{
              padding: '1rem 2rem',
              background: 'var(--primary)',
              color: 'white',
              borderRadius: '50px',
              fontWeight: '800'
            }}>
              اشترك الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
