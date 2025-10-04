#!/usr/bin/env python3
import csv
import sys
from datetime import datetime

def parse_prize(prize_str):
    """賞金文字列をパース（カンマを削除して数値に変換）"""
    if not prize_str or prize_str.strip() == '':
        return None
    return int(prize_str.replace(',', ''))

def parse_date(date_str):
    """日付文字列をパース（10.3 -> 2025-10-03）"""
    if not date_str or date_str.strip() == '':
        return None
    parts = date_str.split('.')
    if len(parts) == 2:
        month = int(parts[0])
        day = int(parts[1])
        current_year = datetime.now().year
        return f"{current_year}-{month:02d}-{day:02d}"
    return None

def extract_tournament_info(name):
    """トーナメント名から番号とゲームタイプを抽出"""
    # #番号を抽出
    tournament_number = None
    clean_name = name
    if name.startswith('#'):
        parts = name.split(' ', 1)
        tournament_number = parts[0]
        clean_name = parts[1] if len(parts) > 1 else name
    
    # ゲームタイプの推測
    game_type = None
    name_upper = name.upper()
    if 'PLO' in name_upper:
        game_type = 'PLO'
    elif 'NLH' in name_upper:
        game_type = 'NLH'
    elif 'MIX' in name_upper:
        game_type = 'Mix'
    elif 'DRAW' in name_upper:
        game_type = 'Draw'
    elif 'AOF' in name_upper:
        game_type = 'AoF'
    else:
        game_type = 'NLH'  # デフォルト
    
    return tournament_number, clean_name, game_type

def main():
    csv_file = '/Users/ui_hiroki/Downloads/tournaments_with_prize.csv'
    
    # CSVを読み込み
    tournaments = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['name']:  # 名前が空でない行のみ
                tournaments.append(row)
    
    current_year = datetime.now().year
    
    # SQL生成
    print("-- リアルデータの投入 (TST)")
    print()
    
    # Tours
    print("-- ツアーの作成")
    print("INSERT INTO tours (name) VALUES")
    print("  ('TST')")
    print("ON CONFLICT (name) DO NOTHING;")
    print()
    
    # Events
    print("-- イベントの作成")
    print("INSERT INTO events (tour_id, name, location, start_date, end_date) VALUES")
    print(f"  (1, 'Tokyo Super Tournament', 'Tokyo', '{current_year}-10-02', '{current_year}-10-05');")
    print()
    
    # Tournaments
    print("-- トーナメントの作成")
    print("INSERT INTO tournaments (event_id, name, game_type, buy_in, prize_pool, start_time) VALUES")
    
    valid_tournaments = []
    for t in tournaments:
        prize = parse_prize(t['prize'])
        fee = parse_prize(t['fee'])
        date = parse_date(t['date'])
        
        # fee（バイイン）がある行のみ処理
        if fee and prize:
            number, name, game_type = extract_tournament_info(t['name'])
            
            # start_timeを生成（dateがあれば使用、なければNULL）
            if date:
                start_time = f"'{date} 14:00:00'"
            else:
                start_time = 'NULL'
            
            # SQLインジェクション対策：シングルクォートをエスケープ
            name_escaped = name.replace("'", "''")
            
            valid_tournaments.append({
                'name': name_escaped,
                'game_type': game_type,
                'buy_in': fee,
                'prize_pool': prize,
                'start_time': start_time
            })
    
    # SQL出力
    for i, t in enumerate(valid_tournaments):
        comma = ',' if i < len(valid_tournaments) - 1 else ';'
        print(f"  (1, '{t['name']}', '{t['game_type']}', {t['buy_in']}, {t['prize_pool']}, {t['start_time']}){comma}")

if __name__ == '__main__':
    main()
