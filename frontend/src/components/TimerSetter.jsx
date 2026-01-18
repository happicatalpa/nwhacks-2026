import React, { useState, useEffect } from "react";

export default function TimerSetter({ setTimeLimitSeconds }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Helper to keep values in range
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Increase minutes, max 59
  const incMinutes = () => setMinutes((m) => clamp(m + 1, 0, 59));
  // Decrease minutes, min 0
  const decMinutes = () => setMinutes((m) => clamp(m - 1, 0, 59));
  // Increase seconds, max 59
  const incSeconds = () => setSeconds((s) => clamp(s + 1, 0, 59));
  // Decrease seconds, min 0
  const decSeconds = () => setSeconds((s) => clamp(s - 1, 0, 59));

  // Format time with leading zeros
  const format = (num) => num.toString().padStart(2, "0");

  useEffect(() => {
        const totalSeconds = minutes * 60 + seconds;
        setTimeLimitSeconds(totalSeconds);
    }, [minutes, seconds, setTimeLimitSeconds]);

  return (
    <div style={{ fontFamily: "monospace", fontSize: "2rem", display: "inline-flex", alignItems: "center", gap: "1rem" }}>
      {/* Minutes */}
      <div style={{ textAlign: "center" }}>
        <button className="btn btn-small btn-timer" onClick={incMinutes} aria-label="Increase minutes" style={{ display: "block" }}>▲</button>
        <div>{format(minutes)}</div>
        <button className="btn btn-small btn-timer" onClick={decMinutes} aria-label="Decrease minutes" style={{ display: "block" }}>▼</button>
      </div>

      <div>:</div>

      {/* Seconds */}
      <div style={{ textAlign: "center" }}>
        <button className="btn btn-small btn-timer" onClick={incSeconds} aria-label="Increase seconds" style={{ display: "block" }}>▲</button>
        <div>{format(seconds)}</div>
        <button className="btn btn-small btn-timer" onClick={decSeconds} aria-label="Decrease seconds" style={{ display: "block" }}>▼</button>
      </div>
    </div>
  );
}
