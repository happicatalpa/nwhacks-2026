import React from "react";
import { Link } from "react-router-dom";

import { getKeyPoints, getCheckedKeyPoints } from '../features/score/SpeechScore.jsx'
import { useState } from 'react'

export default function Results({script, transcript}) {
    const [keyPoints, setKeyPoints] = useState('');
    const [checkedKeyPoints, setCheckedKeyPoints] = useState('');
    const [loading, setLoading] = useState(false);

    console.log("current transcript: " + transcript);

    const handleGetKeyPoints = async () => {
        const points = await getKeyPoints({ initialScript: script });
        if (points) setKeyPoints(points);
        const checkedPoints = await getCheckedKeyPoints( { keyPoints: points, transcript: transcript } );
        console.log("ran check points: ", checkedPoints);
        if (checkedPoints) setCheckedKeyPoints(checkedPoints);
    };

    function formatResults() {
        try {
            const keyPointsArray = JSON.parse(keyPoints);
            console.log(keyPointsArray);
            const checkedKeyPointsArray = JSON.parse(checkedKeyPoints);
            console.log(checkedKeyPointsArray);

            let resultText = "Summary of Key Points Covered: \n";

            keyPointsArray.forEach(point => {
                if (checkedKeyPointsArray.includes(point)) {
                    resultText += point + "✅\n";
                } else {
                    resultText += point + "❌\n";
                }
                
            });

            return resultText;
            
        } catch (e) {
            console.error("Invalid JSON string");
            return "Unable to parse results.";
        }
    }

    handleGetKeyPoints();
    
  return (
    <div>
      <div classname = "resultsPage"> 
          <h1>WOOHOO you finished your cool talk</h1>
          <div className = "">
              <p>SCORE: </p>
              <p>Key points: {keyPoints}</p>
              <p>Covered points: {checkedKeyPoints}</p>
              <div>{formatResults()}</div>

        </div>

        <Link to="/">
          <button onClick={handleGetKeyPoints} class="btn btn-small">Back to Start</button>
        
        </Link>
        
        
    </div>
      <img id="yaptrainerpos" src = "/yaptrainer.png"></img>
    </div>
  );
}