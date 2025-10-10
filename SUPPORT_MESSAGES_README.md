# 応援メッセージシステム

日本体育大学駅伝部の応援メッセージシステムです。データベースにSupabaseを使用し、リアルタイムで応援メッセージを表示します。

## 特徴

### ✨ 主な機能

- **応援メッセージの投稿**: 誰でも簡単にメッセージを送信できます
- **リアルタイム更新**: 新しいメッセージが即座に反映されます
- **統計表示**: 送信者タイプ別・地域別の統計を自動集計
- **レスポンシブデザイン**: スマートフォンからPCまで快適に利用可能
- **アニメーション**: Framer Motionを使用した滑らかなアニメーション

### 🎨 デザイン

- シンプルで洗練されたUI
- グラデーションを活用した魅力的なデザイン
- カテゴリ別の色分け表示
- ホバーエフェクトとトランジション

## セットアップ方法

### 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com/)にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトのURLとanon keyを取得

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下を設定:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. データベーステーブルの作成

Supabaseのダッシュボードで、SQL Editorを開き、以下のSQLを実行:

```sql
-- support_messagesテーブルの作成
CREATE TABLE support_messages (
  id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('在校生', '卒業生', '駅伝部関係者', 'ファン', '家族', 'その他')),
  region TEXT NOT NULL CHECK (region IN ('北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州', '国外')),
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- インデックスの作成
CREATE INDEX idx_support_messages_created_at ON support_messages(created_at DESC);
CREATE INDEX idx_support_messages_approved ON support_messages(is_approved);
CREATE INDEX idx_support_messages_sender_type ON support_messages(sender_type);
CREATE INDEX idx_support_messages_region ON support_messages(region);

-- RLSの有効化
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- ポリシーの作成
CREATE POLICY "Anyone can read approved messages"
ON support_messages FOR SELECT
USING (is_approved = true);

CREATE POLICY "Anyone can insert messages"
ON support_messages FOR INSERT
WITH CHECK (true);
```

詳細なSQLは`supabase/migrations/create_support_messages.sql`を参照してください。

### 4. アプリケーションの起動

```bash
npm install
npm run dev
```

ブラウザで`http://localhost:3000`を開いてください。

## 使い方

### 応援メッセージの送信

1. トップページの「声援を送る」ボタンをクリック
2. メッセージ、送信者タイプ、地域を選択
3. 「声援を送る」ボタンで送信

### 応援メッセージの閲覧

- 「声援を見る」ボタンで一覧にジャンプ
- リアルタイムで新しいメッセージが表示されます
- 送信者タイプと地域で分類された統計も表示

## 技術スタック

- **フロントエンド**: Next.js 14, React, TypeScript
- **スタイリング**: Tailwind CSS, shadcn/ui
- **アニメーション**: Framer Motion
- **バックエンド**: Supabase (PostgreSQL)
- **リアルタイム通信**: Supabase Realtime

## カスタマイズ

### メッセージの承認機能を有効にする

デフォルトでは全てのメッセージが自動承認されます。承認機能を有効にする場合:

1. `components/support-messages.tsx`の以下の行を変更:
   ```typescript
   is_approved: true // → is_approved: false に変更
   ```

2. Supabaseダッシュボードで手動で`is_approved`を`true`に更新

### カテゴリの追加・変更

`components/support-messages.tsx`の以下の定数を編集:

```typescript
const senderTypes = ['在校生', '卒業生', '駅伝部関係者', 'ファン', '家族', 'その他'];
const regions = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州', '国外'];
```

**注意**: データベーステーブルのCHECK制約も同時に更新する必要があります。

### デザインのカスタマイズ

`components/support-messages.tsx`内のTailwind CSSクラスを編集してください。

## トラブルシューティング

### メッセージが表示されない

1. Supabaseの接続を確認
2. ブラウザのコンソールでエラーを確認
3. Supabaseダッシュボードでテーブルとポリシーを確認

### リアルタイム更新が動作しない

1. SupabaseダッシュボードでRealtimeが有効か確認
2. テーブルのReplicationを有効化
3. ブラウザのWebSocket接続を確認

## ライセンス

このプロジェクトは日本体育大学駅伝部のために作成されました。

## サポート

問題が発生した場合は、GitHubのIssuesセクションで報告してください。
