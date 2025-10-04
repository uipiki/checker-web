-- entry_logsテーブルに書き込みポリシーを追加

-- 全員がINSERTできるポリシー
CREATE POLICY "Enable insert access for all users" ON entry_logs
  FOR INSERT WITH CHECK (true);

-- 他のテーブルにも書き込みポリシーを追加（将来的に必要になる場合）
CREATE POLICY "Enable insert access for all users" ON tours
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert access for all users" ON events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert access for all users" ON tournaments
  FOR INSERT WITH CHECK (true);
