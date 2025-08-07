'use client';

import { useEffect } from 'react';

interface ImageProtectionProps {
  children: React.ReactNode;
}

export function ImageProtection({ children }: ImageProtectionProps) {
  useEffect(() => {
    // 開発環境では保護機能を無効化
    const isDevelopment = process.env.NODE_ENV === 'development';
    // 右クリックメニューを無効化（開発環境では無効化しない）
    const handleContextMenu = (e: MouseEvent) => {
      if (isDevelopment) return; // 開発環境では何もしない
      e.preventDefault();
      return false;
    };

    // キーボードショートカットを無効化（開発環境では無効化しない）
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDevelopment) return; // 開発環境では何もしない
      
      // Ctrl+S, Ctrl+Shift+S, F12, Ctrl+Shift+I, Ctrl+U を無効化
      if (
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.shiftKey && e.key === 'S') ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // ドラッグ&ドロップを無効化（開発環境では無効化しない）
    const handleDragStart = (e: DragEvent) => {
      if (isDevelopment) return; // 開発環境では何もしない
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        return false;
      }
    };

    // 画像の選択を無効化（開発環境では無効化しない）
    const handleSelectStart = (e: Event) => {
      if (isDevelopment) return; // 開発環境では何もしない
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        return false;
      }
    };

    // 画像に保護スタイルを適用する関数
    const applyImageProtection = (img: HTMLImageElement) => {
      if (isDevelopment) return; // 開発環境では何もしない
      
      img.addEventListener('contextmenu', handleContextMenu);
      img.addEventListener('dragstart', handleDragStart);
      img.addEventListener('selectstart', handleSelectStart);
      img.style.userSelect = 'none';
      (img.style as any).webkitUserSelect = 'none';
      (img.style as any).mozUserSelect = 'none';
      (img.style as any).msUserSelect = 'none';
      img.classList.add('image-protection');
    };

    // 既存の画像要素に保護を適用
    const images = document.querySelectorAll('img');
    images.forEach(applyImageProtection);

    // 新しく追加される画像を監視
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // 追加された要素が画像の場合
            if (element.tagName === 'IMG') {
              applyImageProtection(element as HTMLImageElement);
            }
            // 追加された要素内の画像を検索
            const newImages = element.querySelectorAll('img');
            newImages.forEach(applyImageProtection);
          }
        });
      });
    });

    // DOMの変更を監視
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // イベントリスナーを追加（開発環境では無効化しない）
    if (!isDevelopment) {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('dragstart', handleDragStart);
      document.addEventListener('selectstart', handleSelectStart);
    }

    // クリーンアップ関数
    return () => {
      if (!isDevelopment) {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('dragstart', handleDragStart);
        document.removeEventListener('selectstart', handleSelectStart);

        // 画像要素からイベントリスナーを削除
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          img.removeEventListener('contextmenu', handleContextMenu);
          img.removeEventListener('dragstart', handleDragStart);
          img.removeEventListener('selectstart', handleSelectStart);
        });
      }

      // オブザーバーを停止
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
} 