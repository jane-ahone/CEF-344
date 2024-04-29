import React from "react";
import "./WeatherDetails.css";

const WeatherDetails = ({ weatherInfoProp }) => {
  const weatherInfo = weatherInfoProp.get();
  return (
    <div className="weather-detailsMain">
      <div className="group-parent">
        <div className="uv-index-parent">
          <div className="uv-index">UV Index</div>
          <div className="humidity">Humidity</div>
          <div className="wind-speed">Wind Speed</div>
          <div className="rain-probability">Rain Probability</div>
          <div className="pressure">Pressure</div>
        </div>
        <div className="parent">
          <div className="div">1.0</div>
          <div className="div1">55</div>
          <div className="mph">5.00 mph</div>
          <div className="div2">30%</div>
          <div className="pa">1023.1 pa</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
