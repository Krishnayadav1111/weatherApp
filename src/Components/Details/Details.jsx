
import React, { useState } from "react";
import "./Details.css";   
import axios from "axios"; 


function Details() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [wicon, setWicon] = useState("/Assets/cloud.png"); 
  const [errorMessage, setErrorMessage] = useState("");
  

  const api_key = process.env.REACT_APP_API_KEY;

 

  const search = async () => {
    if (cityInput === "") {
      setErrorMessage("Please enter the city name or country name.");
      return;
    } else {
      setErrorMessage("");
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
   
   
        console.warn("Fetched weather data:", data);
        setWeatherData(data);
        setWeatherIcon(data);
      }
     catch (error) {
        setErrorMessage("Please enter a valid city or country name.");
      console.error("Error fetching weather data:", error);
    }
  };

  const setWeatherIcon = (data) => {
   
    const iconMap = {
      "01d": "/Assets/clear.png",
      "01n": "/Assets/clear.png",
      "02d": "/Assets/cloud.png",
      "50d": "/Assets/cloud.png",
      "02n": "/Assets/cloud.png",
      "03d": "/Assets/drizzle.png",
      "03n": "/Assets/drizzle.png",
      "04d": "/Assets/drizzle.png",
      "04n": "/Assets/drizzle.png",
      "09d": "/Assets/rain.png",
      "09n": "/Assets/rain.png",
      "10d": "/Assets/rain.png",
      "10n": "/Assets/rain.png",
      "13d": "/Assets/snow.png",
      "13n": "/Assets/snow.png",
    };

    const iconKey = data?.weather?.[0]?.icon || "03d";
    setWicon(iconMap[iconKey]);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          className="cityInput"
          type="text"
          placeholder="Search"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <div className="search-icon" onClick={search}>
          <img src="/Assets/search.png" alt="" />
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {weatherData && (
        <div>
          <div className="weather-image">
            <img src={wicon} alt="" />
          </div>
          <div className="weather-temp">
            {Math.floor(weatherData.main.temp)}°C
          </div>
          <div className="weather-location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src="/Assets/humidity.png" alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData.main.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src="/Assets/wind.png" alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">
                  {weatherData.wind.speed}km/hr
                </div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;


