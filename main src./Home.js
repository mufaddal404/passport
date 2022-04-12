const Home = ({setScreen}) => {
    return(
    <div className='main flex flex-column'>
        <div className="welcome">
          <h1>Welcome to Passport Data Extraction App</h1>
          <h3>Choose one of the methods and continue</h3>
        </div>
        <p className='methods'>
          <button className='btn' onClick={() => setScreen('cam')} >Use Cam</button>
          <b>Or</b>
          <button className="btn" onClick={() => setScreen('upload')} >Upload Image</button>
        </p>
    </div>
    );
}

export default Home;