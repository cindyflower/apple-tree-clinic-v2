const PATTERNS = {
  gtm: /^GTM-[A-Z0-9]{6,}$/,
  ga4: /^G-[A-Z0-9]{8,15}$/,
  googleAds: /^AW-[0-9]{6,}$/,
  meta: /^[0-9]{6,20}$/,
  line: /^[A-Za-z0-9_-]{6,64}$|^[0-9a-f]{8}-[0-9a-f-]{27}$/i,
};

const CONSENT_KEY = "appletree_marketing_consent_v1";

function valid(value, pattern) {
  return typeof value === "string" && pattern.test(value.trim()) ? value.trim() : "";
}

function consentGuarded(body) {
  if (!body) return "";
  return `<script>(function(){var c;try{c=localStorage.getItem(${JSON.stringify(CONSENT_KEY)})}catch(e){return}if(c!=="accepted")return;${body}})();</script>`;
}

export function renderMarketingTags(env = {}) {
  const gtm = valid(env.VITE_GTM_CONTAINER_ID, PATTERNS.gtm);
  if (gtm) {
    const id = JSON.stringify(gtm);
    const body = `window.__marketingMode="gtm";window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+${id};document.head.appendChild(s);`;
    return { head: consentGuarded(body), bodyStart: "", bodyEnd: "" };
  }

  const ga4 = valid(env.VITE_GA_MEASUREMENT_ID, PATTERNS.ga4);
  const googleAds = valid(env.VITE_GOOGLE_ADS_ID, PATTERNS.googleAds);
  const meta = valid(env.VITE_META_PIXEL_ID, PATTERNS.meta);
  const line = valid(env.VITE_LINE_TAG_ID, PATTERNS.line);
  if (!ga4 && !googleAds && !meta && !line) return { head: "", bodyStart: "", bodyEnd: "" };

  const loaderId = ga4 || googleAds;
  const configs = [ga4, googleAds]
    .filter(Boolean)
    .map((id) => `window.gtag('config',${JSON.stringify(id)});`)
    .join("");
  const parts = [`window.__marketingMode="direct";`];

  if (loaderId) {
    parts.push(
      `window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());${configs}var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+${JSON.stringify(loaderId)};document.head.appendChild(g);`,
    );
  }
  if (meta) {
    parts.push(
      `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(meta)});fbq('track','PageView');`,
    );
  }
  if (line) {
    parts.push(
      `window._ltq=window._ltq||[];window._lt=window._lt||function(){window._ltq.push(arguments)};var l=document.createElement('script');l.async=true;l.src='https://d.line-scdn.net/n/line_tag/public/release/v1/lt.js';document.head.appendChild(l);window._lt('init',{customerType:'account',tagId:${JSON.stringify(line)}});window._lt('send','pv',[${JSON.stringify(line)}]);`,
    );
  }

  return { head: consentGuarded(parts.join("")), bodyStart: "", bodyEnd: "" };
}
