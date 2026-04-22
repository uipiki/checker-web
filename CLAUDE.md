# checker-web

Vercel でホスティングされる静的サイト。

## 重要: /ujpi 以下のファイルについて

`public/ujpi/` 以下のファイルは **poker-poy リポジトリ** (GitHub: uipiki/poker-poy) の `script/ujpi.py html` コマンドで自動生成・デプロイされる。

- **このリポジトリ内で `public/ujpi/` 以下のファイルを直接編集してはならない**
- **`public/ujpi/` のファイルを加工・生成するスクリプトもこのリポジトリ内に作成してはならない**
- 次回の `ujpi.py html` 実行時に上書きされるため、手動編集は全て失われる

`/ujpi` 以下のファイルに変更が必要な場合は、poker-poy リポジトリの `script/ujpi.py` を修正して対応すること。作業者が `/ujpi` 以下を触ろうとしている場合は「poker-poy リポジトリで行うべき作業ではないか」を必ず確認すること。
