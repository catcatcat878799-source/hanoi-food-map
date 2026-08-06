/**
 * Service Worker 註冊模塊
 * 支援 PWA 離線功能
 */

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker 已註冊:', registration);
        })
        .catch((error) => {
          console.error('Service Worker 註冊失敗:', error);
        });
    });
  }
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
