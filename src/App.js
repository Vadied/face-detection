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
  boxes: [],
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

  calculateFaceLocation = (regions) => {
    const image = document.getElementById("input-image");
    const width = image.width;
    const height = image.height;
    return regions.map((r) => {
      const coordinates = get(r, "region_info.bounding_box", {});
      return {
        leftCol: coordinates.left_col * width,
        topRow: coordinates.top_row * height,
        rightCol: (1 - coordinates.right_col) * width,
        bottomRow: (1 - coordinates.bottom_row) * height,
      };
    });
  };

  displayFaceBox = (data) => {
    const regions = get(data, "outputs[0].data.regions", []);
    const boxes = this.calculateFaceLocation(regions);
    this.setState({ boxes });
  };

  onInputChange = (event) => this.setState({ input: event.target.value });

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

  detectFace = async (input) => {
    const config = {
      method: "post",
      url: `${baseUrl}/detection`,
      headers: { "Content-Type": "application/json" },
      data: { input },
    };

    return axios(config);
  };

  onButtonSubmit = async () => {
    if (!this.state.input) return;

    this.setState({ imageUrl: this.state.input });
    try {
      const { data } = await this.detectFace(this.state.input);
      if (!data) return;

      this.displayFaceBox(data);

      const { entries } = await this.updateEntries();
      if (entries) this.setState({ user: { ...this.state.user, entries } });
    } catch (err) {
      console.log("error image", err);
    }
  };

  onRouteChange = (route) => {
    this.setState({
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
        <FaceDetection
          imageUrl={this.state.imageUrl}
          boxes={this.state.boxes}
        />
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
