# ポーカートーナメント還元率チェッカー

日本のポーカートーナメントの還元率を簡単にチェックできるWebアプリケーションです。

## 機能

- 大会選択
- トーナメント選択
- エントリ数入力
- 還元率計算・表示
- 賞金配分の詳細表示

## 開発環境

- React 19
- Vite 6
- CSS Modules

## セットアップ

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

## ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` フォルダに出力されます。

## デプロイ

### Netlify

1. Netlifyアカウントにログイン
2. "Add new site" > "Import an existing project"
3. GitHubリポジトリを接続
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel

1. Vercelアカウントにログイン
2. "Add New" > "Project"
3. GitHubリポジトリを接続
4. 自動的に設定を検出してデプロイ

### GitHub Pages

1. `vite.config.js` の `base` を設定:
   ```js
   base: '/リポジトリ名/'
   ```
2. ビルドしてデプロイ:
   ```bash
   npm run build
   # distフォルダをgh-pagesブランチにプッシュ
   ```

## 今後の拡張予定

- バックエンドAPI連携
- データベース接続
- トーナメント情報の動的管理
- ユーザー認証
- 履歴機能
