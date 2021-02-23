import { Component } from "react";
import "./App.css";
import Particles from "react-particles-js";
import Clarifai, { GENERAL_MODEL } from "clarifai";
import { get } from "lodash";

import { routes } from "./Constants";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const clarifaiApiKey = "294ce2f7ef164bf68dde68488f99f5b1";
const app = new Clarifai.App({
  apiKey: clarifaiApiKey,
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

  displayFaceBox = (box) => this.setState({ box });

  onInputChange = (event) => this.setState({ input: event.target.value });

  onSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    this.clearState();

    const response = await app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    );

    const regions = get(response, "outputs[0].data.regions", []);
    const box = this.calculateFaceLocation(regions);
    this.displayFaceBox(box);
  };

  onRouteChange = (route) => {
    this.setState({ 
      route,
      isSignedIn: route !== routes.signIn && route !== routes.register
    });
  };

  showApp = () => {
    if (this.state.route === routes.signIn)
      return <SignIn onRouteChange={this.onRouteChange} />;

    if (this.state.route === routes.register)
      return <Register onRouteChange={this.onRouteChange} />;

    return (
      <div className="center column-center">
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onSubmit}
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
