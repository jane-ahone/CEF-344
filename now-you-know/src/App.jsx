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
import DisplayBlogPost from "./components/DisplayBlogPost";
import { gapi } from "gapi-script";

const clientId =
  "1060827309369-9ltp1clj1dpoissuioahovdlku2ejrcq.apps.googleusercontent.com";

function useWeatherState() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const get = () => {
    return weatherInfo;
  };

  return { get, setWeatherInfo };
}
function useExistingPost() {
  const [exitingPost, set] = useState([null]);
  const get = () => {
    return exitingPost;
  };

  return { get, set };
}

function App() {
  const { loggedIn } = useContext(AuthContext);
  const weatherState = useWeatherState();
  const exitingPosts = useExistingPost();
  const [loadDefaultCheck, setLoadDefaultCheck] = useState(false);

  const api_key = "763dbdcdd580d6304155bb98ee4f28b7";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("Client:Auth2", start);
  });

  useEffect(() => {
    if (weatherState.get()) {
      setLoadDefaultCheck(true);
    }
  }, [weatherState.get()]);

  useEffect(() => {
    //Making API call for all existing blogs
    axios
      .get("http://localhost:3000/blogdata")
      .then((res) => {
        console.log(res);
        exitingPosts.set(res.data.data);
      })
      .then((err) => console.log(err));
  }, []);

  useEffect(() => {
    //Runs only on the first render

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
            <CreateBlogPost blogpost={exitingPosts} />
            <DisplayBlogPost blogpost={exitingPosts} />
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
