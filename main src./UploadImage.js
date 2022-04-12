import {useRef, useState, useEffect} from 'react';
import axios from 'axios';

const UploadImage = ({setScreen}) => {

    const [response, setResponse] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [emoji, setEmoji] = useState(null);
    const intervalRef = useRef();

    const emojis = ["🕐", "🕜", "🕑","🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢",  "🕗", "🕣", "🕘", "🕤", "🕙",  "🕥", "🕚", "🕦",  "🕛", "🕧"];
    const interval = 125;
    // const myRef = useRef();
    // const [check, setCheck] = useState('Hello!');

    const submitForm = () => {
        setResponse(null);
        loadEmoji(emojis);
        const formData = new FormData();
        formData.append("file", selectedFile);
        //console.log(selectedFile)
  
        axios({
            method: 'post',
            url: 'http://192.168.0.16:8000/api/image',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
        })
        .then((response) => {
            setResponse(response.data);
            clearInterval(intervalRef.current);
            setEmoji(null)
            console.log(response);
        })
        .catch((error) => {
            clearInterval(intervalRef.current);
            setEmoji(null)
            console.log(error);
        });
    }

    const handleFileInput = (e) => {
        // handle validations
        setSelectedFile(e.target.files[0])
    }

    const loadEmoji = (arr) => {
        intervalRef.current = setInterval(() => {
            setEmoji(arr[Math.floor(Math.random() * arr.length)])
            //console.log(Math.floor(Math.random() * arr.length))
          }, interval);
    }

    return(
        <div className="App">

            <input type="file" onChange={handleFileInput}/>

            <button onClick={submitForm}>Submit</button>
            <br/>
            <div className="preload">
                <div className="emoji" ref={intervalRef}>{emoji}</div>
            </div>

            {response && <Display data={response} />}
            <button className='btn' onClick={() => setScreen('default')}>Back to Home</button>
        </div>
    )
}

const Display = (props) => {

    const {CNIC_number, country, date_of_birth, expiration_date, name, surname, mrz_code, mrz_type, nationality, number, sex} = props.data

    return(
        <div>
            <p>
                Country: {country}<br/>
                Date of Birth: {date_of_birth}<br/>
                CNIC: {CNIC_number}<br/>
                Expiration Date: {expiration_date}<br/>
                Name: {name}<br/>
                Surname: {surname}<br/>
                MRZ Code: {mrz_code}<br/>
                MRZ Type: {mrz_type}<br/>
                Nationality: {nationality}<br/>
                Number: {number}<br/>
                Sex: {sex}<br/>
            </p>
        </div>
    );
}

export default UploadImage;