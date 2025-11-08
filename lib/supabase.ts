import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

// 環境変数の確認
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isProduction = process.env.NODE_ENV === 'production';
const hasValidConfig: boolean = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://dummy.supabase.co' && 
  supabaseAnonKey !== 'dummy-key'
);

if (!hasValidConfig) {
  if (isProduction) {
    // 本番環境では警告のみ（ビルド時に検出されるべき）
    logger.warn('⚠️ Supabase環境変数が正しく設定されていません。一部の機能が動作しない可能性があります。');
  } else {
    // 開発環境では詳細なエラーメッセージ
    logger.error('❌ Supabase環境変数が設定されていません');
    logger.error('📝 .env.localファイルに以下を設定してください:');
    logger.error('NEXT_PUBLIC_SUPABASE_URL=https://kgpiheirspgktmfqobkn.supabase.co');
    logger.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
    logger.error('🔗 詳細な手順: SUPABASE_SETUP.md を参照してください');
  }
}

// Supabaseクライアントの作成
// 環境変数がない場合はダミー値を使用（ビルド時のエラーを防ぐため）
// ただし、実際の使用時にはエラーハンドリングが必要
export const supabase = createClient(
  supabaseUrl || 'https://dummy.supabase.co',
  supabaseAnonKey || 'dummy-key'
);

// 環境変数の検証ヘルパー関数
export function isSupabaseConfigured(): boolean {
  return hasValidConfig;
}

// データベース型定義
export interface Post {
  id: number;
  author: string;
  content: string;
  created_at: string;
  reply_to?: number | null;
}

// 応援メッセージ型定義
export interface SupportMessage {
  id: number;
  message: string;
  sender_type: '在校生' | '卒業生' | '駅伝部関係者' | 'ファン' | '家族' | 'その他';
  region: '北海道' | '東北' | '関東' | '中部' | '近畿' | '中国' | '四国' | '九州' | '国外';
  created_at: string;
  is_approved?: boolean;
} 