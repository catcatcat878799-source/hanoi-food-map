/**
 * Service Worker 註冊模塊
 * 支援 PWA 離線功能
 */

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async () => {
    // Vite's development HTML and module URLs must never be served from the
    // production PWA cache. The managed preview also does not proxy HMR
    // WebSockets, so remove any Service Worker left by an earlier PWA build.
    if (import.meta.env.DEV) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker 已註冊:', registration);
    } catch (error) {
      console.error('Service Worker 註冊失敗:', error);
    }
  });
}

/**
 * 檢查是否在 PWA 模式下運行
 */
export function isPWAMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

/**
 * 檢查是否支援 Web App 安裝
 */
export function isInstallable() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}
