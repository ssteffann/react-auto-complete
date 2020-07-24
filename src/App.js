import React, { Component } from 'react';
import { getCitySuggestions } from './api/cities';

import './App.css';
import Autocomplete from './components/autocomplete/autocomplete';
import { debounce } from './utils/helpers';

class App extends Component {

  constructor(props) {
    super(props);


  }

  getSuggestions = async (str) => {
    return getCitySuggestions(str)
  }

  render() {
    return (
      <div className="App">
        <div className="app-body">

          <div className="width-40">
            <Autocomplete onSearch={this.getSuggestions} />
          </div>
          <div className="width-40">
            <Autocomplete />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
