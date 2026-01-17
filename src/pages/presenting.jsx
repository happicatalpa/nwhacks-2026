import { useState } from 'react'
import '../App.css'
import Camera from '../components/Camera.jsx';
import Timer from '../components/Timer.jsx'
import SpeechToText from '../features/speech/speech-to-text.jsx'


export default function Presenting() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Presentation demo!!</h1>
      <div> 
        <Timer start={30} />
        <SpeechToText />
      </div>
      <div> 
        <Camera />

      </div>
    </>
  )
}

