import React from "react";
import "./WeatherDetails.css";

const WeatherDetails = ({ weatherInfoProp }) => {
  const weatherInfo = weatherInfoProp.get();
  return (
    <div className="weather-detailsMain">
      <div className="group-parent">
        <div className="uv-index-parent">
          <div className="humidity">Humidity</div>
          <div className="wind-speed">Wind Speed</div>
          <div className="pressure">Pressure</div>
        </div>
        <div className="parent">
          <div className="div1">{weatherInfo.data.main.humidity}</div>
          <div className="mph">{weatherInfo.data.wind.speed} mph</div>
          <div className="pa">{weatherInfo.data.main.humidity} pa</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
