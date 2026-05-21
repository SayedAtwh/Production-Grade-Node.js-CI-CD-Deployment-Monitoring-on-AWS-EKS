import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Key, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile, changePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  // Info tab state
  const [username, setUsername] = useState(user?.username || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [infoMessage, setInfoMessage] = useState({ type: '', text: '' });
  const [infoLoading, setInfoLoading] = useState(false);

  // Password tab state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if not logged in
  if (!user) {
    return (
      <main className="profile-container">
        <div className="profile-error">
          <AlertCircle size={50} />
          <h2>لا يمكن الوصول إلى هذه الصفحة</h2>
          <p>يجب تسجيل الدخول أولاً)</p>
          <button className="btn-primary" onClick={() => navigate('/')}>العودة للرئيسية</button>
        </div>
      </main>
    );
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setInfoLoading(true);
    setInfoMessage({ type: '', text: '' });

    // Validation
    if (!username.trim()) {
      setInfoMessage({ type: 'error', text: 'الرجاء إدخال اسم المستخدم' });
      setInfoLoading(false);
      return;
    }

    const result = updateProfile(username, phone);
    setInfoMessage({ type: result.success ? 'success' : 'error', text: result.message });
    setInfoLoading(false);

    if (result.success) {
      setTimeout(() => setInfoMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ type: '', text: '' });

    // Validation
    if (!currentPassword) {
      setPasswordMessage({ type: 'error', text: 'الرجاء إدخال كلمة المرور الحالية' });
      setPasswordLoading(false);
      return;
    }

    if (!newPassword) {
      setPasswordMessage({ type: 'error', text: 'الرجاء إدخال كلمة المرور الجديدة' });
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
      setPasswordLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'كلمات المرور غير متطابقة' });
      setPasswordLoading(false);
      return;
    }

    const result = changePassword(currentPassword, newPassword);
    setPasswordMessage({ type: result.success ? 'success' : 'error', text: result.message });
    setPasswordLoading(false);

    if (result.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleLogout = () => {
    if (window.confirm('هل تريد تسجيل الخروج؟')) {
      logout();
      navigate('/');
    }
  };

  return (
    <main className="profile-container">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={60} />
          </div>
          <div className="profile-intro">
            <h1>مرحباً بك، {user.username}! 👋</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <User size={18} />
            المعلومات الشخصية
          </button>
          <button
            className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            <Key size={18} />
            تغيير كلمة السر
          </button>
        </div>

        <div className="profile-content">
          {/* معلومات شخصية */}
          {activeTab === 'info' && (
            <div className="profile-section">
              <h2>المعلومات الشخصية</h2>
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="form-group">
                  <label htmlFor="username">
                    <User size={18} />
                    اسم المستخدم
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="أدخل اسم المستخدم"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={18} />
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                    className="disabled-input"
                  />
                  <small>لا يمكن تغيير البريد الإلكتروني</small>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={18} />
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="أدخل رقم الهاتف (اختياري)"
                  />
                </div>

                {infoMessage.text && (
                  <div className={`message ${infoMessage.type}`}>
                    {infoMessage.type === 'success' ? (
                      <CheckCircle size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    <span>{infoMessage.text}</span>
                  </div>
                )}

                <button type="submit" className="btn-primary" disabled={infoLoading}>
                  {infoLoading ? 'جاري التحديث...' : 'حفظ التغييرات'}
                </button>
              </form>
            </div>
          )}

          {/* تغيير كلمة السر */}
          {activeTab === 'password' && (
            <div className="profile-section">
              <h2>تغيير كلمة المرور</h2>
              <form onSubmit={handleChangePassword} className="profile-form">
                <div className="form-group">
                  <label htmlFor="current-password">
                    <Key size={18} />
                    كلمة المرور الحالية
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="current-password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="أدخل كلمة المرور الحالية"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="new-password">
                    <Key size={18} />
                    كلمة المرور الجديدة
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="أدخل كلمة المرور الجديدة"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password">
                    <Key size={18} />
                    تأكيد كلمة المرور
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="أعد إدخال كلمة المرور الجديدة"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {passwordMessage.text && (
                  <div className={`message ${passwordMessage.type}`}>
                    {passwordMessage.type === 'success' ? (
                      <CheckCircle size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    <span>{passwordMessage.text}</span>
                  </div>
                )}

                <button type="submit" className="btn-primary" disabled={passwordLoading}>
                  {passwordLoading ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button className="btn-secondary" onClick={handleLogout}>
            تسجيل الخروج
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
