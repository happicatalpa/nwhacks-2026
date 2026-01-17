import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';

import Home from './pages/home.jsx';
import Presenting from './pages/presenting.jsx';
import Setup from './pages/setup.jsx';
import Results from './pages/results.jsx'

function App() {
    const [script, setScript] = useState("");
    const [transcript, setTranscript] = useState("");
    const [timeLimit, setTimeLimit] = useState("");


    return (
    <BrowserRouter>
        <nav>
        {/* Navigation links */}
        <Link to="/">Home</Link> |{" "}
        <Link to="/present">Presentation</Link> |{" "}
        <Link to="/setup">Setup</Link> |{" "}
        <Link to="/results">Results</Link>
        </nav>

        <Routes>
        <Route path="/" element={<Home />} />          {/* Home page */}
        <Route path="/setup" element={<Setup setScript={setScript} />} />    {/* About page */}
        <Route path="/present" element={<Presenting setTranscript={setTranscript}/>} />    {/* About page */}
        <Route path="/results" element={<Results />} />    {/* About page */}

        </Routes>
    </BrowserRouter>
    );
}

export default App