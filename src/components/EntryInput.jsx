import React from 'react';
import './EntryInput.css';

const EntryInput = ({ entries, onEntriesChange }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(Number(value)))) {
      onEntriesChange(value === '' ? '' : Number(value));
    }
  };

  return (
    <div className="entry-input-container">
      <label htmlFor="entries-input">現在のエントリ数</label>
      <input
        id="entries-input"
        type="number"
        min="0"
        value={entries}
        onChange={handleChange}
        placeholder="エントリ数を入力"
        className="entry-input"
      />
    </div>
  );
};

export default EntryInput;
