import TimerSetter from "../components/TimerSetter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Setup({ setScript, setTimeLimitSeconds }) {
    const [textInput, setTextInput] = useState("lorem ipsum dolar...");
    const [localTimer, setLocalTimer] = useState(30);
    const navigate = useNavigate();

    const handleNext = () => {
        setScript(textInput);
        // setTimeLimitSeconds(localTimer);
        navigate("/present");
    }

    return (
    <div> 
        <h1>SETUP</h1>
        <div>
            <h2>Input your script here!</h2>
            <textarea 
                rows="10" 
                cols="50" 
                defaultValue={textInput} 
                onChange={(e) => setTextInput(e.target.value)} 
            />
        </div>

        <div>
            <h2>Set the timer</h2>
            <TimerSetter
                setTimeLimitSeconds={setTimeLimitSeconds}
            />
        </div>
        <button onClick={handleNext}>Start Presentation!</button>
    </div>
    );
}