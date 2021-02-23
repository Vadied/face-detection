import React from "react";
import { Form, Button } from "react-bootstrap";
import "./_register.scss";

import { routes } from "../../Constants";

const Register = ({ onRouteChange }) => {
  return (
    <div className="register">
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Enter name" />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => onRouteChange(routes.home)}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
