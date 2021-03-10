import { Form, Button } from "react-bootstrap";
import "./_signIn.scss";

import UserForm from "../userForm/UserForm";
import { BASE_URL } from "../../constants.js";

class SignIn extends UserForm {
  constructor(props) {
    super(props);
  }

  signIn = async (event) => {
    event.preventDefault();
    const params = {
      email: this.state.formEmail,
      password: this.state.formPassword,
    };

    const config = {
      method: "post",
      url: `${BASE_URL}/signin`,
      headers: { "Content-Type": "application/json" },
      data: params,
    };

    this.onSubmit(config);
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
          <Button variant="primary" type="submit" onClick={this.signIn}>
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignIn;
