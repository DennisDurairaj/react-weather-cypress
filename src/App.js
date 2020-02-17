import React, { useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  
  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  
  return (
    <Container className="App">
      <Row className="justify-content-center">
        <Col sm={6}>
          <Form onSubmit={fetchForecastCity} className="App">
            <Form.Group as={Row} className="align-items-center">
              <Form.Label column sm={3}>
                City name
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  name="cityName"
                  data-cy="cityName"
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </Col>
              <Col sm={2}>
                <Button variant="primary" data-cy="submitCity" type="submit">
                  Submit
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {Object.entries(weatherData).length !== 0 && (
        <div data-cy="weatherDisplay">
          <h2>{capitalizeFirstLetter(weatherData.name)}</h2>
          <ul>
            <li>Temp: {weatherData.main.temp}</li>
            <li>Feels like: {weatherData.main.feels_like}</li>
            <li>Pressure: {weatherData.main.pressure}</li>
          </ul>
        </div>
      )}
      {cityNotFound && <div>Sorry! City does not exist in database!</div>}
    </Container>
  );
}

export default App;
