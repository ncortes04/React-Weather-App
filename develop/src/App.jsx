import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment'

function App(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const units = "imperial"
  const APIKey="5f7a30057399336fce09fdf115bb9746";
  
  const fetchData = async () => {
    setIsLoading(true);
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&units=${units}&appid=${APIKey}`)
      .then(response => response.json())
      .then(data => {
        const filteredData = data.list.filter((item, index) => index % 8 === 0);
        setData(filteredData);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  };
 
  useEffect(() => {
    fetchData(props.city);
  }, [props.city]);
  const date = moment("2015-07-02"); // Thursday Feb 2015
  const dow = date.day();
  return (
    <div className="main">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='card-row'>
          {data.length > 0 && data.map((item, index) => (
            <div className={`card ${item.weather[0].description.replace(/\s/g, '')}`} key={index}>
              <p className='card-header'>{daysOfWeek[moment(item.dt_txt).days() -1]}</p>
              <p className='card-date'>{moment(item.dt_txt).format("MMM DD")}</p>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}></img>
              <p>{Math.round(item.main.temp)}</p>
            </div>
          ))}
        </div>
      )}
   </div>
  );
}

export default App;
