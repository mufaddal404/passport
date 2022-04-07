import './App.css';
import {useCallback, useRef, useState} from 'react';
import Cam from './Cam';
import DataDisplay from './DataDisplay';
import imageData from './data';
import DetectRTC from 'detectrtc';

function App() {

  const [image, setImage] = useState('');
  
  const [screen, setScreen] = useState('default');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  if(screen === 'default'){
    return ( 
      <div className='main'>
        <button className='btn' onClick={() => setScreen('cam')} >Scan</button>
      </div>
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
}

export default App;
