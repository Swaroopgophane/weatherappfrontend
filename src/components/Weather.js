import React, { useEffect, useState } from 'react';
import WeartherCard from './WeartherCard';
import {useNavigate} from 'react-router-dom';


const Weather = () => {

  const [searchVal, setSearchVal] = useState("Kolhapur");
  const [tempInfo, setTempInfo] = useState({});
  const navigate = useNavigate();


  const callWeatherPage = async () =>{
    try{
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/weather`,{
        method:"GET",
        credentials:"include",
        headers:{
          "Accept": "application/json",                    // process to get data from cookies or backend
          "Content-Type":"application/json"
        },
      });
      
      await res.json();

      
    }catch(err){
      console.log(err);
      navigate('/login');
    }
  }


  const getWeatherInfo = async () =>{
    try{

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=metric&appid=${process.env.REACT_APP_SECRET_ID}`;


      const res = await fetch(url);

      const data = await res.json();

      const { temp,feels_like,pressure,humidity,temp_min,temp_max} = data.main;
      const {main:weatherMood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country,sunrise,sunset} = data.sys;

      const myWeather = {
        temp,
        feels_like,
        pressure,
        humidity,
        temp_min,
        temp_max,
        weatherMood,
        name,
        speed,
        country,
        sunrise,
        sunset
      };

      setTempInfo(myWeather);

    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    callWeatherPage();
    getWeatherInfo();
    
  },[]);

   // Set the background according to temperature

   const setBackground = () =>{
    if(tempInfo.weatherMood === "Clear"){
        return "linear-gradient(#0586c6,#0a94a1)";
    }else if(tempInfo.weatherMood === "Clouds"){
      return "linear-gradient(#595755,#1d1d1b)";
    }
    else if(tempInfo.weatherMood === "Rain"){
      return "linear-gradient(#323e5c,#1d1d1b)";
    }
    else if(tempInfo.weatherMood === "Haze"){
      return "linear-gradient(#dd720d,#cdbe19)";
    }
    else if(tempInfo.weatherMood === "Smoke"){
      return "linear-gradient(#93bdd6,#3d7287)";
    }
    else if(tempInfo.weatherMood === "Mist"){
      return "linear-gradient(#93bdd6,#3d7287)";
    }
  };

  return (
    <>
       <div className='weather-page'style={{background:setBackground()}}>
          <div className='weather-container'>

            <div className='weather-input'>
              <input type="search" className='input-field' autoFocus id="search" placeholder='Enter the city name' value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
              <button className='searchBtn' onClick={getWeatherInfo}>Search</button>
            </div>

            <div className='date-container'>
              <p>{new Date().toDateString()} | {new Date().toLocaleTimeString()}</p>
            </div>

            <WeartherCard tempInfo = {tempInfo} />


          </div>
       </div>
    </>
  )
}

export default Weather;