import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { WiRain, WiStrongWind, WiThermometer } from "react-icons/wi";
import { useParams } from "react-router-dom";

const Forecast = () => {
  const { lat, lon } = useParams();
  const [forecast, setForecast] = useState();
  const forUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b384400926007c2499e4fc29cda50eee&units=metric&lang=it`;

  const fetchForecast = () => {
    fetch(forUrl)
      .then((response) => response.json())
      .then((data) => {
        setForecast(data);
      })

      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forUrl]);

  return (
    <div className="forecast-container">
      <h2 className="mt-3">Previsioni Meteo</h2>
      <Row className="forecast-cards">
        {forecast &&
          forecast.list.map((item, index) => {
            const date = new Date(item.dt * 1000);
            return (
              <Col xs={12} md={6} lg={4} xl={3} key={index}>
                <Card className="forecast-card">
                  <Card.Body>
                    <Card.Title>
                      <div className="d-flex justify-content-between">
                        <p>{date.toLocaleDateString()}</p>
                        <p>{item.dt_txt.slice(10)}</p>
                      </div>
                    </Card.Title>
                    <Row className="flex-column align-items-center">
                      <Col>
                        <Card.Text>
                          <WiThermometer className="weather-icon" />
                          Temperatura: {item.main.temp} °C
                        </Card.Text>
                        <Card.Text>
                          <WiStrongWind className="weather-icon" />
                          Vento: {item.wind.speed} km/h
                        </Card.Text>
                        <Card.Text>
                          <WiRain className="weather-icon" />
                          Prob. Pioggia: {item.clouds.all} %
                        </Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>
                          <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt="Weather Icon"
                          />
                          {item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
export default Forecast;
