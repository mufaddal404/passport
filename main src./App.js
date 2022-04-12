import './App.css';
import {useCallback, useRef, useState} from 'react';
import Cam from './Cam';
import UploadImage from './UploadImage';
import DataDisplay from './DataDisplay';
import imageData from './data';
import DetectRTC from 'detectrtc';
import Webcam from 'react-webcam';
import Home from './Home';

function App() {

  const [image, setImage] = useState('');
  
  const [screen, setScreen] = useState('default');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  if(screen === 'default'){
    return ( 
      <Home  setScreen={setScreen} />
    );
  }
  else if(screen === 'cam'){
    return (
      <div className="App">
        <Cam setImage={setImage} setScreen={setScreen} image={image} setResponse={setResponse} setError={setError} />
      </div>
    );
  }
  // else if(screen === 'show-image'){
  //   return (
  //     <div className="App">
  //       <img src={image} />
  //       <br/>
        
  //     </div>
  //   );
  // }
  else if(screen === 'datapane'){
    return(
      <DataDisplay data={response} setScreen={setScreen} image={image} error={error} />
    );
  }
  else if(screen === 'upload'){
    return(
      <UploadImage setImage={setImage} image={image} setScreen={setScreen} setResponse={setResponse} setError={setError} />
    )
  }
}

export default App;
