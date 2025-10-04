import React from 'react';
import './TournamentSelector.css';

const TournamentSelector = ({ 
  tours,
  selectedTour,
  onTourChange,
  events, 
  selectedEvent, 
  onEventChange, 
  tournaments, 
  selectedTournament, 
  onTournamentChange,
  loading
}) => {
  return (
    <div className="selector-container">
      <div className="selector-group">
        <label htmlFor="tour-select">ツアーを選択</label>
        <select 
          id="tour-select"
          value={selectedTour} 
          onChange={(e) => onTourChange(e.target.value)}
          className="selector"
          disabled={loading}
        >
          <option value="">-- ツアーを選択してください --</option>
          {tours.map(tour => (
            <option key={tour.id} value={tour.id}>
              {tour.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTour && (
        <div className="selector-group">
          <label htmlFor="event-select">大会を選択</label>
          <select 
            id="event-select"
            value={selectedEvent} 
            onChange={(e) => onEventChange(e.target.value)}
            className="selector"
            disabled={loading}
          >
            <option value="">-- 大会を選択してください --</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.name} {event.location && `(${event.location})`}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedEvent && (
        <div className="selector-group">
          <label htmlFor="tournament-select">トーナメントを選択</label>
          <select 
            id="tournament-select"
            value={selectedTournament} 
            onChange={(e) => onTournamentChange(Number(e.target.value))}
            className="selector"
            disabled={loading}
          >
            <option value="">-- トーナメントを選択してください --</option>
            {tournaments.map(tournament => (
              <option key={tournament.id} value={tournament.id}>
                {tournament.name}
                {tournament.game_type && ` [${tournament.game_type}]`}
                {tournament.buy_in && ` (バイイン: ¥${tournament.buy_in.toLocaleString()})`}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TournamentSelector;
