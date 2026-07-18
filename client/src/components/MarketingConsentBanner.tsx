import { useState } from "react";
import { getMarketingConsent, setMarketingConsent, type MarketingConsent } from "@/lib/marketingConsent";

export default function MarketingConsentBanner() {
  const [choice, setChoice] = useState<MarketingConsent | undefined>(() => getMarketingConsent());
  if (choice) {
    return (
      <button
        type="button"
        onClick={() => setChoice(undefined)}
        className="fixed bottom-3 left-3 z-[100] rounded-lg border border-ink/15 bg-white/90 px-3 py-2 text-xs text-ink/60 shadow backdrop-blur"
      >
        隱私設定
      </button>
    );
  }

  const choose = (next: MarketingConsent) => {
    setMarketingConsent(next);
    setChoice(next);
    // Reload both ways: acceptance bootstraps tags; rejection unloads any active tags.
    window.location.reload();
  };

  return (
    <aside
      aria-label="分析與行銷 Cookie 同意"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-botanical/15 bg-white/95 p-5 shadow-2xl backdrop-blur-md"
    >
      <div id="privacy-notice" className="text-sm leading-6 text-ink/70">
        <strong className="block text-base text-ink">您的隱私選擇</strong>
        本站僅在您同意後載入分析與行銷標籤，並保存廣告來源識別資訊，以了解網站成效；拒絕不影響瀏覽、電話或 LINE 諮詢。
        您的同意或拒絕選擇會儲存在瀏覽器中。詳見
        <a href="#privacy-notice" className="ml-1 underline underline-offset-2">隱私說明</a>。
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="rounded-lg border border-ink/20 px-4 py-2 text-sm text-ink/70 hover:bg-ink/5"
        >
          拒絕非必要追蹤
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-lg bg-botanical px-4 py-2 text-sm text-white hover:bg-botanical-light"
        >
          接受分析與行銷
        </button>
      </div>
    </aside>
  );
}
