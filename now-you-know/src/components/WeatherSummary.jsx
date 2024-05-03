import React from "react";
import "./WeatherSummary.css";

const WeatherSummary = ({ weatherInfoProp }) => {
  function sentenceCase(text) {
    // Split the string into sentences using punctuation marks as delimiters
    const sentences = text.split(/(?<=[.!?])\s+/);

    // Capitalize the first letter of each sentence
    const capitalizedSentences = sentences.map((sentence) => {
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    });

    // Join the modified sentences back into a single string
    const result = capitalizedSentences.join(" ");

    return result;
  }
  const weatherInfo = weatherInfoProp.get();

  return (
    <div className="weatherSummaryMain">
      <div className="rectangle-div">
        <div>
          <p className="temp-heading">TEMPERATURE</p>
          <span className="temp">{weatherInfo.data.main.temp}</span>
          <p className="real-feel">
            Real feel: {weatherInfo.data.main.feels_like}
          </p>
        </div>
        <div>
          <img src="../src/assets/cloud.svg"></img>
          <p>{weatherInfo.data.weather[0].main}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;
