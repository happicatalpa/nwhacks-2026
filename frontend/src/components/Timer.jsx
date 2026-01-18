import { useState, useEffect } from "react";

export default function Timer({ start = 60, currentSeconds, setCurrentSeconds }) {
    const [timeLeft, setTimeLeft] = useState(start);
    const [isOvertime, setIsOvertime] = useState(false);
    const [textColor, setTextColor] = useState("white");

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsOvertime(true);
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((t) => t - 1);
            console.log("time left seconds: ", timeLeft);
            console.log("current seconds: ", currentSeconds);

        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        console.log('Setting up interval for currentSeconds');
        setCurrentSeconds(0);

        const intervalId = setInterval(() => {
            setCurrentSeconds((t) => t + 1);
            
        }, 1000);

        console.log('Clearing interval for currentSeconds');
        return () => clearInterval(intervalId);
    }, []);

    // Format timeLeft seconds into MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        // Pad with leading zero if needed
        const mm = m.toString().padStart(2, "0");
        const ss = s.toString().padStart(2, "0");
        return `${mm}:${ss}`;
    };

    useEffect(() => {
        if (isOvertime) {
            setTextColor("#d50532ff");
        } else {
            setTextColor("#FFC9B9");
        }
    }, [isOvertime]);

    return (
        <div>
            <h2 className="sp-title" style={{ color: textColor }}>Time Left: {formatTime(timeLeft)}</h2>
        </div>

    );
}
