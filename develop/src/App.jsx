import './App.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import Loading from './pages/loading';

function App(props) {
  const [data, setData] = useState([]);
  const [dataCurrent, setDataCurrent] = useState([]);
  const Symbol = useRef()
  const resultError = useRef()
  const [isLoading, setIsLoading] = useState(null);
  const APIKey="5f7a30057399336fce09fdf115bb9746"
  const fetchData = async (options = {}) => {
    resultError.current = null

    if(!props.city) return
    const { timeout = 3000 } = options;
  
    const controller = new AbortController();
    const id = setTimeout(() => {
      setIsLoading(false);
      resultError.current = "No Results Found"
      controller.abort()
    }
      , timeout);
      console.log(dataCurrent)
    try{
      setIsLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&units=${props.units}&appid=${APIKey}`, {
        ...options,
        signal: controller.signal  
      })
      const responseCurrent = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&units=${props.units}&appid=${APIKey}`, {
        ...options,
        signal: controller.signal  
      })
      if(response.status === 404){
        setIsLoading(false);
        resultError.current = "No Results Found"
        setData([]);
        setDataCurrent([]);
        return
      }
        const data = await response.json()
        const dataCurrent = await responseCurrent.json()

        const filteredData = data.list.filter((item, index) => index % 8 === 0);
        setData(filteredData);
        setDataCurrent(dataCurrent)
        setIsLoading(false);
        clearTimeout(id);
    } catch (error) {
      console.error(error);
    }
    
  };
  useEffect(() => {
    if(props.units === 'imperial'){
      Symbol.current = "\u00b0F"
    } else if(props.units === 'metric'){
      Symbol.current = "\u00b0C"
    } else {
      Symbol.current = " K"
    }
    fetchData(props.city);
  }, [props.city, props.units]);

  return (
    <main className='main'>
         <div>
           {props.city ? <h2 className='current-city'>Showing Results For :</h2> : null}
          </div>
    <div  className="cards-div">
   {resultError.current ? <p className='error'>{resultError.current}</p>: null}
      {isLoading ? (
        <Loading/>
      ) :  isLoading === false && props.city && !resultError.current? (
        <div className='weather-container'>
        <div className='current-div'>
          <div className='current-left'>
           <h2 className='current-large'>{dataCurrent.name}</h2>
           <p>Lat: {dataCurrent.coord.lat} Lon: {dataCurrent.coord.lon}</p>
           <p className='text-secondary'>{dataCurrent.weather[0].description}</p>
           <p>Wind {dataCurrent.wind.speed} MPH</p>
          </div>
          <div className='current-right'>
            <div className='temp-box'>
              <p className='current-temp'>{Math.round(dataCurrent.main.temp)}{Symbol.current}</p>
              <p className={'temp-secondary mg-0'}>
                High: {dataCurrent.main.temp_max}{Symbol.current}</p>
               <p className={'temp-secondary mg-0'}> Low: {dataCurrent.main.temp_min}{Symbol.current}</p>
            </div>
            <div className='current-secondary-div'>
              <p className={'text-bold text-secondary'}> Today &#x2022; {moment(dataCurrent.dt_txt).format("MMM DD YYYY")}</p>
            </div>
          </div>
        </div>
        <div className='card-row'>
          {data.length > 0 && data.map((item, index) => (
            <div className={`card ${item.weather[0].description.replace(/\s/g, '')}`} key={index}>
              <div className={`card-header-div`}>
                  <p className='card-header '>{moment().day(moment(item.dt_txt).weekday()).toString().split(' ')[0]}</p>
              </div>
              <div className='card-body-div'>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}></img>
                    <p className={'card-date text-bold'}>{moment(item.dt_txt).format("MMM DD")}</p>
              </div>
              <div className='card-footer-div'>
                <p className='text-bold pd-1'>{Math.round(item.main.temp)}{Symbol.current}</p>
                <p className='text-secondary card-description'>{item.weather[0].description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : null }
   </div>
   </main>
  );
}

export default App;
