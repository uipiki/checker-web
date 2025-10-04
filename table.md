### テーブル名: tours

**概要:** ツアー（ブランド/シリーズ）を管理するテーブル

| カラム名   | データ型       | 制約           | デフォルト値 | 説明              |
|------------|----------------|----------------|--------------|-------------------|
| id         | BIGINT         | PK, NOT NULL   | AUTO_INCREMENT | ツアーID         |
| name       | VARCHAR(255)   | NOT NULL, UNIQUE |              | ツアー名 (例: JOPT, 戦国) |
| created_at | TIMESTAMP      | NOT NULL       | CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP      | NOT NULL       | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

### テーブル名: events

**概要:** 各ツアーに紐づく大会開催情報（都市・回次）

| カラム名   | データ型       | 制約                       | デフォルト値 | 説明                          |
|------------|----------------|----------------------------|--------------|-------------------------------|
| id         | BIGINT         | PK, NOT NULL               | AUTO_INCREMENT | 大会開催ID                  |
| tour_id    | BIGINT         | FK → tours.id, NOT NULL    |              | 紐づくツアーID               |
| name       | VARCHAR(255)   | NOT NULL                   |              | 大会名 (例: JOPT Tokyo #3)   |
| location   | VARCHAR(255)   |                            |              | 開催都市 (例: Tokyo, Osaka)  |
| start_date | DATE           |                            |              | 開催開始日                   |
| end_date   | DATE           |                            |              | 開催終了日                   |
| created_at | TIMESTAMP      | NOT NULL                   | CURRENT_TIMESTAMP | 作成日時                 |
| updated_at | TIMESTAMP      | NOT NULL                   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

### テーブル名: tournaments

**概要:** 大会開催内のトーナメント（種目や個別競技）

| カラム名   | データ型       | 制約                       | デフォルト値 | 説明                      |
|------------|----------------|----------------------------|--------------|---------------------------|
| id         | BIGINT         | PK, NOT NULL               | AUTO_INCREMENT | トーナメントID           |
| event_id   | BIGINT         | FK → events.id, NOT NULL   |              | 紐づく大会開催ID          |
| name       | VARCHAR(255)   | NOT NULL                   |              | トーナメント名 (例: MegaStack, Main Event) |
| game_type  | VARCHAR(50)    |                            |              | 種別 (例: NLH, PLO, Mix, Short Deck) |
| buy_in     | INT            |                            |              | バイイン額 (円)           |
| prize_pool | INT            |                            |              | プライズプール合計 (円)   |
| fix_prize  | INT            |                            |              | プライズプール合計 (円)   |
| start_time | DATETIME       |                            |              | 開始日時                  |
| created_at | TIMESTAMP      | NOT NULL                   | CURRENT_TIMESTAMP | 作成日時               |
| updated_at | TIMESTAMP      | NOT NULL                   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

### テーブル名: entry_logs

**概要:** トーナメントのエントリー人数をチェックした履歴を管理するテーブル

| カラム名       | データ型     | 制約                       | 説明                                |
|----------------|--------------|----------------------------|-------------------------------------|
| id             | BIGINT       | PK, NOT NULL, AUTO_INCREMENT | ログID                             |
| tournament_id  | BIGINT       | FK → tournaments.id, NOT NULL | 対象トーナメント                  |
| entry_count    | INT          | NOT NULL                   | チェック時点のエントリー人数        |
| checked_at     | TIMESTAMP    | NOT NULL DEFAULT CURRENT_TIMESTAMP | チェックした日時             |
