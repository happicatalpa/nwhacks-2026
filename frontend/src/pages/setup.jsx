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
        <h1 className="sp-title">SETUP</h1>
        <div className="sp">
            <h2 className="sp sp-text">Input your script here!</h2>
            <textarea className="sp-input"
                rows="10" 
                cols="50" 
                defaultValue={textInput} 
                onChange={(e) => setTextInput(e.target.value)} 
            />
        </div>

        <div className="timer-setup">
            <h2>Set the timer</h2>
            <TimerSetter
                setTimeLimitSeconds={setTimeLimitSeconds}
            />
        </div> 
        <div className="setup-button">
            <button className="btn btn-large" onClick={handleNext}>Start<br /> Presentation!</button>
        </div>
    </div>
    );
}