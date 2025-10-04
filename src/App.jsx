import React, { useState, useEffect } from 'react';
import TournamentSelector from './components/TournamentSelector';
import EntryInput from './components/EntryInput';
import PayoutDisplay from './components/PayoutDisplay';
import { getEvents, getTournamentsByEvent, getTournamentById } from './data/mockData';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [tournament, setTournament] = useState(null);
  const [entries, setEntries] = useState('');

  useEffect(() => {
    // イベント一覧を取得
    const eventList = getEvents();
    setEvents(eventList);
  }, []);

  useEffect(() => {
    // 選択されたイベントのトーナメント一覧を取得
    if (selectedEvent) {
      const tournamentList = getTournamentsByEvent(selectedEvent);
      setTournaments(tournamentList);
      setSelectedTournament('');
      setTournament(null);
    } else {
      setTournaments([]);
      setSelectedTournament('');
      setTournament(null);
    }
  }, [selectedEvent]);

  useEffect(() => {
    // 選択されたトーナメントの詳細を取得
    if (selectedTournament) {
      const tournamentDetail = getTournamentById(selectedTournament);
      setTournament(tournamentDetail);
    } else {
      setTournament(null);
    }
  }, [selectedTournament]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎲 ポーカートーナメント還元率チェッカー</h1>
        <p>日本のポーカートーナメントの還元率を簡単にチェック</p>
      </header>

      <main className="app-main">
        <div className="container">
          <TournamentSelector
            events={events}
            selectedEvent={selectedEvent}
            onEventChange={setSelectedEvent}
            tournaments={tournaments}
            selectedTournament={selectedTournament}
            onTournamentChange={setSelectedTournament}
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
