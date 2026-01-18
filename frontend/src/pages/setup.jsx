import TimerSetter from "../components/TimerSetter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Setup({ setScript, setTimeLimitSeconds }) {
    const [textInput, setTextInput] = useState("lorem ipsum dolar...");
    const navigate = useNavigate();

    const handleNext = () => {
        setScript(textInput);
        // setTimeLimitSeconds(localTimer);
        navigate("/present");
    }

    return (
    <div> 
        <h1 class="sp-title">SETUP</h1>
        <div class="sp">
            <h2 class="sp sp-text">Input your script here!</h2>
            <textarea class="sp-input"
                rows="10" 
                cols="50" 
                defaultValue={textInput} 
                onChange={(e) => setTextInput(e.target.value)} 
            />
        </div>

        <div class="timer-setup">
            <h2>Set the timer</h2>
            <TimerSetter
                setTimeLimitSeconds={setTimeLimitSeconds}
            />
        </div> 
        <div class="setup-button">
            <button class="btn btn-large" onClick={handleNext}>Start<br /> Presentation!</button>
        </div>
    </div>
    );
}