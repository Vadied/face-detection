import { Component } from "react";
import axios from "axios";

import { routes } from "../../Constants";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formName: "",
      formEmail: "",
      formPassword: "",
    };
  }

  onSubmit = async (config) => {
    try {
      const { data } = await axios(config);
      if (!data.id) return;

      this.props.loadUser(data);
      this.props.onRouteChange(routes.home);
    } catch (e) {
      console.log("register error", e);
    }
  };

  onNameChange = (event) => {
    this.setState({ formName: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ formEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ formPassword: event.target.value });
  };
}

export default UserForm;
