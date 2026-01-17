import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Camera from './components/Camera.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Presentation demo!!</h1>
      <div> 
        <Camera />
      </div>
    </>
  )
}

export default App
