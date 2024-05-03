import "./App.css";
import Heading from "./components/Heading";
import WeatherSummary from "./components/WeatherSummary";
import WeatherDetails from "./components/WeatherDetails";
import SearchBar from "./components/SearchBar";
import { useState, useEffect, useContext } from "react";
import CircularIndeterminate from "./components/CircularIndeterminate";
import axios from "axios";
import Login from "./components/Login/Login";
import { AuthContext, AuthProvider } from "./components/AuthProvider";

function useWeatherState() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const get = () => {
    return weatherInfo;
  };

  return { get, setWeatherInfo };
}

function App() {
  const { loggedIn } = useContext(AuthContext);
  console.log(AuthProvider);
  const weatherState = useWeatherState();
  const [loadDefaultCheck, setLoadDefaultCheck] = useState(false);
  const api_key = "763dbdcdd580d6304155bb98ee4f28b7";

  useEffect(() => {
    //Runs only on the first render
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Buea&appid=${api_key}&units=metric`
      )
      .then((response) => {
        weatherState.setWeatherInfo(response);
        setLoadDefaultCheck(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      {console.log(loggedIn)}
      {loggedIn ? (
        loadDefaultCheck ? (
          <div className="rootMain">
            <div className="appMain">
              <SearchBar weatherInfoProp={weatherState} />
              <Heading weatherInfoProp={weatherState} />
              <WeatherSummary weatherInfoProp={weatherState} />
              <WeatherDetails weatherInfoProp={weatherState} />
            </div>
          </div>
        ) : (
          <>
            <CircularIndeterminate />
          </>
        )
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
