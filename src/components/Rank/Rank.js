import React from "react";
import "./_rank.scss";

const Rank = () => {
  return (
      <div className="rank">
          <div className="text">
            {'Davide, your current rank is...'}
          </div>
          <div className="value">
              {'#5'}
          </div>
      </div>
  );
};

export default Rank;
