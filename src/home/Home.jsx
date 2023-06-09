import { Link, useNavigate } from 'react-router-dom';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
//import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from '_state';
//import { Button } from 'react-bootstrap';

function Home() {
    const auth = useRecoilValue(authAtom);
    return (
        <div className="p-4">
            <div className="container">
                <h1><b>MAIN SERVICE</b></h1>
                <h2>Weclome to SHrack!</h2>
                <p>Hi {auth?.username}!</p>
                <Link to="./my.js"> 
                  <button> 녹화 시작 </button>
                </Link>
                <br></br>
            </div>
        </div>

          
    );
 
}
export { Home };

/*const ReactDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
  
      return (
          <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
              />
          </div>
    );
  };
export default ReactDatePicker;*/