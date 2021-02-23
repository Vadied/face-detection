import React from "react";
import { Form, Button } from "react-bootstrap";
import "./_signIn.scss";

import { routes } from "../../Constants";

const SignIn = ({ onRouteChange }) => {
  return (
    <div className="sign-in">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => onRouteChange(routes.home)}
        >
          Sign In
        </Button>

        <Form.Group controlId="formRegister">
          <Form.Text onClick={() => onRouteChange(routes.register)}>
            Register
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignIn;
