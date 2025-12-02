# 日本体育大学駅伝部 公式ウェブサイト

日本体育大学陸上競技部男子駅伝ブロックの公式ウェブサイトです。

## 🌐 サイトURL

**本番環境**: https://my-hobby.space

> 🎯 Cloudflare Pagesによる自動デプロイを実装済み！mainブランチへのpush時に自動的にデプロイされます。

---

## 🚀 技術スタック

- **フレームワーク**: Next.js 15 (Static HTML Export)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **UIコンポーネント**: Radix UI
- **データベース**: Supabase
- **ホスティング**: Cloudflare Pages
- **バージョン管理**: GitHub

---

## 📦 開発環境のセットアップ

### 必要な環境
- Node.js 20.x 以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/kenyan14159/my-hobby.space.git
cd my-hobby.space

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

---

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド（静的サイト生成）
npm run build

# ビルド結果のプレビュー
npm run start

# TypeScriptの型チェック
npm run typecheck

# リンター実行
npm run lint

# Cloudflare Pagesにデプロイ
npm run deploy:cloudflare
```

---

## 📤 デプロイ

### 自動デプロイ（推奨）

**mainブランチにpushすると自動でCloudflare Pagesにデプロイされます。**

```bash
git add .
git commit -m "feat: 新機能を追加"
git push origin main
```

Cloudflare PagesはGitHubと直接統合されており、pushするたびに自動的にビルド・デプロイが実行されます。

デプロイ状況は [Cloudflare Dashboard](https://dash.cloudflare.com/) で確認できます。

### 手動デプロイ

ローカルからCloudflare Pagesにデプロイする場合：

```bash
npm run deploy:cloudflare
```

### デプロイ設定

Cloudflare Pagesのビルド設定：
- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Production branch**: `main`

---

## 📁 ディレクトリ構造

```
my-hobby.space/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # トップページ
│   ├── ekiden/              # 駅伝関連ページ
│   ├── track-and-field/     # 陸上競技ページ
│   ├── members/             # メンバー紹介
│   ├── topics/              # トピックス・ニュース
│   ├── board/               # 掲示板
│   ├── messages/            # サポーターメッセージ
│   └── ...
├── components/              # Reactコンポーネント
│   ├── ui/                  # 汎用UIコンポーネント
│   ├── navigation.tsx       # ナビゲーション
│   ├── bulletin-board/      # 掲示板コンポーネント
│   └── ...
├── data/                    # 静的データ（JSON）
│   ├── ekiden/              # 駅伝データ
│   ├── members/             # メンバーデータ
│   ├── records/             # 記録データ
│   └── albums/              # アルバムデータ
├── lib/                     # ユーティリティ関数
│   ├── supabase.ts          # Supabase設定
│   ├── utils.ts             # 汎用ユーティリティ
│   └── ...
├── public/                  # 静的ファイル
├── out/                     # ビルド出力（静的HTML）
└── scripts/                 # デプロイスクリプト
```

---

## 🔐 環境変数

プロジェクトで使用する環境変数は以下の通りです：

```bash
# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Supabase（データベース）
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Formspree（お問い合わせフォーム）
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id
```

ローカル開発では `.env.local` ファイルに設定してください。

---

## 📊 SEO対策とパフォーマンス

このサイトでは以下のSEO対策とパフォーマンス最適化を実施しています：

### SEO対策
- ✅ メタタグの最適化（OGP, Twitter Card）
- ✅ 構造化データ（JSON-LD）の実装
- ✅ サイトマップ（sitemap.xml）
- ✅ robots.txt
- ✅ 各ページのcanonical URL設定
- ✅ 画像のalt属性最適化
- ✅ モバイルファースト対応

### パフォーマンス最適化
- ✅ 静的HTML生成（Static HTML Export）
- ✅ Cloudflare CDN による高速配信
- ✅ Core Web Vitals の最適化
- ✅ 画像の最適化
- ✅ コード分割とTree Shaking

---

## 🤝 コントリビューション

プルリクエストを歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: 素晴らしい機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

## 📝 コミットメッセージ規約

Conventional Commitsに準拠したコミットメッセージを推奨します：

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル変更（動作に影響なし）
refactor: リファクタリング
perf: パフォーマンス改善
test: テスト追加・修正
chore: ビルドプロセスやツールの変更
```

例:
```bash
git commit -m "feat: 箱根駅伝の記録ページを追加"
git commit -m "fix: メンバー一覧の表示バグを修正"
```

---

## 📞 サポート・お問い合わせ

- **ウェブサイト**: https://my-hobby.space
- **GitHub Issues**: https://github.com/kenyan14159/my-hobby.space/issues

---

## 📄 ライセンス

このプロジェクトは日本体育大学駅伝部の公式ウェブサイトです。  
無断転載・複製を禁じます。

---

## 🎉 謝辞

このサイトは以下のオープンソースプロジェクトを使用しています：

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

**© 2025 日本体育大学駅伝部. All rights reserved.**
