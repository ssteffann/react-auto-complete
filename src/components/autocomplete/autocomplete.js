import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './autocomplet.css'
import Suggestions from '../suggestions/suggestions';
import { debounce } from '../../utils/helpers';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSuggestions: false,
      text: '',
      isLoading: false,
      suggestions: [],
    }

    this.getSuggestions = debounce(function (str) {
      return this.getSuggestionsStr(str);
    }, 400)
  }

  toggleSuggestions = (show) => {
    this.setState({ showSuggestions: show });
  }

  onSearch = (value) => {

    this.setState({ text: value, isLoading: true });

    this.getSuggestions(value);
  }

  getSuggestionsStr = async (value) => {
    const { onSearch } = this.props;

    try {
      const response = await onSearch(value);

      console.log('response ------>', response);
      this.setState({ suggestions: response });

    } finally {
      this.setState({ isLoading: false })
    }
  }


  render() {
    const { text, showSuggestions, suggestions, isLoading } = this.state;

    return (
      <div className="autocomplete-container">

        <input
          type="text"
          value={text}
          onFocus={() => this.toggleSuggestions(true)}
          onBlur={() => this.toggleSuggestions(false)}
          onChange={(event) => this.onSearch(event.target.value)}
          className={`autocomplete-input ${showSuggestions ? 'autocomplete-suggestion' : ''}`}
          placeholder="input search text"
        />

        <div className="autocomplete-holder">
          {showSuggestions && <Suggestions
            valueKey="name"
            suggestions={suggestions}
            query={text}
            isLoading={isLoading}
            onSelect={(value) => {
              console.log('value ------>', value);
            }}
          />
          }
        </div>


      </div>
    );
  }
}

Autocomplete.propTypes = {
  onSearch: PropTypes.func,
};

export default Autocomplete;
