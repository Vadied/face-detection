import React from "react";
import "./_faceDetection.scss";

const renderFaces = (boxes) => {
  return boxes.map((box) => {
    const style = {
      left: box.leftCol,
      top: box.topRow,
      right: box.rightCol,
      bottom: box.bottomRow,
    };
    return <div className={"bounding-box"} style={style}></div>;
  });
};

const FaceDetection = ({ imageUrl, boxes }) => {
  return (
    <div className="face-detection">
      <div className={"face-container"}>
        <img id={"input-image"} src={imageUrl} alt="" />
        {renderFaces(boxes)}
      </div>
    </div>
  );
};

export default FaceDetection;
