const DataDisplay = ({ data, setScreen, image, error }) => {

  

    if (error){
      return(
        <>
          <div><h3>An error occured. Try again</h3></div>
          <button className="btn" onClick={() => setScreen('cam')} >Scan Again</button>
        </>
      );
    }
    else {
      const {CNIC_number, country, date_of_birth, expiration_date, first_name, last_name, mrz_code, mrz_type, nationality, number, sex} = data;
      return(
        <div>
        <h1>Data Display</h1>
        <div className='data-container'>
          <img src={image} alt="passport" />
          <ul>
            <li>Country: {country}</li>
            <li>Date of Birth: {date_of_birth}</li>
            <li>CNIC: {CNIC_number}</li>
            <li>Expiration Date: {expiration_date}</li>
            <li>First Name: {first_name}</li>
            <li>Last Name: {last_name}</li>
            <li>MRZ Code: {mrz_code}</li>
            <li>MRZ Type: {mrz_type}</li>
            <li>Nationality: {nationality}</li>
            <li>Number: {number}</li>
            <li>Sex: {sex}</li>
          </ul>
        </div>
        <button className="btn" onClick={() => setScreen('cam')} >Scan Again</button>
        </div>
      );
    }
}

export default DataDisplay;