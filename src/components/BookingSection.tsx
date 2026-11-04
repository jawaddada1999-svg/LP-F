import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Building,
  User,
  Phone,
  MapPin,
  TrendingUp,
  Users2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Lock,
  PlayCircle
} from 'lucide-react';
import {
  LeadSubmissionData,
  CalendarSlot,
  submitLeadToGoogleSheets,
  fetchCalendarSlots,
  bookCalendarAppointment,
} from '../integrations/googleAppsScript';
import { Translations } from '../translations';

interface BookingSectionProps {
  t: Translations;
  isUnlocked: boolean;
  onScrollToVideo: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  t,
  isUnlocked,
  onScrollToVideo,
}) => {
  // Step 1: Agency Details, Step 2: Calendar Slot Selection, Step 3: Confirmed
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State (React state only)
  const [formData, setFormData] = useState<LeadSubmissionData>({
    fullName: '',
    phoneNumber: '',
    agencyName: '',
    city: '', // NO pre-selected value
    dailyLeads: '',
    agencyStaff: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [leadSubmitError, setLeadSubmitError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string>('');

  // Calendar State
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<CalendarSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [isBookingAppointment, setIsBookingAppointment] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<{
    date: string;
    time: string;
    eventId?: string;
  } | null>(null);

  // Helper to get formatted dates for the next 14 days
  const getUpcomingDates = () => {
    const dates: { value: string; label: string; dayName: string }[] = [];
    const arabicDayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const arabicMonthNames = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    const englishDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const englishMonthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const frenchDayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const frenchMonthNames = [
      'Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin',
      'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'
    ];

    const isAr = t.lang === 'ar';
    const isFr = t.lang === 'fr';

    const dayNames = isAr ? arabicDayNames : isFr ? frenchDayNames : englishDayNames;
    const monthNames = isAr ? arabicMonthNames : isFr ? frenchMonthNames : englishMonthNames;

    const now = new Date();
    const startOffset = now.getHours() >= 17 ? 1 : 0;

    for (let i = startOffset; i < startOffset + 14; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const value = `${yyyy}-${mm}-${dd}`;
      const dayName = dayNames[d.getDay()];
      const label = `${dd} ${monthNames[d.getMonth()]}`;
      dates.push({ value, label, dayName });
    }
    return dates;
  };

  const upcomingDates = getUpcomingDates();

  useEffect(() => {
    if (upcomingDates.length > 0 && !selectedDate) {
      setSelectedDate(upcomingDates[0].value);
    }
  }, [upcomingDates, selectedDate]);

  useEffect(() => {
    if (selectedDate && currentStep === 2) {
      let isMounted = true;
      setIsLoadingSlots(true);
      setSelectedSlot('');
      setBookingError(null);

      fetchCalendarSlots(selectedDate)
        .then((slots) => {
          if (isMounted) {
            setAvailableSlots(slots);
            setIsLoadingSlots(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setIsLoadingSlots(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [selectedDate, currentStep]);

  const validateMoroccanPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    const regex = /^(?:\+?212|0)[5-7]\d{8}$/;
    return regex.test(cleaned);
  };

  const handleInputChange = (field: keyof LeadSubmissionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitError(null);

    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = t.booking.errors.fullNameRequired;
    } else if (formData.fullName.trim().length < 3) {
      errors.fullName = t.booking.errors.fullNameMin;
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = t.booking.errors.phoneRequired;
    } else if (!validateMoroccanPhone(formData.phoneNumber)) {
      errors.phoneNumber = t.booking.errors.phoneInvalid;
    }

    if (!formData.agencyName.trim()) {
      errors.agencyName = t.booking.errors.agencyRequired;
    }

    if (!formData.city.trim()) {
      errors.city = t.booking.errors.cityRequired;
    }

    if (!formData.dailyLeads.trim()) {
      errors.dailyLeads = t.booking.errors.dailyLeadsRequired;
    }

    if (!formData.agencyStaff.trim()) {
      errors.agencyStaff = t.booking.errors.agencyStaffRequired;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmittingLead(true);

    try {
      const response = await submitLeadToGoogleSheets(formData);
      if (response.success) {
        setLeadId(response.leadId);
        setCurrentStep(2);
      } else {
        setLeadSubmitError(response.error || t.booking.errors.submissionFailed);
      }
    } catch {
      setLeadSubmitError(t.booking.errors.submissionFailed);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleConfirmAppointment = async () => {
    if (!selectedDate || !selectedSlot) {
      setBookingError(t.booking.errors.chooseDateTime);
      return;
    }

    setIsBookingAppointment(true);
    setBookingError(null);

    try {
      const bookingData = {
        ...formData,
        id: leadId,
        appointmentDate: selectedDate,
        appointmentTime: selectedSlot,
      };

      const result = await bookCalendarAppointment(bookingData);

      if (result.success) {
        setConfirmedBookingDetails({
          date: selectedDate,
          time: selectedSlot,
          eventId: result.eventId,
        });
        setCurrentStep(3);
        
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#3b82f6', '#60a5fa', '#10b981'],
        });
      } else {
        setBookingError(result.error || t.booking.errors.submissionFailed);
      }
    } catch {
      setBookingError(t.booking.errors.submissionFailed);
    } finally {
      setIsBookingAppointment(false);
    }
  };

  const getLocalizedDateString = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      const locale = t.lang === 'ar' ? 'ar-MA' : t.lang === 'fr' ? 'fr-FR' : 'en-US';
      return date.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="booking" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 end-1/4 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 start-1/4 w-96 h-96 bg-indigo-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 mb-3">
            <Sparkles className="w-4 h-4" />
            <span>{t.booking.subtitle}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.booking.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.booking.subtitle}
          </p>
        </div>

        {/* LOCKED STATE BANNER (When video has not yet finished) */}
        {!isUnlocked ? (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto backdrop-blur-md shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-blue-600/15 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/10">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              {t.booking.lockedNotice}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
              {t.hero.vslSubtitle}
            </p>

            <button
              type="button"
              onClick={onScrollToVideo}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 inline-flex items-center gap-2.5 cursor-pointer text-sm"
            >
              <PlayCircle className="w-5 h-5" />
              <span>{t.hero.vslTitle}</span>
            </button>
          </div>
        ) : (
          /* UNLOCKED 3-STEP BOOKING FORM (Revealed when video finishes) */
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 backdrop-blur-md animate-in fade-in duration-500">
            
            {/* Progress Indicator */}
            <div className="mb-8 pb-6 border-b border-slate-800 flex items-center justify-between text-xs font-semibold">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-latin ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>
                  1
                </span>
                <span>{t.booking.step1Title}</span>
              </div>

              <div className="h-0.5 w-12 bg-slate-800 hidden sm:block" />

              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-latin ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>
                  2
                </span>
                <span>{t.booking.step2Title}</span>
              </div>

              <div className="h-0.5 w-12 bg-slate-800 hidden sm:block" />

              <div className={`flex items-center gap-2 ${currentStep === 3 ? 'text-emerald-400' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-latin ${currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-800'}`}>
                  3
                </span>
                <span>{t.booking.step3Title}</span>
              </div>
            </div>

            {/* STEP 1: AGENCY DETAILS FORM */}
            {currentStep === 1 && (
              <form onSubmit={handleLeadFormSubmit} className="space-y-6">
                {leadSubmitError && (
                  <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{leadSubmitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.booking.fields.fullName} <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.booking.fields.fullNamePlaceholder}
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          formErrors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors`}
                      />
                      <User className="w-4 h-4 text-slate-500 absolute end-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1.5">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* 2. Phone Number (Moroccan Validation) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.booking.fields.phone} <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        dir="ltr"
                        placeholder={t.booking.fields.phonePlaceholder}
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          formErrors.phoneNumber ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors font-latin`}
                      />
                      <Phone className="w-4 h-4 text-slate-500 absolute end-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {formErrors.phoneNumber ? (
                      <p className="text-[11px] text-rose-400 mt-1.5">{formErrors.phoneNumber}</p>
                    ) : (
                      <p className="text-[10px] text-slate-500 mt-1">{t.booking.fields.phoneHelper}</p>
                    )}
                  </div>

                  {/* 3. Real Estate Agency Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.booking.fields.agencyName} <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.booking.fields.agencyNamePlaceholder}
                        value={formData.agencyName}
                        onChange={(e) => handleInputChange('agencyName', e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          formErrors.agencyName ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors`}
                      />
                      <Building className="w-4 h-4 text-slate-500 absolute end-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {formErrors.agencyName && (
                      <p className="text-[11px] text-rose-400 mt-1.5">{formErrors.agencyName}</p>
                    )}
                  </div>

                  {/* 4. City (Dropdown with placeholder - NO pre-selected value) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.booking.fields.city} <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          formErrors.city ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                        } rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors appearance-none`}
                      >
                        <option value="" disabled>
                          {t.booking.fields.cityPlaceholder}
                        </option>
                        {t.booking.moroccanCities.map((city, idx) => (
                          <option key={idx} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <MapPin className="w-4 h-4 text-slate-500 absolute end-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {formErrors.city && (
                      <p className="text-[11px] text-rose-400 mt-1.5">{formErrors.city}</p>
                    )}
                  </div>

                  {/* 5. Daily New Leads (Exact 4 options requested) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.booking.fields.dailyLeads} <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.dailyLeads}
                        onChange={(e) => handleInputChange('dailyLeads', e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          formErrors.dailyLeads ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                        } rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors appearance-none`}
                      >
                        <option value="" disabled>
                          {t.booking.fields.dailyLeads}
                        </option>
                        {t.booking.dailyLeadsOptions.map((opt, idx) => (
                          <option key={idx} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <TrendingUp className="w-4 h-4 text-slate-500 absolute end-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {formErrors.dailyLeads && (
                      <p className="text-[11px] text-rose-400 mt-1.5">{formErrors.dailyLeads}</p>
                    )}
                  </div>

                  {/* 6. Number of Agency Staff */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.booking.fields.agencyStaff} <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.agencyStaff}
                        onChange={(e) => handleInputChange('agencyStaff', e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          formErrors.agencyStaff ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                        } rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors appearance-none`}
                      >
                        <option value="" disabled>
                          {t.booking.fields.agencyStaff}
                        </option>
                        {t.booking.agencyStaffOptions.map((opt, idx) => (
                          <option key={idx} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <Users2 className="w-4 h-4 text-slate-500 absolute end-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {formErrors.agencyStaff && (
                      <p className="text-[11px] text-rose-400 mt-1.5">{formErrors.agencyStaff}</p>
                    )}
                  </div>

                </div>

                {/* Reassurance text & Submit Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{t.booking.reassurance}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmittingLead ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.booking.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.booking.submitStep1}</span>
                        <ChevronLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: CONSULTATION TIME SCHEDULER */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {t.booking.step2Heading}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {t.booking.step2Subheading}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{t.booking.editData}</span>
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
                  </button>
                </div>

                {bookingError && (
                  <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{bookingError}</span>
                  </div>
                )}

                {/* Date Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-3">
                    {t.booking.chooseDay}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                    {upcomingDates.map((d) => {
                      const isSelected = selectedDate === d.value;
                      return (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setSelectedDate(d.value)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30 font-bold'
                              : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <div className="text-[11px] opacity-80 mb-1">{d.dayName}</div>
                          <div className="text-xs font-latin">{d.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      {t.booking.chooseTime}
                    </label>
                    {isLoadingSlots && (
                      <span className="text-xs text-blue-400 flex items-center gap-1.5 font-latin">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Loading...
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            !slot.available
                              ? 'bg-slate-950/40 text-slate-600 border border-slate-900 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-blue-600 text-white font-bold border border-blue-400 shadow-md shadow-blue-600/30'
                              : 'bg-slate-950 border border-slate-800 text-slate-200 hover:border-blue-500/50 hover:bg-slate-900'
                          }`}
                        >
                          <div className="font-latin text-center">{slot.time}</div>
                          <div className="text-[10px] opacity-75 text-center mt-0.5">{slot.formatted}</div>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2">
                    {t.booking.timeSlotsNote}
                  </p>
                </div>

                {/* Summary and Confirmation Action */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400">{t.booking.selectedSummary}</p>
                    <p className="text-sm font-semibold text-white">
                      {selectedDate ? getLocalizedDateString(selectedDate) : t.booking.noDaySelected}
                      {selectedSlot ? ` — ${selectedSlot} (Casablanca Time)` : ` ${t.booking.noTimeSelected}`}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={!selectedSlot || isBookingAppointment}
                    onClick={handleConfirmAppointment}
                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isBookingAppointment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.booking.confirming}</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck2 className="w-4 h-4" />
                        <span>{t.booking.confirmAppointment}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRMATION SCREEN */}
            {currentStep === 3 && confirmedBookingDetails && (
              <div className="text-center py-6 animate-in zoom-in-95 duration-400">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {t.booking.confirmationTitle}
                </h3>

                <p className="text-sm text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
                  {t.booking.confirmationDesc(formData.fullName, formData.agencyName)}
                </p>

                {/* Confirmation Details Card */}
                <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-xl p-5 mb-8 text-start space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 text-xs">
                    <span className="text-slate-400">{t.booking.confirmationDate}</span>
                    <span className="font-semibold text-white">
                      {getLocalizedDateString(confirmedBookingDetails.date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 text-xs">
                    <span className="text-slate-400">{t.booking.confirmationTime}</span>
                    <span className="font-semibold text-blue-400 font-latin">
                      {confirmedBookingDetails.time} (Africa/Casablanca GMT+1)
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 text-xs">
                    <span className="text-slate-400">{t.booking.confirmationCity}</span>
                    <span className="font-semibold text-white">{formData.city}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t.booking.confirmationFormat}</span>
                    <span className="font-semibold text-emerald-400">{t.booking.confirmationFormatValue}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setFormData({
                        fullName: '',
                        phoneNumber: '',
                        agencyName: '',
                        city: '',
                        dailyLeads: '',
                        agencyStaff: '',
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    {t.booking.bookAnother}
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
