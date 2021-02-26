import { Component } from "react";
import "./App.css";
import Particles from "react-particles-js";
import Clarifai, { GENERAL_MODEL } from "clarifai";
import { get } from "lodash";

import { routes, clarifai_Api_Key, baseUrl } from "./Constants";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
  apiKey: clarifai_Api_Key,
});

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
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: routes.signIn,
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        joined: "",
        entries: 0,
      },
    };
  }

  clearState = () =>
    this.setState({
      input: "",
      imageUrl: "",
      box: {},
    });

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

  onButtonSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    this.clearState();

    const response = await app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    );

    if (!response) return;

    this.displayFaceBox(response);

    const params = {
      id: this.state.user.id,
    };

    const data = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };

    const imageCount = await fetch(`${baseUrl}/image`, data);
    if (imageCount)
      this.setState(Object.assign(this.state.user), { entries: imageCount });
  };

  onRouteChange = (route) => {
    console.log(route);
    this.setState({
      route,
      isSignedIn: route !== routes.signIn && route !== routes.register,
    });
  };

  loadUser = (user) => {
    console.log('user', user);
    this.setState({ user })
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
