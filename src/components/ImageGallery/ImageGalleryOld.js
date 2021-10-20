import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

import imagesAPI from "../../APIService/APIservice";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import ImagesError from "../../ImagesError/ImagesError";
import Button from "../Button/Button";

import s from "../ImageGallery/ImageGallery.module.css";
import sl from "../Loader/Loader.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class ImageGallery extends Component {
  state = {
    images: [],
    imagesTotal: null,
    error: null,
    status: "idle",
    currentPage: 1,
    searchQuery: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    const { currentPage } = this.state;

    if (prevQuery !== nextQuery) {
      this.setState({
        status: "pending",
        currentPage: 1,
      });

      imagesAPI
        .fetchImg(nextQuery, currentPage)

        .then((images) => {
          if (images.total !== 0) {
            this.setState({
              imagesTotal: images.totalHits,
              searchQuery: nextQuery,
            });

            return this.setState({
              images: images.hits,
              status: "resolved",
            });
          }

          return this.setState({ status: "rejected" });
        })
        // .catch(error => console.warn(error))
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  addImages = () => {
    this.setState({ status: "pending" });

    const { searchQuery, currentPage } = this.state;
    let nextPage = currentPage + 1;

    imagesAPI

      .fetchImg(searchQuery, nextPage)

      .then((data) => {
        this.setState((prevState) => {
          return {
            images: [...prevState.images, ...data.hits],
            status: "resolved",
            currentPage: nextPage,
          };
        });
      })

      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  render() {
    const { images, status, imagesTotal, currentPage } = this.state;

    const { searchQuery } = this.props;

    const availablePages = Math.ceil(imagesTotal / 12);

    if (status === "idle") {
      return <div>Input search name, please</div>;
    }

    if (status === "pending") {
      return (
        <Loader
          className={sl.loader}
          type="BallTriangle"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000}
        />
      );
    }

    if (status === "rejected") {
      return <ImagesError errorQuery={searchQuery} />;
    }

    if (status === "resolved" && availablePages > 1) {
      return (
        <>
          <ul className={s.imageGallery}>
            <ImageGalleryItem images={images} />
          </ul>

          <Button
            pages={availablePages}
            currentPage={currentPage}
            addImages={this.addImages}
          />
        </>
      );
    }

    if (status === "resolved" || availablePages === 1) {
      return (
        <ul className={s.imageGallery}>
          <ImageGalleryItem images={images} />
        </ul>
      );
    }
  }
}

ImageGallery.prototypes = {
  searchQuery: PropTypes.string,
};

export default ImageGallery;
