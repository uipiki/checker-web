import { supabase } from './supabase'

/**
 * ツアー一覧を取得
 */
export const getTours = async () => {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

/**
 * 特定のツアーに紐づくイベント一覧を取得
 */
export const getEventsByTour = async (tourId) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('tour_id', tourId)
    .order('start_date', { ascending: false })
  
  if (error) throw error
  return data
}

/**
 * 特定のイベントに紐づくトーナメント一覧を取得
 */
export const getTournamentsByEvent = async (eventId) => {
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('event_id', eventId)
    .order('start_time')
  
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
