/**
 * Google Apps Script Integration for IBONDA
 * 
 * Provides:
 * 1. Google Sheets Lead Storage (Auto-creates "Leads" sheet with headers).
 * 2. Google Calendar Availability & 30-minute Demo Event Creation in Africa/Casablanca timezone.
 * 3. Client-side HTTP wrappers with offline/demo fallback handling.
 */

export interface LeadSubmissionData {
  id?: string;
  fullName: string;
  phoneNumber: string;
  agencyName: string;
  city: string;
  dailyLeads: string;
  agencyStaff: string;
  monthlyLeads?: string;
  salesTeamSize?: string;
  appointmentDateTime?: string;
  appointmentDate?: string;
  appointmentTime?: string;
}

export interface CalendarSlot {
  time: string; // e.g. "10:00"
  formatted: string; // e.g. "10:00 صباحاً"
  available: boolean;
}

// Complete, ready-to-deploy Google Apps Script Code
export const GOOGLE_APPS_SCRIPT_SOURCE = `
/**
 * ============================================================================
 * IBONDA - Google Apps Script Integration Engine
 * Connects Lead Form + Google Sheets + Google Calendar (Africa/Casablanca)
 * ============================================================================
 *
 * HOW TO DEPLOY:
 * 1. Create a new Google Sheet (e.g. named "IBONDA Leads & Demos").
 * 2. Go to: Extensions > Apps Script (التطبيقات الملحقة > Apps Script).
 * 3. Replace all code in Code.gs with this entire file.
 * 4. Click 'Save' (💾).
 * 5. Click 'Deploy' > 'New deployment' (نشر > نشر جديد).
 * 6. Select Type: 'Web app' (تطبيق ويب).
 * 7. Set:
 *    - Description: "IBONDA Production Webhook"
 *    - Execute as: "Me" (حسابي)
 *    - Who has access: "Anyone" (أي شخص)  <-- CRITICAL for webhook calls!
 * 8. Click 'Deploy' and copy the 'Web app URL'.
 * 9. Paste the Web app URL in your IBONDA configuration.
 */

const TIMEZONE = "Africa/Casablanca";
const SHEET_NAME = "Leads";
const CALENDAR_NAME = "Primary"; // Or create a dedicated calendar named "IBONDA Demos"

function doGet(e) {
  var action = e.parameter ? e.parameter.action : "";
  
  if (action === "get_availability") {
    var dateStr = e.parameter.date; // Format: YYYY-MM-DD
    var availability = checkCalendarAvailability(dateStr);
    return createJsonResponse({ status: "success", date: dateStr, slots: availability });
  }
  
  if (action === "ping") {
    return createJsonResponse({ status: "ok", message: "IBONDA Apps Script is live!", timezone: TIMEZONE });
  }

  return createJsonResponse({ status: "ok", app: "IBONDA SaaS Connector", timezone: TIMEZONE });
}

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var action = data.action || "submit_lead";

    if (action === "submit_lead") {
      var leadId = saveLeadToSheet(data);
      return createJsonResponse({ status: "success", leadId: leadId, message: "Lead saved successfully" });
    }

    if (action === "book_appointment") {
      var bookingResult = createCalendarEventAndFinalizeLead(data);
      return createJsonResponse({ status: "success", booking: bookingResult });
    }

    return createJsonResponse({ status: "error", message: "Unknown action" });
  } catch (error) {
    return createJsonResponse({ status: "error", error: error.toString() });
  }
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Setup professional header row
    var headers = [
      "معرّف الطلب (Lead ID)",
      "تاريخ الإرسال (Timestamp)",
      "الاسم الكامل",
      "رقم الهاتف / WhatsApp",
      "اسم الوكالة العقارية",
      "المدينة",
      "عدد العملاء شهرياً",
      "فريق المبيعات",
      "حالة الحجز (Status)",
      "تاريخ المعاينة / العرض",
      "وقت الموعد (توقيت كازا)",
      "رابط تقويم Google"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#0f172a").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveLeadToSheet(lead) {
  var sheet = getOrCreateSheet();
  var leadId = "IBD-" + Utilities.formatDate(new Date(), TIMEZONE, "yyyyMMdd-HHmmss") + "-" + Math.floor(Math.random() * 899 + 100);
  var timestamp = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss");

  var row = [
    leadId,
    timestamp,
    lead.fullName || "",
    lead.phoneNumber || "",
    lead.agencyName || "",
    lead.city || "",
    lead.monthlyLeads || "",
    lead.salesTeamSize || "",
    "قيد انتظار تأكيد الموعد (Pending)",
    lead.appointmentDate || "",
    lead.appointmentTime || "",
    ""
  ];

  sheet.appendRow(row);
  return leadId;
}

function checkCalendarAvailability(dateStr) {
  // Available from 10:00 to 18:00 (Casablanca Time) in 30 min intervals
  // Total slots: 10:00, 10:30, 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30
  var slots = [
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  if (!dateStr) return slots.map(function(s) { return { time: s, available: true }; });

  var cal = CalendarApp.getDefaultCalendar();
  var targetDate = new Date(dateStr + "T00:00:00");
  
  // Get all calendar events on target date
  var startOfDay = new Date(dateStr + "T00:00:00");
  var endOfDay = new Date(dateStr + "T23:59:59");
  var events = cal.getEvents(startOfDay, endOfDay);

  var result = [];

  for (var i = 0; i < slots.length; i++) {
    var slotTime = slots[i];
    var parts = slotTime.split(":");
    var slotStart = new Date(dateStr + "T" + slotTime + ":00");
    var slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);

    // Check if slot overlaps with any existing calendar event
    var isBusy = false;
    for (var j = 0; j < events.length; j++) {
      var ev = events[j];
      if (ev.isAllDayEvent()) continue;
      var evStart = ev.getStartTime();
      var evEnd = ev.getEndTime();

      if (slotStart < evEnd && slotEnd > evStart) {
        isBusy = true;
        break;
      }
    }

    result.push({
      time: slotTime,
      available: !isBusy
    });
  }

  return result;
}

function createCalendarEventAndFinalizeLead(data) {
  var cal = CalendarApp.getDefaultCalendar();
  var dateStr = data.appointmentDate; // e.g. "2026-11-10"
  var timeStr = data.appointmentTime; // e.g. "14:30"
  var agency = data.agencyName || "الوكالة العقارية";
  var clientName = data.fullName || "عميل IBONDA";

  var title = "عرض تجريبي لنظام IBONDA | " + agency + " (" + clientName + ")";
  var startTime = new Date(dateStr + "T" + timeStr + ":00");
  var endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

  var description = 
    "عرض تجريبي مجاني مباشر لمدة 30 دقيقة لنظام IBONDA لإدارة وأتمتة الوكالات العقارية.\\n\\n" +
    "معلومات الوكالة:\\n" +
    "- اسم الوكالة: " + agency + "\\n" +
    "- المسؤول: " + clientName + "\\n" +
    "- الهاتف / واتساب: " + (data.phoneNumber || "") + "\\n" +
    "- المدينة: " + (data.city || "") + "\\n" +
    "- حجم العملاء شهرياً: " + (data.monthlyLeads || "") + "\\n" +
    "- حجم فريق المبيعات: " + (data.salesTeamSize || "") + "\\n\\n" +
    "التوقيت: أفريقيا / الدار البيضاء (GMT+1)";

  var options = {
    description: description,
    location: "Google Meet / مكالمة فيديو مباشرة"
  };

  var event = cal.createEvent(title, startTime, endTime, options);
  var eventUrl = "https://calendar.google.com/calendar/u/0/r/eventedit/" + event.getId();

  // Update Google Sheet row if leadId provided
  updateSheetWithBooking(data.leadId, dateStr, timeStr, eventUrl);

  return {
    eventId: event.getId(),
    date: dateStr,
    time: timeStr,
    timezone: TIMEZONE,
    eventUrl: eventUrl
  };
}

function updateSheetWithBooking(leadId, dateStr, timeStr, eventUrl) {
  var sheet = getOrCreateSheet();
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;

  for (var i = 1; i < data.length; i++) {
    // If leadId matches or if leadId not passed, update the most recent matching record
    if (leadId && data[i][0] == leadId) {
      sheet.getRange(i + 1, 9).setValue("تم تأكيد الموعد (Confirmed)");
      sheet.getRange(i + 1, 10).setValue(dateStr);
      sheet.getRange(i + 1, 11).setValue(timeStr);
      sheet.getRange(i + 1, 12).setValue(eventUrl || "");
      break;
    }
  }
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

// Local storage key for persistent user configuration
export const APPS_SCRIPT_STORAGE_KEY = 'ibonda_apps_script_url';

export function getStoredAppsScriptUrl(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(APPS_SCRIPT_STORAGE_KEY) || (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string) || '';
}

export function setStoredAppsScriptUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(APPS_SCRIPT_STORAGE_KEY, url.trim());
}

/**
 * Send lead details to Google Sheets via Google Apps Script Webhook
 */
export async function submitLeadToGoogleSheets(
  leadData: LeadSubmissionData,
  appsScriptUrl?: string
): Promise<{ success: boolean; leadId: string; isSimulated?: boolean; error?: string }> {
  const endpoint = (appsScriptUrl || getStoredAppsScriptUrl()).trim();

  // If no endpoint configured, simulate realistic latency & generated ID, preserving user input
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const simulatedId = `IBD-SIM-${Date.now().toString(36).toUpperCase()}`;
    return {
      success: true,
      leadId: simulatedId,
      isSimulated: true,
    };
  }

  try {
    const payload = {
      action: 'submit_lead',
      ...leadData,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Prevents CORS preflight in Google Apps Script
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result && result.status === 'success') {
      return {
        success: true,
        leadId: result.leadId || `IBD-${Date.now()}`,
        isSimulated: false,
      };
    } else {
      throw new Error(result?.message || 'Failed to record lead');
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Apps Script Submission Error:', error);
    return {
      success: false,
      leadId: '',
      error: error.message || 'تعذر الاتصال بجدول البيانات. يرجى التحقق من الرابط أو المحاولة لاحقاً.',
    };
  }
}

/**
 * Query real Google Calendar availability for a given date
 */
export async function fetchCalendarSlots(
  dateStr: string,
  appsScriptUrl?: string
): Promise<CalendarSlot[]> {
  const endpoint = (appsScriptUrl || getStoredAppsScriptUrl()).trim();

  // Baseline standard slots in Casablanca timezone
  const defaultSlots: CalendarSlot[] = [
    { time: '10:00', formatted: '10:00 صباحاً', available: true },
    { time: '10:30', formatted: '10:30 صباحاً', available: true },
    { time: '11:00', formatted: '11:00 صباحاً', available: true },
    { time: '11:30', formatted: '11:30 صباحاً', available: true },
    { time: '12:00', formatted: '12:00 ظهراً', available: true },
    { time: '12:30', formatted: '12:30 ظهراً', available: true },
    { time: '14:00', formatted: '02:00 مساءً', available: true },
    { time: '14:30', formatted: '02:30 مساءً', available: true },
    { time: '15:00', formatted: '03:00 مساءً', available: true },
    { time: '15:30', formatted: '03:30 مساءً', available: true },
    { time: '16:00', formatted: '04:00 مساءً', available: true },
    { time: '16:30', formatted: '04:30 مساءً', available: true },
    { time: '17:00', formatted: '05:00 مساءً', available: true },
    { time: '17:30', formatted: '05:30 مساءً', available: true },
  ];

  if (!endpoint) {
    // Realistic simulation: disable slots that are in the past today
    const now = new Date();
    const isToday = now.toISOString().slice(0, 10) === dateStr;
    const currentCasablancaHour = now.getHours();
    const currentCasablancaMin = now.getMinutes();

    return defaultSlots.map((slot) => {
      const [h, m] = slot.time.split(':').map(Number);
      if (isToday) {
        if (h < currentCasablancaHour || (h === currentCasablancaHour && m <= currentCasablancaMin)) {
          return { ...slot, available: false };
        }
      }
      return slot;
    });
  }

  try {
    const url = new URL(endpoint);
    url.searchParams.set('action', 'get_availability');
    url.searchParams.set('date', dateStr);

    const res = await fetch(url.toString(), { method: 'GET' });
    const data = await res.json();

    if (data && data.slots && Array.isArray(data.slots)) {
      return data.slots.map((s: { time: string; available: boolean }) => {
        const [hourStr, minStr] = s.time.split(':');
        const hour = parseInt(hourStr, 10);
        let formatted = '';
        if (hour < 12) {
          formatted = `${s.time} صباحاً`;
        } else if (hour === 12) {
          formatted = `12:${minStr} ظهراً`;
        } else {
          const p = hour - 12;
          formatted = `0${p}:${minStr} مساءً`;
        }
        return {
          time: s.time,
          formatted,
          available: s.available,
        };
      });
    }
    return defaultSlots;
  } catch (e) {
    console.warn('Could not query live calendar slots, using default schedule:', e);
    return defaultSlots;
  }
}

/**
 * Confirm and book the 30-min Google Calendar event
 */
export async function bookCalendarAppointment(
  leadData: LeadSubmissionData & { appointmentDate: string; appointmentTime: string },
  appsScriptUrl?: string
): Promise<{ success: boolean; eventId?: string; error?: string; isSimulated?: boolean }> {
  const endpoint = (appsScriptUrl || getStoredAppsScriptUrl()).trim();

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return {
      success: true,
      eventId: `GCAL-SIM-${Date.now()}`,
      isSimulated: true,
    };
  }

  try {
    const payload = {
      action: 'book_appointment',
      ...leadData,
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result && result.status === 'success') {
      return {
        success: true,
        eventId: result.booking?.eventId || 'EVT-OK',
        isSimulated: false,
      };
    } else {
      throw new Error(result?.message || 'Failed to book calendar appointment');
    }
  } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      error: error.message || 'حدث خطأ أثناء حجز الموعد في تقويم Google.',
    };
  }
}
