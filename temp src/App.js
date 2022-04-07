import {useRef, useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
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
            url: 'http://127.0.0.1:8000/api/image',
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

    // useEffect(() => {
    //     myRef.current = <h1>world</h1>
    //     console.log(myRef)
    // });
    
    // const helloHandler = () => {
    //     setCheck(<h1>World!</h1>)
    // }

    return (
        <div className="App">

            <input type="file" onChange={handleFileInput}/>

            <button onClick={submitForm}>Submit</button>
            <br/>
            <div class="preload">
                <div class="emoji" ref={intervalRef}>{emoji}</div>
            </div>

            {response && <Display data={response} />}
        
        </div>

        //<div ref={myRef} onClick={helloHandler} >{check}</div>

    );
}

const Display = (props) => {

    const {CNIC_number, country, date_of_birth, expiration_date, first_name, last_name, mrz_code, mrz_type, nationality, number, sex} = props.data

    return(
        <div>
            <p>
                Country: {country}<br/>
                Date of Birth: {date_of_birth}<br/>
                CNIC: {CNIC_number}<br/>
                Expiration Date: {expiration_date}<br/>
                First Name: {first_name}<br/>
                Last Name: {last_name}<br/>
                MRZ Code: {mrz_code}<br/>
                MRZ Type: {mrz_type}<br/>
                Nationality: {nationality}<br/>
                Number: {number}<br/>
                Sex: {sex}<br/>
            </p>
        </div>
    );
}

export default App