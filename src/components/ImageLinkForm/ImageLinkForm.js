import React from "react";
import { Button } from "react-bootstrap";
import "./_imageLinkForm.scss";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="image-link-form">
      <p>{"This kraken will find faces in your pictures. "}</p>
      <div className="form-input">
        <input type="text" onChange={onInputChange} />
        <Button variant="primary" onClick={onButtonSubmit}>
          Detect
        </Button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
