import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, Lightbulb, Copy, Download } from 'lucide-react';
import { useATS } from '../context/ATSContext';
import '../styles/ATSChecker.css';

function ATSChecker() {
  const [cvText, setCvText] = useState('');
  const [fileName, setFileName] = useState('');
  const { atsResult, analyzeCV } = useATS();

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setCvText(text);
        analyzeCV(text);
      }
    };
    reader.readAsText(file, 'utf-8');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 70) return '#84cc16';
    if (score >= 60) return '#eab308';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  return (
    <main className="ats-container">
      {/* عنوان الصفحة */}
      <div className="ats-header">
        <div className="container">
          <h1>أداة فحص التوافق مع ATS 🤖</h1>
          <p>تحقق من توافق سيرتك الذاتية مع أنظمة الفرز الآلي واحصل على نصائح لتحسينها</p>
        </div>
      </div>

      <div className="container ats-content">
        <div className="ats-layout">
          {/* القسم الأيسر - إدخال السيرة الذاتية */}
          <div className="ats-input-section">
            <div className="upload-box">
              <input
                type="file"
                id="file-upload"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" className="upload-label">
                <Upload size={40} />
                <h3>رفع السيرة الذاتية</h3>
                <p>أو انقر لاختيار ملف</p>
                <small>تنسيقات مدعومة: TXT, PDF, DOC, DOCX</small>
              </label>
              {fileName && <p className="file-name">✓ تم تحميل: {fileName}</p>}
            </div>
          </div>

          {/* القسم الأيمن - النتائج */}
          <div className="ats-results-section">
            {!atsResult ? (
              <div className="no-results">
                <FileText size={50} />
                <h3>لم يتم تحليل أي سيرة ذاتية بعد</h3>
                <p>رفع ملف لبدء فحص السيرة الذاتية</p>
              </div>
            ) : atsResult.success ? (
              <>
                {/* درجة ATS الرئيسية */}
                <div className="ats-score-card">
                  <div className="score-circle" style={{ borderColor: atsResult.statusColor }}>
                    <div className="score-value" style={{ color: atsResult.statusColor }}>
                      {atsResult.finalScore}
                    </div>
                    <div className="score-label">من 100</div>
                  </div>
                  <div className="score-info">
                    <h2>التوافق مع ATS</h2>
                    <p className="status" style={{ color: atsResult.statusColor }}>
                      {atsResult.status}
                    </p>
                    <p className="timestamp">
                      تم التحليل في {new Date(atsResult.analyzedAt).toLocaleString('ar-EG')}
                    </p>
                  </div>
                </div>

                {/* تفاصيل النقاط */}
                <div className="ats-details">
                  <h3>تفاصيل التقييم</h3>
                  {atsResult.details.map((detail) => (
                    <div key={detail.category} className="detail-item">
                      <div className="detail-header">
                        <span className="detail-category">{detail.category}</span>
                        <div className="detail-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${detail.score}%`,
                                backgroundColor: getScoreColor(detail.score)
                              }}
                            />
                          </div>
                          <span className="detail-score" style={{ color: getScoreColor(detail.score) }}>
                            {detail.score}%
                          </span>
                        </div>
                      </div>
                      <p className="detail-feedback">{detail.feedback}</p>
                      {detail.warnings && detail.warnings.length > 0 && (
                        <div className="warnings">
                          {detail.warnings.map((warning, widx) => (
                            <div key={`warning-${detail.category}-${widx}`} className="warning-item">
                              <AlertCircle size={14} />
                              <span>{warning}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {detail.foundKeywords && (
                        <div className="found-items">
                          <strong>كلمات مفتاحية مكتشفة ({detail.foundKeywords.length}):</strong>
                          <div className="tags">
                            {detail.foundKeywords.map((kw, kidx) => (
                              <span key={`kw-${kw}`} className="tag">{kw}</span>
                            ))}
                          </div>
                          {detail.foundTechnical && detail.foundTechnical.length > 0 && (
                            <>
                              <strong style={{ marginTop: '0.8rem', display: 'block' }}>مهارات تقنية ({detail.foundTechnical.length}):</strong>
                              <div className="tags">
                                {detail.foundTechnical.map((tech, tidx) => (
                                  <span key={`tech-${tech}`} className="tag" style={{ background: '#ddd6fe', color: '#6d28d9' }}>{tech}</span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {detail.foundContact && (
                        <div className="found-items">
                          <strong>طرق التواصل المكتشفة:</strong>
                          <div className="tags">
                            {detail.foundContact.map((contact, cidx) => (
                              <span key={`contact-${contact}`} className="tag">{contact}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {detail.wordCount && (
                        <div className="meta-info" style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '1rem',
                          marginTop: '0.8rem',
                          padding: '1rem',
                          background: '#f9fafb',
                          borderRadius: '6px'
                        }}>
                          <div>
                            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem' }}>📊 عدد الكلمات</span>
                            <strong style={{ fontSize: '1.1rem' }}>{detail.wordCount}</strong>
                          </div>
                          <div>
                            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem' }}>📝 عدد الأحرف</span>
                            <strong style={{ fontSize: '1.1rem' }}>{detail.charCount || cvText.length}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* التوصيات */}
                {atsResult.recommendations.length > 0 && (
                  <div className="recommendations">
                    <h3>
                      <Lightbulb size={20} />
                      التوصيات والاقتراحات
                    </h3>
                    {atsResult.recommendations.map((rec, idx) => (
                      <div key={`rec-${rec.priority}-${idx}`} className={`recommendation ${rec.priority.toLowerCase()}`}>
                        <div className="rec-icon">{rec.icon}</div>
                        <div className="rec-content">
                          <span className="rec-priority">{rec.priority}</span>
                          <p>{rec.suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* أزرار العمل */}
                <div className="ats-actions">
                  <button className="action-btn" onClick={() => handleCopy(cvText)}>
                    <Copy size={18} />
                    نسخ النص
                  </button>
                  <button className="action-btn">
                    <Download size={18} />
                    تحميل التقرير
                  </button>
                </div>
              </>
            ) : (
              <div className="error-message">
                <AlertCircle size={40} />
                <p>{atsResult.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* نصائح عامة */}
      <section className="ats-tips">
        <div className="container">
          <h2>نصائح لتحسين درجة ATS 📚</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">📝</div>
              <h4>استخدم تنسيق بسيط</h4>
              <p>تجنب الرموز والصور والجداول المعقدة. استخدم صيغ Word أو PDF بسيطة.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔍</div>
              <h4>أضف كلمات مفتاحية</h4>
              <p>استخدم كلمات مفتاحية من الوصف الوظيفي لزيادة احتمال قبول السيرة.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📞</div>
              <h4>بيانات تواصل واضحة</h4>
              <p>تأكد من وجود رقم الهاتف والبريد الإلكتروني في أعلى السيرة الذاتية.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📋</div>
              <h4>تنظيم واضح</h4>
              <p>استخدم أقسام واضحة مثل: الخبرة، التعليم، المهارات، اللغات.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📄</div>
              <h4>الطول المثالي</h4>
              <p>حافظ على السيرة بين 400-4000 كلمة. صفحة واحدة للخريجين الجدد.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">✨</div>
              <h4>تجنب الأخطاء</h4>
              <p>تأكد من الأخطاء الإملائية والنحوية. استخدم أفعال قوية في الوصف.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ATSChecker;
