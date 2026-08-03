/**
 * analytics.ts — 全站行銷漏斗追蹤系統
 * 
 * 事件追蹤架構：
 * 1. click_line — 點擊 LINE 官方帳號
 * 2. click_phone — 點擊撥打電話
 * 3. click_booking — 點擊預約諮詢 / 了解適合我的療程
 * 4. form_submit — 送出表單
 * 5. click_map — 點擊 Google Map
 * 6. click_xuyan_ai — 點擊序顏 / AI 檢測入口
 * 7. click_treatment — 點擊療程卡片
 * 8. click_video — 點擊影片
 * 9. click_case — 點擊案例
 * 10. lead_completed — 完成預約流程
 * 
 * 使用方式：
 *   import { trackClickLine, trackClickBooking } from '@/lib/analytics';
 *   onClick={() => trackClickLine({ section_name: 'Footer', clinic_location: '南京旗艦' })}
 */

import { getStoredAttribution, initializeAttribution } from "./attribution";

// ============================================================
// Types
// ============================================================

interface BaseEventParams {
  page_title?: string;
  page_url?: string;
  button_text?: string;
  section_name?: string;
  treatment_name?: string;
  clinic_location?: string;
  source_page?: string;
  device_type?: string;
  campaign_source?: string;
  campaign_medium?: string;
  campaign_name?: string;
  [key: string]: string | number | boolean | undefined;
}

// ============================================================
// Utility: Device Detection
// ============================================================

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return 'mobile';
  if (/Tablet|iPad/i.test(ua)) return 'tablet';
  return 'desktop';
}

// ============================================================
// Utility: UTM Parameter Retrieval
// ============================================================

function getUTMParams(): Record<string, string> {
  return getAttribution()?.last_touch ?? {};
}

function getAttribution() {
  if (typeof window === "undefined") return undefined;
  try {
    return getStoredAttribution(window.localStorage);
  } catch {
    return undefined;
  }
}

// ============================================================
// Core: Send Event to GA4 via gtag
// ============================================================

function sendEvent(eventName: string, params: BaseEventParams = {}): void {
  if (typeof window === "undefined") return;
  const utmParams = getUTMParams();
  const attribution = getAttribution();
  
  const enrichedParams: BaseEventParams = {
    page_title: document.title,
    page_url: window.location.href,
    device_type: getDeviceType(),
    lead_id: attribution?.lead_id,
    campaign_source: utmParams.utm_source,
    campaign_medium: utmParams.utm_medium,
    campaign_name: utmParams.utm_campaign,
    campaign_content: utmParams.utm_content,
    campaign_term: utmParams.utm_term,
    gclid: utmParams.gclid,
    gbraid: utmParams.gbraid,
    wbraid: utmParams.wbraid,
    ...params,
  };

  // Remove undefined values
  Object.keys(enrichedParams).forEach(key => {
    if (enrichedParams[key] === undefined) delete enrichedParams[key];
  });

  const mode = (window as any).__marketingMode;
  // Direct tags use gtag; GTM uses a dataLayer event. Never send through both.
  if (mode === "direct" && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, enrichedParams);
  } else if (mode === "gtm" && Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({
      event: eventName,
      ...enrichedParams,
    });
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName}`, enrichedParams);
  }
}

// ============================================================
// Event 1: click_line — 點擊 LINE 官方帳號
// ============================================================

export function trackClickLine(params: {
  section_name?: string;
  clinic_location?: string;
  button_text?: string;
} = {}): void {
  sendEvent('click_line', {
    section_name: params.section_name || 'unknown',
    clinic_location: params.clinic_location || '未指定',
    button_text: params.button_text || 'LINE 預約',
  });
}

// ============================================================
// Event 2: click_phone — 點擊撥打電話
// ============================================================

export function trackClickPhone(params: {
  clinic_location: string;
  phone_number?: string;
  section_name?: string;
} = { clinic_location: '未指定' }): void {
  sendEvent('click_phone', {
    clinic_location: params.clinic_location,
    button_text: params.phone_number || '',
    section_name: params.section_name || 'unknown',
  });
}

// ============================================================
// Event 3: click_booking — 點擊預約諮詢
// ============================================================

export function trackClickBooking(params: {
  button_text?: string;
  section_name?: string;
  treatment_name?: string;
  clinic_location?: string;
} = {}): void {
  sendEvent('click_booking', {
    button_text: params.button_text || '預約諮詢',
    section_name: params.section_name || 'unknown',
    treatment_name: params.treatment_name || '',
    clinic_location: params.clinic_location || '未指定',
  });
}

// ============================================================
// Event 4: form_submit — 送出表單
// ============================================================

export function trackFormSubmit(params: {
  form_name?: string;
  section_name?: string;
  treatment_name?: string;
} = {}): void {
  sendEvent('form_submit', {
    button_text: params.form_name || 'form',
    section_name: params.section_name || 'unknown',
    treatment_name: params.treatment_name || '',
  });
}

// ============================================================
// Event 5: click_map — 點擊 Google Map
// ============================================================

export function trackClickMap(params: {
  clinic_location: string;
  section_name?: string;
} = { clinic_location: '未指定' }): void {
  sendEvent('click_map', {
    clinic_location: params.clinic_location,
    section_name: params.section_name || 'Footer',
  });
}

// ============================================================
// Event 6: click_xuyan_ai — 點擊序顏 / AI 檢測入口
// ============================================================

export function trackClickXuyanAI(params: {
  button_text?: string;
  section_name?: string;
  source_page?: string;
} = {}): void {
  sendEvent('click_xuyan_ai', {
    button_text: params.button_text || '開始 AI 肌膚檢測',
    section_name: params.section_name || 'unknown',
    source_page: params.source_page || window.location.pathname,
  });
}

// ============================================================
// Event 7: click_treatment — 點擊療程卡片
// ============================================================

export function trackClickTreatment(params: {
  treatment_name: string;
  section_name?: string;
  source_page?: string;
} = { treatment_name: '' }): void {
  sendEvent('click_treatment', {
    treatment_name: params.treatment_name,
    section_name: params.section_name || '療程列表',
    source_page: params.source_page || window.location.pathname,
  });
}

// ============================================================
// Event 8: click_video — 點擊影片
// ============================================================

export function trackClickVideo(params: {
  button_text?: string;
  section_name?: string;
  treatment_name?: string;
} = {}): void {
  sendEvent('click_video', {
    button_text: params.button_text || '',
    section_name: params.section_name || '美麗實境室',
    treatment_name: params.treatment_name || '',
  });
}

// ============================================================
// Event 9: click_case — 點擊案例
// ============================================================

export function trackClickCase(params: {
  button_text?: string;
  section_name?: string;
  treatment_name?: string;
} = {}): void {
  sendEvent('click_case', {
    button_text: params.button_text || '',
    section_name: params.section_name || '精選案例',
    treatment_name: params.treatment_name || '',
  });
}

// ============================================================
// Event 10: lead_completed — 完成預約流程（主要轉換事件）
// ============================================================

export function trackLeadCompleted(params: {
  treatment_name?: string;
  clinic_location?: string;
  source_page?: string;
  campaign_source?: string;
} = {}): void {
  sendEvent('lead_completed', {
    treatment_name: params.treatment_name || '',
    clinic_location: params.clinic_location || '未指定',
    source_page: params.source_page || window.location.pathname,
  });
}

// ============================================================
// Funnel Stage Tracking (for conversion funnel analysis)
// ============================================================

export function trackFunnelStage(stage: string, params: BaseEventParams = {}): void {
  sendEvent('funnel_stage', {
    ...params,
    button_text: stage,
  });
}

// ============================================================
// Initialize: UTM Capture on Page Load
// ============================================================

export function initUTMCapture(): void {
  if (typeof window === 'undefined') return;
  try {
    const state = initializeAttribution(window.location.href, window.localStorage);
    try {
      window.sessionStorage.setItem('utm_params', JSON.stringify(state.last_touch));
    } catch {
      // Session storage is optional and may be blocked or quota-limited.
    }
  } catch {
    // Accessing storage itself can throw; analytics must never block React render.
  }
}

// ============================================================
// Initialize: Page View Tracking
// ============================================================

export function trackPageView(pageTitle?: string, pageUrl?: string): void {
  sendEvent('page_view', {
    page_title: pageTitle || document.title,
    page_url: pageUrl || window.location.href,
  });

  // Meta Pixel：index.html 已送過首次 PageView；之後 SPA 換頁再送
  if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
    const w = window as any;
    if (!w.__metaPixelInitialPageViewDone) {
      w.__metaPixelInitialPageViewDone = true;
      return;
    }
    w.fbq('track', 'PageView');
  }
}
