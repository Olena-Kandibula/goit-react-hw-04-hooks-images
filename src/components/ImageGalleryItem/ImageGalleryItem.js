import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal";

import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ images }) {
  const [stateModal, setStateModal] = useState(false);
  const [urlImgModal, setUrlImgModal] = useState("");

  const openModal = (e) => {
    setStateModal(true);
    setUrlImgModal(e.target.dataset.url);
  };

  const closeModal = (e) => {
    setStateModal(false);
  };

  return (
    <>
      {images.map((image) => (
        <li className={s.imageGalleryItem} key={image.id}>
          <img
            onClick={openModal}
            className={s.imageGalleryItemImage}
            data-url={image.largeImageURL}
            src={image.webformatURL}
            alt={image.tag}
          />
        </li>
      ))}

      {stateModal && (
        <Modal closeModal={closeModal}>
          <img src={urlImgModal} alt="" />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.protoType = {
  images: PropTypes.array,
};

export default ImageGalleryItem;
