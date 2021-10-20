import React, { Component } from "react";
import "./App.css";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

class App extends Component {
  state = {
    searchQuery: "",
  };

  formSubmitHandler = (newSearch) => {
    this.setState({ searchQuery: newSearch });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmitHandler} />

        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

export default App;
