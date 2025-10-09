import { supabase } from './supabase'

/**
 * 日本時間の今日の日付を取得（YYYY-MM-DD形式）
 */
const getJSTToday = () => {
  const now = new Date()
  // 日本時間に変換（UTC+9）
  const jstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000))
  return jstDate.toISOString().split('T')[0]
}

/**
 * 開催中の大会（イベント）一覧を取得
 * start_date <= 今日 <= end_date
 */
export const getActiveEvents = async () => {
  const today = getJSTToday()
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      tours (
        id,
        name
      )
    `)
    .lte('start_date', today) // 開始日が今日以前
    .gte('end_date', today)   // 終了日が今日以降
    .order('start_date', { ascending: true })
  
  if (error) throw error
  return data
}

/**
 * 特定のイベントに紐づく開催中のトーナメント一覧を取得
 * start_date <= 今日 <= end_date
 */
export const getTournamentsByEvent = async (eventId) => {
  const today = getJSTToday()
  
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('event_id', eventId)
    .lte('start_date', today) // 開始日が今日以前
    .gte('end_date', today)   // 終了日が今日以降
    .order('start_date', { ascending: true })
  
  if (error) throw error
  return data
}

/**
 * 特定のトーナメントの情報を取得
 */
export const getTournamentById = async (tournamentId) => {
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('id', tournamentId)
    .single()
  
  if (error) throw error
  return data
}

/**
 * エントリー数をログに記録
 */
export const logEntryCount = async (tournamentId, entryCount) => {
  const { data, error } = await supabase
    .from('entry_logs')
    .insert([
      { tournament_id: tournamentId, entry_count: entryCount }
    ])
    .select()
  
  if (error) throw error
  return data
}

/**
 * 還元率を計算
 */
export const calculateReturnRate = (tournament, entryCount) => {
  if (!tournament || !entryCount || entryCount <= 0) {
    return 0
  }
  
  const totalBuyIn = tournament.buy_in * entryCount
  const prizePool = tournament.prize_pool || tournament.fix_prize || 0
  
  if (totalBuyIn === 0) return 0
  
  return ((prizePool / totalBuyIn) * 100).toFixed(2)
}
