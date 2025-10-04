-- tournamentsテーブルのstart_timeをstart_date, end_dateに変更

-- 既存のstart_timeカラムを削除
ALTER TABLE tournaments DROP COLUMN IF EXISTS start_time;

-- 新しいカラムを追加
ALTER TABLE tournaments ADD COLUMN start_date DATE;
ALTER TABLE tournaments ADD COLUMN end_date DATE;

-- インデックスを追加（パフォーマンス向上）
CREATE INDEX idx_tournaments_start_date ON tournaments(start_date);
CREATE INDEX idx_tournaments_end_date ON tournaments(end_date);
