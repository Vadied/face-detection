import React from "react";
import "./_faceDetection.scss";

const FaceDetection = ({ imageUrl, box }) => {
  const style = {
    left: box.leftCol,
    top: box.topRow,
    right: box.rightCol,
    bottom: box.bottomRow,
  };

  return (
    <div className="face-detection">
      <div className={"face-container"}>
        <img id={"input-image"} src={imageUrl} alt="" />
        <div className={"bounding-box"} style={style}></div>
      </div>
    </div>
  );
};

export default FaceDetection;
