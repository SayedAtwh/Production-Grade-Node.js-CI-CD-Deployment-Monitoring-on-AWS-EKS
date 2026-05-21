import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// دالة مساعدة لتحويل كلمة المرور إلى hash بسيطة (للمحاكاة)
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // تحويل إلى 32-bit integer
  }
  return Math.abs(hash).toString();
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailNotification, setEmailNotification] = useState(null); // { type, email, subject, content }

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('masarUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Function to get all registered accounts
  const getAccounts = () => {
    const accounts = localStorage.getItem('masarAccounts');
    return accounts ? JSON.parse(accounts) : [];
  };

  // Function to save accounts
  const saveAccounts = (accounts) => {
    localStorage.setItem('masarAccounts', JSON.stringify(accounts));
  };

  // Register new account
  const register = (username, email, password) => {
    const accounts = getAccounts();

    // Check if email already exists
    if (accounts.some(acc => acc.email === email)) {
      return { success: false, message: 'هذا البريد الإلكتروني مسجل بالفعل' };
    }

    // Check if username already exists
    if (accounts.some(acc => acc.username === username)) {
      return { success: false, message: 'اسم المستخدم مستخدم بالفعل' };
    }

    // Create verification token
    const verificationToken = Math.random().toString(36).substring(2, 15);
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    // Create new account (not verified yet)
    const newAccount = {
      username,
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      verified: false,
      verificationToken,
      tokenExpiry,
      tempRegisterData: { username, email, password }
    };

    accounts.push(newAccount);
    saveAccounts(accounts);

    // Show email verification notification
    const emailContent = `مرحباً ${username}! 👋

تم استقبال طلب تسجيل حساب جديد على منصة مسار.

لإكمال التسجيل والتحقق من بريدك الإلكتروني، يرجى النقر على الرابط أدناه:

🔗 تأكيد البريد الإلكتروني
Verification Code: ${verificationToken}

هذا الرابط ساري لمدة 24 ساعة فقط.

إذا لم تقم بهذا الطلب، يمكنك تجاهل هذا البريد.

مع أطيب التحيات،
فريق مسار ✨`;

    setEmailNotification({
      type: 'verification',
      email,
      subject: 'تأكيد البريد الإلكتروني - مسار',
      content: emailContent,
      token: verificationToken,
      username
    });

    return { success: true, message: 'تم إرسال بريد التحقق! يرجى التحقق من بريدك الإلكتروني.' };
  };

  // Verify email
  const verifyEmail = (token) => {
    const accounts = getAccounts();
    const accountIndex = accounts.findIndex(acc => acc.verificationToken === token);

    if (accountIndex === -1) {
      return { success: false, message: 'رمز التحقق غير صحيح أو انتهت صلاحيته' };
    }

    const account = accounts[accountIndex];

    // Check if token is expired
    if (new Date(account.tokenExpiry) < new Date()) {
      return { success: false, message: 'انتهت صلاحية رمز التحقق' };
    }

    // Mark account as verified
    account.verified = true;
    account.verificationToken = null;
    account.tokenExpiry = null;
    saveAccounts(accounts);

    // Auto login after verification
    const userData = { username: account.username, email: account.email, loginTime: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem('masarUser', JSON.stringify(userData));
    setEmailNotification(null);

    return { success: true, message: 'تم التحقق من البريد الإلكتروني بنجاح!' };
  };

  // Login with email and password
  const login = (email, password) => {
    const accounts = getAccounts();
    const account = accounts.find(acc => acc.email === email);

    if (!account) {
      return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
    }

    // Verify password
    if (account.passwordHash !== hashPassword(password)) {
      return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
    }

    // Login successful
    const userData = { username: account.username, email: account.email, loginTime: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem('masarUser', JSON.stringify(userData));

    return { success: true, message: 'تم تسجيل الدخول بنجاح!' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('masarUser');
  };

  // Update user profile information
  const updateProfile = (username, phone) => {
    if (!user) {
      return { success: false, message: 'لا يوجد مستخدم مسجل دخول' };
    }

    const accounts = getAccounts();
    const accountIndex = accounts.findIndex(acc => acc.email === user.email);

    if (accountIndex === -1) {
      return { success: false, message: 'لم يتم العثور على الحساب' };
    }

    // Check if new username is already taken by another account
    if (username !== user.username && accounts.some((acc, idx) => idx !== accountIndex && acc.username === username)) {
      return { success: false, message: 'اسم المستخدم مستخدم بالفعل' };
    }

    // Update account
    accounts[accountIndex].username = username;
    accounts[accountIndex].phone = phone;
    saveAccounts(accounts);

    // Update user state
    const updatedUser = { ...user, username, phone };
    setUser(updatedUser);
    localStorage.setItem('masarUser', JSON.stringify(updatedUser));

    return { success: true, message: 'تم تحديث البيانات بنجاح!' };
  };

  // Change password
  const changePassword = (currentPassword, newPassword) => {
    if (!user) {
      return { success: false, message: 'لا يوجد مستخدم مسجل دخول' };
    }

    const accounts = getAccounts();
    const account = accounts.find(acc => acc.email === user.email);

    if (!account) {
      return { success: false, message: 'لم يتم العثور على الحساب' };
    }

    // Verify current password
    if (account.passwordHash !== hashPassword(currentPassword)) {
      return { success: false, message: 'كلمة المرور الحالية غير صحيحة' };
    }

    // Verify new password is different
    if (currentPassword === newPassword) {
      return { success: false, message: 'كلمة المرور الجديدة يجب أن تكون مختلفة' };
    }

    // Update password
    const accountIndex = accounts.findIndex(acc => acc.email === user.email);
    accounts[accountIndex].passwordHash = hashPassword(newPassword);
    saveAccounts(accounts);

    // Send password change confirmation email
    const changeDate = new Date().toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const emailContent = `مرحباً ${user.username}! 👋

تم تغيير كلمة المرور الخاصة بحسابك على منصة مسار بنجاح.

📋 تفاصيل التغيير:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 التاريخ والوقت: ${changeDate}
📧 البريد الإلكتروني: ${user.email}
📱 الهاتف: متصفح ويب
🌍 الموقع: مصر

إذا لم تقم بهذا التغيير، يرجى تغيير كلمة المرور الخاصة بك فوراً والاتصال بنا.

🔒 نصائح الأمان:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ استخدم كلمة مرور قوية تحتوي على أحرف وأرقام ورموز
✓ لا تشارك كلمة المرور مع أحد
✓ قم بتغيير كلمة المرور بانتظام

شكراً لاستخدامك مسار! 💙
فريق مسار`;

    setEmailNotification({
      type: 'password-change',
      email: user.email,
      subject: 'تم تغيير كلمة المرور بنجاح - مسار',
      content: emailContent
    });

    return { success: true, message: 'تم تغيير كلمة المرور بنجاح!' };
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, changePassword, isLoading, emailNotification, verifyEmail, setEmailNotification }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
