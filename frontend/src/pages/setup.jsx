import TimerSetter from "../components/TimerSetter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Setup({ setScript }) {
    const [input, setInput] = useState("lorem ipsum dolar...");
    const navigate = useNavigate();

    const handleNext = () => {
        setScript(input);
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
                defaultValue={input} 
                onChange={(e) => setInput(e.target.value)} 
            />
        </div>

        <div>
            <h2>Set the timer</h2>
            <TimerSetter />
        </div>
        <button onClick={handleNext}>Start Presentation!</button>
    </div>
    );
}