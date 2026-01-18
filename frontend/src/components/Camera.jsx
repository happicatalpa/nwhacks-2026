import { useEffect, useRef } from "react";

export default function Camera({ videoRef }) {
  

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true})
      .then(stream => {
        videoRef.current.srcObject = stream;
      });
  }, [videoRef]);

  return <video ref={videoRef} autoPlay playsInline />;
}
