import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import styled from "styled-components";

// Using React-Bootstrap and style-components. 
// I will try to style more as the project goes on. 
// I want to get a skeleton built first then get more complex.

// Header/NavBar to show Logo, Title, and other potential nav links.
// My simple idea for Login Info is to have a dropdown that says "Please Log In" or
//   if user is logged in then it will say "Username is currently logged in" and
//   maybe add a Sign Out but there as well.
const Header = (props) => {

  return (
    <NavContainer>
      <Container fluid>
        <Row className="align-items-center">
          <Col md={1}>
            <Image src="favicon.ico" fluid />
          </Col>
          <Col md={{ span: 8, offset: 1 }}>
            <h1 className="display-3"><strong>Trello Jr</strong></h1>
          </Col>
          <Col md={2}>
            <p>Login Info</p>
          </Col>
        </Row>
      </Container>
    </NavContainer>
  )
};

export default Header;

const NavContainer = styled.div`
  position: fixed;
  z-index: 999;
  background: hsl(0, 0%, 12%);
  color: white;
  margin: 0;
  width: 100%;
  height: auto;
  padding: 1.5em;
`;