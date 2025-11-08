/**
 * ログ出力用ユーティリティ
 * 本番環境ではconsole.logを無効化し、console.error/warnのみ出力
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  error: (...args: unknown[]) => {
    // エラーは本番環境でも出力（ただし詳細度を調整可能）
    console.error(...args);
  },
  
  warn: (...args: unknown[]) => {
    // 警告は本番環境でも出力
    console.warn(...args);
  },
  
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

