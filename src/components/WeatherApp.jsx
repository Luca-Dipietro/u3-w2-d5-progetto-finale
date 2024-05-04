import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import Forecast from "./ForecastApp";

const Weather = () => {
  const { lat, lon } = useParams();
  const [weather, setWeather] = useState();
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cityName, setCityName] = useState("");

  const getDate = () => {
    let oggi = new Date();
    let ora = oggi.getHours();
    let minuti = oggi.getMinutes();
    return `${ora}:${minuti}`;
  };

  const getDayOfWeek = () => {
    const daysOfWeek = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    const today = new Date();
    const dayOfWeekIndex = today.getDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return dayOfWeek;
  };

  const wetUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b384400926007c2499e4fc29cda50eee&units=metric&lang=it`;

  const fetchWeather = () => {
    fetch(wetUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchWeather();
    setDate(getDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wetUrl]);

  useEffect(() => {
    if (weather && weather.name) {
      setCityName(weather.name);
    }
  }, [weather]);

  return (
    <>
      <div className="mt-3 d-flex justify-content-center align-items-center">
        {isLoading ? (
          <Spinner animation="border" role="status" className="mt-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container fluid className="h-100">
            <Row className="justify-content-center h-100">
              <Col xs={10} md={8} xl={6}>
                <h1 className="mt-3 mb-4 text-center">Meteo - {cityName}</h1>
                <Card className="CardContainer">
                  <Card.Body>
                    <div>
                      <Card.Title className="CardTitle">{getDayOfWeek()}</Card.Title>
                    </div>
                    <div>
                      <Card.Subtitle className="CardSubtitle">{date}</Card.Subtitle>
                    </div>
                    <div className="d-flex flex-column text-center mt-5 mb-4">
                      <h1 className="mb-0 font-weight-bold" style={{ fontSize: "5rem" }}>
                        {weather.main.temp}°C
                      </h1>
                      <span>
                        {weather.weather[0].description.charAt(0).toUpperCase() +
                          weather.weather[0].description.slice(1)}
                      </span>
                    </div>
                    <div className="WeatherInfo">
                      <div style={{ fontSize: "1rem" }}>
                        <div>
                          <WiStrongWind style={{ marginRight: "5px" }} />
                          Vento: {weather.wind.speed} km/h
                        </div>
                        <div>
                          <WiHumidity style={{ marginRight: "5px" }} />
                          Umidità: {weather.main.humidity} %
                        </div>
                        <div>
                          <WiThermometer style={{ marginRight: "5px" }} />
                          Temp. Min: {weather.main.temp_min} °C
                        </div>
                        <div>
                          <WiThermometer style={{ marginRight: "5px" }} />
                          Temp. Max: {weather.main.temp_max} °C
                        </div>
                      </div>
                      <div className="WeatherIcon">
                        <img
                          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                          alt="Weather Icon"
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Forecast lat={lat} lon={lon} />
          </Container>
        )}
      </div>
    </>
  );
};

export default Weather;
