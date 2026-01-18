import React, { useState, useEffect, useRef } from "react";

export default function SpeechToText({setTranscript}) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const [fullTranscript, setFullTranscript] = useState("");


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
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
            }
        }

        if (finalTranscript) {
            // Append new final transcript chunk to stored full transcript
            setFullTranscript((prev) => prev + finalTranscript);         
        }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current.stop();
      setTranscript(fullTranscript);
     console.log("set transcript to: " + fullTranscript);
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <div>
      <button class="btn btn-small" onClick={toggleListening}>
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>{fullTranscript || "Your speech will appear here..."}</p>
    </div>
  );
}
