import React, { useState } from "react";
import "./App.css";
import { mockAPI } from "./api";

function App() {
  const [input, setInput] = useState({
    cityName: "",
    lat: "",
    lon: ""
  });
  const [weatherData, setWeatherData] = useState({});
  const [cityNotFound, setCityNotFound] = useState(false);
  const fetchForecastCity = e => {
    e.preventDefault();
    setWeatherData({});

    mockAPI(input.cityName)
      .then(data => {
        if (data) {
          setWeatherData(data);
          setCityNotFound(false);
        } else {
          setCityNotFound(true);
        }
      })
      .catch(err => console.log(err));
  };

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setInput({ ...input, [name]: newValue });
  };

  return (
    <>
      <form onSubmit={fetchForecastCity} className="App">
        <label>City name</label>
        <input
          name="cityName"
          data-cy="cityName"
          onChange={handleChange}
          type="text"
        />
        <input data-cy="submitCity" type="submit" value="Submit" />
      </form>
      {Object.entries(weatherData).length !== 0 && (
        <div data-cy="weatherDisplay">
          City: {weatherData.name}
          <ul>
            <li>Temp: {weatherData.main.temp}</li>
            <li>Feels like: {weatherData.main.feels_like}</li>
            <li>Pressure: {weatherData.main.pressure}</li>
          </ul>
        </div>
      )}
      {cityNotFound && <div>Sorry! City does not exist in database!</div>}
    </>
  );
}

export default App;
