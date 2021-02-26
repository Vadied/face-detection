import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./_register.scss";

import { routes, baseUrl } from "../../Constants";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
    };
  }

  onSubmitRegister = async () => {
    const params = {
      email: this.state.registerEmail,
      password: this.state.registerPassword,
      name: this.state.registerName,
    };

    const data = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };

    const response = await fetch(`${baseUrl}/register`, data);
    const user = await response.json();

    this.props.loadUser(user);
    this.props.onRouteChange(routes.home);
  };

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  render() {
    return (
      <div className="register">
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={this.onNameChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.onEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.onPasswordChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={this.onSubmitRegister}
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
