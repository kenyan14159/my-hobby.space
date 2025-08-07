import { useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationOptions {
  message: string;
  type: NotificationType;
  duration?: number;
}

export function useNotification() {
  const showNotification = useCallback((message: string, type: NotificationType = 'info', duration: number = 3000) => {
    // DOM要素を作成して通知を表示
    const notification = document.createElement('div');
    
    // 通知のスタイルを設定
    const baseClasses = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg font-medium text-sm z-[9999] transform transition-all duration-300 ease-in-out translate-x-full opacity-0';
    const typeClasses = {
      success: 'bg-green-100 text-green-800 border border-green-200',
      error: 'bg-red-100 text-red-800 border border-red-200',
      info: 'bg-blue-100 text-blue-800 border border-blue-200'
    };
    
    notification.className = `${baseClasses} ${typeClasses[type]}`;
    notification.textContent = message;
    
    // DOMに追加
    document.body.appendChild(notification);
    
    // アニメーション開始
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    });
    
    // 自動削除
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }, []);

  return { showNotification };
} 