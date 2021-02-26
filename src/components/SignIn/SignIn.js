import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./_signIn.scss";

import { routes, baseUrl } from "../../Constants";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onSubmitSignIn = () => {
    const params = {
      email: this.state.signInEmail,
      password: this.state.signInPassword,
    };

    const data = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };
    
    fetch(`${baseUrl}/signin`, data)
      .then(response => response.json())
      .then(user => {
        this.props.loadUser(user);
        this.props.onRouteChange(routes.home);
    });
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="sign-in">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.onEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.onPasswordChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.onSubmitSignIn}>
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
  }
}

export default SignIn;
