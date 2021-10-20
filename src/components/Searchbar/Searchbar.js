import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "../Searchbar/Searchbar.module.css";
import { BiSearchAlt } from "react-icons/bi";

class Searchbar extends Component {
  state = {
    searchQuery: "",
  };

  handleChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ searchQuery: value });
  };

  reset = () => {
    this.setState({ searchQuery: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { searchQuery } = this.state;

    const newSearch = searchQuery.trim().toLowerCase();

    if (newSearch === "") {
      alert("Input is empty");
      return;
    }

    this.props.onSubmit(newSearch);

    this.reset();
  };

  render() {
    return (
      <header className={s.searchbar}>
        <div className={s.logo}>
          <a href="https://pixabay.com/">
            <img
              src="https://pixabay.com/static/img/public/medium_rectangle_a.png"
              alt="Pixabay"
              width="48"
            />
          </a>
        </div>

        <form onSubmit={this.handleSubmit} className={s.searchForm}>
          <button type="submit" className={s.searchFormButton}>
            <BiSearchAlt size="20" />
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            value={this.state.searchQuery}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.prototypes = {
  onSubmit: PropTypes.func,
};
