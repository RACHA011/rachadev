import React from "react";

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Enlarged" className="enlarged-image" />
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
