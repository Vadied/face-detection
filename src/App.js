import { useState, useEffect } from "react";
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

function App() {
  const [input, setInput] = useState(initialState.input);
  const [imageUrl, setImageUrl] = useState(initialState.imageUrl);
  const [boxes, setBoxes] = useState(initialState.boxes);
  const [route, setRoute] = useState(initialState.route);
  const [isSignedIn, setIsSignedIn] = useState(initialState.isSignedIn);
  const [user, setUser] = useState(initialState.user);

  // if empty [] useEffect apply only on "componentDidMount"
  useEffect(() => {
    console.log("if empty [] useEffect apply only on 'componentDidMount'");
  }, []);

  const calculateFaceLocation = (regions) => {
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

  const displayFaceBox = (data) => {
    const regions = get(data, "outputs[0].data.regions", []);
    const resBoxes = calculateFaceLocation(regions);
    setBoxes(resBoxes);
  };

  const onInputChange = (event) => setInput(event.target.value);

  const updateEntries = async () => {
    const config = {
      method: "put",
      url: `${baseUrl}/image`,
      headers: { "Content-Type": "application/json" },
      data: {
        id: user.id,
      },
    };
    return axios(config);
  };

  const detectFace = async (input) => {
    const config = {
      method: "post",
      url: `${baseUrl}/detection`,
      headers: { "Content-Type": "application/json" },
      data: { input },
    };

    return axios(config);
  };

  const onButtonSubmit = async () => {
    if (!input) return;

    setImageUrl(input);
    try {
      const { data } = await detectFace(input);
      if (!data) return;

      displayFaceBox(data);

      const { entries } = await updateEntries();
      if (entries) setUser({ ...user, entries });
    } catch (err) {
      console.log("error image", err);
    }
  };

  const onRouteChange = (inputRoute) => {
    setRoute(inputRoute);
    setIsSignedIn(
      inputRoute !== routes.signIn && inputRoute !== routes.register
    );
  };

  const loadUser = (inputUser) => setUser(inputUser);

  const showApp = () => {
    if (route === routes.signIn)
      return <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />;

    if (route === routes.register)
      return <Register onRouteChange={onRouteChange} loadUser={loadUser} />;

    return (
      <div className="center column-center">
        <Logo />
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
        />
        <FaceDetection imageUrl={imageUrl} boxes={boxes} />
      </div>
    );
  };

  return (
    <div className="App center column-center">
      <Particles className="particles" params={particlesParams} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {showApp()}
    </div>
  );
}

export default App;
