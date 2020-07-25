import React, { Component } from 'react';
import { getCitySuggestions } from './api/cities';

import './App.css';
import Autocomplete from './components/autocomplete/autocomplete';
import AutocompleteHooks from './components/autocomplete/autocomplete-hooks';

class App extends Component {
  getSuggestions = async (str) => {
    return getCitySuggestions(str)
  }

  render() {
    return (
      <div className="App">
        <div className="app-body">

          <div className="width-40">
            <h1>Class Component</h1>
            <Autocomplete onSearch={this.getSuggestions} placeholder="Search by City Name" />
          </div>
          <div className="width-40">
            <h1>Functional Component with Hooks</h1>
            <AutocompleteHooks onSearch={this.getSuggestions} placeholder="Search by City Name" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
