import { Component } from "react";
import "./_rank.scss";

class Rank extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rank">
        <div className="text">
          {this.props.name + ", your current rank is..."}
        </div>
        <div className="value">{`#${this.props.entries}`}</div>
      </div>
    );
  }
}

export default Rank;
