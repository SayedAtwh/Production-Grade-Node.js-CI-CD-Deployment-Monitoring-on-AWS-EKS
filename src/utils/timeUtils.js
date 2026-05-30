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
  parseInt(str.match(/\d+/)?.[0] || fallback);

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

  if (
    /(السبت|الأحد|الاحد|الإثنين|الاثنين|الثلاثاء|الأربعاء|الاربعاء|الخميس|الجمعة)/.test(
      dateString
    )
  ) {
    return 72;
  }

  return 120; // fallback
};

export const parseArabicRelativeTimeToTimestamp = (dateString) => {
  if (!dateString) return Date.now().toString();

  if (/^\d+$/.test(dateString.toString())) {
    return dateString.toString();
  }

  const now = Date.now();
  const hoursToSubtract = getHoursToSubtract(dateString);

  return (now - hoursToSubtract * ONE_HOUR).toString();
};