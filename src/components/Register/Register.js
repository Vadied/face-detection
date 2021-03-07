import { Form, Button } from "react-bootstrap";
import "./_register.scss";

import UserForm from "../userForm/UserForm";
import { routes, baseUrl } from "../../Constants";

class Register extends UserForm {
  constructor(props) {
    super(props);
  }

  register = async (event) => {
    event.preventDefault();
    const params = {
      email: this.state.formEmail,
      password: this.state.formPassword,
      name: this.state.formName,
    };

    const config = {
      method: "post",
      url: `${baseUrl}/register`,
      headers: { "Content-Type": "application/json" },
      data: params,
    };

    this.onSubmit(config);
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

          <Button variant="primary" type="submit" onClick={this.register}>
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
