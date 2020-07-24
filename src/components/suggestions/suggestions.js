import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './suggestions.css';
import { highlightString } from '../../utils/helpers';

class Suggestions extends Component {
  render() {
    const { suggestions = [], valueKey, query, onSelect, isLoading } = this.props;

    return (
      <div className="suggestions">
        {isLoading && <div className="suggestion-info">Loading ...</div>}
        {suggestions.length === 0 && !isLoading && <div className="suggestion-info">No Data</div>}
        {suggestions.map((item, index) => {
          const value = item[valueKey];
          const highlightedText = highlightString(query, value, 'suggestion-highlight');

          return (<div
            className="suggestion-item"
            key={index}
            onClick={(event) => {
              onSelect(value)
            }}
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />)
        })}
      </div>
    );
  }
}

Suggestions.propTypes = {
  onSelect: PropTypes.func,
  suggestions: PropTypes.array,
  valueKey: PropTypes.string.isRequired,
  query: PropTypes.string,
  isLoading: PropTypes.bool
};

export default Suggestions;
