import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Nav } from "react-bootstrap";

const MyFooter = function () {
  return (
    <footer className="mt-auto py-3 bg-costume">
      <Container fluid="sm">
        <Row className="d-flex align-items-center justify-content-between">
          <Col>
            <p className="mb-0">© 2024 EpiWeather</p>
          </Col>
          <Col>
            <Nav>
              <ul className="list-unstyled d-flex justify-content-end mb-0">
                <li className="mx-2">
                  <Nav.Link className="footer-link" href="#">
                    Chi Siamo
                  </Nav.Link>
                </li>
                <li className="mx-2">
                  <Nav.Link className="footer-link" href="#">
                    Contatti
                  </Nav.Link>
                </li>
                <li className="mx-2">
                  <Nav.Link className="footer-link" href="#">
                    Termini di Servizio
                  </Nav.Link>
                </li>
              </ul>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
