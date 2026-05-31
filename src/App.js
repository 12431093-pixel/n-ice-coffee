import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Challenge from './Pages/Challenge';
import Contact from './Pages/Contact';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-warning fs-3" to="/">☕ N-Ice-Coffee</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#niceCoffeeNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="niceCoffeeNav">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link px-3" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/challenge">30s Challenge</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 text-warning fw-bold" to="/contact">Reservations</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ minHeight: '85vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <footer className="bg-dark text-white text-center py-4 mt-5 border-top border-warning border-3">
        <div className="container">
          <p className="mb-1 fw-bold">N-Ice-Coffee House & Library Sanctuary</p>
          <p className="small text-muted mb-0">&copy; 2026. Built strictly for CSCI390 Evaluation.</p>
        </div>
      </footer>
    </Router>
  );
};

export default App;
