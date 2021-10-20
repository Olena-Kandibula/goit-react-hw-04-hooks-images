import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal";

import s from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  state = {
    stateModal: false,
    urlImgModal: "",
  };

  openModal = (e) => {
    this.setState({
      stateModal: true,
      urlImgModal: e.target.dataset.url,
    });
  };

  closeModal = (e) => {
    this.setState({
      stateModal: false,
    });
  };

  render() {
    return (
      <>
        {this.props.images.map((image) => (
          <li className={s.imageGalleryItem} key={image.id}>
            <img
              onClick={this.openModal}
              className={s.imageGalleryItemImage}
              data-url={image.largeImageURL}
              src={image.webformatURL}
              alt={image.tag}
            />
          </li>
        ))}

        {this.state.stateModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.urlImgModal} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.protoType = {
  images: PropTypes.array,
};

export default ImageGalleryItem;
