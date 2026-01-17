import { useState, useEffect } from 'react';

export default function Timer({ start = 60 }) {
  const [timeLeft, setTimeLeft] = useState(start);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div>
      <h2>Time Left: {timeLeft} seconds</h2>
    </div>
  );
}
