import React from 'react'
import './Weather.css'
import { useState, useEffect } from 'react';
import Thermo from '../../assests/thermo.svg';
import Wind from '../../assests/wind.svg';
import Humidity from '../../assests/humidity.svg';
import Line from '../../assests/Line.png';

function Weather() {
  const [formattedDateTime, setFormattedDateTime] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const result = await fetch("http://api.weatherapi.com/v1/current.json?key=93ae3766614848499db101510232308&q=kolkata&aqi=no");
        const data = await result.json();
        setWeather(data);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    const updateFormattedDateTime = () => {
      const now = new Date();

      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');

      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      const formattedDate = `${month}-${day}-${year}`;
      const formattedTime = `${hours % 12 || 12}:${minutes}`;
      const formattedDateTime = `${formattedDate} \u00A0 ${formattedTime} ${hours >= 12 ? 'PM' : 'AM'}`;
      setFormattedDateTime(formattedDateTime);
    };

    updateFormattedDateTime();
    const intervalId = setInterval(updateFormattedDateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="WeatherTimeDate">
      <div>
        <p className='dateDisplay'>{formattedDateTime}</p>
      </div>
      {weather ?
        <div className='Weather'>
          <div className='condition'>
            <img src={weather.current.condition.icon} alt="Weather Icon" height={65} width={65} />
            <p style={{width:"125px"}}>{weather.current.condition.text}</p></div>
            <img src={Line} width={2}/>
          <div className='pressure'>
            <p style={{fontSize:"40px"}}>{weather.current.temp_c}°C </p>
            <pre><img src={Thermo} style={{position: "relative", top:"10px", paddingRight:"10px"}}/><span> {weather.current.pressure_mb} mbar<br/>       Pressure</span></pre>
          </div>
          <img src={Line} width={2}/>
          <div className='humidity'>
            <pre><img src={Wind} style={{position: "relative", top:"10px", paddingRight:"10px"}}/><span>{weather.current.wind_kph} km/h<br/>          Wind</span></pre>
            <pre><img src={Humidity} style={{position: "relative", top:"12px", paddingRight:"10px"}}/><span> {weather.current.humidity}%<br/>        Humidity</span></pre>
          </div>
        </div> : <> </>}

    </div>
  )
}

export default Weather;
