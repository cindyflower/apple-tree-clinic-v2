/*
 * Tracking — GA4 Events + Meta Pixel (v2)
 * 
 * GA4 Events:
 *   start_test, select_answer, next_question, complete_test,
 *   view_result, generate_share_card, download_share_card,
 *   copy_link, click_reservation, click_line_consult, click_share
 * 
 * Meta Pixel:
 *   ViewContent (on /face-test)
 *   Lead (on LINE/reservation click)
 *   CompleteFaceTest (custom, on quiz complete)
 *   GenerateShareCard (custom, on share card generation)
 * 
 * Replace GA_MEASUREMENT_ID and META_PIXEL_ID in index.html with actual IDs
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

// ─── GA4 Events ───

export function trackStartTest() {
  window.gtag?.("event", "start_test", {
    event_category: "face_test",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: "face_aging_test",
  });
}

export function trackSelectAnswer(questionNumber: number, selectedType: string) {
  window.gtag?.("event", "select_answer", {
    event_category: "face_test",
    question_number: questionNumber,
    selected_type: selectedType,
  });
}

export function trackNextQuestion(questionNumber: number) {
  window.gtag?.("event", "next_question", {
    event_category: "face_test",
    question_number: questionNumber,
  });
}

export function trackCompleteTest(agingType: string) {
  window.gtag?.("event", "complete_test", {
    event_category: "face_test",
    aging_type: agingType,
  });
}

export function trackViewResult(agingType: string) {
  window.gtag?.("event", "view_result", {
    event_category: "face_test",
    aging_type: agingType,
  });
}

export function trackGenerateShareCard(agingType: string) {
  window.gtag?.("event", "generate_share_card", {
    event_category: "face_test",
    aging_type: agingType,
  });
  window.fbq?.("trackCustom", "GenerateShareCard", {
    aging_type: agingType,
  });
}

export function trackDownloadShareCard(agingType: string) {
  window.gtag?.("event", "download_share_card", {
    event_category: "face_test",
    aging_type: agingType,
  });
}

export function trackCopyLink(agingType: string) {
  window.gtag?.("event", "copy_link", {
    event_category: "face_test",
    aging_type: agingType,
  });
}

export function trackClickReservation(agingType: string, method: string) {
  window.gtag?.("event", "click_reservation", {
    event_category: "face_test",
    aging_type: agingType,
    method,
  });
  window.fbq?.("track", "Lead", {
    content_name: `reservation_${method}`,
  });
}

export function trackClickLineConsult(agingType: string) {
  window.gtag?.("event", "click_line_consult", {
    event_category: "face_test",
    aging_type: agingType,
  });
  window.fbq?.("track", "Lead", {
    content_name: "line_consult",
  });
}

export function trackClickShare(agingType: string) {
  window.gtag?.("event", "click_share", {
    event_category: "face_test",
    aging_type: agingType,
  });
}

// ─── Meta Pixel Custom Events ───

export function trackCompleteFaceTestPixel() {
  window.fbq?.("trackCustom", "CompleteFaceTest");
}

// Legacy — kept for backward compatibility
export function trackLeadSubmit(agingType: string) {
  window.gtag?.("event", "generate_lead", {
    event_category: "face_test",
    aging_type: agingType,
  });
  window.fbq?.("track", "Lead");
}
