import { Row } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer-text ">
      <Row className="d-flex justify-content-center align-items-center py-2">
        Flove &copy; {currentYear}
      </Row>
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link as={Link} to="/shop">
            Shop
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/about">
            About Us
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/contact">
            Contact Us
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/delivery">
            Delivery Information
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/faq">
            FAQ
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </footer>
  );
};
export default Footer;
