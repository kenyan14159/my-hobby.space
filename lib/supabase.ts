import { createClient } from '@supabase/supabase-js';

// 環境変数の確認
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase環境変数が設定されていません');
  console.error('📝 .env.localファイルに以下を設定してください:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://kgpiheirspgktmfqobkn.supabase.co');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  console.error('🔗 詳細な手順: SUPABASE_SETUP.md を参照してください');
}

// Supabaseクライアントの作成（環境変数がない場合はダミー値を使用）
export const supabase = createClient(
  supabaseUrl || 'https://dummy.supabase.co',
  supabaseAnonKey || 'dummy-key'
);

// データベース型定義
export interface Post {
  id: number;
  author: string;
  content: string;
  created_at: string;
  reply_to?: number | null;
} 