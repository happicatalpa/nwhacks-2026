import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Camera from './components/Camera.jsx';
import Timer from './components/Timer.jsx'
import SpeechToText from './features/speech/speech-to-text.jsx'


function App() {
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

export default App
