import { useState } from "react";
import { Button, Card, Container, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchCity();
  };

  const fetchCity = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b384400926007c2499e4fc29cda50eee&units=metric&lang=it`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.coord) {
          navigate(`/WeatherApp/${data.coord.lat}/${data.coord.lon}`);
          setCity("");
        } else {
          console.error("Error: City not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "85vh" }}>
      <Card className="weather-card">
        <Card.Body>
          <Card.Title className="text-center mb-4">Benvenuto nell'app Meteo!</Card.Title>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <FormControl type="text" placeholder="Cerca Città" value={city} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 text-color">
              Cerca
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Home;
