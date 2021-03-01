import { Component } from "react";
import "./App.css";
import Particles from "react-particles-js";
import { get } from "lodash";
import axios from "axios";

import { routes, baseUrl } from "./Constants";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const particlesParams = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: routes.signIn,
  isSignedIn: false,
  user: {
    id: 0,
    name: "",
    email: "",
    joined: "",
    entries: 0,
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  clearState = () => this.setState({ ...initialState });

  calculateFaceLocation = (region) => {
    const coordinates = get(region[0], "region_info.bounding_box", {});
    const image = document.getElementById("input-image");
    const width = image.width;
    const height = image.height;
    return {
      leftCol: coordinates.left_col * width,
      topRow: coordinates.top_row * height,
      rightCol: (1 - coordinates.right_col) * width,
      bottomRow: (1 - coordinates.bottom_row) * height,
    };
  };

  displayFaceBox = (data) => {
    const regions = get(data, "outputs[0].data.regions", []);
    const box = this.calculateFaceLocation(regions);
    this.setState({ box });
  };

  onInputChange = (event) => this.setState({ input: event.target.value });

  detectFace = async () => {
    const config = {
      method: "get",
      url: `${baseUrl}/detection`,
      headers: { "Content-Type": "application/json" },
      data: { input: this.state.imageUrl },
    };

    return axios(config);
  };

  updateEntries = async () => {
    const config = {
      method: "put",
      url: `${baseUrl}/image`,
      headers: { "Content-Type": "application/json" },
      data: {
        id: this.state.user.id,
      },
    };
    return axios(config);
  };

  onButtonSubmit = async () => {
    this.setState({ imageUrl: this.state.input });

    try {
      const faceBoxData = await this.detectFace();
      if (!faceBoxData) return;

      this.displayFaceBox(faceBoxData);

      const { data } = await this.updateEntries();
      if (data) this.setState({ user: { ...this.state.user, entries: data } });
    } catch (err) {
      console.log("error image", err);
    }
  };

  onRouteChange = (route) => {
    this.setState({
      ...initialState,
      route,
      isSignedIn: route !== routes.signIn && route !== routes.register,
    });
  };

  loadUser = (user) => {
    this.setState({ user });
  };

  showApp = () => {
    if (this.state.route === routes.signIn)
      return (
        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );

    if (this.state.route === routes.register)
      return (
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );

    return (
      <div className="center column-center">
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceDetection imageUrl={this.state.imageUrl} box={this.state.box} />
      </div>
    );
  };

  render() {
    return (
      <div className="App center column-center">
        <Particles className="particles" params={particlesParams} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.showApp()}
      </div>
    );
  }
}

export default App;
