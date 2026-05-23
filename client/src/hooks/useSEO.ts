/**
 * useSEO — 動態 SEO Meta / Open Graph / Canonical 管理 Hook
 * 
 * 使用方式：
 *   useSEO({
 *     title: '皮秒蜂巢雷射｜蘋果樹醫美',
 *     description: '...',
 *     ogImage: 'https://...',
 *     canonical: '/treatment/picosure-755',
 *   });
 *
 * Canonical / og:url use VITE_SITE_URL (+ Vite BASE_URL). See docs/site-urls.md.
 */

import { useEffect } from 'react';
import { IMAGES } from '@/lib/imageAssets';
import { absoluteAssetUrl, absoluteSiteUrl, pathnameToRoute } from '@/lib/siteUrl';

interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  keywords?: string;
  noindex?: boolean;
}

const SITE_NAME = '蘋果樹醫美 Dr. Appletree';

export function useSEO(config: SEOConfig): void {
  useEffect(() => {
    // Title
    document.title = config.title;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMeta('name', 'description', config.description);
    if (config.keywords) {
      setMeta('name', 'keywords', config.keywords);
    }
    if (config.noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    }

    const canonicalPath = config.canonical ?? pathnameToRoute();
    const pageUrl = absoluteSiteUrl(canonicalPath);
    const ogImageUrl = absoluteAssetUrl(config.ogImage || IMAGES.hero);

    // Open Graph
    setMeta('property', 'og:title', config.title);
    setMeta('property', 'og:description', config.description);
    setMeta('property', 'og:type', config.ogType || 'website');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'zh_TW');
    setMeta('property', 'og:image', ogImageUrl);
    setMeta('property', 'og:url', pageUrl);

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', config.title);
    setMeta('name', 'twitter:description', config.description);
    setMeta('name', 'twitter:image', ogImageUrl);

    // Canonical URL
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', pageUrl);

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = `${SITE_NAME}｜健康美麗管理品牌｜台北醫美推薦`;
    };
  }, [config.title, config.description, config.ogImage, config.canonical, config.ogType, config.keywords, config.noindex]);
}

export default useSEO;
