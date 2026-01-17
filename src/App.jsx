import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/home.jsx';
import Presenting from './pages/presenting.jsx';
import Setup from './pages/setup.jsx';

function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* Navigation links */}
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">Presentation</Link> |{" "}
        <Link to="/setup">Setup</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />          {/* Home page */}
        <Route path="/about" element={<Presenting />} />    {/* About page */}
        <Route path="/setup" element={<Setup />} />    {/* About page */}
    
      </Routes>
    </BrowserRouter>
  );
}

export default App