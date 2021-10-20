import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.props.closeModal();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    return createPortal(
      <div className={s.overlay}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,

      document.getElementById("modal-root")
    );
  }
}

Modal.protoType = {
  closeModal: PropTypes.func,
};

export default Modal;
