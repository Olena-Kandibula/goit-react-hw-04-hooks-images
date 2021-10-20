import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

function Modal({ closeModal, children }) {
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  const escFunction = (e) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className={s.overlay}
      onClick={(e) => {
        closeModal();
      }}
    >
      <div className={s.modal}>{children}</div>
    </div>,

    document.getElementById("modal-root")
  );
}

Modal.protoType = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
