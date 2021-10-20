import React, { useState } from "react";
import "./App.css";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const formSubmitHandler = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={formSubmitHandler} />

      <ImageGallery searchQuery={searchQuery} />
    </div>
  );
}

export default App;
