import PropTypes from "prop-types";

function ImagesError({ errorQuery }) {
  return <p>Images with the name "{errorQuery}" were not found, try again! </p>;
}

ImagesError.protoType = {
  errorSearchQuery: PropTypes.string,
};

export default ImagesError;
