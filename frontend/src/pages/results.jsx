import React from "react";
import { Link } from "react-router-dom";

import { getKeyPoints, getCheckedKeyPoints } from '../features/score/SpeechScore.jsx'
import { useEffect, useState } from 'react'

export default function Results({script, transcript}) {
    const [keyPoints, setKeyPoints] = useState('');
    const [checkedKeyPoints, setCheckedKeyPoints] = useState('');
    const [loading, setLoading] = useState(false);

    console.log("current transcript: " + transcript);

     useEffect(() => {
        async function fetchKeyPoints() {
            if (!script || !transcript) return;
                setLoading(true);
            try {
                const points = await getKeyPoints({ initialScript: script });
                if (points) setKeyPoints(points);

                const checkedPoints = await getCheckedKeyPoints({ keyPoints: points, transcript: transcript });
                if (checkedPoints) setCheckedKeyPoints(checkedPoints);
            } catch (error) {
                console.error("Error fetching key points:", error);
            }
            setLoading(false);
        }
        fetchKeyPoints();
    }, [script, transcript]);

    function formatResults() {
        try {
            const keyPointsArray = JSON.parse(keyPoints);
            console.log(keyPointsArray);
            const checkedKeyPointsArray = JSON.parse(checkedKeyPoints);
            console.log(checkedKeyPointsArray);

            let resultText = "Summary of Key Points Covered: \n\n";

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

    
  return (
    <div>
      <div className = "resultsPage"> 
          <h1 className="sp-title">WOOHOO you finished your cool talk</h1>
          {loading ? (
        <p>Loading results...</p>
      ) : (
        <>
          <p>SCORE:</p>
          <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
            {formatResults()}
          </div>
        </>
      )}

        <Link to="/">
          <button className="btn-result">BACK TO START</button>
        
        </Link>
        
        
    </div>
      <img id="yaptrainerpos" src = "/yaptrainer.png"></img>
    </div>
  );
}