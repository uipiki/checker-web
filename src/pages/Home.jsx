import React, { useState, useEffect } from 'react';
import TournamentSelector from '../components/TournamentSelector';
import EntryInput from '../components/EntryInput';
import PayoutDisplay from '../components/PayoutDisplay';
import { getActiveEvents, getTournamentsByEvent, getTournamentById, logEntryCount } from '../lib/api';

function Home() {
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

  const handleCheckReturnRate = async () => {
    if (!selectedTournament || !entries || entries <= 0) {
      return;
    }

    try {
      await logEntryCount(selectedTournament, entries);
      setShowResult(true);
    } catch (err) {
      console.error('ログの保存に失敗しました', err);
      setShowResult(true);
    }
  };

  return (
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
  );
}

export default Home;
