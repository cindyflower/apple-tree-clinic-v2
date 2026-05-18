/**
 * useAnalytics — 初始化追蹤系統 + 頁面瀏覽追蹤
 * 在 App.tsx 頂層呼叫一次即可
 */

import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { initUTMCapture, trackPageView } from '@/lib/analytics';

export function useAnalytics(): void {
  const [location] = useLocation();

  // Initialize UTM capture on first load
  useEffect(() => {
    initUTMCapture();
  }, []);

  // Track page view on route change
  useEffect(() => {
    // Small delay to let document.title update first
    const timer = setTimeout(() => {
      trackPageView();
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);
}

export default useAnalytics;
