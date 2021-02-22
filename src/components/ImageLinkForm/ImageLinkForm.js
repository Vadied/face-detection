import React from "react";
import "./_imageLinkForm.scss";

const ImageLinkForm = () => {
  return (
    <div className="image-link-form">
        <p>
            {'This kraken will find faces in your pictures. '}
        </p>
        <div>
          <div className="form-input">
              <input type="text"/>
              <div className="btn">Detect</div>
          </div>
        </div>
    </div>
  );
};

export default ImageLinkForm;
