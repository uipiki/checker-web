#!/usr/bin/env python3
"""
index.html を解析して NLH・Mixed のランキング HTML を生成するスクリプト。
plo_ranking.html をテンプレートとして利用。

Usage:
    python3 scripts/generate_rankings.py
"""
import re
import os

BASE = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', 'public', 'ujpi'))
INPUT_FILE   = os.path.join(BASE, 'index.html')
TEMPLATE_FILE = os.path.join(BASE, 'plo_ranking.html')
OUTPUT_NLH   = os.path.join(BASE, 'nlh_ranking.html')
OUTPUT_MIXED = os.path.join(BASE, 'mixed_ranking.html')


# ── ゲームタイプ判定 ──────────────────────────────────────────
def detect_game_type(ev_name: str) -> str:
    u = ev_name.upper()
    if 'PLO' in u or 'PL BIG-O' in u:
        return 'PLO'
    if 'NLH' in u:
        return 'NLH'
    return 'Mixed'  # 上記以外すべて


# ── 順位表示 ─────────────────────────────────────────────────
def rank_label(n: int) -> str:
    return {1: '1st', 2: '2nd', 3: '3rd'}.get(n, f'{n}th')


# ── X アイコン SVG ────────────────────────────────────────────
X_ICON = (
    '<svg class="x-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
    '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68'
    'l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'
    '</svg>'
)


# ── HTML 読み込み ─────────────────────────────────────────────
with open(INPUT_FILE, encoding='utf-8') as f:
    src = f.read()

with open(TEMPLATE_FILE, encoding='utf-8') as f:
    template = f.read()


# ── プレイヤー名 HTML を抽出（X リンクは保持、個人ページリンクは除去）──
player_name_re = re.compile(
    r'<tr class="player-row" data-rank="(\d+)" onclick="toggle\(\'r\d+\'\)">'
    r'<td class="rank">[^<]+</td>'
    r'<td class="name">(.*?)</td>'
    r'<td class="score">[^<]+</td>'
    r'<td class="count">[^<]+</td></tr>'
)

player_names: dict[str, str] = {}
for m in player_name_re.finditer(src):
    rank = m.group(1)
    name_html = m.group(2)
    # 個人ページへのリンクを除去（ランクが変わるため）
    name_html = re.sub(
        r'<a class="player-link" href="/ujpi/players/[^"]*"[^>]*>(.*?)</a>',
        r'\1', name_html
    )
    player_names[rank] = name_html


# ── 各プレイヤーのイベントを抽出 ────────────────────────────────
detail_re = re.compile(
    r'<tr class="detail-row" data-rank="(\d+)" id="r\d+"><td colspan="4">(.*?)</td></tr>',
    re.DOTALL
)

player_events: dict[str, list] = {}
for m in detail_re.finditer(src):
    rank = m.group(1)
    detail = m.group(2)

    ev_names  = re.findall(r'<div class="ev-name">(.*?)</div>', detail)
    ev_ranks  = re.findall(r'<div class="ev-rank">(.*?)</div>', detail)

    events = []
    for ev_name, ev_rank in zip(ev_names, ev_ranks):
        score_m = re.search(r'\(([0-9.]+)pt\)', ev_rank)
        if score_m:
            events.append({
                'name':       ev_name,
                'rank_text':  ev_rank,
                'score':      float(score_m.group(1)),
                'type':       detect_game_type(ev_name),
            })

    player_events[rank] = events


# ── ゲームタイプ別ランキングを生成 ──────────────────────────────
def build_ranking(target_type: str) -> list:
    result = []
    for rank, events in player_events.items():
        filtered = [e for e in events if e['type'] == target_type]
        if not filtered:
            continue
        result.append({
            'name_html': player_names.get(rank, ''),
            'events':    filtered,
            'total':     round(sum(e['score'] for e in filtered), 4),
            'count':     len(filtered),
        })
    result.sort(key=lambda p: p['total'], reverse=True)
    return result


# ── テーブル行 HTML を生成 ────────────────────────────────────
def build_rows(players: list) -> str:
    total_players = len(players)
    rows = []

    for i, player in enumerate(players):
        rank = i + 1
        name_html   = player['name_html']
        total_score = f"{player['total']:.4f}"
        count       = player['count']

        # プレイヤー行
        rows.append(
            f'<tr class="player-row" data-rank="{rank}" onclick="toggle(\'r{rank}\')">'
            f'<td class="rank">{rank_label(rank)}</td>'
            f'<td class="name">{name_html}</td>'
            f'<td class="score">{total_score}</td>'
            f'<td class="count">{count}</td></tr>'
        )

        # イベントカード（Flickr 写真なし、テキストのみ）
        ev_cards = ''.join(
            f'<div class="ev-card"><div class="ev-info">'
            f'<div class="ev-name">{e["name"]}</div>'
            f'<div class="ev-rank">{e["rank_text"]}</div>'
            f'</div></div>'
            for e in player['events']
        )

        # シェアテキスト
        plain_name  = re.sub(r'<[^>]+>', '', name_html).strip()
        rank_emoji  = {1: '🥇', 2: '🥈', 3: '🥉'}.get(rank, '📊')
        share_text  = (
            f"📊JAPAN POKER DATABASE📊\n\n"
            f"【プレイヤー】 {plain_name}\n"
            f"【現在順位】 {rank_emoji} {rank}位 / {total_players} Players\n"
            f"【ポイント】 📈 {float(total_score):.1f}pt ({count}インプライズ)\n\n"
            f"ランキングをチェックする👇\n"
            f"https://prize-checker.com/ujpi\n\n"
            f"#ポーカー戦績ランキング 　#プライズチェッカー"
        )

        share_btn = (
            f'<div class="share-section">'
            f'<a href="/ujpi/register.html" class="register-btn" target="_blank" rel="noopener">Xアカウントを登録</a>'
            f'<a class="share-x-btn" href="#" data-text="{share_text}" '
            f'onclick="shareToX(this,event)">{X_ICON} ポストする</a>'
            f'</div>'
        )

        # 詳細行
        rows.append(
            f'<tr class="detail-row" data-rank="{rank}" id="r{rank}">'
            f'<td colspan="4">'
            f'<div class="ev-container">{ev_cards}</div>'
            f'{share_btn}'
            f'</td></tr>'
        )

    return '\n'.join(rows)


# ── タブバー HTML ────────────────────────────────────────────
TAB_NAMES = {
    'NLH':   '/ujpi/nlh_ranking.html',
    'PLO':   '/ujpi/plo_ranking.html',
    'Mixed': '/ujpi/mixed_ranking.html',
}

def build_tab_bar(active: str) -> str:
    tabs = ['<div class="tab-bar">']
    tabs.append('  <a href="/ujpi/" class="tab">総合</a>')
    for name, url in TAB_NAMES.items():
        cls = 'tab active' if name == active else 'tab'
        tabs.append(f'  <a href="{url}" class="{cls}">{name}</a>')
    tabs.append('</div>')
    return '\n'.join(tabs)


# ── ページ HTML を生成（plo_ranking.html をベースに tbody を差し替え）──
def generate_page(players: list, type_name: str) -> str:
    rows_html = build_rows(players)

    # tbody の中身を差し替え
    tbody_start = template.index('<tbody>')
    tbody_end   = template.index('</tbody>') + len('</tbody>')
    html = (
        template[:tbody_start]
        + '<tbody>\n' + rows_html + '\n</tbody>'
        + template[tbody_end:]
    )

    # タイトル更新
    html = html.replace(
        '<title>JAPAN POKER DATABASE</title>',
        f'<title>{type_name} - JAPAN POKER DATABASE</title>'
    )

    # タブバーを差し替え（plo_ranking.html のタブバーを上書き）
    tab_bar_html = build_tab_bar(type_name)
    html = re.sub(
        r'<div class="tab-bar">.*?</div>',
        tab_bar_html,
        html,
        flags=re.DOTALL
    )

    # プルダウンを除去（NLH・Mixed にはドロップダウン不要）
    html = re.sub(
        r'\s*<select[^>]*id="tourSelect"[^>]*>.*?</select>',
        '',
        html,
        flags=re.DOTALL
    )

    return html


# ── 実行 ────────────────────────────────────────────────────
nlh_players   = build_ranking('NLH')
mixed_players = build_ranking('Mixed')

nlh_html   = generate_page(nlh_players,   'NLH')
mixed_html = generate_page(mixed_players, 'Mixed')

with open(OUTPUT_NLH, 'w', encoding='utf-8') as f:
    f.write(nlh_html)

with open(OUTPUT_MIXED, 'w', encoding='utf-8') as f:
    f.write(mixed_html)

print(f"✅ NLH ranking   → {OUTPUT_NLH}  ({len(nlh_players)} players)")
print(f"✅ Mixed ranking → {OUTPUT_MIXED}  ({len(mixed_players)} players)")
