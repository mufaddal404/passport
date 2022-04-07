import { useCallback, useRef, useState } from "react";
import Webcam from 'react-webcam';


const videoConstraints = {
    width: 500,
    height: 400,
    facingMode: "user"
};
  
const WebcamCapture = ({ setImage, setScreen, setCapture }) => {

    const webcamRef = useRef(null);
    const capture = useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setCapture(prev => !prev);
      },
      [webcamRef]
    );
    return (
      <>
        <Webcam
          audio={false}
          height={500}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
        />
        <br/>
        <button className="btn" onClick={capture}>Capture photo</button>
      </>
    );
}

export default WebcamCapture;