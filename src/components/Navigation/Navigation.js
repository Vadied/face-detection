import React from "react";
import "./_navigation.scss";

import { routes } from "../../Constants";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn)
    return (
      <nav className="navigation">
        <p
          onClick={() => onRouteChange(routes.signIn)}
          className="navigation-text"
        >
          Sign Out
        </p>
      </nav>
    );

  return (
    <div>
      <nav className="navigation">
        <p
          onClick={() => onRouteChange(routes.signIn)}
          className="navigation-text"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange(routes.register)}
          className="navigation-text"
        >
          Register
        </p>
      </nav>
    </div>
  );
};

export default Navigation;
