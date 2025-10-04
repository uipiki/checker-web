-- サンプルデータの投入

-- ツアーの作成
INSERT INTO tours (name) VALUES
  ('JOPT'),
  ('戦国ポーカーツアー'),
  ('WPT Japan')
ON CONFLICT (name) DO NOTHING;

-- イベントの作成（開催中の大会を含む）
INSERT INTO events (tour_id, name, location, start_date, end_date) VALUES
  -- 開催中の大会
  (1, 'JOPT Tokyo #3', 'Tokyo', '2024-10-01', '2024-10-10'),
  (2, '戦国ポーカー 第5戦', 'Nagoya', '2024-09-28', '2024-10-06'),
  (3, 'WPT Japan 2024', 'Tokyo', '2024-10-03', '2024-10-08'),
  
  -- 終了した大会（表示されない）
  (1, 'JOPT Osaka #2', 'Osaka', '2024-09-15', '2024-09-20'),
  
  -- 未来の大会（表示されない）
  (1, 'JOPT Fukuoka #1', 'Fukuoka', '2024-11-01', '2024-11-10');

-- トーナメントの作成
INSERT INTO tournaments (event_id, name, game_type, buy_in, prize_pool, fix_prize, start_time) VALUES
  -- JOPT Tokyo #3（開催中）
  (1, 'Main Event', 'NLH', 30000, 27000, NULL, '2024-10-05 14:00:00'),
  (1, 'MegaStack', 'NLH', 15000, 13500, NULL, '2024-10-03 12:00:00'),
  (1, 'PLO Event', 'PLO', 20000, 18000, NULL, '2024-10-04 15:00:00'),
  
  -- 戦国ポーカー 第5戦（開催中）
  (2, 'メインイベント', 'NLH', 50000, 45000, NULL, '2024-10-02 13:00:00'),
  (2, 'サイドイベント', 'NLH', 15000, 13500, NULL, '2024-10-01 15:00:00'),
  
  -- WPT Japan 2024（開催中）
  (3, 'WPT Main Event', 'NLH', 100000, 90000, NULL, '2024-10-05 12:00:00'),
  (3, 'High Roller', 'NLH', 200000, 180000, NULL, '2024-10-06 14:00:00'),
  (3, 'Turbo Championship', 'NLH', 50000, 45000, NULL, '2024-10-04 18:00:00'),
  
  -- JOPT Osaka #2（終了）
  (4, 'Main Event', 'NLH', 25000, 22500, NULL, '2024-09-17 14:00:00'),
  
  -- JOPT Fukuoka #1（未来）
  (5, 'Main Event', 'NLH', 35000, 31500, NULL, '2024-11-05 14:00:00');
