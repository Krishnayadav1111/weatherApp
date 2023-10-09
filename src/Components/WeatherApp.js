import React, { useState } from "react";
import "./WeatherApp.css";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";
import humidity_icon from "./Assets/humidity.png";
import clear_icon from "./Assets/clear.png";
import search_icon from "./Assets/search.png";
import cloud_icon from "./Assets/cloud.png";

function WeatherApp() {
  const api_key = "44ce106971ceca69f64ac3c6cf410b42";

  const [weatherData, setWeatherData] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [wicon, setWicon] = useState(cloud_icon);
  const [errorMessage, setErrorMessage] = useState("");

  const search = async () => {
    if (cityInput === "") {
      setErrorMessage("Please enter the city name or country name.");
      return;
    } else {
      setErrorMessage("");
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;
    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      console.warn("Fetched weather data:", data);
      setWeatherData(data);
      setWeatherIcon(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const setWeatherIcon = (data) => {
    const iconMap = {
      "01d": clear_icon,
      "01n": clear_icon,
      "02d": cloud_icon,
      "50d": cloud_icon,
      "02n": cloud_icon,
      "03d": drizzle_icon,
      "03n": drizzle_icon,
      "04d": drizzle_icon,
      "04n": drizzle_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snow_icon,
      "13n": snow_icon,
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
          <img src={search_icon} alt="" />
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {weatherData && (
        <div>
          <div className="weather-image">
            <img src={wicon} alt="" />
          </div>
          <div className="weather-temp">{Math.floor(weatherData.main.temp)}°C</div>
          <div className="weather-location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData.main.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
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

export default WeatherApp;
