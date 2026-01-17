import React, { useState, useEffect, useRef } from "react";

export default function SpeechToText() {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports the API
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // change as needed
    recognition.interimResults = true; // get results while speaking
    recognition.continuous = true; // keep listening until stopped

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptPiece + " ");
        } else {
          interimTranscript += transcriptPiece;
        }
      }
      // Optional: show interim results if you want
      // console.log("Interim:", interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>{transcript || "Your speech will appear here..."}</p>
    </div>
  );
}
