import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage/ComingSoon';

function App() {
  return (
    <Router>
      <Routes>
        {/* 404 NOT FOUND */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;