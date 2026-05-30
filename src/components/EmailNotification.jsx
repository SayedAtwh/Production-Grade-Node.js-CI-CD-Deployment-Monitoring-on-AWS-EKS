import React from 'react';
import { Mail, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/EmailNotification.css';

function EmailNotification() {
  const { emailNotification, verifyEmail, setEmailNotification } = useAuth();

  if (!emailNotification) return null;

  const handleClose = () => {
    setEmailNotification(null);
  };

  const handleVerifyEmail = () => {
    if (emailNotification.type === 'verification') {
      const result = verifyEmail(emailNotification.token);
      if (result.success) {
        // verifyEmail already closes the notification
      } else {
        alert(result.message);
      }
    } else {
      handleClose();
    }
  };

  return (
    <div className="email-notification-overlay">
      <div className="email-notification-modal">
        <button
          className="close-btn"
          onClick={handleClose}
          title="إغلاق"
        >
          <X size={24} />
        </button>

        <div className="email-header">
          <div className="email-icon">
            <Mail size={40} />
          </div>
          <h2>📧 {emailNotification.subject}</h2>
          <p className="email-to">إلى: {emailNotification.email}</p>
        </div>

        <div className="email-body">
          <div className="email-content">
            {emailNotification.content.split('\n').map((line, idx) => (
              <p key={`line-${idx}-${line.substring(0, 10)}`} className={line.match(/^[🔗✓━━━━━━━━━━]/u) ? 'special-line' : ''}>
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="email-footer">
          {emailNotification.type === 'verification' && (
            <button className="btn-verify" onClick={handleVerifyEmail}>
              <CheckCircle size={18} />
              تأكيد البريد الإلكتروني
            </button>
          )}
          <button className="btn-close" onClick={handleClose}>
            {emailNotification.type === 'verification' ? 'الرجوع لاحقاً' : 'حسناً، فهمت'}
          </button>
        </div>

        <div className="email-info">
          💡 <strong>تنبيه أمني:</strong> هذا هو محاكاة للبريد الذي سيصل إلى عنوانك الفعلي. في النظام الحقيقي، ستتلقى هذا البريد على بريدك الإلكتروني المسجل.
        </div>
      </div>
    </div>
  );
}

export default EmailNotification;
