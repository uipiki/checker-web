import React from 'react';
import { calculateReturnRate } from '../lib/api';
import './PayoutDisplay.css';

const PayoutDisplay = ({ tournament, entries }) => {
  if (!tournament || !entries || entries <= 0) {
    return null;
  }

  const returnRate = calculateReturnRate(tournament, entries);

  return (
    <div className="payout-display">
      <div className="summary-section">
        <h2>還元率情報</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">総エントリ数</span>
            <span className="summary-value">{entries.toLocaleString()}人</span>
          </div>
          <div className="summary-item highlight">
            <span className="summary-label">還元率</span>
            <span className="summary-value">{returnRate}%</span>
          </div>
        </div>
        <div className="note">
          <p>還元率はプレーヤーズガイドを参考に計算されているためプライズアップを考慮していません。</p>
        </div>
        <div className="note">
          <p className="note-title">Bountyについて</p>
          <p>参加人数によって変動するBountyは考慮されていません。Mystery Bountyのように事前に定められているBountyは考慮されています。</p>
        </div>
      </div>
    </div>
  );
};

export default PayoutDisplay;
