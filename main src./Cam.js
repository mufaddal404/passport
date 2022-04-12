import { useState, useRef } from "react";
import WebcamCapture from "./WebcamCapture";
import axios from "axios";
import DetectRTC from "detectrtc";
import request_url from "./requestUrl";

const Cam = ({setImage, setScreen, image, setResponse, setError}) => {
    const [capture, setCapture] = useState(false);

    const Pop = () => {

        const [emoji, setEmoji] = useState(null);
        const intervalRef = useRef();

        const emojis = ["🕐", "🕜", "🕑","🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢",  "🕗", "🕣", "🕘", "🕤", "🕙",  "🕥", "🕚", "🕦",  "🕛", "🕧"];
        const interval = 75;
        
        const blob = null;
        if (image !== '' || image !== null) {
            const imageStr = image.split(',')[1];
            blob = b64toBlob(imageStr, 'image/jpeg')
        }

        const sendImage = () => {
            setResponse(null);
            loadEmoji(emojis);

            const formData = new FormData(); 
            formData.append('file', blob);

            axios({
                method: 'post',
                url: request_url,
                headers: {'Content-Type': 'multipart/form-data'},
                data: formData
            })
            .then((response) => {
                setResponse(response.data);
                setError(false);
                clearInterval(intervalRef.current);
                setEmoji(null);
                setScreen('datapane');
                console.log(response);
            })
            .catch((error) => {
                setResponse(error);
                clearInterval(intervalRef.current);
                setEmoji(null);
                setError(true);
                setScreen('datapane');
                console.log(error);
            });
        }
        
        const loadEmoji = (arr) => {
            intervalRef.current = setInterval(() => {
                setEmoji(arr[Math.floor(Math.random() * arr.length)])
                //console.log(Math.floor(Math.random() * arr.length))
              }, interval);
        }

        return(
            <div className="container">
                <div className="popup">
                    <img src={image} alt="passport" />
                    <a href={image} download>Save image</a>
                    <div>
                        <button className="btn" onClick={() => setCapture(!capture)}>Retake</button>
                        <button className="btn" onClick={() => sendImage()}>Continue</button>
                    </div>
                </div>
                <div className="emoji" ref={intervalRef}>{emoji}</div>
            </div>
        )
    }

    return(
        <div className="main flex flex-column justify-end pos-rel">
            {capture ? <Pop /> : null}
            <WebcamCapture setImage={setImage} setScreen={setScreen} setCapture={setCapture} />
            <button className="btn" onClick={() => setScreen('default')}>Back</button>
        </div>
    )
}


const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}


export default Cam;