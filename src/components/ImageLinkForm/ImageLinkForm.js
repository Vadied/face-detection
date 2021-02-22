import React from "react";
import "./_imageLinkForm.scss";

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div className="image-link-form">
        <p>
            {'This kraken will find faces in your pictures. '}
        </p>
          <div className="form-input">
              <input 
                type="text" 
                onChange={onInputChange}/>
              <div
                className="btn"
                onClick={onButtonSubmit}>Detect</div>
          </div>
    </div>
  );
};

export default ImageLinkForm;
