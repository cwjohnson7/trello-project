import styled from "styled-components";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../actions";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

// Login page with straightforward login form. 
// Sign up button is there for looks. If we decide to add that functionality
//   the sign up button can just link to a Sign Up Page.
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    dispatch(
      signin(data, () => {
        navigate("/boards");
      })
    );
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <LoginContainer>
      <Container>
        <h2 className="mb-3">Hello! Welcome to Trello Jr!</h2>
        <h4 className="mb-4">A Better Management System For Remote, Hybrid, and On-site Workflow!</h4>

        <Form onSubmit={handleSubmit(handleFormSubmit)} className="col-md-4">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" name="email" {...register("email", { required: true })} />
            {errors.email?.message}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" {...register("password", { required: true })}/>
            {errors.password?.message}
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button type="submit">Log in</Button>
            </Col>
            <Col>
              <Button onClick={handleSignUpClick}>Sign Up</Button>
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