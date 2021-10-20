import React, { useState } from "react";
import PropTypes from "prop-types";

import s from "../Searchbar/Searchbar.module.css";
import { BiSearchAlt } from "react-icons/bi";

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setSearchQuery(value);
  };

  const reset = () => {
    setSearchQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchQuery(searchQuery.trim().toLowerCase());

    if (searchQuery === "") {
      alert("Input is empty");
      return;
    }

    onSubmit(searchQuery);

    reset();
  };

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

      <form onSubmit={handleSubmit} className={s.searchForm}>
        <button type="submit" className={s.searchFormButton}>
          <BiSearchAlt size="20" />
          <span className={s.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          value={searchQuery}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.prototypes = {
  onSubmit: PropTypes.func,
};
