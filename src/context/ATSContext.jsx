import React, { createContext, useState, useContext } from 'react';

const ATSContext = createContext();

// معايير فحص التوافق مع ATS
const ATS_CRITERIA = {
  formatting: {
    weight: 15,
    checks: [
      { name: 'استخدام الصيغ البسيطة (PDF أو Word)', regex: /^(pdf|doc|docx)$/i },
      { name: 'عدم وجود صور معقدة', regex: /^(no_complex_images)$/i },
      { name: 'عدم استخدام الجداول المعقدة', regex: /^(simple_structure)$/i },
      { name: 'فاصل سطور واضح بين الأقسام', regex: /(\n\n)+/g }
    ]
  },
  keywords: {
    weight: 35,
    important: [
      'سيرة ذاتية', 'خبرة', 'مهارات', 'تعليم', 'العمل',
      'المسؤوليات', 'الإنجازات', 'اللغات', 'الشهادات',
      'المشاريع', 'التدريب', 'البرامج', 'المعرفة',
      'مؤهلات', 'كفاءات', 'أهداف', 'الدورات'
    ],
    technical: ['python', 'java', 'javascript', 'sql', 'html', 'css', 'react', 'node', 'api', 'database']
  },
  contact: {
    weight: 15,
    checks: ['هاتف', 'بريد', 'عنوان', 'linkedin', 'github', 'موقع ويب', 'تويتر', 'بورتفوليو']
  },
  structure: {
    weight: 20,
    sections: ['الاسم', 'البيانات الشخصية', 'الملخص', 'الخبرة', 'التعليم', 'المهارات', 'اللغات', 'الشهادات']
  },
  length: {
    weight: 15,
    ideal: { min: 300, max: 5000 } // عدد الكلمات
  }
};

export function ATSProvider({ children }) {
  const [atsResult, setATSResult] = useState(null);

  // دالة فحص السيرة الذاتية
  const analyzeCV = (cvText) => {
    if (!cvText || cvText.trim().length === 0) {
      return { success: false, message: 'يرجى إدخال نص السيرة الذاتية' };
    }

    let totalScore = 0;
    const details = [];

    // 1. فحص الصيغة والتنسيق
    const formattingScore = analyzeFormatting(cvText);
    totalScore += (formattingScore.score / 100) * ATS_CRITERIA.formatting.weight;
    details.push({
      category: 'التنسيق والصيغة',
      score: formattingScore.score,
      weight: ATS_CRITERIA.formatting.weight,
      feedback: formattingScore.feedback,
      warnings: formattingScore.warnings
    });

    // 2. فحص الكلمات المفتاحية
    const keywordsScore = analyzeKeywords(cvText);
    totalScore += (keywordsScore.score / 100) * ATS_CRITERIA.keywords.weight;
    details.push({
      category: 'الكلمات المفتاحية',
      score: keywordsScore.score,
      weight: ATS_CRITERIA.keywords.weight,
      feedback: keywordsScore.feedback,
      foundKeywords: keywordsScore.foundKeywords
    });

    // 3. فحص بيانات التواصل
    const contactScore = analyzeContact(cvText);
    totalScore += (contactScore.score / 100) * ATS_CRITERIA.contact.weight;
    details.push({
      category: 'بيانات التواصل',
      score: contactScore.score,
      weight: ATS_CRITERIA.contact.weight,
      feedback: contactScore.feedback,
      foundContact: contactScore.foundContact
    });

    // 4. فحص البنية والأقسام
    const structureScore = analyzeStructure(cvText);
    totalScore += (structureScore.score / 100) * ATS_CRITERIA.structure.weight;
    details.push({
      category: 'البنية والأقسام',
      score: structureScore.score,
      weight: ATS_CRITERIA.structure.weight,
      feedback: structureScore.feedback,
      foundSections: structureScore.foundSections
    });

    // 5. فحص طول السيرة الذاتية
    const lengthScore = analyzeLength(cvText);
    totalScore += (lengthScore.score / 100) * ATS_CRITERIA.length.weight;
    details.push({
      category: 'طول السيرة الذاتية',
      score: lengthScore.score,
      weight: ATS_CRITERIA.length.weight,
      feedback: lengthScore.feedback,
      wordCount: lengthScore.wordCount
    });

    // حساب الدرجة النهائية
    const finalScore = Math.round(totalScore);

    // تحديد الحالة
    let status = 'ضعيفة';
    let statusColor = '#ef4444';
    if (finalScore >= 80) {
      status = 'ممتازة';
      statusColor = '#22c55e';
    } else if (finalScore >= 70) {
      status = 'جيدة جداً';
      statusColor = '#84cc16';
    } else if (finalScore >= 60) {
      status = 'جيدة';
      statusColor = '#eab308';
    } else if (finalScore >= 50) {
      status = 'متوسطة';
      statusColor = '#f97316';
    }

    // التوصيات
    const recommendations = generateRecommendations(details, finalScore);

    const result = {
      success: true,
      finalScore,
      status,
      statusColor,
      details,
      recommendations,
      analyzedAt: new Date().toISOString()
    };

    setATSResult(result);
    return result;
  };

  // فحص التنسيق
  const analyzeFormatting = (text) => {
    let score = 100;
    const warnings = [];

    // البحث عن تنسيقات معقدة
    if (text.includes('|') || text.includes('║')) {
      score -= 20;
      warnings.push('يحتوي على رموز معقدة قد لا تقرأها أنظمة ATS');
    }

    // البحث عن فواصل سطور كافية
    const emptyLines = (text.match(/\n\n+/g) || []).length;
    if (emptyLines < 3) {
      score -= 15;
      warnings.push('نقص في المسافات بين الأقسام');
    }

    // البحث عن نصوص بسيطة
    if (text.length < 300) {
      score -= 10;
      warnings.push('السيرة الذاتية قصيرة جداً');
    }

    return {
      score: Math.max(0, score),
      feedback: score === 100 ? 'التنسيق واضح وسهل القراءة' : 'يحتاج التنسيق إلى تحسين',
      warnings
    };
  };

  // فحص الكلمات المفتاحية - محسّن
  const analyzeKeywords = (text) => {
    const textLower = text.toLowerCase();
    const foundKeywords = [];
    const foundTechnical = [];
    let matchCount = 0;

    // البحث عن الكلمات الأساسية
    ATS_CRITERIA.keywords.important.forEach(keyword => {
      // البحث عن الكلمة كلمة كاملة وليس جزء من كلمة
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      if (regex.test(textLower)) {
        foundKeywords.push(keyword);
        matchCount += 2;
      }
    });

    // البحث عن الكلمات التقنية
    ATS_CRITERIA.keywords.technical.forEach(tech => {
      const regex = new RegExp(`\\b${tech}\\b`, 'gi');
      if (regex.test(textLower)) {
        foundTechnical.push(tech);
        matchCount += 1;
      }
    });

    // حساب النسبة المئوية
    const maxPossible = (ATS_CRITERIA.keywords.important.length * 2) + (ATS_CRITERIA.keywords.technical.length * 1);
    const score = Math.round((matchCount / maxPossible) * 100);

    return {
      score: Math.max(0, Math.min(100, score)),
      feedback: score >= 70 ? 'الكلمات المفتاحية ممتازة' : score >= 50 ? 'أضف المزيد من الكلمات المفتاحية' : 'السيرة تحتاج الكثير من الكلمات المفتاحية',
      foundKeywords,
      foundTechnical,
      missing: ATS_CRITERIA.keywords.important.filter(k => !foundKeywords.includes(k)).slice(0, 5)
    };
  };

  // فحص بيانات التواصل - محسّن
  const analyzeContact = (text) => {
    const textLower = text.toLowerCase();
    const foundContact = [];
    let contactScore = 0;

    // البحث عن البريد الإلكتروني
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
    if (emailRegex.test(text)) {
      foundContact.push('البريد الإلكتروني');
      contactScore += 20;
    }

    // البحث عن رقم الهاتف (صيغ مختلفة)
    const phoneRegex = /(\+?[0-9]{1,3}[-.\s]?)?(\(?[0-9]{2,4}\)?[-.\s]?)?[0-9]{3,4}[-.\s]?[0-9]{3,4}/g;
    if (phoneRegex.test(text)) {
      foundContact.push('رقم الهاتف');
      contactScore += 20;
    }

    // البحث عن منصات التواصل
    ATS_CRITERIA.contact.checks.slice(2).forEach(contact => {
      if (textLower.includes(contact.toLowerCase())) {
        foundContact.push(contact);
        contactScore += 10;
      }
    });

    return {
      score: Math.min(100, contactScore),
      feedback: contactScore >= 40 ? 'بيانات التواصل كاملة وواضحة' : 'أضف المزيد من وسائل التواصل (بريد + هاتف على الأقل)',
      foundContact
    };
  };

  // فحص البنية - محسّن
  const analyzeStructure = (text) => {
    const foundSections = [];
    let structureScore = 0;

    // البحث بحساسية أقل تجاه حالة الأحرف
    const sectionsToCheck = [
      { name: 'الاسم', keywords: ['الاسم', 'الاسم الكامل', 'name'] },
      { name: 'البيانات الشخصية', keywords: ['البيانات الشخصية', 'معلومات التواصل', 'contact', 'phone', 'email'] },
      { name: 'الملخص الشخصي', keywords: ['ملخص', 'ملف شخصي', 'مقدمة', 'summary', 'objective', 'profile'] },
      { name: 'الخبرة المهنية', keywords: ['الخبرة', 'خبرة', 'experience', 'عمل', 'وظيفة'] },
      { name: 'التعليم', keywords: ['التعليم', 'تعليم', 'education', 'شهادة', 'جامعة', 'درجة'] },
      { name: 'المهارات', keywords: ['مهارات', 'مهارة', 'skills', 'competencies'] },
      { name: 'اللغات', keywords: ['لغات', 'لغة', 'languages', 'لغة عربية', 'لغة انجليزية'] },
      { name: 'الشهادات', keywords: ['شهادات', 'شهادة', 'certifications', 'certificates'] }
    ];

    sectionsToCheck.forEach(section => {
      const found = section.keywords.some(keyword =>
        new RegExp(`\\b${keyword}\\b`, 'gi').test(text)
      );
      if (found) {
        foundSections.push(section.name);
        structureScore += 12.5;
      }
    });

    return {
      score: Math.min(100, Math.round(structureScore)),
      feedback: foundSections.length >= 5 ? 'البنية منظمة بشكل ممتاز' : foundSections.length >= 4 ? 'البنية منظمة بشكل جيد' : 'يحتاج تنظيم أفضل',
      foundSections,
      missingSections: sectionsToCheck.filter(s => !foundSections.includes(s.name)).map(s => s.name)
    };
  };

  // فحص الطول - محسّن
  const analyzeLength = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    const charCount = text.length;
    const { ideal } = ATS_CRITERIA.length;

    let score = 100;
    let feedback = 'طول السيرة الذاتية مثالي ✓';

    if (wordCount < 100) {
      score = 20;
      feedback = `السيرة الذاتية قصيرة جداً (${wordCount} كلمة). الحد الأدنى المقترح ${ideal.min} كلمة`;
    } else if (wordCount < ideal.min) {
      score = Math.round((wordCount / ideal.min) * 80) + 20;
      feedback = `السيرة الذاتية قصيرة (${wordCount} كلمة). الطول المثالي ${ideal.min}-${ideal.max} كلمة`;
    } else if (wordCount <= ideal.max) {
      score = 100;
      feedback = `طول السيرة الذاتية مثالي (${wordCount} كلمة) ✓`;
    } else if (wordCount <= ideal.max + 1000) {
      score = 85;
      feedback = `السيرة الذاتية طويلة قليلاً (${wordCount} كلمة). حاول تقليل الطول قليلاً`;
    } else {
      score = 60;
      feedback = `السيرة الذاتية طويلة جداً (${wordCount} كلمة). حاول تقليل الطول بشكل ملحوظ`;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      feedback,
      wordCount,
      charCount
    };
  };

  // توليد التوصيات - محسّن
  const generateRecommendations = (details, finalScore) => {
    const recommendations = [];

    details.forEach(detail => {
      if (detail.score < 50) {
        switch (detail.category) {
          case 'التنسيق والصيغة':
            recommendations.push({
              priority: 'ضروري',
              suggestion: 'استخدم تنسيق بسيط وواضح. تجنب الرموز الزينة والجداول المعقدة والصور غير الضرورية.',
              icon: '📝'
            });
            break;
          case 'الكلمات المفتاحية':
            const missing = detail.missing?.slice(0, 5)?.join('، ');
            recommendations.push({
              priority: 'ضروري',
              suggestion: `أضف كلمات مفتاحية أكثر مثل: ${missing}. استخدم نفس الكلمات من الوصف الوظيفي.`,
              icon: '🔑'
            });
            break;
          case 'بيانات التواصل':
            recommendations.push({
              priority: 'ضروري',
              suggestion: 'أضف البريد الإلكتروني والهاتف بوضوح في أعلى السيرة. تأكد من صحة البيانات.',
              icon: '📞'
            });
            break;
          case 'البنية والأقسام':
            const missingSections = detail.missingSections?.slice(0, 3)?.join('، ');
            recommendations.push({
              priority: 'عالي',
              suggestion: `أضف أقسام مهمة مثل: ${missingSections}. نظم السيرة بشكل واضح وسهل.`,
              icon: '📋'
            });
            break;
          case 'طول السيرة الذاتية':
            recommendations.push({
              priority: 'عالي',
              suggestion: detail.feedback,
              icon: '📄'
            });
            break;
          default:
            break;
        }
      } else if (detail.score < 70) {
        switch (detail.category) {
          case 'الكلمات المفتاحية':
            recommendations.push({
              priority: 'عالي',
              suggestion: 'قوّي الكلمات المفتاحية بإضافة مصطلحات من مجال تخصصك.',
              icon: '🔍'
            });
            break;
          case 'البنية والأقسام':
            recommendations.push({
              priority: 'متوسط',
              suggestion: 'حسّن تنظيم الأقسام واجعلها أكثر وضوحاً.',
              icon: '📑'
            });
            break;
          default:
            break;
        }
      }
    });

    if (finalScore >= 80) {
      recommendations.unshift({
        priority: 'معلومة',
        suggestion: '✨ سيرتك الذاتية بحالة ممتازة! جاهزة للتقديم على الوظائف بثقة.',
        icon: '⭐'
      });
    } else if (finalScore >= 70) {
      recommendations.unshift({
        priority: 'معلومة',
        suggestion: '👍 سيرتك الذاتية جيدة جداً. طبق التوصيات أعلاه لتحسين النتائج أكثر.',
        icon: '✨'
      });
    }

    return recommendations;
  };

  return (
    <ATSContext.Provider value={{ atsResult, analyzeCV }}>
      {children}
    </ATSContext.Provider>
  );
}

export function useATS() {
  const context = useContext(ATSContext);
  if (!context) {
    throw new Error('useATS must be used within an ATSProvider');
  }
  return context;
}
