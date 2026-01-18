import { useEffect, useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";

export default function MediaPipeProcessor({ videoRef }) {
  const canvasRef = useRef(null);
  const faceMeshRef = useRef(null);
  const runningRef = useRef(false);
  const [feedback, setFeedback] = useState("Initializing...");

  useEffect(() => {
    if (!videoRef.current || faceMeshRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    faceMeshRef.current = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMeshRef.current.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMeshRef.current.onResults((results) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!results.multiFaceLandmarks?.length) {
        setFeedback("No face detected");
        return;
      }

      const landmarks = results.multiFaceLandmarks[0];
      const nose = landmarks[1];
      const leftEye = landmarks[33];
      const rightEye = landmarks[263];

      const eyeCenterX = (leftEye.x + rightEye.x) / 2;
      const lookingAtCamera = Math.abs(eyeCenterX - nose.x) < 0.03;

      setFeedback(lookingAtCamera ? "Eye contact 👍" : "Looking away 👀");

      const xs = landmarks.map((p) => p.x * canvas.width);
      const ys = landmarks.map((p) => p.y * canvas.height);

      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      ctx.strokeStyle = lookingAtCamera ? "lime" : "red";
      ctx.lineWidth = 3;
      ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    });

    const waitForVideo = () => {
      const video = videoRef.current;

      if (
        video &&
        video.readyState === 4 &&
        video.videoWidth > 0 &&
        !runningRef.current
      ) {
        runningRef.current = true;
        detectFrame();
      } else {
        requestAnimationFrame(waitForVideo);
      }
    };

    const detectFrame = async () => {
      if (!videoRef.current) return;

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      await faceMeshRef.current.send({ image: videoRef.current });
      requestAnimationFrame(detectFrame);
    };

    waitForVideo();
  }, [videoRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,


        }}
      />

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "6px 12px",
          borderRadius: "8px",
          zIndex: 20,
        }}
      >
        {feedback}
      </div>
    </>
  );
}
