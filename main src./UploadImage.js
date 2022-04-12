import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import request_url from "./requestUrl";

const UploadImage = ({setImage, setScreen, image, setResponse, setError}) => {

    const [view, setView] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [emoji, setEmoji] = useState(null);
    const intervalRef = useRef();
    //const imgRef = useRef();
    

    const emojis = ["🕐", "🕜", "🕑","🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢",  "🕗", "🕣", "🕘", "🕤", "🕙",  "🕥", "🕚", "🕦",  "🕛", "🕧"];
    const interval = 125;
    // const myRef = useRef();
    // const [check, setCheck] = useState('Hello!');

    const submitForm = () => {
        setOnSubmit(true);
        setResponse(null);
        loadEmoji(emojis);
        const formData = new FormData();
        formData.append("file", selectedFile);
        //console.log(selectedFile)
  
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
            setEmoji(null)
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

    const handleFileInput = (e) => {
        // handle validations
        setSelectedFile(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]));
        // imgRef.current.onload = () => {
        //     URL.revokeObjectURL(imgRef.current.src) // free memory
        // }
    }

    const loadEmoji = (arr) => {
        intervalRef.current = setInterval(() => {
            setEmoji(arr[Math.floor(Math.random() * arr.length)])
            //console.log(Math.floor(Math.random() * arr.length))
          }, interval);
    }

    return(
        <div className="main flex flex-column pos-rel">
            <div>
                <input className="file" type="file" onChange={handleFileInput}/>
            </div>
            {
                selectedFile ?
                <div className="view-img" onClick={() => setView(!view)}>
                {
                    view ?
                    'Hide Image':
                    'View Image'
                }
                </div>
                : null
            }
            {
                view ?
                <div>
                    <img src={image} alt="show" />
                </div> :
                null
            }
            {onSubmit ?
            <div className="container">
                <div className="emoji" ref={intervalRef}>{emoji}</div>
            </div>
            : null
            }
            <div>
                <button className="btn" onClick={submitForm}>Submit</button>
                <button className='btn' onClick={() => setScreen('default')}>Back</button>
            </div>
        </div>
    )
}

export default UploadImage;