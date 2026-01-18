import React from "react";
import { Link } from "react-router-dom";

import { getKeyPoints, getCheckedKeyPoints } from '../features/score/SpeechScore.jsx'
import { useState } from 'react'

export default function Results({script, transcript}) {
    const [keyPoints, setKeyPoints] = useState('');
    const [checkedKeyPoints, setCheckedKeyPoints] = useState('');
    console.log("current transcript: " + transcript);

    const handleGetKeyPoints = async () => {
        const points = await getKeyPoints({ initialScript: script });
        if (points) setKeyPoints(points);
        const checkedPoints = await getCheckedKeyPoints( { keyPoints: points, transcript: transcript } );
        console.log("ran check points: ", checkedPoints);
        if (checkedPoints) setCheckedKeyPoints(checkedPoints);
    };

  return (
    <div>
      <div classname = "resultsPage"> 
          <h1>WOOHOO you finished your cool talk</h1>
          <div className = "">
              <p>SCORE: </p>
              <p>Key points: {keyPoints}</p>
              <p>Covered points: {checkedKeyPoints}</p>
          </div>

          <Link to="/">
            <button onClick={handleGetKeyPoints} id="small">Back to Start</button>
          
          </Link>

      </div>

      <img id="yaptrainerpos" src = "/yaptrainer.png"></img>
    </div>
  );
}