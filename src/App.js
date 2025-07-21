import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PaymentPage from './pages/PaymentPage';

// Version fonctionnelle avec export default
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; // L'export doit être à la fin du fichier