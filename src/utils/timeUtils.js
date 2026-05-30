const ONE_HOUR = 3600000;

const patterns = [
  { match: ['اليوم', 'الآن', 'منذ لحظات'], hours: 0.5 },
  { match: ['الأمس'], hours: 24 },
  { match: ['ساعتين'], hours: 2 },
  { match: ['يومين'], hours: 48 },
  { match: ['أسبوعين'], hours: 14 * 24 },
  { match: ['أسبوع', 'اسبوع'], hours: 7 * 24 },
  { match: ['شهرين'], hours: 60 * 24 },
];

const extractNumber = (str, fallback) =>
  parseInt(str?.match(/\d+/)?.[0] || fallback);

const getHoursToSubtract = (dateString) => {
  for (const p of patterns) {
    if (p.match.some(m => dateString.includes(m))) {
      return p.hours;
    }
  }

  if (dateString.includes('ساعة')) {
    return extractNumber(dateString, '1');
  }

  if (dateString.includes('ساعات')) {
    return extractNumber(dateString, '3');
  }

  if (dateString.includes('أيام') || dateString.includes('يوم')) {
    return extractNumber(dateString, '1') * 24;
  }

  if (dateString.includes('أشهر') || dateString.includes('شهور')) {
    return extractNumber(dateString, '3') * 30 * 24;
  }

  if (dateString.includes('شهر')) {
    return extractNumber(dateString, '1') * 30 * 24;
  }

  const daysMatch = /(السبت|الأحد|الاحد|الإثنين|الاثنين|الثلاثاء|الأربعاء|الاربعاء|الخميس|الجمعة)/;
  if (daysMatch.test(dateString)) {
    return 72;
  }

  return 120; // fallback
};

export const parseArabicRelativeTimeToTimestamp = (dateString) => {
  if (!dateString) return Date.now().toString();

  const str = dateString.toString();

  // لو رقم (timestamp)
  if (/^\d+$/.test(str)) {
    return str;
  }

  const now = Date.now();
  const hoursToSubtract = getHoursToSubtract(str);

  return (now - hoursToSubtract * ONE_HOUR).toString();
};

/**
 * Format timestamp to Arabic "time ago"
 */
export const formatTimeAgo = (dateString) => {
  if (!dateString) return 'منذ لحظات';

  // لو string جاهز زي "منذ ..."
  if (
    typeof dateString === 'string' &&
    !/^\d+$/.test(dateString) &&
    (dateString.startsWith('منذ') ||
      dateString === 'اليوم' ||
      dateString === 'الأمس')
  ) {
    return dateString;
  }

  const date = /^\d+$/.test(dateString)
    ? new Date(parseInt(dateString))
    : new Date(dateString);

  if (isNaN(date.getTime())) return 'منذ لحظات';

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'منذ لحظات';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `منذ ${diffInMinutes} دقيقة`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `منذ ${diffInDays} يوم`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `منذ ${diffInMonths} شهر`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `منذ ${diffInYears} سنة`;
};

/**
 * Format exact date time
 */
export const formatExactDateTime = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Get current timestamp
 */
export const getCurrentDateTime = () => {
  return Date.now().toString();
};