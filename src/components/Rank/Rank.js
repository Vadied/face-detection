import React from "react";
import "./_rank.scss";

const Rank = () => {
  return (
    <div className="rank">
      <div className="text">
        {this.propr.name + ", your current rank is..."}
      </div>
      <div className="value">{"#" + this.props.entries}</div>
    </div>
  );
};

export default Rank;
