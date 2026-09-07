export const COOKIE_CONSENT_KEY = 'mariogijon-cookie-consent-v1';

type ConsentValue = 'accepted' | 'rejected' | null;

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? '';

type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>;

function getDisableKey() {
  return GA_MEASUREMENT_ID ? `ga-disable-${GA_MEASUREMENT_ID}` : '';
}

function setDisabled(disabled: boolean) {
  const key = getDisableKey();
  if (!key) {
    return;
  }
  (window as any)[key] = disabled;
}

function hasGtag() {
  return typeof (window as any).gtag === 'function';
}

function updateConsent(storage: 'granted' | 'denied') {
  if (!GA_MEASUREMENT_ID || !hasGtag()) {
    return;
  }

  (window as any).gtag('consent', 'update', { analytics_storage: storage });
}

export function readCookieConsent(): ConsentValue {
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === 'accepted' || value === 'rejected') {
    return value;
  }
  return null;
}

export function applyCookieConsent(consent: ConsentValue) {
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  if (consent === 'accepted') {
    setDisabled(false);
    updateConsent('granted');
    return;
  }

  setDisabled(true);
  updateConsent('denied');
}

export function saveCookieConsent(consent: Exclude<ConsentValue, null>) {
  localStorage.setItem(COOKIE_CONSENT_KEY, consent);
  applyCookieConsent(consent);
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  const disabled = (window as any)[getDisableKey()] === true;
  if (disabled || typeof (window as any).gtag !== 'function') {
    return;
  }

  (window as any).gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title
  });
}

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  const disabled = (window as any)[getDisableKey()] === true;
  if (disabled || !hasGtag()) {
    return;
  }

  (window as any).gtag('event', eventName, params);
}