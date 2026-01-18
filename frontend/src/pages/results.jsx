import React from "react";
import { Link } from "react-router-dom";

export default function Results() {
  /* const [textInput, setTextInput] = useState("lorem ipsum dolar..."); */

  return (
    <div> 
        <h1>WOOHOO you finished your cool talk</h1>
        <div className = "">
            <p>SCORE: </p>
        </div>

        <Link to="/">
          <button id="small">Back to Start</button>
        </Link>

        
        
        <img src = "/yaptrainer.png"></img>
    </div>

  );
}