-- サンプルデータの投入

-- ツアーの作成
INSERT INTO tours (name) VALUES
  ('JOPT'),
  ('戦国ポーカーツアー'),
  ('WPT Japan')
ON CONFLICT (name) DO NOTHING;

-- イベントの作成（開催中の大会を含む）
-- 今日を基準に±数日で設定
INSERT INTO events (tour_id, name, location, start_date, end_date) VALUES
  -- 開催中の大会（今日を含む期間）
  (1, 'JOPT Tokyo #3', 'Tokyo', CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE + INTERVAL '7 days'),
  (2, '戦国ポーカー 第5戦', 'Nagoya', CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE + INTERVAL '5 days'),
  (3, 'WPT Japan 2024', 'Tokyo', CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE + INTERVAL '4 days'),
  
  -- 終了した大会（表示されない）
  (1, 'JOPT Osaka #2', 'Osaka', CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '15 days'),
  
  -- 未来の大会（表示されない）
  (1, 'JOPT Fukuoka #1', 'Fukuoka', CURRENT_DATE + INTERVAL '30 days', CURRENT_DATE + INTERVAL '40 days');

-- トーナメントの作成
INSERT INTO tournaments (event_id, name, game_type, buy_in, prize_pool, fix_prize, start_time) VALUES
  -- JOPT Tokyo #3（開催中）
  (1, 'Main Event', 'NLH', 30000, 27000, NULL, CURRENT_TIMESTAMP + INTERVAL '1 day'),
  (1, 'MegaStack', 'NLH', 15000, 13500, NULL, CURRENT_TIMESTAMP - INTERVAL '1 day'),
  (1, 'PLO Event', 'PLO', 20000, 18000, NULL, CURRENT_TIMESTAMP + INTERVAL '12 hours'),
  
  -- 戦国ポーカー 第5戦（開催中）
  (2, 'メインイベント', 'NLH', 50000, 45000, NULL, CURRENT_TIMESTAMP + INTERVAL '2 days'),
  (2, 'サイドイベント', 'NLH', 15000, 13500, NULL, CURRENT_TIMESTAMP - INTERVAL '12 hours'),
  
  -- WPT Japan 2024（開催中）
  (3, 'WPT Main Event', 'NLH', 100000, 90000, NULL, CURRENT_TIMESTAMP + INTERVAL '1 day'),
  (3, 'High Roller', 'NLH', 200000, 180000, NULL, CURRENT_TIMESTAMP + INTERVAL '2 days'),
  (3, 'Turbo Championship', 'NLH', 50000, 45000, NULL, CURRENT_TIMESTAMP + INTERVAL '6 hours'),
  
  -- JOPT Osaka #2（終了）
  (4, 'Main Event', 'NLH', 25000, 22500, NULL, CURRENT_TIMESTAMP - INTERVAL '17 days'),
  
  -- JOPT Fukuoka #1（未来）
  (5, 'Main Event', 'NLH', 35000, 31500, NULL, CURRENT_TIMESTAMP + INTERVAL '35 days');
