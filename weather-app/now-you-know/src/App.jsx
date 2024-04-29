import "./App.css";
import Heading from "./components/Heading";
import WeatherSummary from "./components/WeatherSummary";
import WeatherDetails from "./components/WeatherDetails";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

import Login from "./components/Login/Login";

function useWeatherState() {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const get = () => {
    return weatherInfo;
  };

  return { get, setWeatherInfo };
}
function App() {
  const weatherState = useWeatherState();
  return (
    <>
      <Login />
      {/* <div className="appMain">
        {console.log("Rerender")}
        <SearchBar weatherInfoProp={weatherState} />
        {console.log(weatherState.get())}
        <Heading weatherInfoProp={weatherState} />
        <WeatherSummary weatherInfoProp={weatherState} />
        <WeatherDetails weatherInfoProp={weatherState} />
      </div> */}
    </>
  );
}

export default App;
