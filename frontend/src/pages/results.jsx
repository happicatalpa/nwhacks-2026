import React from "react";
import { Link } from "react-router-dom";

import { getKeyPoints, getCheckedKeyPoints } from '../features/score/SpeechScore.jsx'
import { useEffect, useState } from 'react'
import TimeScore from "../features/score/TimeScore.jsx";
import { useNavigate } from "react-router-dom";
// import filledStar from "frontend\public\starfilled.png";
// import emptyStar from "frontend\public\starempty.png";

export default function Results({script, transcript, currentSeconds, timeLimit}) {
    const [keyPoints, setKeyPoints] = useState('');
    const [checkedKeyPoints, setCheckedKeyPoints] = useState('');
    const [loading, setLoading] = useState(false);
    const [finalTimeScore, setFinalTimeScore] = useState(0);
    const [finalTextScore, setFinalTextScore] = useState(0);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    console.log("current transcript: " + transcript);

    const handleNext = () => {
        navigate("/");
    }

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

    useEffect(() => {
  try {
    if (!keyPoints || !checkedKeyPoints) return;

    const keyPointsArray = JSON.parse(keyPoints);
    const checkedKeyPointsArray = JSON.parse(checkedKeyPoints);

    const textScore = (checkedKeyPointsArray.length / keyPointsArray.length) * 4;
    setFinalTextScore(textScore);
  } catch (e) {
    console.error("Invalid JSON string", e);
  }
}, [keyPoints, checkedKeyPoints]);

    function formatResults() {
        try {
            const keyPointsArray = JSON.parse(keyPoints);
            console.log(keyPointsArray);
            const checkedKeyPointsArray = JSON.parse(checkedKeyPoints);
            console.log(checkedKeyPointsArray);


            return (<div>
                {keyPointsArray.map((point, index) => {
                const isCovered = checkedKeyPointsArray.includes(point);
                return (
                    <div className="resultsContainer glide-up">
                    <p key={index} className="" style={{ color: isCovered ? "green" : "red" }}>
                    {point} {isCovered ? "✅" : "❌"}
                    </p>
                    </div>
                );
                })}
            </div>)
            
        } catch (e) {
            console.error("Invalid JSON string");
            return <div className="resultsContainer glide-up"><p className="dark">No results: Either the script entered was insufficient or no speech was recorded.</p></div>;
        }
    }

   function generateStars(totalScoreOutOf5) {
        return (
            <div className="star-container">
            {[...Array(5)].map((_, i) => (
                <img 
                key={i} 
                className="star glide-up"
                src={i < totalScoreOutOf5 ? "/starfilled.png" : "/starempty.png"}
                alt={i < totalScoreOutOf5 ? "filled star" : "empty star"}
                />
            ))}
            </div>
        )
    }


    
  return (
    <div>
      <div className = "resultsPage"> 
          <h1 className="sp-title">RESULTS</h1>
          
            <div className="time-score">
                <TimeScore timeLimit={timeLimit} currentTime={currentSeconds} setScore={setFinalTimeScore} />
            </div>
            
            {loading ? (
            <div className="resultsContainer"><p>Loading results...</p></div>
        ) : (
            <>
            <div>{generateStars(Math.round(finalTextScore+finalTimeScore))}</div>
            <div className="results">
                {formatResults()}
            </div>
            </>
        )}
      

        
          <div> <button className="btn-result" onClick={handleNext}>BACK TO START</button></div>
        
      </div>
      <img id="yaptrainerpos" src = "/yaptrainer.png"></img>
      <img className="background" src="background2.png"></img>
    </div>
  );
}