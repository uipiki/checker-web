#!/usr/bin/env python3
import csv
from datetime import datetime

def parse_number(num_str):
    """数値文字列をパース（カンマを削除）"""
    if not num_str or num_str.strip() == '':
        return None
    return int(num_str.replace(',', ''))

def parse_date(date_str):
    """日付文字列をパース（2025/10/2 -> 2025-10-02）"""
    if not date_str or date_str.strip() == '':
        return None
    parts = date_str.split('/')
    if len(parts) == 3:
        year = int(parts[0])
        month = int(parts[1])
        day = int(parts[2])
        return f"{year}-{month:02d}-{day:02d}"
    return None

def escape_sql(text):
    """SQLインジェクション対策"""
    if not text:
        return ''
    return text.replace("'", "''")

def infer_game_type(name):
    """トーナメント名からゲームタイプを推測"""
    if not name:
        return 'NLH'
    
    name_upper = name.upper()
    if 'PLO' in name_upper:
        return 'PLO'
    elif 'NLH' in name_upper:
        return 'NLH'
    elif 'MIX' in name_upper:
        return 'Mix'
    elif 'DRAW' in name_upper:
        return 'Draw'
    elif 'AOF' in name_upper:
        return 'AoF'
    return 'NLH'  # デフォルト

def main():
    tours_file = '/Users/ui_hiroki/Downloads/tours.csv'
    events_file = '/Users/ui_hiroki/Downloads/events.csv'
    tournaments_file = '/Users/ui_hiroki/Downloads/tournaments.csv'
    
    # Tours読み込み
    tours = []
    with open(tours_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            tours.append({
                'id': int(row['ID']),
                'name': row['name']
            })
    
    # Events読み込み
    events = []
    with open(events_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            events.append({
                'id': int(row['id']),
                'tour_id': int(row['tour_id']),
                'name': row['name'],
                'location': row['location'],
                'start_date': parse_date(row['start_date']),
                'end_date': parse_date(row['end_date'])
            })
    
    # Tournaments読み込み
    tournaments = []
    with open(tournaments_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            prize = parse_number(row['prize'])
            buy_in = parse_number(row['buy_in'])
            
            # 必須項目が揃っている行のみ
            if prize and buy_in:
                game_type = row.get('game_type', '').strip()
                if not game_type:
                    game_type = infer_game_type(row['name'])
                
                tournaments.append({
                    'id': int(row['id']),
                    'event_id': int(row['event_id']),
                    'name': row['name'],
                    'game_type': game_type,
                    'buy_in': buy_in,
                    'prize_pool': prize,
                    'start_date': parse_date(row['start_date']),
                    'end_date': parse_date(row['end_date'])
                })
    
    # SQL生成
    print("-- リアルデータの投入")
    print()
    
    # Tours
    print("-- ツアーの作成")
    print("INSERT INTO tours (name) VALUES")
    for i, tour in enumerate(tours):
        comma = ',' if i < len(tours) - 1 else ''
        name = escape_sql(tour['name'])
        print(f"  ('{name}'){comma}")
    print("ON CONFLICT (name) DO NOTHING;")
    print()
    
    # Events
    print("-- イベントの作成")
    print("INSERT INTO events (tour_id, name, location, start_date, end_date) VALUES")
    for i, event in enumerate(events):
        comma = ',' if i < len(events) - 1 else ';'
        name = escape_sql(event['name'])
        location = escape_sql(event['location'])
        print(f"  ({event['tour_id']}, '{name}', '{location}', '{event['start_date']}', '{event['end_date']}'){comma}")
    print()
    
    # Tournaments
    print("-- トーナメントの作成")
    print("INSERT INTO tournaments (event_id, name, game_type, buy_in, prize_pool, start_date, end_date) VALUES")
    for i, t in enumerate(tournaments):
        comma = ',' if i < len(tournaments) - 1 else ';'
        name = escape_sql(t['name'])
        game_type = escape_sql(t['game_type'])
        print(f"  ({t['event_id']}, '{name}', '{game_type}', {t['buy_in']}, {t['prize_pool']}, '{t['start_date']}', '{t['end_date']}'){comma}")

if __name__ == '__main__':
    main()
