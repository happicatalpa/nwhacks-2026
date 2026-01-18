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
    const [timeLimitSeconds, setTimeLimitSeconds] = useState("");
    const [overtime, setOvertime] = useState();


    return (
    <BrowserRouter>     
        <Routes>
        <Route path="/" element={<Home />} />          {/* Home page */}
        <Route path="/setup" element={<Setup setScript={setScript} setTimeLimitSeconds={setTimeLimitSeconds} />} />    {/* About page */}
        <Route path="/present" element={<Presenting setTranscript={setTranscript} timeLimitSeconds={timeLimitSeconds}/>} />    {/* About page */}
        <Route path="/results" element={<Results script={script} transcript={transcript}/>} />    {/* About page */}

        </Routes>
    </BrowserRouter>
    );
}

export default App