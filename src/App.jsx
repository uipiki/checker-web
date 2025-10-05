import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Link to="/" className="header-link">
            <h1>♠️ プライズチェッカーNow</h1>
          </Link>
          <p>日本のポーカートーナメントの還元率を簡単にチェック</p>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 プライズチェッカーNow</p>
          <div className="footer-links">
            <Link to="/privacy-policy">プライバシーポリシー</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
