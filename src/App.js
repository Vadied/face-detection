import { useState, useEffect } from "react";
import "./App.css";
import Particles from "react-particles-js";
import { get } from "lodash";
import axios from "axios";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { ROUTES, BASE_URL, PARTICLES_PARAMS } from "./constants.js";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

import { setUrlField, setImageUrl, setUser, setBoxes, setRoute, setIsSignedIn } from './actions.js';

function App() {
  const dispatch = useDispatch();

  const { urlField, imageUrl, boxes, route, isSignedIn, user } = useSelector(state => ({
    urlField: state.appReducer.urlField,
    imageUrl: state.appReducer.imageUrl,
    boxes: state.appReducer.boxes,
    route: state.appReducer.route,
    isSignedIn: state.appReducer.isSignedIn,
    user: state.appReducer.user,
  }), shallowEqual);

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
    dispatch(setBoxes(resBoxes));
  };

  const onInputChange = (event) => dispatch(setUrlField(event.target.value));

  const updateEntries = async () => {
    const config = {
      method: "put",
      url: `${BASE_URL}/image`,
      headers: { "Content-Type": "application/json" },
      data: {
        id: user.id,
      },
    };
    return axios(config);
  };

  const detectFace = async (urlField) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/detection`,
      headers: { "Content-Type": "application/json" },
      data: { urlField },
    };

    return axios(config);
  };

  const onButtonSubmit = async () => {
    if (!urlField) return;

    dispatch(setImageUrl(urlField))
    try {
      const { data } = await detectFace(urlField);
      if (!data) return;

      displayFaceBox(data);

      const { entries } = await updateEntries();
      if (entries) dispatch(setUser({ ...user, entries }));
    } catch (err) {
      console.log("error image", err);
    }
  };

  const onRouteChange = (inputRoute) => {
    dispatch(setRoute(inputRoute));
    dispatch(setIsSignedIn(
      inputRoute !== ROUTES.signIn && inputRoute !== ROUTES.register
    ));
  };

  const loadUser = (inputUser) => dispatch(setUser(inputUser));

  const showApp = () => {
    if (route === ROUTES.signIn)
      return <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />;

    if (route === ROUTES.register)
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
      <Particles className="particles" params={PARTICLES_PARAMS} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {showApp()}
    </div>
  );
}

export default App;
