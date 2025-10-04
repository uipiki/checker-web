# プライズチェッカーNow

日本のポーカートーナメントの還元率を簡単にチェックできるWebアプリケーションです。

## 機能

- 開催中の大会一覧表示
- トーナメント選択
- エントリ数入力
- 還元率の計算・表示
- エントリログの自動記録
- レスポンシブデザイン（PC・スマホ対応）

## 技術スタック

- React 19
- Vite 6
- Supabase（データベース）
- PostgreSQL
- CSS
- Vercel（ホスティング）

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

このプロジェクトはVercelにデプロイされています。

GitHubにpushすると、Vercelが自動的にビルド・デプロイします。

### 手動デプロイ（Vercel CLI）

```bash
npm i -g vercel
vercel
```

## プロジェクト構成

```
checker-web/
├── src/
│   ├── components/      # UIコンポーネント
│   │   ├── TournamentSelector.jsx
│   │   ├── EntryInput.jsx
│   │   └── PayoutDisplay.jsx
│   ├── data/
│   │   └── mockData.js  # モックデータ（将来的にAPI接続予定）
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## 今後の拡張予定

- **バックエンドAPI実装**
  - Vercel Serverless Functionsを使用
  - `/api`ディレクトリにAPIエンドポイントを追加予定
- **データベース接続**
  - トーナメント情報の永続化
  - 動的なデータ管理
- **機能追加**
  - トーナメント情報の追加・編集機能
  - 履歴機能
  - データのエクスポート

## 注意事項

還元率はプレーヤーズガイドを参考に計算されているため、プライズアップは考慮していません。

## ライセンス

ISC
