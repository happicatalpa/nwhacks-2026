import { useEffect, useRef, useState } from "react";

export default function SpeechToText({ sessionEnded, setTranscript }) {
  const recognitionRef = useRef(null);
  const [fullTranscript, setFullTranscript] = useState("");
  const [lastTranscript, setLastTranscript] = useState("");
  const hasStoppedRef = useRef(false); // 🔒 guard

  // Start listening immediately on mount
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let finalChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalChunk += event.results[i][0].transcript + " ";
        }
      }

      if (finalChunk) {
        setFullTranscript((prev) => prev + finalChunk);
        setLastTranscript(finalChunk);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  // Stop listening when session ends
  useEffect(() => {
    if (!sessionEnded) return;
    if (hasStoppedRef.current) return;

    hasStoppedRef.current = true;

    recognitionRef.current?.stop();
    setTranscript(fullTranscript);

    console.log("Final transcript:", fullTranscript);
  }, [sessionEnded, fullTranscript, setTranscript]);

  return (
    <div>
      <p>{lastTranscript || "Listening..."}</p>
    </div>
  );
}
