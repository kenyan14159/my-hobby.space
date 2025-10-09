# 🚀 FTP自動デプロイ - クイックスタート

## 📋 今すぐやること（5分で完了）

### Step 1: GitHub Secretsを設定

1. **GitHubにアクセス**
   - https://github.com/kenyan14159/nssu-ekiden/settings/secrets/actions

2. **「New repository secret」を3回クリックして以下を登録**

   | Name | Value |
   |------|-------|
   | `FTP_SERVER` | `sv16346.xserver.jp` |
   | `FTP_USERNAME` | `nittaiekiden` |
   | `FTP_PASSWORD` | `z3cvk4gi` |

3. **完了！**

---

### Step 2: 動作確認

```bash
# 何か変更を加える
echo "# FTP deploy test" >> README.md

# プッシュ
git add .
git commit -m "test: FTP自動デプロイのテスト"
git push origin main
```

4. **結果を確認**
   - https://github.com/kenyan14159/nssu-ekiden/actions
   - 緑のチェックマーク ✅ が表示されればOK！

---

## 📱 これだけ覚えておけばOK

### ✅ 自動デプロイされるタイミング
- `main` ブランチに `git push` したとき
- GitHub上で手動実行したとき

### 📁 アップロード先
```
エックスサーバー
  └── /nittaiekiden.xsrv.jp/public_html/
      ├── index.html
      ├── _next/
      └── ... (ビルド後のファイル)
```

### ⏱️ デプロイにかかる時間
- 約3〜5分（ビルド時間を含む）

---

## 🆘 困ったときは

### デプロイが失敗する
1. GitHub Actionsのログを確認
   - https://github.com/kenyan14159/nssu-ekiden/actions
2. エラーメッセージをコピー
3. `docs/DEPLOY_SETUP.md` のトラブルシューティングを参照

### パスワードを間違えた
1. https://github.com/kenyan14159/nssu-ekiden/settings/secrets/actions
2. `FTP_PASSWORD` を削除
3. 再度正しい値で登録

---

## 📚 詳しい設定方法は

👉 **[docs/DEPLOY_SETUP.md](./DEPLOY_SETUP.md)** を参照してください

---

**以上！簡単ですね 🎉**
