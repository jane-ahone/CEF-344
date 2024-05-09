import "./App.css";
import Heading from "./components/Heading";
import WeatherSummary from "./components/WeatherSummary";
import WeatherDetails from "./components/WeatherDetails";
import SearchBar from "./components/SearchBar";
import Login from "./components/Login/Login";
import { AuthContext, AuthProvider } from "./components/AuthProvider";
import CreateBlogPost from "./components/CreateBlogPost";
import { useState, useEffect, useContext } from "react";
import CircularIndeterminate from "./components/CircularIndeterminate";
import axios from "axios";

function useWeatherState() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const get = () => {
    return weatherInfo;
  };

  return { get, setWeatherInfo };
}

function App() {
  const { loggedIn } = useContext(AuthContext);
  const weatherState = useWeatherState();
  const [loadDefaultCheck, setLoadDefaultCheck] = useState(false);
  // const [LoadingCheck, setLoadingCheck] = useState("default");
  const api_key = "763dbdcdd580d6304155bb98ee4f28b7";

  useEffect(() => {
    if (weatherState.get()) {
      setLoadDefaultCheck(true);
    }
  }, [weatherState.get()]);

  useEffect(() => {
    //Runs only on the first render
    //Making API call for all existing blogs

    axios
      .get("http://localhost:3000/blogdata")
      .then((res) => {
        console.log(res);
      })
      .then((err) => console.log(err));
    //Making weather API call for Buea(default)
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Buea&appid=${api_key}&units=metric`
      )
      .then((response) => {
        weatherState.setWeatherInfo(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loggedIn ? (
        loadDefaultCheck ? (
          <>
            <div className="rootMain">
              <div className="appMain">
                <SearchBar
                  weatherInfoProp={weatherState}
                  loadDefaultCheck={loadDefaultCheck}
                  setloadDefaultCheck={setLoadDefaultCheck}
                />
                <Heading
                  weatherInfoProp={weatherState}
                  loadDefaultCheck={loadDefaultCheck}
                  setloadDefaultCheck={setLoadDefaultCheck}
                />
                <WeatherSummary
                  weatherInfoProp={weatherState}
                  loadDefaultCheck={loadDefaultCheck}
                />
                <WeatherDetails
                  weatherInfoProp={weatherState}
                  loadDefaultCheck={loadDefaultCheck}
                />
              </div>
            </div>
            <CreateBlogPost />
          </>
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
