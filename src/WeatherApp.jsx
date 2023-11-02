import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const WeatherApp = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Get user's geolocation
    navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      // Fetch weather data using geolocation
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=59e5c696979a33879a28c54dbc1b8bac
      `)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data)
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [latitude, longitude]);

  const searchWeather = () => {
    // Fetch weather data using city name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=59e5c696979a33879a28c54dbc1b8bac`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setCity("")
      })
     
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <>
        <div className="card">
     
     
      <div className="search">

      <input
      className='search-bar'
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
        <button><SearchIcon onClick={searchWeather}/></button>
      
      </div>
   
      {weatherData && (
        <div className="weather loading">
          <h2 className="city">{weatherData.name}</h2>
          <p className="temp">Temperature: {weatherData.main.temp}°C</p>
          <div className="flex">
          <img src="https://openweathermap.org/img/wn/04n.png" alt="" className="icon" />
          <div><p>{weatherData.weather[0].description}</p></div>
         
          </div>
          <div className="humidity">Humidity: {weatherData.main.humidity}</div>
          <div className="wind">Wind Speed: {weatherData.wind.speed} Km/h</div>
    
        </div>
       

       
       
      )}
   
      </div>
    </>
  );
};

export default WeatherApp;
