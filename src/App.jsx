import React, { useState, useEffect } from 'react';
import TournamentSelector from './components/TournamentSelector';
import EntryInput from './components/EntryInput';
import PayoutDisplay from './components/PayoutDisplay';
import { getTours, getEventsByTour, getTournamentsByEvent, getTournamentById, logEntryCount } from './lib/api';
import './App.css';

function App() {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [tournament, setTournament] = useState(null);
  const [entries, setEntries] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ツアー一覧を取得
    const fetchTours = async () => {
      try {
        setLoading(true);
        const tourList = await getTours();
        setTours(tourList);
      } catch (err) {
        setError('ツアー情報の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    // 選択されたツアーのイベント一覧を取得
    const fetchEvents = async () => {
      if (selectedTour) {
        try {
          setLoading(true);
          const eventList = await getEventsByTour(selectedTour);
          setEvents(eventList);
          setSelectedEvent('');
          setTournaments([]);
          setSelectedTournament('');
          setTournament(null);
        } catch (err) {
          setError('イベント情報の取得に失敗しました');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setEvents([]);
        setSelectedEvent('');
        setTournaments([]);
        setSelectedTournament('');
        setTournament(null);
      }
    };
    fetchEvents();
  }, [selectedTour]);

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
        } catch (err) {
          setError('トーナメント詳細の取得に失敗しました');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setTournament(null);
      }
    };
    fetchTournament();
  }, [selectedTournament]);

  // エントリ数が入力されたときにログを記録
  useEffect(() => {
    const saveLog = async () => {
      if (selectedTournament && entries > 0) {
        try {
          await logEntryCount(selectedTournament, entries);
        } catch (err) {
          console.error('ログの保存に失敗しました', err);
        }
      }
    };
    saveLog();
  }, [selectedTournament, entries]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎲 ポーカートーナメント還元率チェッカー</h1>
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
            tours={tours}
            selectedTour={selectedTour}
            onTourChange={setSelectedTour}
            events={events}
            selectedEvent={selectedEvent}
            onEventChange={setSelectedEvent}
            tournaments={tournaments}
            selectedTournament={selectedTournament}
            onTournamentChange={setSelectedTournament}
            loading={loading}
          />

          {tournament && (
            <EntryInput
              entries={entries}
              onEntriesChange={setEntries}
            />
          )}

          {tournament && entries > 0 && (
            <PayoutDisplay
              tournament={tournament}
              entries={entries}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 ポーカートーナメント還元率チェッカー</p>
      </footer>
    </div>
  );
}

export default App;
