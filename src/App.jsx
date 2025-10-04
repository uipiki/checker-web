import React, { useState, useEffect } from 'react';
import TournamentSelector from './components/TournamentSelector';
import EntryInput from './components/EntryInput';
import PayoutDisplay from './components/PayoutDisplay';
import { getActiveEvents, getTournamentsByEvent, getTournamentById, logEntryCount } from './lib/api';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [tournament, setTournament] = useState(null);
  const [entries, setEntries] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 開催中の大会一覧を取得
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventList = await getActiveEvents();
        setEvents(eventList);
      } catch (err) {
        setError('大会情報の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    // 選択されたイベントのトーナメント一覧を取得
    const fetchTournaments = async () => {
      if (selectedEvent) {
        try {
          setLoading(true);
          const tournamentList = await getTournamentsByEvent(selectedEvent);
          setTournaments(tournamentList);
          setSelectedTournament('');
          setTournament(null);
          setShowResult(false);
        } catch (err) {
          setError('トーナメント情報の取得に失敗しました');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setTournaments([]);
        setSelectedTournament('');
        setTournament(null);
        setShowResult(false);
      }
    };
    fetchTournaments();
  }, [selectedEvent]);

  useEffect(() => {
    // 選択されたトーナメントの詳細を取得
    const fetchTournament = async () => {
      if (selectedTournament) {
        try {
          setLoading(true);
          const tournamentDetail = await getTournamentById(selectedTournament);
          setTournament(tournamentDetail);
          setShowResult(false);
        } catch (err) {
          setError('トーナメント詳細の取得に失敗しました');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setTournament(null);
        setShowResult(false);
      }
    };
    fetchTournament();
  }, [selectedTournament]);

  // 還元率をチェックボタンのハンドラ
  const handleCheckReturnRate = async () => {
    if (!selectedTournament || !entries || entries <= 0) {
      return;
    }

    try {
      // エントリログを記録
      await logEntryCount(selectedTournament, entries);
      // 結果を表示
      setShowResult(true);
    } catch (err) {
      console.error('ログの保存に失敗しました', err);
      // エラーが出ても結果は表示する
      setShowResult(true);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>♠️ プライズチェッカーNow</h1>
        <p>日本のポーカートーナメントの還元率を簡単にチェック</p>
      </header>

      <main className="app-main">
        <div className="container">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <TournamentSelector
            events={events}
            selectedEvent={selectedEvent}
            onEventChange={setSelectedEvent}
            tournaments={tournaments}
            selectedTournament={selectedTournament}
            onTournamentChange={setSelectedTournament}
            loading={loading}
          />

          {tournament && (
            <>
              <EntryInput
                entries={entries}
                onEntriesChange={setEntries}
              />
              
              <button 
                className="check-button"
                onClick={handleCheckReturnRate}
                disabled={!entries || entries <= 0}
              >
                還元率をチェック
              </button>
            </>
          )}

          {tournament && showResult && entries > 0 && (
            <PayoutDisplay
              tournament={tournament}
              entries={entries}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 プライズチェッカーNow</p>
      </footer>
    </div>
  );
}

export default App;
