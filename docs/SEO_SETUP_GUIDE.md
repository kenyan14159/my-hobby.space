# SEO基盤整備 完了報告 & 登録手順ガイド

## ✅ 実装完了項目

### 1. サイトマップの強化 ✅
**ファイル:** `app/sitemap.ts`

**実装内容:**
- 全ページ（83ページ）を網羅したサイトマップを生成
- 優先度（priority）と更新頻度（changeFrequency）を適切に設定
- ニュース記事16件、試合結果記事21件を含む
- 統合記録ページ（男子・女子）を追加
- 限定コンテンツは除外（robots.txtでDisallow設定）

**優先度設定:**
- トップページ: 1.0 (daily更新)
- 駅伝情報: 0.9 (weekly更新)
- 記録ページ: 0.9 (monthly更新)
- メンバー: 0.8 (monthly更新)
- ニュース記事: 0.7 (monthly更新)

**確認方法:**
```bash
# ビルド後にサイトマップを確認
npm run build
# out/sitemap.xml が生成されます
```

---

### 2. robots.txt最適化 ✅
**ファイル:** `public/robots.txt`

**実装内容:**
```txt
User-agent: *
Allow: /

# クロールを除外するディレクトリ
Disallow: /api/
Disallow: /limited-content/

# サイトマップの場所
Sitemap: https://nssu-ekiden.com/sitemap.xml

# クロール頻度の調整（推奨値）
Crawl-delay: 1
```

**効果:**
- 限定コンテンツを検索エンジンから保護
- サイトマップの場所を明示
- サーバー負荷を軽減（Crawl-delay設定）

---

### 3. 画像最適化設定 ⚠️
**ファイル:** `next.config.js`

**実装内容:**
- 画像フォーマット設定（AVIF、WebP）
- デバイスサイズ設定を最適化
- リモートパターン設定（nssu-ekiden.com、ekiden-results.com）

**⚠️ 重要な制限:**
静的エクスポート（`output: 'export'`）モードでは、Next.jsの画像最適化機能は**動作しません**。
現在は `unoptimized: true` のまま維持しています。

**画像最適化を有効にする方法:**
1. **Vercel にデプロイ**（推奨）
   - 自動で画像最適化が有効になります
   - CDN配信で高速化
   
2. **別のホスティングサービス利用**
   - Netlify、Cloudflare Pages など
   - 独自の画像最適化機能を提供

3. **手動で画像を最適化**
   - 画像を事前にWebP/AVIF形式に変換
   - TinyPNG、Squoosh などのツールを使用

---

### 4. メタデータ最適化 ✅
**実装済みファイル:**
- `app/layout.tsx` - トップページ
- `app/members/layout.tsx` - メンバーページ
- `app/records/layout.tsx` - 記録ページ
- `app/ekiden/layout.tsx` - 駅伝情報ページ
- `app/topics/layout.tsx` - トピックスページ
- `app/topics/news/[year]/[slug]/layout.tsx` - ニュース記事ページ

**最適化内容:**
1. **トップページ:**
   ```typescript
   title: '日本体育大学駅伝部公式 | 箱根駅伝2026出場を目指す'
   description: '日体大駅伝部の最新ニュース、選手情報、試合結果を配信...'
   keywords: ['日体大駅伝', '箱根駅伝', '日体大 駅伝 メンバー', ...]
   ```

2. **キーワード戦略:**
   - メインキーワード: 箱根駅伝 日体大（月間検索12,000）
   - サブキーワード: 日体大 駅伝 メンバー（月間4,800）
   - ロングテール: 各選手名、記録、試合結果

3. **OGP・Twitterカード:**
   - 全ページに設定済み
   - 画像サイズ: 1200×630px
   - カードタイプ: summary_large_image

---

### 5. 構造化データの追加 ✅
**実装箇所:**

1. **SportsTeam（トップページ）:**
   ```json
   {
     "@type": "SportsTeam",
     "name": "日本体育大学陸上競技部男子駅伝ブロック",
     "sport": "駅伝・陸上競技",
     "memberOf": {
       "@type": "EducationalOrganization",
       "name": "日本体育大学"
     }
   }
   ```

2. **NewsArticle（ニュース記事ページ）:**
   ```json
   {
     "@type": "NewsArticle",
     "headline": "記事タイトル",
     "author": {
       "@type": "Organization",
       "name": "日本体育大学陸上競技部男子駅伝ブロック"
     },
     "publisher": {
       "@type": "Organization",
       "name": "日本体育大学駅伝部"
     }
   }
   ```

**検証方法:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

### 6. Core Web Vitals測定ツール導入 ✅
**インストール済みパッケージ:**
- `@vercel/analytics` - アクセス解析
- `@vercel/speed-insights` - パフォーマンス測定

**実装箇所:** `app/layout.tsx`
```tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// body タグ内に追加
<Analytics />
<SpeedInsights />
```

**測定される指標:**
- **LCP** (Largest Contentful Paint) - 最大コンテンツの表示時間
- **FID** (First Input Delay) - 初回入力遅延
- **CLS** (Cumulative Layout Shift) - レイアウトのずれ
- **INP** (Interaction to Next Paint) - 応答性

**確認方法:**
- Vercelダッシュボード（デプロイ後）
- Chrome DevTools > Lighthouse

---

## 📋 登録手順ガイド

### Google Search Console 登録

**手順:**

1. **Google Search Console にアクセス**
   - URL: https://search.google.com/search-console

2. **プロパティを追加**
   - 「プロパティを追加」をクリック
   - 「URLプレフィックス」を選択
   - `https://nssu-ekiden.com` を入力

3. **所有権の確認（推奨方法: HTMLタグ）**
   
   Google が提供する以下のようなメタタグをコピー:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXX" />
   ```

   **実装方法:**
   
   a. 環境変数に追加:
   ```bash
   # .env.local ファイルに追加
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=XXXXXXXXXXXX
   ```

   b. `app/layout.tsx` に既に設定済み:
   ```tsx
   verification: {
     google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
   }
   ```

4. **サイトマップを送信**
   - 左メニュー「サイトマップ」をクリック
   - `https://nssu-ekiden.com/sitemap.xml` を入力
   - 「送信」をクリック

5. **インデックス登録をリクエスト**
   - 「URL検査」で主要ページをテスト
   - 「インデックス登録をリクエスト」をクリック

**完了指標:**
- ✅ サイトマップが「成功」ステータス
- ✅ 主要ページがインデックス登録
- ✅ 構造化データエラー 0件

---

### Google Analytics 4 設定

**手順:**

1. **Google Analytics にアクセス**
   - URL: https://analytics.google.com

2. **プロパティを作成**
   - 「管理」→「プロパティを作成」
   - プロパティ名: `日本体育大学駅伝部`
   - タイムゾーン: `日本`
   - 通貨: `日本円（JPY）`

3. **データストリームを設定**
   - 「ウェブ」を選択
   - URL: `https://nssu-ekiden.com`
   - ストリーム名: `公式サイト`

4. **測定IDを取得**
   - `G-XXXXXXXXXX` の形式でIDが発行されます

5. **サイトに実装**

   **方法1: Google Tag Manager経由（推奨）**
   ```tsx
   // app/layout.tsx の <head> 内に追加
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXXXXX');
     `}
   </Script>
   ```

   **方法2: 環境変数で管理**
   ```bash
   # .env.local
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

   ```tsx
   // app/layout.tsx
   const gaId = process.env.NEXT_PUBLIC_GA_ID;
   {gaId && (
     <>
       <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
       <Script id="google-analytics">
         {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${gaId}');
         `}
       </Script>
     </>
   )}
   ```

6. **イベントトラッキング設定（オプション）**
   - ページビュー（自動）
   - スクロール深度
   - ダウンロード
   - 外部リンククリック

---

### Bing Webmaster Tools 登録

**手順:**

1. **Bing Webmaster Tools にアクセス**
   - URL: https://www.bing.com/webmasters

2. **サイトを追加**
   - 「サイトを追加」をクリック
   - `https://nssu-ekiden.com` を入力

3. **所有権の確認**
   
   **方法1: Google Search Console からインポート（最も簡単）**
   - 「Google Search Console からインポート」を選択
   - Googleアカウントで認証

   **方法2: HTMLメタタグ**
   ```html
   <meta name="msvalidate.01" content="XXXXXXXXXXXX" />
   ```
   
   `app/layout.tsx` の metadata に追加:
   ```tsx
   verification: {
     google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
     other: {
       'msvalidate.01': 'XXXXXXXXXXXX',
     },
   }
   ```

4. **サイトマップを送信**
   - 「サイトマップ」→「サイトマップを送信」
   - `https://nssu-ekiden.com/sitemap.xml` を入力

---

## 🔍 検証・テストチェックリスト

### 1. サイトマップ検証
```bash
# ビルド実行
npm run build

# sitemap.xml を確認
cat out/sitemap.xml

# オンライン検証ツール
# https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

**確認ポイント:**
- [ ] 全ページが含まれている（83ページ）
- [ ] URLが正しい（https://nssu-ekiden.com/...）
- [ ] lastModified が設定されている
- [ ] priority が適切（0.5-1.0）

---

### 2. robots.txt 検証
```bash
# ファイル確認
cat public/robots.txt

# Google Search Console でテスト
# 設定 > robots.txt テスター
```

**確認ポイント:**
- [ ] Sitemap の URL が正しい
- [ ] /limited-content/ が Disallow
- [ ] /api/ が Disallow

---

### 3. メタデータ検証

**ツール:**
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**確認ポイント:**
- [ ] OGP画像が正しく表示される
- [ ] タイトルが適切（60文字以内）
- [ ] descriptionが適切（160文字以内）
- [ ] canonical URL が設定されている

---

### 4. 構造化データ検証

**ツール:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

**テスト対象URL:**
```
https://nssu-ekiden.com/
https://nssu-ekiden.com/topics/news/2025/10-18-all-japan-entry/
https://nssu-ekiden.com/members/
```

**確認ポイント:**
- [ ] エラー: 0件
- [ ] 警告: 可能な限り0件
- [ ] SportsTeam が認識される
- [ ] NewsArticle が認識される

---

### 5. Core Web Vitals 測定

**ツール:**
- Chrome DevTools > Lighthouse
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

**測定対象:**
```bash
# ローカルでテスト
npm run build
npm run start

# Lighthouse実行
npx lighthouse http://localhost:3000 --view
```

**目標値:**
- ✅ Performance: 90+
- ✅ Accessibility: 90+
- ✅ Best Practices: 90+
- ✅ SEO: 90+

**Core Web Vitals目標:**
- ✅ LCP (Largest Contentful Paint): < 2.5秒
- ✅ FID (First Input Delay): < 100ms
- ✅ CLS (Cumulative Layout Shift): < 0.1

---

### 6. モバイルフレンドリーテスト

**ツール:**
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

**確認ポイント:**
- [ ] テキストが小さすぎない（16px以上）
- [ ] タップ要素が適切な間隔（48px以上）
- [ ] ビューポートが設定されている
- [ ] フォントサイズが自動調整される

---

## 📊 期待される効果

### 短期（1-2週間）
- Google Search Console にインデックス登録
- サイトマップが認識される
- 構造化データが検証される

### 中期（1-3ヶ月）
- 検索順位の向上
  - 「日体大 駅伝」: 10位以内
  - 「箱根駅伝 日体大」: 20位以内
- オーガニック流入: 月間5,000→15,000 PV

### 長期（3-6ヶ月）
- 検索順位の安定
  - メインキーワードで5位以内
  - ロングテールで多数の10位以内
- オーガニック流入: 月間50,000 PV達成

---

## 🚀 次のステップ（推奨）

### Phase 2: コンテンツ強化
1. **優先記事の作成**
   - 「箱根駅伝2026 日体大の注目選手とチーム展望」（3,000字）
   - 「日体大駅伝部メンバー完全ガイド2025」（5,000字）
   - 「箱根駅伝予選会 突破のカギ」（2,500字）

2. **内部リンク強化**
   - ピラー/クラスター構造の構築
   - 関連記事ウィジェットの追加
   - パンくずリストの最適化

3. **画像最適化**
   - WebP/AVIF形式への変換
   - alt属性の最適化
   - 遅延読み込みの実装

### Phase 3: 被リンク獲得
1. プレスリリース配信（PR TIMES）
2. メディア掲載営業（スポーツナビ、月陸Online）
3. 大学公式サイトへのリンク依頼

---

## 📝 環境変数設定まとめ

**`.env.local` ファイルに追加:**
```bash
# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Bing Webmaster Tools（オプション）
NEXT_PUBLIC_BING_SITE_VERIFICATION=your_bing_code
```

**セキュリティ:**
- `.env.local` は `.gitignore` に含める
- `NEXT_PUBLIC_` プレフィックスは必須（クライアント側で使用）
- 本番環境では環境変数を適切に設定

---

## ✅ 完了報告

### 実装済み項目
- ✅ サイトマップ生成・最適化
- ✅ robots.txt 最適化
- ✅ 画像最適化設定（制限あり）
- ✅ 全主要ページのメタデータ最適化
- ✅ 構造化データの追加（SportsTeam、NewsArticle）
- ✅ Core Web Vitals測定ツール導入

### 要登録項目（ユーザー作業）
- ⏳ Google Search Console 登録
- ⏳ Google Analytics 4 設定
- ⏳ Bing Webmaster Tools 登録

### 推奨事項
- 💡 Vercel へのデプロイ（画像最適化有効化）
- 💡 定期的な記事投稿（週2回）
- 💡 被リンク獲得施策の開始

---

**実装日:** 2025年10月8日  
**次回レビュー:** 2025年11月8日（1ヶ月後）

---

## 🆘 サポート

質問や問題がある場合は、以下を確認してください:

1. [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)
2. [Google Search Central](https://developers.google.com/search)
3. [Vercel Analytics Docs](https://vercel.com/docs/analytics)

---

以上でPhase 1の基盤整備は完了です！
