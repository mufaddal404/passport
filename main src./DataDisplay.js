const DataDisplay = ({ data, setScreen, image, error }) => {

    if (error){
      return(
        <>
          <div><h3>An error occured. Try again</h3></div>
          <button className="btn" onClick={() => setScreen('Home')} >Try Again</button>
        </>
      );
    }
    else {
      const {base64_image, CNIC_number, country, date_of_birth, expiration_date, name, surname, mrz_code, mrz_type, nationality, number, sex} = data;
      return(
        <div className="flex flex-column">
        <h1>Extracted Data</h1>
        <div className='data-container'>
          <img className="thumbnail" src={`data:image/jpg;base64,${base64_image}`} alt="passport" />
          <table>
            <tbody>
            <tr>
              <th>Name:</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>Surname:</th>
              <td>{surname}</td>
            </tr>
            <tr>
              <th>Sex:</th>
              <td>{sex}</td>
            </tr>
            <tr>
              <th>Date of Birth:</th>
              <td>{date_of_birth}</td>
            </tr>
            <tr>
              <th>Nationality:</th>
              <td>{nationality}</td>
            </tr>
            <tr>
              <th>Number:</th>
              <td>{number}</td>
            </tr>
            <tr>
              <th>CNIC:</th>
              <td>{CNIC_number}</td>
            </tr>
            <tr>
              <th>Expiration Date:</th>
              <td>{expiration_date}</td>
            </tr>
            <tr>
              <th>Country:</th>
              <td>{country}</td>
            </tr>
            <tr>
              <th>MRZ Type:</th>
              <td>{mrz_type}</td>
            </tr>
            <tr>
              <th>MRZ Code:</th>
              <td>{mrz_code}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <button className="btn" onClick={() => setScreen('default')} >Home</button>
        </div>
      );
  }
}

export default DataDisplay;