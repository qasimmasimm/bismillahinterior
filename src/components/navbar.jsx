import { Container, Nav, Navbar } from "react-bootstrap";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbarr() {
  return (
    <>
      <div className="topbar">
        <Container>
          <div className="topbar-content">
            <span>Premium Interior Solutions in Lahore</span>

            <div className="topbar-contact">
              <a href="tel:+923354496040">
                <FaPhoneAlt /> +92 335 4496040
              </a>

              <a
                href="https://wa.me/923354496040"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Navbar expand="lg" className="bismillah-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand">
            <span>BISMILLAH</span>
            <small>INTERIORS</small>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>

              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>

              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>

              <Nav.Link as={Link} to="/projects">
                Projects
              </Nav.Link>

              <Nav.Link as={Link} to="/testimonials">
                Testimonials
              </Nav.Link>

              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>

            <Link to="/contact" className="navbar-quote">
              Get a Quote
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}