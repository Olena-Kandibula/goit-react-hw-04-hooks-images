import PropTypes from "prop-types";
import s from "./Button.module.css";

function Button({ addImages, pages, currentPage }) {
  const message = currentPage < pages ? "Load more..." : "That's all";

  const disabled = currentPage < pages ? false : true;

  return (
    <button
      type="button"
      className={s.button}
      onClick={() => addImages()}
      disabled={disabled}
    >
      {message}
    </button>
  );
}

Button.protoType = {
  addImages: PropTypes.func,
  pages: PropTypes.string,
};

export default Button;
