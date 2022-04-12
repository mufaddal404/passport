const Popup = ({setCapture, capture}) => {
    return(
        <div className="container">
                <div className="popup">
                    <img  alt="passport" />
                    <a href={''} download>Save image</a>
                    <div>
                        <button className="btn" onClick={() => setCapture(!capture)}>Retake</button>
                        <button className="btn" onClick={() => null}>Continue</button>
                    </div>
                </div>
                {/* <div className="emoji" ref={intervalRef}>{emoji}</div> */}
        </div>
    )
}

export default Popup;