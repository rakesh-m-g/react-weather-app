import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import night from "./night.jpg";

const apiKey = "2VXNCLWCN2QYBZTHRJU89EP8Q";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = (city) => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data.");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
    } else {
      alert("Please enter a city name.");
    }
  };

  return (
    <div className="App">























      
      <h1 className="heading">Feel Me  Weather Forecast</h1>
      <form onSubmit={handleSearch}> <div className=" d-flex items-align-center justify-content-center">
      <input className=" form-control p-lg-3 m-lg-5 w-50"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

      </div>
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div className="weather-details">
          <h2>Location: {weatherData.resolvedAddress}</h2>
          <h3>Current Conditions: {weatherData.currentConditions.conditions}</h3>
          <h3>Temperature: {weatherData.currentConditions.temp}°C</h3>
          <div className="forecast">
            <h3>5-Day Forecast:</h3>
            {weatherData.days.slice(0, 5).map((day, index) => (
              <div className={`weather-box day-${index + 1}`} key={day.datetime}>
                <h3>{day.datetime}</h3>
                <p>Max Temp: {day.tempmax}°C</p>
                <p>Min Temp: {day.tempmin}°C</p>
                {/* Add more weather information as needed */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
