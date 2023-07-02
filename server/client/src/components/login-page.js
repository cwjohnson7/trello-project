import styled from "styled-components";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Login page with straightforward login form. 
// Sign up button is there for looks. If we decide to add that functionality
//   the sign up button can just link to a Sign Up Page.
const Login = () => {

  return (
    <LoginContainer>
      <Container>
        <h2 className="mb-3">Hello! Welcome to Trello Jr!</h2>
        <h4 className="mb-4">A Better Management System For Remote, Hybrid, and On-site Workflow!</h4>

        <Form className="col-md-4">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button type="submit">Log in</Button>
            </Col>
            <Col>
              <Button>Sign Up</Button>
            </Col>
          </Form.Group>
        </Form>

      </Container>
    </LoginContainer>
  )
  
};

export default Login;

const LoginContainer = styled.div`
  padding-top: 160px;
  padding-left: 100px;
`;