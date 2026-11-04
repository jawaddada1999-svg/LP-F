export type Language = 'ar' | 'en' | 'fr';

export interface Translations {
  dir: 'rtl' | 'ltr';
  lang: string;
  nav: {
    capabilities: string;
    benefits: string;
    calculator: string;
    comparison: string;
    faq: string;
    booking: string;
    bookCta: string;
  };
  hero: {
    trustBadge: string;
    title: string;
    subtitle: string;
    vslTitle: string;
    vslSubtitle: string;
    videoEndedTitle: string;
    videoEndedDesc: string;
    goToBooking: string;
    replay: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
    fullscreen: string;
    stepPrefix: string;
    vslSlides: {
      tag: string;
      title: string;
      desc: string;
    }[];
  };
  postCta: {
    badge: string;
    title: string;
    subtitle: string;
    button: string;
    note: string;
  };
  capabilities: {
    kicker: string;
    category: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      badge: string;
    }[];
  };
  benefits: {
    kicker: string;
    category: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  calculator: {
    kicker: string;
    category: string;
    title: string;
    subtitle: string;
    leadsLostLabel: string;
    leadsLostUnit: string;
    avgCommissionLabel: string;
    avgCommissionUnit: string;
    closingRateLabel: string;
    closingRateUnit: string;
    lostDealsTitle: string;
    lostDealsUnit: string;
    moneyLostMonthTitle: string;
    moneyLostYearTitle: string;
    chartTitle: string;
    chartCurrentScenario: string;
    chartScenario1: string;
    chartScenario2: string;
    chartScenario3: string;
    dangerLow: string;
    dangerMedium: string;
    dangerHigh: string;
    dangerMsgLow: string;
    dangerMsgMedium: string;
    dangerMsgHigh: string;
    disclaimer: string;
    ctaButton: string;
  };
  comparison: {
    kicker: string;
    category: string;
    title: string;
    subtitle: string;
    traditionalBadge: string;
    traditionalTitle: string;
    traditionalFooter: string;
    ibondaBadge: string;
    ibondaTitle: string;
    ibondaFooter: string;
    items: {
      category: string;
      traditional: string;
      ibonda: string;
    }[];
  };
  booking: {
    kicker: string;
    category: string;
    title: string;
    subtitle: string;
    lockedNotice: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    fields: {
      fullName: string;
      fullNamePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      phoneHelper: string;
      agencyName: string;
      agencyNamePlaceholder: string;
      city: string;
      cityPlaceholder: string;
      dailyLeads: string;
      agencyStaff: string;
    };
    dailyLeadsOptions: { value: string; label: string }[];
    agencyStaffOptions: { value: string; label: string }[];
    moroccanCities: string[];
    reassurance: string;
    submitStep1: string;
    submitting: string;
    step2Heading: string;
    step2Subheading: string;
    editData: string;
    chooseDay: string;
    chooseTime: string;
    timeSlotsNote: string;
    selectedSummary: string;
    noDaySelected: string;
    noTimeSelected: string;
    confirmAppointment: string;
    confirming: string;
    confirmationTitle: string;
    confirmationDesc: (name: string, agency: string) => string;
    confirmationDate: string;
    confirmationTime: string;
    confirmationCity: string;
    confirmationFormat: string;
    confirmationFormatValue: string;
    bookAnother: string;
    errors: {
      fullNameRequired: string;
      fullNameMin: string;
      phoneRequired: string;
      phoneInvalid: string;
      agencyRequired: string;
      cityRequired: string;
      dailyLeadsRequired: string;
      agencyStaffRequired: string;
      chooseDateTime: string;
      submissionFailed: string;
    };
  };
  faq: {
    kicker: string;
    category: string;
    title: string;
    subtitle: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  footer: {
    desc: string;
    tagline: string;
    copyright: string;
    allRightsReserved: string;
    privacyLink: string;
    termsLink: string;
    timezone: string;
    privacyModalTitle: string;
    privacyIntro: string;
    privacySection1Title: string;
    privacySection1Text: string;
    privacySection2Title: string;
    privacySection2Text: string;
    privacySection3Title: string;
    privacySection3Text: string;
    termsModalTitle: string;
    termsIntro: string;
    termsSection1Title: string;
    termsSection1Text: string;
    termsSection2Title: string;
    termsSection2Text: string;
    closeModal: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    nav: {
      capabilities: 'المميزات',
      benefits: 'الفوائد',
      calculator: 'حاسبة الخسائر',
      comparison: 'مقارنة المنظومة',
      faq: 'الأسئلة الشائعة',
      booking: 'حجز الاستشارة',
      bookCta: 'احجز استشارة مجانية معنا',
    },
    hero: {
      trustBadge: 'منظومة ذكية لإدارة الوكالات العقارية بالمغرب',
      title: 'نظام واحد لإدارة وكالتك العقارية، من أول رسالة إلى المعاينة.',
      subtitle: 'نظّم عملاءك، أتمت التواصل معهم، تابع فريق المبيعات، واحجز المعاينات من خلال نظام واحد مصمم خصيصاً للوكالات العقارية.',
      vslTitle: 'شاهد العرض التوضيحي لمنظومة IBONDA',
      vslSubtitle: 'كيف تنقل وكالتك العقارية من فوضى الرسائل والمكالمات اليدوية إلى نظام آلي متكامل يفرز العملاء ويحجز المعاينات',
      videoEndedTitle: 'انتهى الفيديو التوضيحي!',
      videoEndedDesc: 'تم فتح استمارة حجز الاستشارة المجانية المباشرة أدناه.',
      goToBooking: 'الانتقال لحجز الاستشارة',
      replay: 'إعادة المشاهدة',
      play: 'تشغيل',
      pause: 'إيقاف مؤقت',
      mute: 'كتم الصوت',
      unmute: 'إلغاء كتم الصوت',
      fullscreen: 'ملء الشاشة',
      stepPrefix: 'المرحلة',
      vslSlides: [
        {
          tag: 'المرحلة 01 / الرد الفوري',
          title: 'استقبال الرسائل وأتمتة الردود فوراً عبر القنوات المفضلة',
          desc: 'الرد في أقل من 5 ثوانٍ، فرز استفسارات المشترين وتصنيف نوع العقار والميزانية تلقائياً.',
        },
        {
          tag: 'المرحلة 02 / الفرز الذكي',
          title: 'تأهيل العميل الجاد وفرز غير المناسبين تلقائياً',
          desc: 'استبعاد المتطفلين وحصر المواعيد فقط مع من يمتلك ميزانية حقيقية ومستعد للمعاينة.',
        },
        {
          tag: 'المرحلة 03 / جدولة المعاينات',
          title: 'جدولة المعاينات وتنسيق مواعيد فريق الوكالة',
          desc: 'تحديد موعد المعاينة آلياً مع العميل، وإرسال تنبيه مباشر للمستشار وتذكير تلقائي.',
        },
        {
          tag: 'المرحلة 04 / الرؤية والتحكم',
          title: 'لوحة تحكم شاملة للإدارة: متابعة الصفقات لحظياً',
          desc: 'رؤية كاملة لجميع الفرص من أول رسالة إلى إتمام الصفقة، مع تقارير أداء مستشاري الوكالة.',
        },
      ],
    },
    postCta: {
      badge: 'استشارة مخصصة 1-على-1 لوكالتك العقارية',
      title: 'هل أنت مستعد لنقل إدارة وكالتك العقارية إلى المستوى التالي؟',
      subtitle: 'احصل على جلسة استشارية حية لمدة 30 دقيقة نوضح لك فيها كيف تطبق منظومة IBONDA في وكالتك وتضاعف سرعة تحويل الرسائل إلى معاينات ناجحة.',
      button: 'احجز استشارة مجانية معنا',
      note: '30 دقيقة · استشارة مجانية · عبر مكالمة فيديو مباشرة',
    },
    capabilities: {
      kicker: 'قدرات المنظومة',
      category: 'مصممة لقطاع العقار',
      title: 'كل ما تحتاجه وكالتك العقارية في نظام تشغيلي متكامل',
      subtitle: 'تم بناء IBONDA خصيصاً ليناسب مسار عمل الوكالات العقارية، من اللحظة التي يكتب فيها العميل أول استفسار إلى خروجه للمعاينة الميدانية.',
      items: [
        {
          title: 'إدارة العملاء والطلبات (Lead Management)',
          desc: 'تجميع كافة طلبات المشترين والمستأجرين تلقائياً من الإعلانات في خط زمني موحد ومصنف حسب المرحلة والجدية.',
          badge: 'إدارة موحدة',
        },
        {
          title: 'أتمتة التواصل الفوري عبر القنوات المفضلة',
          desc: 'إرسال ردود ذكية فورية خلال ثوانٍ معدودة من وصول الرسالة لضمان التفاعل مع العميل وهو في قمة اهتمامه بالعقار.',
          badge: 'استجابة 24/7',
        },
        {
          title: 'تأهيل العملاء وفرز الجادين',
          desc: 'طرح أسئلة تأهيلية مبرمجة حول الميزانية، الموقع المفضل، نوع العقار، وجاهزية الشراء لفلترة المتطفلين وتوفير وقت الفريق.',
          badge: 'تصفية ذكية',
        },
        {
          title: 'جدولة المعاينات والمواعيد العقارية',
          desc: 'إتاحة حجز موعد المعاينة ذاتياً من جدول المستشار المتاح، مع إرسال تذكيرات وتأكيدات لتقليل نسبة التخلف.',
          badge: 'حجز دقيق',
        },
        {
          title: 'إشعارات فريق الوكالة الفورية',
          desc: 'توزيع تلقائي للمهتمين المؤهلين على المستشارين حسب المدينة أو التخصص مع إشعار مباشر عبر الهاتف وتطبيق الإدارة.',
          badge: 'توجيه آلي',
        },
        {
          title: 'CRM مخصص للقطاع العقاري',
          desc: 'سجل متكامل لكل عميل يوثق العقارات التي عاينها، ملاحظات المستشارين، تاريخ التواصل، وتفاصيل الميزانية بدقة.',
          badge: 'سجل شامل',
        },
        {
          title: 'إدارة المخزون والعروض العقارية',
          desc: 'فهرسة دقيقة لكل شقة، فيلا، مكتب أو أرض مع المواصفات والأسعار وربطها المباشر برغبات العملاء المسجلين في النظام.',
          badge: 'كتالوج الوحدات',
        },
        {
          title: 'لوحة تحكم مركزية للوكالة',
          desc: 'رؤية شاملة لصاحب الوكالة لمراقبة حجم العملاء الجدد، نسبة التحويل إلى معاينات، وأداء كل مستشار مبيعات في لوحة واحدة.',
          badge: 'رؤية إدارية',
        },
      ],
    },
    benefits: {
      kicker: 'الفوائد الملموسة',
      category: 'القيمة التشغيلية للوكالة',
      title: 'كيف تنعكس منظومة IBONDA على نمو وكالتك العقارية؟',
      subtitle: 'الهدف ليس مجرد برنامج إضافي، بل تحويل وكالتك إلى ماكينة مبيعات دقيقة وسلسة تعمل بكفاءة على مدار الساعة.',
      items: [
        {
          title: 'توفير وقت ثمين لفريق الوكالة',
          desc: 'إعفاء المستشارين من مهام إدخال البيانات اليدوية والردود المتكررة، ليتفرغوا تماماً لإجراء المعاينات والتفاوض وإغلاق الصفقات.',
        },
        {
          title: 'تقليل الفرص الضائعة إلى أدنى حد',
          desc: 'الرد السريع والأتمتة الذكية يضمنان عدم ضياع أي عميل محتمل بسبب بطء التواصل أو نسيان المتابعة بعد أول رسالة.',
        },
        {
          title: 'التركيز على العملاء الجادين فقط',
          desc: 'تأهيل العملاء المسبق يفرز المتفرجين، مما يضمن أن مستشاري وكالتك يخرجون للمعاينة فقط مع عملاء يمتلكون الميزانية والجاهزية.',
        },
        {
          title: 'تنظيم عمليات الوكالة والقضاء على الفوضى',
          desc: 'تحويل الوكالة من الاعتماد على الدفاتر الورقية والمراسلات المبعثرة إلى بيئة عمل رقمية موحدة ومنظمة.',
        },
        {
          title: 'تحسين تجربة العميل وبناء الثقة',
          desc: 'تقديم تجربة حجز واستفسار راقية تعكس مكانة وكالتك العقارية وتمنح العميل الثقة التامة في التعامل معك.',
        },
        {
          title: 'رفع كفاءة التنسيق ومتابعة الفريق',
          desc: 'تمكين صاحب الوكالة ومدير المبيعات من متابعة سير المعاينات ومراحل تقدم كل فرصة بدقة وشفافية.',
        },
      ],
    },
    calculator: {
      kicker: 'حاسبة العائد والفرص',
      category: 'تحليل تكلفة الفرص الضائعة',
      title: 'احسب كم تخسر كل شهر',
      subtitle: 'اكتشف الحجم التقديري للإيرادات التي تفقدها وكالتك شهرياً بسبب تأخر الردود والعملاء المحتملين الذين لا تتم متابعتهم.',
      leadsLostLabel: 'عدد العملاء المحتملين الضائعين شهرياً',
      leadsLostUnit: 'عميل محتمل / شهر',
      avgCommissionLabel: 'متوسط العمولة لكل صفقة بالدرهم (MAD)',
      avgCommissionUnit: 'درهم مغربي',
      closingRateLabel: 'نسبة الإغلاق من العملاء المحتملين',
      closingRateUnit: '%',
      lostDealsTitle: 'الصفقات الضائعة شهرياً',
      lostDealsUnit: 'صفقة بيع أو إيجار',
      moneyLostMonthTitle: 'الخسارة الشهرية المقدرة',
      moneyLostYearTitle: 'الخسارة السنوية التراكمية',
      chartTitle: 'مقارنة الخسارة الشهرية بحسب سيناريوهات فقدان العملاء',
      chartCurrentScenario: 'مدخلاتك الحالية',
      chartScenario1: '10 عملاء ضائعين',
      chartScenario2: '25 عميل ضائع',
      chartScenario3: '50 عميل ضائع',
      dangerLow: 'خطر منخفض',
      dangerMedium: 'خطر متوسط',
      dangerHigh: 'خطر مرتفع',
      dangerMsgLow: 'الخسارة الحالية محدودة، ولكن تنظيم التواصل يضمن لك نمواً أسرع واستقراراً أعلى.',
      dangerMsgMedium: 'أنت تفقد صفقات حقيقية كل شهر يمكن استرجاعها بأتمتة بسيطة لعملية التواصل والفرز.',
      dangerMsgHigh: 'أنت تخسر فرص بيع كل شهر دون أن تشعر. تأخر الرد وعدم المتابعة يذهب بصفقاتك للمنافسين.',
      disclaimer: 'الأرقام تقريبية وتعتمد على المدخلات التي تضعها.',
      ctaButton: 'احجز استشارة مجانية معنا',
    },
    comparison: {
      kicker: 'الفارق الجوهري',
      category: 'مقارنة أسلوب العمل',
      title: 'العمل التقليدي مقابل منظومة IBONDA الذكية',
      subtitle: 'مقارنة مباشرة بين كيفية إدارة الأمور بالطرق التقليدية المنهكة وبين الانتقال إلى نظام رقمي سلس ومنضبط.',
      traditionalBadge: 'الوضع الراهن',
      traditionalTitle: 'العمل التقليدي في الوكالات',
      traditionalFooter: 'النتيجة: إرهاق مستمر، ضياع عملاء محتملين، وضغط دائم على فريق العمل.',
      ibondaBadge: 'المنظومة الحديثة',
      ibondaTitle: 'منظومة IBONDA المتكاملة',
      ibondaFooter: 'النتيجة: وضوح كامل، سرعة استجابة فورية، ومعاينات مجدولة فقط مع العملاء الجادين.',
      items: [
        {
          category: 'تتبع العملاء والطلبات',
          traditional: 'تسجيل يدوي متفرق في دفاتر ورقية ومحادثات شخصية تضيع بسهولة.',
          ibonda: 'إدارة مركزية موحدة تسجل كل عميل جديد فوراً وتحدد مصدره وحالته تلقائياً.',
        },
        {
          category: 'معلومات وسجلات العملاء',
          traditional: 'بيانات مبعثرة بين هواتف المستشارين، وصعوبة معرفة تفاصيل الطلب أو الميزانية.',
          ibonda: 'ملف منظم ومحدث لكل عميل يوثق رغباته، سجل تواصله، وتاريخ العقارات التي عاينها.',
        },
        {
          category: 'التواصل والمتابعة',
          traditional: 'متابعات يدوية غير منتظمة، وتأخر في الرد يفقد العميل حماسه لصالح وكالة أخرى.',
          ibonda: 'تواصل مؤتمت وسريع عبر القنوات المفضلة، مع ردود فورية ورسائل تذكير تلقائية.',
        },
        {
          category: 'تنسيق المعاينات والمواعيد',
          traditional: 'مكالمات متبادلة متكررة، تضارب في المواعيد، ونسبة عالية من الغياب دون اعتذار.',
          ibonda: 'جدولة دقيقة ومنظمة للمواعيد حسب توفر المستشار مع تأكيدات إلكترونية وتنبيهات مباشرة.',
        },
        {
          category: 'الرؤية والتحكم للإدارة',
          traditional: 'رؤية تشغيلية محدودة وضبابية حول ما يحدث يومياً، وصعوبة تقييم إنجاز الفريق.',
          ibonda: 'لوحة تحكم مركزية وتقارير لحظية توفر لإدارة الوكالة وضوحاً كاملاً لكل مراحل الصفقات.',
        },
      ],
    },
    booking: {
      kicker: 'حجز الاستشارة',
      category: 'جلسة استشارية خاصة',
      title: 'احجز استشارة مجانية معنا',
      subtitle: 'استشارة مجانية 1 على 1 · 30 دقيقة عبر Google Meet · بدون أي التزام',
      lockedNotice: 'شاهد الفيديو كاملاً لتتمكن من حجز استشارتك المجانية',
      step1Title: 'بيانات الوكالة',
      step2Title: 'اختيار الموعد',
      step3Title: 'تأكيد الحجز',
      fields: {
        fullName: 'الاسم الكامل',
        fullNamePlaceholder: 'مثال: يوسف الإدريسي',
        phone: 'رقم الهاتف',
        phonePlaceholder: '06XXXXXXXX أو +2126XXXXXXXX',
        phoneHelper: 'يرجى إدخال رقم مغربي نشط لتلقي تفاصيل الموعد',
        agencyName: 'اسم الوكالة العقارية',
        agencyNamePlaceholder: 'مثال: أطلس للعقارات الفاخرة',
        city: 'المدينة',
        cityPlaceholder: 'اختر المدينة',
        dailyLeads: 'عدد العملاء المحتملين يومياً',
        agencyStaff: 'عدد أفراد الوكالة',
      },
      dailyLeadsOptions: [
        { value: '1_50', label: 'من 1 إلى 50' },
        { value: '50_100', label: 'من 50 إلى 100' },
        { value: '100_300', label: 'من 100 إلى 300' },
        { value: 'more_300', label: 'أكثر من 300' },
      ],
      agencyStaffOptions: [
        { value: '1_3', label: '1 إلى 3' },
        { value: '4_10', label: '4 إلى 10' },
        { value: '11_25', label: '11 إلى 25' },
        { value: 'more_25', label: 'أكثر من 25' },
      ],
      moroccanCities: [
        'الدار البيضاء (Casablanca)',
        'الرباط (Rabat)',
        'مراكش (Marrakech)',
        'طنجة (Tangier)',
        'أكادير (Agadir)',
        'فاس (Fes)',
        'مكناس (Meknes)',
        'تطوان (Tetouan)',
        'القنيطرة (Kenitra)',
        'وجدة (Oujda)',
        'المحمدية (Mohammedia)',
        'الجديدة (El Jadida)',
        'مدينة أخرى بالمغرب',
      ],
      reassurance: 'بياناتك سرية تماماً وتستخدم فقط لترتيب جلسة الاستشارة.',
      submitStep1: 'متابعة لاختيار موعد الاستشارة',
      submitting: 'جاري الحفظ...',
      step2Heading: 'حدد موعد الاستشارة الأنسب لك',
      step2Subheading: 'المنطقة الزمنية: Africa/Casablanca (GMT+1) · مدة الجلسة: 30 دقيقة عبر Google Meet',
      editData: 'تعديل البيانات',
      chooseDay: '1. اختر اليوم المفضل:',
      chooseTime: '2. اختر توقيت الاستشارة (توقيت المغرب 10:00 - 18:00):',
      timeSlotsNote: '* المواعيد المشطوبة محجوزة مسبقاً أو غير متاحة.',
      selectedSummary: 'ملخص موعد الاستشارة المحدد:',
      noDaySelected: 'لم يتم تحديد يوم',
      noTimeSelected: '(يرجى اختيار الوقت)',
      confirmAppointment: 'تأكيد حجز الاستشارة المجانية',
      confirming: 'جاري تأكيد الموعد...',
      confirmationTitle: 'تم تأكيد حجز موعد الاستشارة بنجاح!',
      confirmationDesc: (name, agency) =>
        `شكراً لك يا ${name}. تم تثبيت الموعد المخصص لوكالة ${agency} بنجاح. سنرسل لك رابط اللقاء وتفاصيل الاستشارة.`,
      confirmationDate: 'تاريخ الموعد:',
      confirmationTime: 'توقيت الاستشارة:',
      confirmationCity: 'المدينة:',
      confirmationFormat: 'طريقة الانعقاد:',
      confirmationFormatValue: 'Google Meet (مكالمة فيديو مباشرة)',
      bookAnother: 'حجز استشارة لوكالة أخرى',
      errors: {
        fullNameRequired: 'يرجى إدخال الاسم الكامل',
        fullNameMin: 'الاسم الكامل يجب أن يحتوي على 3 أحرف على الأقل',
        phoneRequired: 'يرجى إدخال رقم الهاتف',
        phoneInvalid: 'يرجى إدخال رقم هاتف مغربي صحيح (مثال: 0612345678 أو +212612345678)',
        agencyRequired: 'يرجى إدخال اسم الوكالة العقارية',
        cityRequired: 'يرجى اختيار المدينة من القائمة',
        dailyLeadsRequired: 'يرجى تحديد عدد العملاء المحتملين يومياً',
        agencyStaffRequired: 'يرجى تحديد عدد أفراد الوكالة',
        chooseDateTime: 'يرجى اختيار اليوم والوقت المناسبين للاستشارة',
        submissionFailed: 'تعذر إرسال البيانات، يرجى المحاولة مرة أخرى.',
      },
    },
    faq: {
      kicker: 'الأسئلة الشائعة',
      category: 'كل ما تود معرفته',
      title: 'إجابات واضحة ومباشرة لأهم تساؤلاتك',
      subtitle: 'إليك إجابات سريعة حول أمان البيانات، الترحيل، وطريقة عمل الاستشارة المجانية.',
      items: [
        {
          q: 'واش البيانات ديالي مؤمنة؟',
          a: 'نعم، بيانات وكالتك وعملائك مشفرة بالكامل ولا تتم مشاركتها مع أي طرف ثالث، وفقاً للمقتضيات القانونية المغربية (CNDP).',
        },
        {
          q: 'واش كنقدر نهاجر من الإكسيل أو الدفاتر الورقية؟',
          a: 'نعم بكل سهولة، نقوم بمساعدتك على نقل جميع سجلات عملائك وعقاراتك السابقة بسلاسة ودون فقدان أي معلومة.',
        },
        {
          q: 'واش الاستشارة المجانية ملزمة؟',
          a: 'لا، الاستشارة مجانية تماماً وبدون أي التزام أو شروط مسبقة، هدفها دراسة احتياجات وكالتك ومساعدتك.',
        },
      ],
    },
    footer: {
      desc: 'المنظومة الذكية لإدارة وتطوير الوكالات العقارية بالمغرب. تنظيم العملاء، أتمتة التواصل عبر القنوات المفضلة، وتنسيق المعاينات من منصة موحدة.',
      tagline: 'منظومة ذكية لإدارة الوكالات العقارية · الدار البيضاء، المغرب',
      copyright: '© 2026 IBONDA',
      allRightsReserved: 'جميع الحقوق محفوظة',
      privacyLink: 'سياسة الخصوصية وسرية البيانات',
      termsLink: 'الشروط والأحكام',
      timezone: 'توقيت الدار البيضاء (GMT+1)',
      privacyModalTitle: 'سياسة الخصوصية وحماية المعطيات الشخصية',
      privacyIntro: 'نحن في IBONDA نولي أقصى درجات الاهتمام لحماية خصوصية وسرية بيانات الوكالات العقارية وعملائهم في المملكة المغربية.',
      privacySection1Title: '1. الامتثال لقانون حماية المعطيات (CNDP):',
      privacySection1Text: 'تتم معالجة كافة البيانات الشخصية بما يتوافق بدقة مع أحكام القانون المغربي رقم 09-08 الصادر عن اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP).',
      privacySection2Title: '2. استخدام البيانات:',
      privacySection2Text: 'تستخدم البيانات المدخلة في استمارة حجز الاستشارة فقط لترتيب جلسة المعاينة المباشرة والتواصل المهني مع مسؤولي الوكالة.',
      privacySection3Title: '3. عدم المشاركة أو الإفشاء:',
      privacySection3Text: 'نلتزم بعدم بيع أو تأجير أو مشاركة أي معلومة أو رقم هاتف يخص وكالتك أو عملاءك مع أي طرف خارجي لأغراض تجارية.',
      termsModalTitle: 'الشروط والأحكام العامة',
      termsIntro: 'مرحباً بك في IBONDA. تحدد هذه الشروط الإطار العام للاستفادة من خدمات الاستشارة المجانية واستخدام المنظومة.',
      termsSection1Title: '1. طبيعة الاستشارة المجانية:',
      termsSection1Text: 'جلسة الاستشارة المقدمة هي خدمة توضيحية مجانية مدتها 30 دقيقة ولا ترتب أي التزام مالي أو تعاقدي على وكالتك العقارية.',
      termsSection2Title: '2. سرية المعلومات المتبادلة:',
      termsSection2Text: 'يتعهد الطرفان بالحفاظ على سرية التفاصيل التشغيلية والتجارية التي تتم مناقشتها خلال الجلسة الاستشارية.',
      closeModal: 'إغلاق',
    },
  },

  en: {
    dir: 'ltr',
    lang: 'en',
    nav: {
      capabilities: 'Capabilities',
      benefits: 'Benefits',
      calculator: 'Loss Calculator',
      comparison: 'Comparison',
      faq: 'FAQ',
      booking: 'Book Consultation',
      bookCta: 'Book a free consultation with us',
    },
    hero: {
      trustBadge: 'Intelligent System for Real Estate Agencies in Morocco',
      title: 'One intelligent system to manage your real estate agency, from the first message to the property visit.',
      subtitle: 'Organize your leads, automate your communication, track your team, and schedule visits through a unified system built specifically for real estate agencies.',
      vslTitle: 'Watch the IBONDA Product Walkthrough',
      vslSubtitle: 'See how to transition your real estate agency from scattered phone notes to an automated system that qualifies leads and books property visits.',
      videoEndedTitle: 'Video Walkthrough Complete!',
      videoEndedDesc: 'The direct consultation booking form has been unlocked below.',
      goToBooking: 'Proceed to Booking',
      replay: 'Replay',
      play: 'Play',
      pause: 'Pause',
      mute: 'Mute',
      unmute: 'Unmute',
      fullscreen: 'Fullscreen',
      stepPrefix: 'Phase',
      vslSlides: [
        {
          tag: 'Phase 01 / Instant Response',
          title: 'Automated messaging across your preferred channels',
          desc: 'Respond within 5 seconds, filter buyer inquiries, and categorize property type and budget automatically.',
        },
        {
          tag: 'Phase 02 / Smart Qualification',
          title: 'Qualify serious clients and filter casual inquiries',
          desc: 'Filter out casual browsers and confirm appointments only with clients who possess budget and intent.',
        },
        {
          tag: 'Phase 03 / Visit Scheduling',
          title: 'Schedule property visits and coordinate agency staff',
          desc: 'Book property viewings automatically and dispatch alerts with automated reminders.',
        },
        {
          tag: 'Phase 04 / Central Visibility',
          title: 'Executive dashboard: Track every deal in real time',
          desc: 'Complete operational visibility from the first inquiry to deal closure, with consultant performance metrics.',
        },
      ],
    },
    postCta: {
      badge: 'Dedicated 1-on-1 Consultation for Your Agency',
      title: 'Ready to elevate your agency management to the next level?',
      subtitle: 'Get a 30-minute live consultation where we walk you through applying the IBONDA system to your agency and converting inquiries into successful property visits.',
      button: 'Book a free consultation with us',
      note: '30 Minutes · Free Consultation · Via Direct Video Meeting',
    },
    capabilities: {
      kicker: 'System Capabilities',
      category: 'Built for Real Estate',
      title: 'Everything your real estate agency needs in one operating system',
      subtitle: 'IBONDA is engineered specifically for real estate workflows, from the moment a prospect sends a message to the on-site visit.',
      items: [
        {
          title: 'Centralized Lead Management',
          desc: 'Automatically capture all buyer and tenant inquiries from ads into a unified pipeline sorted by stage and intent.',
          badge: 'Unified Pipeline',
        },
        {
          title: 'Instant automated messaging across your preferred channels',
          desc: 'Deliver smart responses within seconds of inquiry arrival to engage prospects when interest is at its peak.',
          badge: '24/7 Response',
        },
        {
          title: 'Lead Qualification & Scoring',
          desc: 'Automate qualification questions regarding budget, location, property type, and purchasing timeframe.',
          badge: 'Smart Filtering',
        },
        {
          title: 'Property Visit & Appointment Scheduling',
          desc: 'Enable self-service visit scheduling based on agent availability with reminders to minimize no-shows.',
          badge: 'Precise Booking',
        },
        {
          title: 'Instant Agency Staff Notifications',
          desc: 'Auto-assign qualified leads to advisors by city or specialty with direct mobile alerts.',
          badge: 'Automated Routing',
        },
        {
          title: 'Real Estate CRM System',
          desc: 'Complete prospect records documenting visited properties, consultant notes, chat history, and budget criteria.',
          badge: 'Comprehensive CRM',
        },
        {
          title: 'Property Inventory & Listing Catalog',
          desc: 'Index apartments, villas, offices, and plots with detailed specs and match them with active buyers.',
          badge: 'Listing Inventory',
        },
        {
          title: 'Central Agency Dashboard',
          desc: 'Full visibility for agency owners: track incoming lead volume, visit conversion rates, and staff performance.',
          badge: 'Executive View',
        },
      ],
    },
    benefits: {
      kicker: 'Measurable Value',
      category: 'Operational Growth',
      title: 'How does IBONDA impact your agency growth?',
      subtitle: 'Not just another software tool, but an organized sales engine running smoothly around the clock.',
      items: [
        {
          title: 'Save Valuable Team Time',
          desc: 'Relieve staff from repetitive manual data entry so they can focus on property tours, negotiations, and closing.',
        },
        {
          title: 'Minimize Missed Opportunities',
          desc: 'Instant replies and automated follow-ups ensure no prospect is lost due to slow initial response times.',
        },
        {
          title: 'Focus Exclusively on Serious Clients',
          desc: 'Pre-qualification filters out casual browsers so your agents only travel for serious, budget-verified clients.',
        },
        {
          title: 'Organize Operations and End Chaos',
          desc: 'Transition your agency from scattered paper notebooks and chats to an integrated digital operating environment.',
        },
        {
          title: 'Elevate Client Experience & Trust',
          desc: 'Deliver a professional, responsive first impression that enhances your agency brand reputation.',
        },
        {
          title: 'Coordinate & Monitor Team Performance',
          desc: 'Equip management with transparent real-time tracking of visits and lead progression stages.',
        },
      ],
    },
    calculator: {
      kicker: 'Opportunity & ROI Calculator',
      category: 'Cost of Lost Opportunities',
      title: 'Calculate how much you lose each month',
      subtitle: 'Discover the estimated revenue your agency loses every month from delayed replies and unorganized follow-ups.',
      leadsLostLabel: 'Leads lost per month',
      leadsLostUnit: 'leads / month',
      avgCommissionLabel: 'Average commission per closed deal (MAD)',
      avgCommissionUnit: 'Moroccan Dirham (MAD)',
      closingRateLabel: 'Closing rate from leads',
      closingRateUnit: '%',
      lostDealsTitle: 'Lost deals per month',
      lostDealsUnit: 'deals',
      moneyLostMonthTitle: 'Estimated monthly loss',
      moneyLostYearTitle: 'Cumulative annual loss',
      chartTitle: 'Monthly loss comparison across lead loss scenarios',
      chartCurrentScenario: 'Your input',
      chartScenario1: '10 leads lost',
      chartScenario2: '25 leads lost',
      chartScenario3: '50 leads lost',
      dangerLow: 'Low Risk',
      dangerMedium: 'Moderate Risk',
      dangerHigh: 'High Risk',
      dangerMsgLow: 'Current losses are low, but standardizing communication provides predictable growth.',
      dangerMsgMedium: 'You are losing genuine deals each month that can be recovered with structured messaging.',
      dangerMsgHigh: 'You are losing valuable sales opportunities every month without realizing it. Delayed replies send deals to competitors.',
      disclaimer: 'Calculations are estimates based on your entered parameters.',
      ctaButton: 'Book a free consultation with us',
    },
    comparison: {
      kicker: 'The Difference',
      category: 'Workflow Comparison',
      title: 'Traditional Workflow vs IBONDA Intelligent System',
      subtitle: 'A direct comparison between managing operations through traditional manual habits and upgrading to a unified digital system.',
      traditionalBadge: 'Current Reality',
      traditionalTitle: 'Typical Agency Operations',
      traditionalFooter: 'Outcome: Constant fatigue, missed prospective buyers, and persistent team stress.',
      ibondaBadge: 'Modern System',
      ibondaTitle: 'Integrated IBONDA System',
      ibondaFooter: 'Outcome: Complete clarity, instantaneous response, and visits scheduled only with serious buyers.',
      items: [
        {
          category: 'Lead Tracking',
          traditional: 'Manual note-taking in physical journals and personal chats that get buried.',
          ibonda: 'Centralized management that logs every new prospect immediately and auto-categorizes intent.',
        },
        {
          category: 'Client Records',
          traditional: 'Scattered information across multiple phones with little visibility into criteria or budget.',
          ibonda: 'Structured, synchronized profiles documenting client preferences, timeline, and visited properties.',
        },
        {
          category: 'Communication',
          traditional: 'Irregular manual follow-ups and delayed replies that cause prospects to choose competitors.',
          ibonda: 'Automated messaging across preferred channels with instant responses and automatic reminders.',
        },
        {
          category: 'Visit Coordination',
          traditional: 'Endless back-and-forth phone calls, double-booked visits, and frequent unannounced cancellations.',
          ibonda: 'Organized scheduling matched to advisor availability with digital confirmations.',
        },
        {
          category: 'Management Oversight',
          traditional: 'Limited visibility into daily team activities and difficulty evaluating conversion metrics.',
          ibonda: 'Central dashboard and real-time reports giving leadership total clarity across all deals.',
        },
      ],
    },
    booking: {
      kicker: 'Consultation Booking',
      category: '1-on-1 Consultation',
      title: 'Book a free consultation with us',
      subtitle: 'Free 1-on-1 consultation · 30 minutes via Google Meet · No obligation',
      lockedNotice: 'Watch the full video to unlock your free consultation booking',
      step1Title: 'Agency Details',
      step2Title: 'Schedule Time',
      step3Title: 'Confirmation',
      fields: {
        fullName: 'Full name',
        fullNamePlaceholder: 'e.g., Youssef El Idrissi',
        phone: 'Phone number',
        phonePlaceholder: '06XXXXXXXX or +2126XXXXXXXX',
        phoneHelper: 'Please enter an active Moroccan phone number to receive appointment details',
        agencyName: 'Real estate agency name',
        agencyNamePlaceholder: 'e.g., Atlas Prestige Properties',
        city: 'City',
        cityPlaceholder: 'Select your city',
        dailyLeads: 'Daily new leads',
        agencyStaff: 'Number of agency staff',
      },
      dailyLeadsOptions: [
        { value: '1_50', label: 'From 1 to 50' },
        { value: '50_100', label: '50 to 100' },
        { value: '100_300', label: '100 to 300' },
        { value: 'more_300', label: 'More than 300' },
      ],
      agencyStaffOptions: [
        { value: '1_3', label: '1 to 3' },
        { value: '4_10', label: '4 to 10' },
        { value: '11_25', label: '11 to 25' },
        { value: 'more_25', label: 'More than 25' },
      ],
      moroccanCities: [
        'Casablanca',
        'Rabat',
        'Marrakech',
        'Tangier',
        'Agadir',
        'Fes',
        'Meknes',
        'Tetouan',
        'Kenitra',
        'Oujda',
        'Mohammedia',
        'El Jadida',
        'Other Moroccan City',
      ],
      reassurance: 'Your information is confidential and used exclusively to arrange your consultation.',
      submitStep1: 'Continue to Select Consultation Date',
      submitting: 'Saving...',
      step2Heading: 'Select your preferred consultation time',
      step2Subheading: 'Timezone: Africa/Casablanca (GMT+1) · Duration: 30 minutes via Google Meet',
      editData: 'Edit Details',
      chooseDay: '1. Select preferred date:',
      chooseTime: '2. Select consultation time (Morocco Time 10:00 - 18:00):',
      timeSlotsNote: '* Crossed-out slots are already reserved or unavailable.',
      selectedSummary: 'Selected consultation appointment:',
      noDaySelected: 'No day chosen yet',
      noTimeSelected: '(Please choose a time slot)',
      confirmAppointment: 'Confirm Free Consultation Booking',
      confirming: 'Confirming appointment...',
      confirmationTitle: 'Consultation Successfully Confirmed!',
      confirmationDesc: (name, agency) =>
        `Thank you ${name}. Your consultation for ${agency} has been reserved. Meeting details and access link will be sent to your phone.`,
      confirmationDate: 'Date:',
      confirmationTime: 'Time:',
      confirmationCity: 'City:',
      confirmationFormat: 'Format:',
      confirmationFormatValue: 'Google Meet (Direct Video Meeting)',
      bookAnother: 'Book consultation for another agency',
      errors: {
        fullNameRequired: 'Please enter your full name',
        fullNameMin: 'Full name must contain at least 3 characters',
        phoneRequired: 'Please enter your phone number',
        phoneInvalid: 'Please enter a valid Moroccan phone number (e.g., 0612345678 or +212612345678)',
        agencyRequired: 'Please enter your real estate agency name',
        cityRequired: 'Please select a city from the list',
        dailyLeadsRequired: 'Please select your daily lead volume',
        agencyStaffRequired: 'Please select your total agency staff count',
        chooseDateTime: 'Please choose a date and time slot for your consultation',
        submissionFailed: 'Failed to record details. Please try again.',
      },
    },
    faq: {
      kicker: 'Frequently Asked Questions',
      category: 'Everything You Need to Know',
      title: 'Clear, direct answers to common questions',
      subtitle: 'Key details regarding data security, migration, and the consultation process.',
      items: [
        {
          q: 'Is my data secure?',
          a: 'Yes, your agency and client records are encrypted and protected in full accordance with Moroccan CNDP privacy guidelines.',
        },
        {
          q: 'Can I migrate from Excel or paper notes?',
          a: 'Yes, we help you transfer existing contact records and listing data cleanly without losing historical context.',
        },
        {
          q: 'Is the free consultation binding?',
          a: 'No, the consultation is completely free of charge with zero obligation, designed to evaluate your agency workflow.',
        },
      ],
    },
    footer: {
      desc: 'The intelligent operating system for real estate agency management in Morocco. Organize leads, automate communication, and schedule visits from one unified hub.',
      tagline: 'Intelligent Real Estate Agency Management System · Casablanca, Morocco',
      copyright: '© 2026 IBONDA',
      allRightsReserved: 'All rights reserved',
      privacyLink: 'Privacy Policy & Data Protection',
      termsLink: 'Terms & Conditions',
      timezone: 'Casablanca Time (GMT+1)',
      privacyModalTitle: 'Privacy Policy & Data Protection',
      privacyIntro: 'At IBONDA, safeguarding the privacy and integrity of real estate agency data is our primary commitment.',
      privacySection1Title: '1. CNDP Law Compliance:',
      privacySection1Text: 'All personal data is processed strictly in accordance with Moroccan Law No. 09-08 as overseen by the CNDP.',
      privacySection2Title: '2. Purpose of Processing:',
      privacySection2Text: 'Information submitted through the consultation form is used solely for scheduling and conducting your session.',
      privacySection3Title: '3. Confidentiality Guarantee:',
      privacySection3Text: 'We do not sell, rent, or disclose agency contacts or client databases to third parties for advertising.',
      termsModalTitle: 'Terms & Conditions',
      termsIntro: 'Welcome to IBONDA. These terms govern participation in free consultations and service evaluations.',
      termsSection1Title: '1. Free Consultation Nature:',
      termsSection1Text: 'The 30-minute consultation is complimentary and non-binding, carrying no financial or contractual obligation.',
      termsSection2Title: '2. Mutual Confidentiality:',
      termsSection2Text: 'Both parties agree to treat operational details and workflows discussed during the session as strictly confidential.',
      closeModal: 'Close',
    },
  },

  fr: {
    dir: 'ltr',
    lang: 'fr',
    nav: {
      capabilities: 'Fonctionnalités',
      benefits: 'Avantages',
      calculator: 'Calculateur de pertes',
      comparison: 'Comparatif',
      faq: 'FAQ',
      booking: 'Prendre rendez-vous',
      bookCta: 'Réservez une consultation gratuite avec nous',
    },
    hero: {
      trustBadge: 'Système intelligent pour agences immobilières au Maroc',
      title: 'Un système unique pour piloter votre agence, du premier message jusqu’à la visite.',
      subtitle: 'Organisez vos prospects, automatisez vos échanges, suivez vos équipes et planifiez vos visites grâce à un système conçu sur mesure pour les agences immobilières.',
      vslTitle: 'Découvrez la présentation d’IBONDA',
      vslSubtitle: 'Comment faire passer votre agence du désordre des carnets et messages éparpillés à un système fluide qui qualifie les prospects et programme les visites.',
      videoEndedTitle: 'Vidéo de présentation terminée !',
      videoEndedDesc: 'Le formulaire de consultation directe est débloqué ci-dessous.',
      goToBooking: 'Accéder à la réservation',
      replay: 'Revoir la vidéo',
      play: 'Lecture',
      pause: 'Pause',
      mute: 'Couper le son',
      unmute: 'Activer le son',
      fullscreen: 'Plein écran',
      stepPrefix: 'Étape',
      vslSlides: [
        {
          tag: 'Étape 01 / Réponse immédiate',
          title: 'Messagerie automatisée instantanée sur vos canaux préférés',
          desc: 'Réponse en moins de 5 secondes, tri des demandes d’acheteurs et qualification automatique du budget.',
        },
        {
          tag: 'Étape 02 / Qualification intelligente',
          title: 'Qualifiez les acheteurs sérieux et écartez les curieux',
          desc: 'Filtrez les demandes non qualifiées et réservez vos visites uniquement avec les acheteurs disposant d’un vrai budget.',
        },
        {
          tag: 'Étape 03 / Planification des visites',
          title: 'Planifiez les visites et coordonnez les conseillers',
          desc: 'Programmation autonome des visites selon les disponibilités avec rappels automatiques pour éviter les désistements.',
        },
        {
          tag: 'Étape 04 / Pilotage centralisé',
          title: 'Tableau de bord : Suivi de chaque transaction en temps réel',
          desc: 'Visibilité totale du premier contact à la signature avec indicateurs de performance par conseiller.',
        },
      ],
    },
    postCta: {
      badge: 'Consultation dédiée 1-sur-1 pour votre agence',
      title: 'Prêt à propulser la gestion de votre agence au niveau supérieur ?',
      subtitle: 'Bénéficiez d’une consultation en direct de 30 minutes où nous vous montrons comment déployer IBONDA dans votre agence pour convertir vos contacts en visites fructueuses.',
      button: 'Réservez une consultation gratuite avec nous',
      note: '30 minutes · Consultation offerte · Par visioconférence directe',
    },
    capabilities: {
      kicker: 'Capacités du Système',
      category: 'Dédié à l’Immobilier',
      title: 'Tout ce dont votre agence immobilière a besoin dans un système intégré',
      subtitle: 'IBONDA est conçu pour les réalités du marché immobilier, du tout premier message reçu jusqu’à la visite sur le terrain.',
      items: [
        {
          title: 'Gestion Centralisée des Prospects (Lead Management)',
          desc: 'Centralisez toutes les demandes d’acheteurs et locataires issues de vos annonces dans un pipeline unifié et structuré.',
          badge: 'Pipeline Unique',
        },
        {
          title: 'Messagerie automatisée instantanée sur vos canaux préférés',
          desc: 'Répondez en quelques secondes pour capter l’attention du client au moment précis où son intérêt est au plus haut.',
          badge: 'Réponse 24/7',
        },
        {
          title: 'Qualification & Tri des Prospects Sérieux',
          desc: 'Questions de qualification programmées sur le budget, le secteur souhaité, le type de bien et la maturité d’achat.',
          badge: 'Tri Intelligent',
        },
        {
          title: 'Planification des Visites Immobilières',
          desc: 'Permettez la réservation de créneaux de visite selon les disponibilités des conseillers, avec rappels automatiques.',
          badge: 'Visites Cadrées',
        },
        {
          title: 'Notifications Immédiates pour l’Équipe',
          desc: 'Attribution automatique des prospects qualifiés aux conseillers par ville ou spécialité avec alertes mobiles.',
          badge: 'Routage Automatique',
        },
        {
          title: 'CRM Dédié au Secteur Immobilier',
          desc: 'Historique complet par client : biens visités, notes des conseillers, historique des échanges et critères financiers.',
          badge: 'CRM Intégré',
        },
        {
          title: 'Gestion du Portefeuille et des Biens',
          desc: 'Catalogue précis de chaque appartement, villa, bureau ou terrain avec fiches détaillées et mise en relation automatique.',
          badge: 'Catalogue Biens',
        },
        {
          title: 'Tableau de Bord Central pour la Direction',
          desc: 'Visibilité totale pour le dirigeant : volume de nouveaux prospects, taux de conversion en visite et suivi des conseillers.',
          badge: 'Vue Direction',
        },
      ],
    },
    benefits: {
      kicker: 'Bénéfices Concrets',
      category: 'Valeur Opérationnelle',
      title: 'Comment IBONDA accélère la croissance de votre agence ?',
      subtitle: 'Pas un simple logiciel de plus, mais un moteur commercial structuré et performant qui tourne 24h/24.',
      items: [
        {
          title: 'Gain de Temps Précieux pour l’Équipe',
          desc: 'Libérez vos conseillers des saisies manuelles et réponses répétitives pour qu’ils se consacrent aux visites et négociations.',
        },
        {
          title: 'Réduction Drastique des Opportunités Perdues',
          desc: 'La réactivité instantanée garantit qu’aucun prospect qualifié n’est perdu à cause d’une réponse tardive.',
        },
        {
          title: 'Concentration sur les Clients Vraiment Sérieux',
          desc: 'Le pré-filtrage écarte les curieux pour que vos conseillers ne se déplacent qu’avec des acheteurs ayant le budget requis.',
        },
        {
          title: 'Organisation et Fin du Désordre Opérationnel',
          desc: 'Fini les carnets papier et les informations perdues sur des téléphones personnels : tout est regroupé dans un espace sécurisé.',
        },
        {
          title: 'Expérience Client Haut de Gamme',
          desc: 'Offrez un accueil rapide et professionnel qui renforce la crédibilité et l’image de prestige de votre enseigne.',
        },
        {
          title: 'Coordination et Visibilité sur l’Équipe',
          desc: 'Permettez à la direction de suivre l’état d’avancement des visites et des négociations en temps réel et en toute clarté.',
        },
      ],
    },
    calculator: {
      kicker: 'Calculateur de Rentabilité',
      category: 'Coût des Opportunités Manquées',
      title: 'Calculez combien vous perdez chaque mois',
      subtitle: 'Découvrez l’estimation du chiffre d’affaires qui échappe à votre agence chaque mois à cause de la lenteur des réponses et du manque de relance.',
      leadsLostLabel: 'Nombre de prospects perdus par mois',
      leadsLostUnit: 'prospects / mois',
      avgCommissionLabel: 'Commission moyenne par transaction en dirhams (MAD)',
      avgCommissionUnit: 'Dirhams marocains (MAD)',
      closingRateLabel: 'Taux de conversion moyen en vente',
      closingRateUnit: '%',
      lostDealsTitle: 'Transactions manquées par mois',
      lostDealsUnit: 'ventes ou locations',
      moneyLostMonthTitle: 'Perte mensuelle estimée',
      moneyLostYearTitle: 'Perte annuelle cumulée',
      chartTitle: 'Comparatif des pertes mensuelles selon les volumes de prospects perdus',
      chartCurrentScenario: 'Vos paramètres',
      chartScenario1: '10 prospects perdus',
      chartScenario2: '25 prospects perdus',
      chartScenario3: '50 prospects perdus',
      dangerLow: 'Risque Faible',
      dangerMedium: 'Risque Modéré',
      dangerHigh: 'Risque Élevé',
      dangerMsgLow: 'Les pertes actuelles restent limitées, mais structurer vos échanges stabilisera votre croissance.',
      dangerMsgMedium: 'Vous perdez chaque mois des transactions concrètes qui pourraient être récupérées avec une messagerie automatisée.',
      dangerMsgHigh: 'Vous perdez des opportunités de vente chaque mois sans vous en rendre compte. Les réponses tardives profitent directement à vos concurrents.',
      disclaimer: 'Les chiffres sont indicatifs et dépendent des paramètres saisis.',
      ctaButton: 'Réservez une consultation gratuite avec nous',
    },
    comparison: {
      kicker: 'La Différence Clé',
      category: 'Comparatif des Méthodes',
      title: 'Fonctionnement Traditionnel vs Système Intelligent IBONDA',
      subtitle: 'Comparaison directe entre la gestion manuelle artisanale et le passage à un système digital structuré et fiable.',
      traditionalBadge: 'Situation Actuelle',
      traditionalTitle: 'Gestion Classique en Agence',
      traditionalFooter: 'Résultat : Fatigue constante, perte de prospects acheteurs et stress permanent pour les équipes.',
      ibondaBadge: 'Système Moderne',
      ibondaTitle: 'Système Intégré IBONDA',
      ibondaFooter: 'Résultat : Clarté totale, réactivité immédiate et visites programmées exclusivement avec des acheteurs qualifiés.',
      items: [
        {
          category: 'Suivi des Prospects',
          traditional: 'Saisie manuelle dispersée sur des blocs-notes et messageries personnelles qui s’égarent.',
          ibonda: 'Gestion centralisée enregistrant chaque prospect immédiatement avec qualification automatique de l’intention.',
        },
        {
          category: 'Fiches et Données Clients',
          traditional: 'Informations éparpillées sur plusieurs smartphones sans visibilité sur le budget ou les critères.',
          ibonda: 'Dossier unique et synchronisé regroupant critères, historique des échanges et biens visités.',
        },
        {
          category: 'Échanges et Relances',
          traditional: 'Relances manuelles irrégulières et réponses tardives qui poussent le client vers la concurrence.',
          ibonda: 'Communication instantanée sur les canaux préférés avec rappels automatiques et réponses en continu.',
        },
        {
          category: 'Organisation des Visites',
          traditional: 'Nombreux appels croisés, chevauchements d’agendas et taux d’absentéisme élevé sans prévenir.',
          ibonda: 'Planning clair synchronisé avec les créneaux disponibles des conseillers et confirmations automatiques.',
        },
        {
          category: 'Pilotage de la Direction',
          traditional: 'Visibilité floue sur l’activité quotidienne et difficulté d’évaluer la performance commerciale.',
          ibonda: 'Tableau de bord central et rapports en temps réel offrant à la direction une visibilité totale sur les dossiers.',
        },
      ],
    },
    booking: {
      kicker: 'Réservation de Consultation',
      category: 'Session 1-sur-1 Dédiée',
      title: 'Réservez une consultation gratuite avec nous',
      subtitle: 'Consultation gratuite 1-sur-1 · 30 minutes via Google Meet · Sans engagement',
      lockedNotice: 'Regardez la vidéo en entier pour réserver votre consultation gratuite',
      step1Title: 'Données de l’Agence',
      step2Title: 'Choix du Créneau',
      step3Title: 'Confirmation',
      fields: {
        fullName: 'Nom complet',
        fullNamePlaceholder: 'ex. Youssef El Idrissi',
        phone: 'Numéro de téléphone',
        phonePlaceholder: '06XXXXXXXX ou +2126XXXXXXXX',
        phoneHelper: 'Veuillez entrer un numéro marocain actif pour recevoir les détails du rendez-vous',
        agencyName: 'Nom de l’agence immobilière',
        agencyNamePlaceholder: 'ex. Atlas Prestige Immobilier',
        city: 'Ville',
        cityPlaceholder: 'Choisissez votre ville',
        dailyLeads: 'Nombre de prospects par jour',
        agencyStaff: 'Nombre de personnes dans l’agence',
      },
      dailyLeadsOptions: [
        { value: '1_50', label: 'De 1 à 50' },
        { value: '50_100', label: 'De 50 à 100' },
        { value: '100_300', label: 'De 100 à 300' },
        { value: 'more_300', label: 'Plus de 300' },
      ],
      agencyStaffOptions: [
        { value: '1_3', label: '1 à 3' },
        { value: '4_10', label: '4 à 10' },
        { value: '11_25', label: '11 à 25' },
        { value: 'more_25', label: 'Plus de 25' },
      ],
      moroccanCities: [
        'Casablanca',
        'Rabat',
        'Marrakech',
        'Tanger',
        'Agadir',
        'Fès',
        'Meknès',
        'Tétouan',
        'Kénitra',
        'Oujda',
        'Mohammédia',
        'El Jadida',
        'Autre ville au Maroc',
      ],
      reassurance: 'Vos données sont strictement confidentielles et utilisées uniquement pour préparer votre consultation.',
      submitStep1: 'Continuer pour choisir la date de consultation',
      submitting: 'Enregistrement...',
      step2Heading: 'Sélectionnez le créneau qui vous convient le mieux',
      step2Subheading: 'Fuseau horaire : Africa/Casablanca (GMT+1) · Durée : 30 minutes via Google Meet',
      editData: 'Modifier les données',
      chooseDay: '1. Choisissez le jour souhaité :',
      chooseTime: '2. Choisissez l’heure de consultation (Heure du Maroc 10h00 - 18h00) :',
      timeSlotsNote: '* Les créneaux barrés sont déjà réservés ou indisponibles.',
      selectedSummary: 'Créneau de consultation sélectionné :',
      noDaySelected: 'Aucun jour sélectionné',
      noTimeSelected: '(Veuillez choisir un horaire)',
      confirmAppointment: 'Confirmer la consultation gratuite',
      confirming: 'Confirmation en cours...',
      confirmationTitle: 'Votre consultation est confirmée avec succès !',
      confirmationDesc: (name, agency) =>
        `Merci ${name}. Votre rendez-vous pour l'agence ${agency} est enregistré. Le lien d'accès et les détails vous seront envoyés.`,
      confirmationDate: 'Date :',
      confirmationTime: 'Heure de consultation :',
      confirmationCity: 'Ville :',
      confirmationFormat: 'Format :',
      confirmationFormatValue: 'Google Meet (Visioconférence directe)',
      bookAnother: 'Réserver pour une autre agence',
      errors: {
        fullNameRequired: 'Veuillez saisir votre nom complet',
        fullNameMin: 'Le nom doit comporter au moins 3 caractères',
        phoneRequired: 'Veuillez saisir votre numéro de téléphone',
        phoneInvalid: 'Veuillez entrer un numéro marocain valide (ex. 0612345678 ou +212612345678)',
        agencyRequired: 'Veuillez saisir le nom de votre agence',
        cityRequired: 'Veuillez choisir une ville dans la liste',
        dailyLeadsRequired: 'Veuillez indiquer le volume de prospects par jour',
        agencyStaffRequired: 'Veuillez indiquer le nombre total de personnes dans l’agence',
        chooseDateTime: 'Veuillez sélectionner un jour et une heure de consultation',
        submissionFailed: 'Échec de l’enregistrement. Veuillez réessayer.',
      },
    },
    faq: {
      kicker: 'Foire Aux Questions',
      category: 'Tout ce que vous devez savoir',
      title: 'Des réponses claires et précises à vos questions',
      subtitle: 'Les points essentiels concernant la sécurité de vos données, la migration et la consultation gratuite.',
      items: [
        {
          q: 'Mes données sont-elles sécurisées ?',
          a: 'Oui, l’ensemble de vos données agence et prospects est chiffré et strictement protégé conformément aux exigences de la CNDP au Maroc.',
        },
        {
          q: 'Puis-je migrer depuis Excel ou des carnets papier ?',
          a: 'Absolument, nous vous accompagnons pour transférer l’intégralité de vos contacts et fiches de biens existants sans aucune perte.',
        },
        {
          q: 'La consultation gratuite engage-t-elle ?',
          a: 'Non, la consultation est entièrement gratuite, sans engagement ni frais cachés, pour évaluer les besoins de votre agence.',
        },
      ],
    },
    footer: {
      desc: 'Le système intelligent dédié aux agences immobilières au Maroc. Centralisation des prospects, messagerie automatisée et planification des visites depuis une plateforme unique.',
      tagline: 'Système intelligent de gestion d’agences immobilières · Casablanca, Maroc',
      copyright: '© 2026 IBONDA',
      allRightsReserved: 'Tous droits réservés',
      privacyLink: 'Politique de Confidentialité & Données',
      termsLink: 'Conditions Générales',
      timezone: 'Heure de Casablanca (GMT+1)',
      privacyModalTitle: 'Politique de Confidentialité et Protection des Données',
      privacyIntro: 'Chez IBONDA, la protection de la confidentialité des données des agences immobilières et de leurs clients au Maroc est une priorité absolue.',
      privacySection1Title: '1. Conformité avec la loi CNDP :',
      privacySection1Text: 'Toutes les données sont traitées en stricte conformité avec la loi marocaine n° 09-08 sous le contrôle de la CNDP.',
      privacySection2Title: '2. Finalité des données :',
      privacySection2Text: 'Les données renseignées servent uniquement à organiser votre session de consultation et à échanger avec votre direction.',
      privacySection3Title: '3. Confidentialité garantie :',
      privacySection3Text: 'Nous ne vendons, ne louons et ne divulguons aucune information ni aucun numéro de téléphone à des tiers à des fins publicitaires.',
      termsModalTitle: 'Conditions Générales',
      termsIntro: 'Bienvenue sur IBONDA. Ces conditions régissent l’accès à nos sessions d’information et consultations offertes.',
      termsSection1Title: '1. Nature de la consultation gratuite :',
      termsSection1Text: 'La session de 30 minutes est offerte sans aucune obligation contractuelle ou financière pour votre agence.',
      termsSection2Title: '2. Confidentialité réciproque :',
      termsSection2Text: 'Les deux parties conviennent de considérer les informations opérationnelles discutées comme strictement confidentielles.',
      closeModal: 'Fermer',
    },
  },
};
