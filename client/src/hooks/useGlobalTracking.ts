/**
 * useGlobalTracking — 全域事件委派追蹤
 *
 * 自動偵測所有 click 事件，根據以下規則觸發對應追蹤事件：
 * 1. href 包含 line.me / lin.ee → click_line
 * 2. href 包含 tel: → click_phone
 * 3. href 包含 google.com/maps → click_map
 * 4. href 包含 /face-test / /xuyan-ai → click_xuyan_ai
 * 5. href 包含 /treatment/ → click_treatment
 * 6. href 包含 /case/ → click_case
 * 7. data-track="booking" → click_booking
 * 8. data-track="video" → click_video
 * 9. data-track="form-submit" → form_submit
 * 10. data-track="lead-completed" → lead_completed
 *
 * 額外支援 data-track-* 屬性傳遞參數：
 *   data-track-treatment="海芙音波"
 *   data-track-section="Hero"
 *   data-track-clinic="南京旗艦"
 *   data-track-button="南京旗艦｜LINE 預約｜Navbar"  ← GTM 用來區分按鈕
 */

import { useEffect } from 'react';
import {
  trackClickLine,
  trackClickPhone,
  trackClickBooking,
  trackFormSubmit,
  trackClickMap,
  trackClickXuyanAI,
  trackClickTreatment,
  trackClickVideo,
  trackClickCase,
  trackLeadCompleted,
} from '@/lib/analytics';

export function useGlobalTracking(): void {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // Walk up the DOM to find the closest <a> or [data-track] element
      const anchor = target.closest('a[href], button[data-track], [data-track]') as HTMLElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const dataTrack = anchor.getAttribute('data-track') || '';
      const sectionName = anchor.getAttribute('data-track-section') || findSectionName(anchor);
      const treatmentName = anchor.getAttribute('data-track-treatment') || '';
      const clinicLocation = anchor.getAttribute('data-track-clinic') || '';
      const visibleText = anchor.textContent?.replace(/\s+/g, ' ').trim().slice(0, 50) || '';

      // Priority 1: Explicit data-track attributes
      if (dataTrack === 'booking') {
        trackClickBooking({ button_text: visibleText, section_name: sectionName, treatment_name: treatmentName, clinic_location: clinicLocation });
        return;
      }
      if (dataTrack === 'video') {
        trackClickVideo({ button_text: visibleText, section_name: sectionName, treatment_name: treatmentName });
        return;
      }
      if (dataTrack === 'form-submit') {
        trackFormSubmit({ form_name: visibleText, section_name: sectionName, treatment_name: treatmentName });
        return;
      }
      if (dataTrack === 'lead-completed') {
        trackLeadCompleted({ treatment_name: treatmentName, clinic_location: clinicLocation });
        return;
      }

      // Priority 2: Auto-detect from href patterns
      if (href.includes('line.me') || href.includes('lin.ee')) {
        const clinic = clinicLocation || getClinicFromLineUrl(href);
        const pageContext = getPageContextLabel();
        const buttonText = resolveLineButtonText(anchor, visibleText, sectionName, clinic, pageContext);
        trackClickLine({ section_name: sectionName, clinic_location: clinic, button_text: buttonText });
        return;
      }
      if (href.startsWith('tel:')) {
        trackClickPhone({ clinic_location: clinicLocation || getClinicFromPhone(href), phone_number: href.replace('tel:', ''), section_name: sectionName });
        return;
      }
      if (href.includes('google.com/maps') || href.includes('goo.gl/maps')) {
        trackClickMap({ clinic_location: clinicLocation || '未指定', section_name: sectionName });
        return;
      }
      if (href.includes('/face-test') || href.includes('/xuyan-ai')) {
        trackClickXuyanAI({ button_text: visibleText, section_name: sectionName });
        return;
      }
      if (href.includes('/treatment/')) {
        const slug = href.split('/treatment/')[1]?.split('?')[0] || '';
        trackClickTreatment({ treatment_name: treatmentName || slug, section_name: sectionName });
        return;
      }
      if (href.includes('/case/')) {
        trackClickCase({ button_text: visibleText, section_name: sectionName, treatment_name: treatmentName });
        return;
      }

      // Priority 3: Generic booking keywords in button text
      if (visibleText.includes('預約') || visibleText.includes('諮詢') || visibleText.includes('了解適合我')) {
        trackClickBooking({ button_text: visibleText, section_name: sectionName, treatment_name: treatmentName, clinic_location: clinicLocation });
        return;
      }
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);
}

/** Prefer explicit tracking label → aria-label → clinic｜visible｜section｜page (unique for GTM). */
export function resolveLineButtonText(
  anchor: HTMLElement,
  visibleText: string,
  sectionName: string,
  clinic: string,
  pageContext = "",
): string {
  const dataButton = anchor.getAttribute('data-track-button')?.trim();
  if (dataButton) return dataButton.slice(0, 80);

  const aria = anchor.getAttribute('aria-label')?.trim();
  if (aria) return aria.slice(0, 80);

  const parts = [
    clinic && clinic !== '未指定' ? clinic : '',
    visibleText || 'LINE',
    sectionName && sectionName !== 'unknown' ? sectionName : '',
    pageContext,
  ].filter(Boolean);

  // Deduplicate adjacent identical parts (e.g. visible text already includes clinic)
  const unique: string[] = [];
  for (const part of parts) {
    if (unique[unique.length - 1] !== part) unique.push(part);
  }

  return unique.join('｜').slice(0, 80);
}

/** Extra context from URL path so detail-page LINE CTAs are distinguishable. */
export function getPageContextLabel(pathname = window.location.pathname): string {
  const path = pathname.replace(/\/+$/, "");
  const treatment = path.match(/\/treatment\/([^/?#]+)/);
  if (treatment) return `療程:${decodeURIComponent(treatment[1])}`;
  const caseMatch = path.match(/\/case\/([^/?#]+)/);
  if (caseMatch) return `案例:${decodeURIComponent(caseMatch[1])}`;
  const doctor = path.match(/\/doctor\/([^/?#]+)/);
  if (doctor) return `醫師:${decodeURIComponent(doctor[1])}`;
  if (path.includes('face-result')) return '臉部測驗結果';
  if (path.includes('face-test')) return '臉部測驗';
  if (path.includes('xuyan-ai')) return '序顏AI';
  return '';
}

// Helper: Find the nearest section name by walking up to find a section with id
function findSectionName(el: HTMLElement): string {
  let current: HTMLElement | null = el;
  while (current) {
    if (current.tagName === 'SECTION' || current.id) {
      const id = current.id;
      if (id) {
        const nameMap: Record<string, string> = {
          'hero': 'Hero',
          'services': '療程列表',
          'videos': '美麗實境室',
          'cases': '精選案例',
          'about': '品牌故事',
          'locations': '營業據點',
          'doctors': '醫師團隊',
          'environment': '院所環境',
          'faq': 'FAQ',
          'contact': '聯絡預約',
          'xuyan': '序顏入口',
          'four-r': '4R美學管理',
          'section-4r': '4R美學管理',
        };
        return nameMap[id] || id;
      }
    }
    current = current.parentElement;
  }
  return 'unknown';
}

// Helper: Determine clinic from phone number
function getClinicFromPhone(tel: string): string {
  if (tel.includes('27163535')) return '南京旗艦';
  if (tel.includes('86720222')) return '北大診所';
  if (tel.includes('86720608')) return '北大醫美';
  return '未指定';
}

/** Determine clinic from Nanjing / Beida LINE URL (mirrors phone tracking). */
export function getClinicFromLineUrl(url: string): string {
  const u = url.toLowerCase();
  // Nanjing LINE
  if (u.includes('871wnsdk') || u.includes('vvmgvln') || u.includes('@dr.appletree')) {
    return '南京旗艦';
  }
  // Beida LINE
  if (u.includes('274dtgel') || u.includes('anqmtp7')) {
    return '北大';
  }
  return '未指定';
}

export default useGlobalTracking;
