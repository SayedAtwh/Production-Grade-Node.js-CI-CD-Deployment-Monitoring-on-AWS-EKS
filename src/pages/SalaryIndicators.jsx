import React, { useState, useMemo } from 'react';
import { TrendingUp, MapPin, DollarSign, Briefcase, Info, ArrowUpRight, Target, Users, Award, X, CheckSquare } from 'lucide-react';

const SalaryRangeBar = ({ min, max, avg, currency }) => {
  const percentage = ((avg - min) / (max - min)) * 100;

  return (
    <div style={{ marginTop: '2rem', width: '100%', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '700' }}>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>الحد الأدنى</span>
          <span>{min.toLocaleString()} {currency}</span>
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>الحد الأقصى</span>
          <span>{max.toLocaleString()} {currency}</span>
        </span>
      </div>
      <div style={{ height: '14px', background: '#f1f5f9', borderRadius: '20px', position: 'relative', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{
          position: 'absolute',
          left: '0',
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
          opacity: 0.15
        }}></div>
        <div style={{
          position: 'absolute',
          left: `${percentage}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '28px',
          height: '28px',
          background: 'white',
          border: '4px solid var(--primary)',
          borderRadius: '50%',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          transition: 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div>
          <div style={{
            position: 'absolute',
            top: '-35px',
            background: 'var(--primary)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            fontWeight: 'bold'
          }}>
            المتوسط: {avg.toLocaleString()}
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid var(--primary)'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SalaryIndicators({ selectedCountry }) {
  const [activeCategory, setActiveCategory] = useState('تكنولوجيا المعلومات');

  const salaryDataByCountry = useMemo(() => ({
    'مصر': {
      currency: 'ج.م',
      categories: {
        'تكنولوجيا المعلومات': { min: 15000, max: 65000, avg: 38000, trend: '+12%', jobs: 2450, insights: 'نمو كبير في الطلب على مطوري React و Python.' },
        'تسويق': { min: 8000, max: 35000, avg: 18000, trend: '+5%', jobs: 1200, insights: 'التسويق عبر الأداء (Performance Marketing) هو الأعلى طلباً.' },
        'محاسبة': { min: 7000, max: 25000, avg: 14000, trend: '+2%', jobs: 980, insights: 'المحاسبون القانونيون يحصلون على رواتب أعلى بنسبة 40%.' },
        'مبيعات': { min: 6000, max: 30000, avg: 15000, trend: '+8%', jobs: 3200, insights: 'العمولات تشكل جزءاً كبيراً من إجمالي الدخل في هذا القطاع.' },
        'هندسة': { min: 12000, max: 45000, avg: 25000, trend: '+6%', jobs: 1100, insights: 'المهندسون في قطاع الطاقة والإنشاءات الكبرى يتقاضون الرواتب الأعلى.' },
        'إدارة': { min: 10000, max: 50000, avg: 28000, trend: '+4%', jobs: 850, insights: 'إدارة المشروعات (PMP) تزيد الراتب بنسبة ملحوظة.' },
        'تصميم': { min: 9000, max: 40000, avg: 20000, trend: '+7%', jobs: 650, insights: 'مصممو تجربة المستخدم (UI/UX) هم الأعلى أجراً في فئة التصميم.' },
      }
    },
    'السعودية': {
      currency: 'ر.س',
      categories: {
        'تكنولوجيا المعلومات': { min: 10000, max: 40000, avg: 22000, trend: '+15%', jobs: 5400, insights: 'رؤية 2030 تدفع بطلب هائل على خبراء التحول الرقمي.' },
        'تسويق': { min: 8000, max: 28000, avg: 16000, trend: '+6%', jobs: 3200, insights: 'صناعة المحتوى الرقمي تشهد طفرة في الرواتب مؤخراً.' },
        'محاسبة': { min: 7000, max: 22000, avg: 13500, trend: '+4%', jobs: 2800, insights: 'زيادة الطلب على المستشارين الماليين وخبراء الضرائب.' },
        'مبيعات': { min: 6000, max: 25000, avg: 12500, trend: '+10%', jobs: 6500, insights: 'قطاع التجزئة الفاخرة والعقارات يقدم أفضل الحوافز.' },
        'هندسة': { min: 9000, max: 35000, avg: 18000, trend: '+8%', jobs: 4200, insights: 'نيوم والمشاريع الكبرى هي المحرك الرئيسي لرواتب المهندسين.' },
        'إدارة': { min: 12000, max: 45000, avg: 26000, trend: '+7%', jobs: 3100, insights: 'المدراء التنفيذيون في الشركات الناشئة يحصلون على حزم تعويضات مغرية.' },
        'تصميم': { min: 8000, max: 28000, avg: 15000, trend: '+9%', jobs: 2400, insights: 'التصميم المعماري وتصميم المنتجات في مقدمة الاهتمامات.' },
      }
    },
    'الإمارات': {
      currency: 'د.إ',
      categories: {
        'تكنولوجيا المعلومات': { min: 12000, max: 50000, avg: 28000, trend: '+10%', jobs: 7200, insights: 'دبي أصبحت مركزاً عالمياً لتقنيات الـ AI والـ Fintech.' },
        'تسويق': { min: 10000, max: 38000, avg: 20000, trend: '+7%', jobs: 4500, insights: 'مدراء العلامات التجارية العالمية يتقاضون رواتب تنافسية عالمياً.' },
        'محاسبة': { min: 9000, max: 30000, avg: 17000, trend: '+5%', jobs: 3800, insights: 'الشركات المتعددة الجنسيات تطلب خبراء في المعايير الدولية IFRS.' },
        'مبيعات': { min: 8000, max: 35000, avg: 16000, trend: '+12%', jobs: 8200, insights: 'سوق العقارات في دبي يمنح عمولات قد تتخطى الراتب الأساسي بأضعاف.' },
        'هندسة': { min: 11000, max: 40000, avg: 24000, trend: '+9%', jobs: 5100, insights: 'المهندسون المتخصصون في الاستدامة مصلوبون بشدة.' },
        'إدارة': { min: 18000, max: 70000, avg: 38000, trend: '+6%', jobs: 4300, insights: 'الإدارة العليا في القطاع المالي والسياحي هي الأعلى أجراً.' },
        'تصميم': { min: 10000, max: 35000, avg: 19000, trend: '+8%', jobs: 3500, insights: 'وكالات الإبداع العالمية في دبي ترفع سقف الرواتب للموهوبين.' },
      }
    },
    'قطر': {
      currency: 'ر.ق',
      categories: {
        'تكنولوجيا المعلومات': { min: 10000, max: 38000, avg: 20000, trend: '+7%', jobs: 3100, insights: 'البنية التحتية الذكية والأمن السيبراني هما الأولوية.' },
        'تسويق': { min: 9000, max: 30000, avg: 17000, trend: '+5%', jobs: 1800, insights: 'الفعاليات الكبرى والسياحة الرياضية تنعش قطاع التسويق.' },
        'محاسبة': { min: 8000, max: 28000, avg: 15000, trend: '+4%', jobs: 1500, insights: 'القطاع المصرفي والنفطي يوفران استقراراً ورواتب عالية.' },
        'مبيعات': { min: 7000, max: 28000, avg: 14000, trend: '+9%', jobs: 4200, insights: 'زيادة الطلب على مبيعات الحلول التقنية للشركات (B2B).' },
        'هندسة': { min: 12000, max: 40000, avg: 22000, trend: '+6%', jobs: 2400, insights: 'مهندسو النفط والغاز لا يزالون في قمة الهرم السعري.' },
        'إدارة': { min: 15000, max: 55000, avg: 30000, trend: '+5%', jobs: 1900, insights: 'الكفاءات الإدارية العربية مطلوبة جداً في الهيئات الحكومية.' },
        'تصميم': { min: 10000, max: 32000, avg: 18000, trend: '+6%', jobs: 1200, insights: 'الوسائط المتعددة والإنتاج المرئي يشهدان طلباً متزايداً.' },
      }
    },
    'الكويت': {
      currency: 'د.ك',
      categories: {
        'تكنولوجيا المعلومات': { min: 600, max: 2200, avg: 1300, trend: '+6%', jobs: 2100, insights: 'الخدمات المصرفية الرقمية تدفع برواتب التقنيين للأعلى.' },
        'تسويق': { min: 450, max: 1600, avg: 950, trend: '+4%', jobs: 1100, insights: 'التجارة الإلكترونية هي المحرك الأساسي لفرص التسويق.' },
        'محاسبة': { min: 400, max: 1400, avg: 850, trend: '+3%', jobs: 950, insights: 'المحاسبون ذوو الخبرة في التدقيق الخارجي هم الأكثر طلباً.' },
        'مبيعات': { min: 350, max: 1500, avg: 800, trend: '+7%', jobs: 3200, insights: 'قطاع السيارات والمعدات الثقيلة يوفر عمولات مجزية.' },
        'هندسة': { min: 600, max: 1900, avg: 1100, trend: '+5%', jobs: 1500, insights: 'مهندسو المشروعات في القطاع النفطي يتقاضون رواتب ممتازة.' },
        'إدارة': { min: 700, max: 2600, avg: 1450, trend: '+4%', jobs: 1200, insights: 'إدارة الموارد البشرية والعمليات تشهد تحديثاً في الرواتب.' },
        'تصميم': { min: 500, max: 1700, avg: 1000, trend: '+5%', jobs: 850, insights: 'المصممون المستقلون (Freelancers) في نمو، لكن الوظائف الثابتة أكثر أماناً.' },
      }
    }
  }), []);

  // Default to Egypt if country not found in our data
  const safeCountry = salaryDataByCountry[selectedCountry] ? selectedCountry : 'مصر';
  const countryData = salaryDataByCountry[safeCountry];
  const currentData = countryData.categories[activeCategory] || countryData.categories['تكنولوجيا المعلومات'];
  // State for Share Salary Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    category: activeCategory,
    experience: '1-3 سنوات',
    salary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setFormData({ jobTitle: '', category: activeCategory, experience: '1-3 سنوات', salary: '' });
      }, 3000);
    }, 800);
  };

  const categories = Object.keys(countryData.categories);

  return (
    <div style={{ minHeight: '80vh', padding: '3rem 0', backgroundColor: '#f0f4f8' }}>
      {/* Share Salary Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            width: '100%',
            maxWidth: '550px',
            borderRadius: '24px',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transform: 'scale(1)',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: '#f1f5f9', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
            >
              <X size={20} color="var(--text-muted)" />
            </button>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#f0fdf4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <CheckSquare size={40} color="#16a34a" />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem' }}>شكراً لمساهمتك! 🎉</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>تم استلام بياناتك بنجاح. ستُساهم في جعل مؤشراتنا أكثر دقة للجميع.</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem' }}>شاركنا راتبك 💰</h3>
                  <p style={{ color: 'var(--text-muted)' }}>ساعد زملائك في معرفة القيمة السوقية العادلة. بياناتك ستبقى سرية تماماً.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>المسمى الوظيفي</label>
                    <input
                      type="text"
                      name="jobTitle"
                      required
                      placeholder="مثال: مطور ويب، مصمم جرافيك..."
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontWeight: '700', fontSize: '0.9rem' }}>القسم</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontWeight: '700', fontSize: '0.9rem' }}>سنوات الخبرة</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                      >
                        <option>أقل من سنة</option>
                        <option>1-3 سنوات</option>
                        <option>4-6 سنوات</option>
                        <option>+7 سنوات</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: '700', fontSize: '0.9rem' }}>الراتب الشهري ({countryData.currency})</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        name="salary"
                        required
                        placeholder="أدخل المبلغ..."
                        value={formData.salary}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
                      />
                      <DollarSign size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '1rem',
                      padding: '1.2rem',
                      background: 'var(--primary)',
                      color: 'white',
                      borderRadius: '16px',
                      fontWeight: '900',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                  >
                    إرسال البيانات
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Hero Banner with Glassmorphism */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)',
          color: 'white',
          padding: '4rem 3rem',
          borderRadius: '32px',
          marginBottom: '3.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.15)',
              padding: '0.5rem 1.2rem',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              fontWeight: '700'
            }}>
              <MapPin size={16} />
              تحليل السوق المباشر لعام 2024-2025
            </div>
            <h1 style={{ fontSize: '3.2rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>
              دليل الرواتب في <span style={{ color: 'var(--accent)' }}>{safeCountry}</span>
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: '0.9', lineHeight: '1.6', color: '#e0e7ff' }}>
              احصل على رؤية دقيقة للأجور، الطلب في السوق، والاتجاهات المهنية لمساعدتك في التفاوض على عرضك الوظيفي القادم.
            </p>
          </div>
          <TrendingUp size={280} style={{
            position: 'absolute',
            left: '-40px',
            bottom: '-40px',
            opacity: 0.08,
            transform: 'rotate(-10deg)',
            pointerEvents: 'none'
          }} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 2,
            background: 'rgba(255,255,255,0.1)',
            padding: '2rem',
            borderRadius: '24px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.2rem' }}>إجمالي الوظائف المتاحة</div>
              <div style={{ fontSize: '2rem', fontWeight: '900' }}>{Object.values(countryData.categories).reduce((acc, cat) => acc + cat.jobs, 0).toLocaleString()}</div>
            </div>
            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.2rem' }}>تحديث البيانات</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>مارس 2025</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 3fr', gap: '2.5rem' }}>
          {/* Sidebar - Enhanced Navigation */}
          <div style={{
            background: 'white',
            padding: '2rem 1rem',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-lg)',
            height: 'fit-content',
            position: 'sticky',
            top: '2rem'
          }}>
            <h3 style={{ marginBottom: '2rem', fontWeight: '900', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <Target size={20} color="var(--primary)" />
              اختر المجال
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '1.2rem 1.5rem',
                    borderRadius: '16px',
                    textAlign: 'right',
                    fontWeight: '800',
                    background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                    color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: 'none',
                    cursor: 'pointer',
                    transform: activeCategory === cat ? 'translateX(-8px)' : 'none',
                    boxShadow: activeCategory === cat ? '0 10px 15px -3px rgba(79, 70, 229, 0.3)' : 'none'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Briefcase size={activeCategory === cat ? 20 : 18} />
                    {cat}
                  </span>
                  {activeCategory === cat && <Award size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content - Dynamic Salary Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Salary Breakdown Card */}
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '32px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    {activeCategory}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>نطاق الأجور الشهري الموثق</p>
                </div>
                <div style={{
                  background: '#f0fdf4',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  border: '1px solid #dcfce7'
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 'bold', textTransform: 'uppercase' }}>نمو سنوي</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#15803d' }}>{currentData.trend}</div>
                  </div>
                  <ArrowUpRight size={32} color="#16a34a" />
                </div>
              </div>

              <SalaryRangeBar
                min={currentData.min}
                max={currentData.max}
                avg={currentData.avg}
                currency={countryData.currency}
              />

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                marginTop: '1rem',
                borderTop: '1px solid #f1f5f9',
                paddingTop: '2.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Users size={24} color="var(--primary)" style={{ marginBottom: '0.8rem', opacity: 0.6 }} />
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>المنافسة</div>
                  <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>متوسطة</div>
                </div>
                <div style={{ textAlign: 'center', borderRight: '1px solid #f1f5f9', borderLeft: '1px solid #f1f5f9' }}>
                  <TrendingUp size={24} color="var(--primary)" style={{ marginBottom: '0.8rem', opacity: 0.6 }} />
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>الوظائف الشاغرة</div>
                  <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>{currentData.jobs.toLocaleString()}+</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Award size={24} color="var(--primary)" style={{ marginBottom: '0.8rem', opacity: 0.6 }} />
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>القوة الشرائية</div>
                  <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>عالية</div>
                </div>
              </div>
            </div>

            {/* Insight & Advice Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '24px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                gap: '1.5rem',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(79, 70, 229, 0.1)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Info size={30} color="var(--primary)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: '900', marginBottom: '0.8rem' }}>رؤية الخبراء</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {currentData.insights}
                  </p>
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '24px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                gap: '1.5rem',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#fff7ed',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Award size={30} color="#f97316" />
                </div>
                <div>
                  <h4 style={{ fontWeight: '900', marginBottom: '0.8rem' }}>نصيحة مهنية</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    الحصول على شهادات معتمدة عالمياً (مثل PMP أو AWS) في هذا المجال يزيد فرصة التفاوض على راتب أعلى بنسبة تتراوح بين 15% إلى 25%.
                  </p>
                </div>
              </div>
            </div>

            {/* Crowdsourcing CTA */}
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              background: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://www.transparenttextures.com/patterns/cubes.png")',
              backgroundColor: 'var(--accent)',
              borderRadius: '24px',
              border: '2px dashed var(--primary)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h3 style={{ fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>ساهم في جعل البيانات أكثر دقة 🚀</h3>
              <p style={{ fontWeight: '600', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                نحن نعتمد على مجتمعنا لتوفير أدق البيانات. شارك تجربتك المهنية بخصوصية كاملة لمساعدة زملائك في فهم سوق العمل بشكل أفضل.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setIsModalOpen(true);
                }}
                style={{
                  padding: '1.2rem 3rem',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: '900',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                شارك براتبك الآن (بسرية تامة)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaryIndicators;
