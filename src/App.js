import React, { Component } from 'react';
import { getCitySuggestions } from './api/cities';

import './App.css';
import Autocomplete from './components/autocomplete/autocomplete';
import AutocompleteHooks from './components/autocomplete/autocomplete-hooks';

class App extends Component {
 constructor(props) {

   super(props);

   this.state = {
     classValue: '',
     funcValue: '',
   }
 }

  getSuggestions = async (str) => {
    return getCitySuggestions(str)
  }

  render() {
   const { classValue, funcValue } = this.state;

    return (
      <div className="App">
        <div className="app-body">

          <div className="width-40">
            <h1>Class Component</h1>
            <Autocomplete
              onSelect={(value) => this.setState({ classValue: value })}
              onSearch={this.getSuggestions}
              placeholder="Search by City Name" />

             <div className="mg-top"> Selected value: {classValue} </div>
          </div>
          <div className="width-40">
            <h1>Functional Component with Hooks</h1>
            <AutocompleteHooks
              onSelect={(value) => this.setState({ funcValue: value })}
              onSearch={this.getSuggestions} placeholder="Search by City Name" />

            <div className="mg-top"> Selected value: {funcValue} </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
