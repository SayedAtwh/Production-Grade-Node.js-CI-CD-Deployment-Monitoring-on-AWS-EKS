export const parseArabicRelativeTimeToTimestamp = (dateString) => {
  if (!dateString) return Date.now().toString();

  if (/^\d+$/.test(dateString.toString())) {
    return dateString.toString();
  }

  const now = Date.now();
  const ONE_HOUR = 3600000;

  let hoursToSubtract = 0;

  if (dateString === 'اليوم' || dateString === 'الآن' || dateString === 'منذ لحظات') {
    hoursToSubtract = 0.5;
  } else if (dateString === 'الأمس') {
    hoursToSubtract = 24;
  } else if (dateString.includes('ساعتين')) {
    hoursToSubtract = 2;
  } else if (dateString.includes('ساعة')) {
    const num = parseInt(dateString.match(/\d+/)?.[0] || '1');
    hoursToSubtract = num;
  } else if (dateString.includes('ساعات')) {
    const num = parseInt(dateString.match(/\d+/)?.[0] || '3');
    hoursToSubtract = num;
  } else if (dateString.includes('يومين')) {
    hoursToSubtract = 48;
  } else if (dateString.includes('أيام')) {
    const num = parseInt(dateString.match(/\d+/)?.[0] || '3');
    hoursToSubtract = num * 24;
  } else if (dateString.includes('يوم')) {
    const num = parseInt(dateString.match(/\d+/)?.[0] || '1');
    hoursToSubtract = num * 24;
  } else if (dateString.includes('أسبوعين')) {
    hoursToSubtract = 14 * 24;
  } else if (dateString.includes('أسبوع') || dateString.includes('اسبوع')) {
    hoursToSubtract = 7 * 24;
  } else if (dateString.includes('شهرين')) {
    hoursToSubtract = 60 * 24;
  } else if (dateString.includes('أشهر') || dateString.includes('شهور')) {
    const num = parseInt(dateString.match(/\d+/)?.[0] || '3');
    hoursToSubtract = num * 30 * 24;
  } else if (dateString.includes('شهر')) {
    const num = parseInt(dateString.match(/\d+/)?.[0] || '1');
    hoursToSubtract = num * 30 * 24;
  } else if (dateString.match(/^(السبت|الأحد|الاحد|الإثنين|الاثنين|الثلاثاء|الأربعاء|الاربعاء|الخميس|الجمعة)$/)) {
    hoursToSubtract = 72;
  } else {
    hoursToSubtract = 120; // fallback 5 days
  }

  return (now - (hoursToSubtract * ONE_HOUR)).toString();
};

export const formatTimeAgo = (dateString) => {
  if (typeof dateString === 'string' && !/^\d+$/.test(dateString) && (dateString.startsWith('منذ') || dateString === 'اليوم' || dateString === 'الأمس')) {
    // Before we fully migrate, if it slips through as a string just render it
    return dateString;
  }

  // Debug: Log the input date
  console.log('Input date:', dateString);

  // Handle timestamp format
  let date;
  if (/^\d+$/.test(dateString)) {
    // It's a timestamp
    date = new Date(parseInt(dateString));
  } else {
    // Try to parse as regular date
    date = new Date(dateString);
  }

  console.log('Parsed date:', date);
  console.log('Current time:', new Date());

  if (isNaN(date.getTime())) {
    console.log('Invalid date detected');
    return 'منذ لحظات';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  console.log('Difference in seconds:', diffInSeconds);

  // If the difference is negative, return "منذ لحظات"
  if (diffInSeconds < 0) {
    console.log('Negative difference detected');
    return 'منذ لحظات';
  }

  if (diffInSeconds < 60) {
    return 'منذ لحظات';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `منذ ${diffInMinutes} ${diffInMinutes === 1 ? 'دقيقة' : 'دقائق'}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `منذ ${diffInHours} ${diffInHours === 1 ? 'ساعة' : 'ساعات'}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `منذ ${diffInDays} ${diffInDays === 1 ? 'يوم' : 'أيام'}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `منذ ${diffInMonths} ${diffInMonths === 1 ? 'شهر' : 'أشهر'}`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `منذ ${diffInYears} ${diffInYears === 1 ? 'سنة' : 'سنوات'}`;
};

export const formatExactDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleDateString('ar-SA', options);
};

export const getCurrentDateTime = () => {
  // Use timestamp to avoid any format issues
  return Date.now().toString();
};
