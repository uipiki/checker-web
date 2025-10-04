import React from 'react';
import './TournamentSelector.css';

const TournamentSelector = ({ 
  events, 
  selectedEvent, 
  onEventChange, 
  tournaments, 
  selectedTournament, 
  onTournamentChange 
}) => {
  return (
    <div className="selector-container">
      <div className="selector-group">
        <label htmlFor="event-select">大会を選択</label>
        <select 
          id="event-select"
          value={selectedEvent} 
          onChange={(e) => onEventChange(e.target.value)}
          className="selector"
        >
          <option value="">-- 大会を選択してください --</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <div className="selector-group">
          <label htmlFor="tournament-select">トーナメントを選択</label>
          <select 
            id="tournament-select"
            value={selectedTournament} 
            onChange={(e) => onTournamentChange(Number(e.target.value))}
            className="selector"
          >
            <option value="">-- トーナメントを選択してください --</option>
            {tournaments.map(tournament => (
              <option key={tournament.id} value={tournament.id}>
                {tournament.tournamentName} (バイイン: ¥{tournament.buyIn.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TournamentSelector;
