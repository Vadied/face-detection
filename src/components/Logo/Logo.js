import React from "react";
import Tilt from "react-tilt";
import "./_logo.scss";
import kraken from './kraken.png';

const Logo = () => {
  return (
    <div className="header-logo">
      <Tilt
        className="Tilt"
        options={{ max: 55 }}
      >
        <div className="Tilt-inner">
          <img src={kraken} alt="logo"></img>
          </div>
      </Tilt>
    </div>
  );
};

export default Logo;
