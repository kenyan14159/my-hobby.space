# 🚀 FTP自動デプロイ設定ガイド

## 概要
このドキュメントでは、GitHubにコードをpushすると自動的にエックスサーバーへFTPデプロイされる仕組みの設定方法を説明します。

---

## ✅ 前提条件

- GitHubリポジトリ: `kenyan14159/nssu-ekiden`
- エックスサーバーのFTPアカウント情報
- GitHubアカウントの管理者権限

---

## 📝 設定手順

### Step 1: GitHub Secretsの設定

FTP認証情報を安全に保存するため、GitHub Secretsを使用します。

#### 1-1. GitHubリポジトリにアクセス
1. ブラウザで https://github.com/kenyan14159/nssu-ekiden を開く
2. ログインしていない場合はログイン

#### 1-2. Settings（設定）ページを開く
1. リポジトリのトップページで「**Settings**」タブをクリック
2. 左サイドバーから「**Secrets and variables**」を展開
3. 「**Actions**」をクリック

#### 1-3. FTP情報を3つのSecretsとして登録

**Secret 1: FTP_SERVER**
- 「**New repository secret**」ボタンをクリック
- **Name**: `FTP_SERVER`
- **Value**: `sv16346.xserver.jp`
- 「**Add secret**」をクリック

**Secret 2: FTP_USERNAME**
- 「**New repository secret**」ボタンをクリック
- **Name**: `FTP_USERNAME`
- **Value**: `nittaiekiden`
- 「**Add secret**」をクリック

**Secret 3: FTP_PASSWORD**
- 「**New repository secret**」ボタンをクリック
- **Name**: `FTP_PASSWORD`
- **Value**: `z3cvk4gi`
- 「**Add secret**」をクリック

> ⚠️ **重要**: これらのSecretsは一度保存すると、値を確認できなくなります（セキュリティのため）。間違えた場合は削除して再度作成してください。

---

### Step 2: デプロイディレクトリの確認

エックスサーバーのディレクトリ構造を確認します。

#### サーバーディレクトリ（推定）
```
/nittaiekiden.xsrv.jp/
  └── public_html/        ← ここにファイルがアップロードされます
      ├── index.html
      ├── _next/
      ├── images/
      └── ...
```

もし異なる場合は、`.github/workflows/deploy.yml` の以下の行を修正してください：

```yaml
server-dir: /nittaiekiden.xsrv.jp/public_html/
```

**確認方法**:
1. FTPクライアント（FileZilla等）で接続
2. ログイン後のルートディレクトリを確認
3. `public_html` フォルダの正確なパスを特定

---

### Step 3: 動作確認

#### 3-1. 初回デプロイのテスト

1. ローカルで何か小さな変更を行う（例: README.mdに1行追加）
   ```bash
   echo "# Test deployment" >> README.md
   ```

2. 変更をコミット & プッシュ
   ```bash
   git add .
   git commit -m "test: FTP自動デプロイのテスト"
   git push origin main
   ```

3. GitHub Actionsの確認
   - https://github.com/kenyan14159/nssu-ekiden/actions を開く
   - 最新のワークフロー実行を確認
   - 緑のチェックマーク ✅ が表示されれば成功

#### 3-2. デプロイ状況の確認

**GitHub Actionsのログを見る**:
1. Actionsタブ → 最新のワークフロー実行をクリック
2. 「build-and-deploy」ジョブをクリック
3. 各ステップの詳細ログを確認
   - 📥 Checkout code
   - 🔧 Setup Node.js
   - 📦 Install dependencies
   - 🏗️ Build Next.js project
   - 📤 Deploy to Xserver via FTP
   - ✅ Deployment Success

**実際のサイトで確認**:
- https://nssu-ekiden.works にアクセス
- ブラウザのキャッシュをクリア（Cmd+Shift+R または Ctrl+Shift+R）
- 変更が反映されているか確認

---

## 🔧 トラブルシューティング

### ❌ エラー 1: FTP接続エラー
```
Error: Failed to connect to FTP server
```

**原因**:
- FTP_SERVER が間違っている
- ファイアウォールでブロックされている

**解決方法**:
1. FTP_SERVER の値を確認（`sv16346.xserver.jp`）
2. エックスサーバーのサーバーパネルで「FTPアカウント設定」を確認
3. FTPサーバー名が異なる場合は、GitHub Secretsを更新

---

### ❌ エラー 2: 認証エラー
```
Error: 530 Login authentication failed
```

**原因**:
- FTP_USERNAME または FTP_PASSWORD が間違っている

**解決方法**:
1. エックスサーバーのサーバーパネルにログイン
2. 「FTPアカウント設定」で認証情報を確認
3. GitHub Secretsの値を修正

---

### ❌ エラー 3: ディレクトリが見つからない
```
Error: Directory not found: /nittaiekiden.xsrv.jp/public_html/
```

**原因**:
- server-dir のパスが間違っている

**解決方法**:
1. FTPクライアントで実際のディレクトリ構造を確認
2. `.github/workflows/deploy.yml` の `server-dir` を修正
   ```yaml
   server-dir: /正しいパス/public_html/
   ```
3. よくあるパターン:
   - `/public_html/`
   - `/ドメイン名.xsrv.jp/public_html/`
   - `/home/ユーザー名/public_html/`

---

### ❌ エラー 4: ビルドエラー
```
Error: Build failed
```

**原因**:
- TypeScriptのコンパイルエラー
- 依存パッケージの問題

**解決方法**:
1. ローカルで `npm run build` を実行して確認
2. エラーを修正してから再度プッシュ

---

## 📊 デプロイフロー

```
┌─────────────────┐
│  コード変更      │
│  (ローカル)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  git push       │
│  origin main    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  GitHub Actions 起動         │
│  (.github/workflows/deploy.yml) │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────┐
│  1. Checkout    │ ← コードをダウンロード
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. Setup Node  │ ← Node.js環境を準備
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. Install     │ ← npm ci（依存関係）
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  4. Build       │ ← npm run build（静的サイト生成）
│  出力: ./out/   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  5. FTP Deploy  │ ← out/ をサーバーへアップロード
│  sv16346.xserver.jp │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ✅ デプロイ完了 │
│  https://nssu-ekiden.works │
└─────────────────┘
```

---

## ⚙️ 詳細設定

### デプロイをスキップしたい場合

コミットメッセージに `[skip ci]` を含めるとデプロイをスキップできます：

```bash
git commit -m "docs: ドキュメント更新 [skip ci]"
```

---

### 手動デプロイの実行

GitHub Actionsは手動実行にも対応しています：

1. https://github.com/kenyan14159/nssu-ekiden/actions を開く
2. 左サイドバーから「**Deploy to Xserver via FTP**」を選択
3. 「**Run workflow**」ボタンをクリック
4. ブランチを選択（通常は `main`）
5. 「**Run workflow**」を確認

---

### デプロイ対象ファイルの除外

特定のファイルをデプロイから除外したい場合、`.github/workflows/deploy.yml` の `exclude` セクションを編集：

```yaml
exclude: |
  **/.git*
  **/.git*/**
  **/node_modules/**
  **/.next/**
  **/.env*
  **/.DS_Store
  **/Thumbs.db
  **/test/**           ← 追加例
  **/*.test.ts         ← 追加例
```

---

## 🔒 セキュリティのベストプラクティス

### ✅ 推奨事項
1. **絶対にコードに認証情報を直接書かない**
   - GitHub Secretsを必ず使用
2. **FTPパスワードを定期的に変更**
   - 3〜6ヶ月ごとに更新を推奨
3. **アクセスログを定期的に確認**
   - エックスサーバーの管理画面で不審なアクセスをチェック

### ❌ 避けるべき行為
1. FTP情報をコミットに含める
2. パブリックリポジトリでSecretsを使わずにデプロイ
3. FTPパスワードをチャットやメールで送信

---

## 📞 サポート

### エックスサーバーのサポート
- サポートサイト: https://www.xserver.ne.jp/support/
- 電話: 06-6147-2580（平日10:00〜18:00）

### GitHub Actionsのドキュメント
- https://docs.github.com/ja/actions

### SamKirkland/FTP-Deploy-Action
- https://github.com/SamKirkland/FTP-Deploy-Action

---

## 📝 更新履歴

| 日付 | 内容 |
|------|------|
| 2025-10-09 | 初版作成 - Xserver FTP自動デプロイ設定 |

---

## ✨ 完了チェックリスト

設定が完了したら、以下を確認してください：

- [ ] GitHub Secretsに3つの値を登録済み（FTP_SERVER, FTP_USERNAME, FTP_PASSWORD）
- [ ] テストコミット＆プッシュが成功
- [ ] GitHub Actionsで緑のチェックマーク ✅ を確認
- [ ] 実際のサイト（https://nssu-ekiden.works）で変更を確認
- [ ] この設定ガイドを保存・共有

---

**🎉 設定完了！これで自動デプロイが有効になりました！**
