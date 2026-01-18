import { useState } from 'react'
import '../App.css'
import Camera from '../components/Camera.jsx';
import Audience from '../components/Audience.jsx';
import Timer from '../components/Timer.jsx'
import SpeechToText from '../features/speech/speech-to-text.jsx'
import { Link } from "react-router-dom";

export default function Presenting({ setTranscript, timeLimitSeconds, currentSeconds, setCurrentSeconds }) {
    const [count, setCount] = useState(0)
    const [sessionEnded, setSessionEnded] = useState(false);

    function endSession() {
        setSessionEnded(true);
    }

    return (
        <>
            <div>
                <Timer start={timeLimitSeconds} currentSeconds={currentSeconds} setCurrentSeconds={setCurrentSeconds} />
                <SpeechToText setTranscript={setTranscript} sessionEnded={sessionEnded} />
            </div>
            <div className="camera-wrapper">
                <div className="camera">
                    <Camera />
                    <Audience />
                </div>
                <div id="timer-buttons">
                    <Link to="/results">
                        <button className="btn btn-large" onClick={() => setSessionEnded(true)}>END SESSION</button>
                    </Link>
                </div>
            </div>


        </>
    )
}

