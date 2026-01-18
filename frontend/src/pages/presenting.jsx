import { useState } from 'react'
import '../App.css'
import Camera from '../components/Camera.jsx';
import Audience from '../components/Audience.jsx';
import Timer from '../components/Timer.jsx'
import SpeechToText from '../features/speech/speech-to-text.jsx'
import { Link } from "react-router-dom";

export default function Presenting({ setTranscript, timeLimitSeconds }) {
  const [count, setCount] = useState(0)
  const [sessionEnded, setSessionEnded] = useState(false);

    function endSession() {
        setSessionEnded(true);
    }

  return (
    <>
      <div> 
        <Timer start={timeLimitSeconds} setSessionEnded={setSessionEnded} />
        <SpeechToText setTranscript={setTranscript} sessionEnded={sessionEnded} />
      </div>
        <div id="camera"> 
            <Camera />
            <Audience />
        </div>
        <Link to="/results">
            <button id = "large" onClick={() => setSessionEnded(true)}>End Session</button>
        </Link>
        
    </>
  )
}

