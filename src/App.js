import {Component} from "react";
import "./App.css";
import Particles from "react-particles-js";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

// Api key 294ce2f7ef164bf68dde68488f99f5b1

const particlesParams =  {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:''
    }
  }

  onInputChange = (event) => {
    console.log(event);
  }

  onSubmit = () => {
    console.log('click');
  }

  render() {
  return (
    <div className="App">
      <Particles className="particles" params={particlesParams}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
      {/* <FaceDetection/> */}
    </div>
  );
  }
}

export default App;
