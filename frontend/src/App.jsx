import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState, useEffect } from 'react';

import Home from './pages/home.jsx';
import Presenting from './pages/presenting.jsx';
import Setup from './pages/setup.jsx';
import Results from './pages/results.jsx'

function ResetStates() {
    
}

function App() {
    const [script, setScript] = useState("");
    const [transcript, setTranscript] = useState("");
    const [timeLimitSeconds, setTimeLimitSeconds] = useState("");
    const [currentSeconds, setCurrentSeconds] = useState(0);

    useEffect(() => {
        setScript("");
        setTranscript("");
        setTimeLimitSeconds("");
        setCurrentSeconds(0);
    }, []);


    return (
    <BrowserRouter>     
        <Routes>
        <Route path="/" element={<Home />} />          {/* Home page */}
        <Route path="/setup" element={<Setup setScript={setScript} setTimeLimitSeconds={setTimeLimitSeconds} />} />    {/* About page */}
        <Route path="/present" element={<Presenting setTranscript={setTranscript} timeLimitSeconds={timeLimitSeconds} currentSeconds={currentSeconds} setCurrentSeconds={setCurrentSeconds}/>} />    {/* About page */}
        <Route path="/results" element={<Results script={script} transcript={transcript} currentSeconds={currentSeconds} timeLimit={timeLimitSeconds}/>} />    {/* About page */}

        </Routes>
    </BrowserRouter>
    );
}

export default App