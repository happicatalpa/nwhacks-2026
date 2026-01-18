import { getKeyPoints, getCheckedKeyPoints } from '../features/score/SpeechScore.jsx'
import { useState } from 'react'

export default function Results({script, transcript}) {
    const [keyPoints, setKeyPoints] = useState('');
    const [checkedKeyPoints, setCheckedKeyPoints] = useState('');
    console.log("current transcript: " + transcript);

    const handleGetKeyPoints = async () => {
        const points = await getKeyPoints({ initialScript: script });
        if (points) setKeyPoints(points);
        const checkedPoints = await getCheckedKeyPoints( { keyPoints: keyPoints, transcript: transcript } );
        if (checkedPoints) setCheckedKeyPoints(checkedPoints);
    };


  return (
    <div> 
        <h1>WOOHOO you finished your cool talk</h1>
        <p>SCORE: </p>
        <button onClick={handleGetKeyPoints}>Try Again</button>
        <p>Key points: {keyPoints}</p>
        <p>Covered points: {checkedKeyPoints}</p>
    </div>
  );
}