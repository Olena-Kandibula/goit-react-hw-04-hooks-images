import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

import imagesAPI from "../../APIService/APIservice";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import ImagesError from "../../ImagesError/ImagesError";
import Button from "../Button/Button";

import s from "../ImageGallery/ImageGallery.module.css";
import sl from "../Loader/Loader.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [imagesTotal, setImagesTotal] = useState(null);
  const [status, setStatus] = useState("idle");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setImagesTotal(null);
    setImages([]);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery !== "") {
      setStatus("pending");

      imagesAPI
        .fetchImg(searchQuery, currentPage)

        .then((data) => {
          if (data.total !== 0) {
            console.log(data);
            return (
              setImages(data.hits),
              setImagesTotal(data.totalHits),
              setStatus("resolved")
            );
          }

          return setStatus("rejected");
        });
    }
  }, [currentPage, searchQuery]);

  const addImages = () => {
    setStatus("pending");
    setCurrentPage(currentPage + 1);

    imagesAPI

      .fetchImg(searchQuery, currentPage)
      .then((data) => {
        // console.log(data)
        return (
          setImages([...images, ...data.hits]),
          setStatus("resolved"),
          setCurrentPage(currentPage + 1)
        );
      })

      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

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
          addImages={addImages}
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
// }

ImageGallery.prototypes = {
  searchQuery: PropTypes.string,
};

export default ImageGallery;
