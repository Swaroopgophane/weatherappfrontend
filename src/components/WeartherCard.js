import React, { useEffect, useState } from 'react';

const WeartherCard = ({tempInfo}) => {

    const [weatherState, setWeatherState] = useState("");

    const {
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
    } = tempInfo;


    useEffect(()=>{
        if(weatherMood){
            switch(weatherMood){
                case "Clear" : setWeatherState("wi-day-sunny");
                break;

                case "Clouds" : setWeatherState("wi-cloudy");
                break;

                case "Haze" : setWeatherState("wi-day-haze");
                break;

                case "Rain" : setWeatherState("wi-rain-mix");
                break;

                case "Mist" : setWeatherState("wi-day-fog");
                break;

                case "Smoke" : setWeatherState("wi-day-fog");
                break;

                default : setWeatherState("wi-day-sunny");
                break;
            }
        }
    },[weatherMood]);




    // converting seconds into time

    let secSunrise = sunrise;
    let dateSunrise = new Date(secSunrise * 1000);
    let timeStrSunrise = `${dateSunrise.getHours()}:${dateSunrise.getMinutes()}`;

    let secSunset = sunset;
    let dateSunset = new Date(secSunset * 1000);
    let timeStrSunset = `${dateSunset.getHours()}:${dateSunset.getMinutes()}`;


  return (
    <>
        <div className='weather-output'>
              <div className='city-section'>
                <h2 className='city-name'>{name} ,{country}</h2>
                <p className='temp-status'>{weatherMood}</p>
              </div>

              <div className='weather-info'>
                <div className='weather-mood'>
                  <i className={`wi ${weatherState}`}></i>
                </div>
                <div className='weather-temp'>
                  <h2>{Math.trunc(temp)}<sup>o</sup>C</h2>
                </div>
                <div className='weather-extra-info'>
                  <div className='extra-info'>
                    <p><i className={"wi wi-thermometer"}></i></p>
                    <span>Feels like : {feels_like}</span>
                  </div>
                  <div className='extra-info'>
                    <p><i className={"wi wi-humidity"}></i></p>
                    <span>Humidity : {humidity}</span>
                  </div>
                  <div className='extra-info'>
                    <p><i className={"wi wi-day-sunny"}></i></p>
                    <span>High : {temp_max}</span>
                  </div>
                  <div className='extra-info'>
                    <p><i className={"wi wi-day-sunny"}></i></p>
                    <span>Low : {temp_min}</span>
                  </div>
                </div>
              </div>

              <div className='weather-footer'>
                <div className='w-footer-col'>
                  <div className='w-footer-icon'>
                    <p><i className={"wi wi-sunrise"}></i></p>
                  </div>
                  <div className='w-footer-info'>
                    <p>{timeStrSunrise}</p>
                    <p>Sunrise</p>
                  </div>
                </div>
                <div className='w-footer-col'>
                  <div className='w-footer-icon'>
                    <p><i className={"wi wi-sunset"}></i></p>
                  </div>
                  <div className='w-footer-info'>
                    <p>{timeStrSunset}</p>
                    <p>Sunset</p>
                  </div>
                </div>
                <div className='w-footer-col'>
                  <div className='w-footer-icon'>
                    <p><i className={"wi wi-hail"}></i></p>
                  </div>
                  <div className='w-footer-info'>
                    <p>{pressure}</p>
                    <p>Pressure</p>
                  </div>
                </div>
                <div className='w-footer-col'>
                  <div className='w-footer-icon'>
                    <p><i className={"wi wi-strong-wind"}></i></p>
                  </div>
                  <div className='w-footer-info'>
                    <p>{speed}</p>
                    <p>Wind</p>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default WeartherCard;