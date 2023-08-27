import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = 'f6fc8993714f19a69a0f6c61e4580f89';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(''); 

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(`${API_BASE_URL}?q=${cityName}&appid=${API_KEY}`);
      if (response.ok) {
        const data = await response.json();
  
        // Convert temperature from Kelvin to Celsius
        const temperatureCelsius = data.main.temp - 273.15;
  
        // Update the temperature property in the data object
        data.main.temp = temperatureCelsius.toFixed(2);
  
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input /*className='SCity'*/
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Weather: {weatherData.weather[0].main}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
