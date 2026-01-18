import { useState, useEffect } from "react";

export default function Timer({ start = 60 }) {
    const [timeLeft, setTimeLeft] = useState(start);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    // Format timeLeft seconds into MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        // Pad with leading zero if needed
        const mm = m.toString().padStart(2, "0");
        const ss = s.toString().padStart(2, "0");
        return `${mm}:${ss}`;
    };

    return (
        <div>
            <h2>Time Left: {formatTime(timeLeft)}</h2>
        </div>

    );
}
