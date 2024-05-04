import React, { useState } from "react";
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const MyNavBar = (props) => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const hideForm = location.pathname === "/";

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
    <>
      <Navbar expand="lg" variant="light">
        <Container fluid>
          <Navbar.Brand href="#">{props.brandName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
            </Nav>
            {hideForm ? null : (
              <Form onSubmit={handleFormSubmit} className="ms-auto">
                <div className="d-flex align-items-center">
                  <FormControl
                    type="text"
                    placeholder="Cerca Città"
                    value={city}
                    onChange={handleInputChange}
                    style={{ marginRight: "8px" }}
                  />
                  <Button variant="dark" type="submit">
                    Cerca
                  </Button>
                </div>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavBar;
