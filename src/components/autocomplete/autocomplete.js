import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './autocomplet.css'
import Suggestions from '../suggestions/suggestions';
import { debounce } from '../../utils/helpers';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.autocomplete = React.createRef();

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

  componentDidMount() {
    window.addEventListener('mousedown', this.toggleSuggestions);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.toggleSuggestions);
  }

  toggleSuggestions = (event) => {
    return this.setState({
      showSuggestions: this.autocomplete.current.contains(event.target)
    });
  }

  onSearch = (value) => {
    this.setState({ text: value, isLoading: true, showSuggestions: true});

    this.getSuggestions(value);
  }

  getSuggestionsStr = async (value) => {
    const { onSearch } = this.props;

    try {
      const response = await onSearch(value);

      this.setState({ suggestions: response });
    } finally {
      this.setState({ isLoading: false })
    }
  }

  setValue = (value) => {
    if(value) {
      this.setState({ text: value });
    }

    this.setState({ showSuggestions: false });
  }

  render() {
    const { text, showSuggestions, suggestions, isLoading } = this.state;
    const { placeholder } = this.props;

    return (
      <div className="autocomplete-container" ref={this.autocomplete}>
        <input
          type="text"
          value={text}
          onChange={(event) => this.onSearch(event.target.value)}
          className={`autocomplete-input ${showSuggestions ? 'autocomplete-suggestion' : ''}`}
          placeholder={placeholder || 'input search text'}
        />

        <div className="autocomplete-holder">
          {showSuggestions && <Suggestions
            valueKey="name"
            suggestions={suggestions}
            query={text}
            isLoading={isLoading}
            onSelect={this.setValue}
          />
          }
        </div>
      </div>
    );
  }
}

Autocomplete.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Autocomplete;
