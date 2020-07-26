import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './suggestions.css';
import { highlightString } from '../../utils/helpers';

class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.listRefs = [];

    this.state = {
      selected: -1
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDownHandler);
    this.initRefs();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDownHandler);
  }

  componentDidUpdate(prevProps) {
    const { query, suggestions } = this.props;

    if (query !== prevProps.query) {
      this.setState({ selected: -1 });
    }

    if (suggestions.length !== prevProps.suggestions.length) {
      this.initRefs();
    }
  }

  initRefs = () => {
    const { suggestions } = this.props;

    this.listRefs = suggestions.map(() => React.createRef())
  }

  onKeyDownHandler = (event) => {
    const { selected } = this.state;
    const { suggestions = [], onSelect, valueKey } = this.props;
    const length = suggestions.length - 1;

    switch (event.key) {
      case 'ArrowDown':
        const downSel = selected !== length ? selected + 1 : selected;
        this.handleScroll(downSel);

        return this.setState({ selected: downSel });
      case 'ArrowUp':
        const upSel = selected ? selected - 1 : selected;

        this.handleScroll(upSel);
        return this.setState({ selected: upSel });

      case 'Enter':
        return onSelect(suggestions[selected][valueKey]);

      case 'Escape':
        return onSelect();
    }
  }

  handleScroll = (index) => {
    const { isLoading } = this.props;

    if (!this.listRefs[index] || isLoading) {
      return;
    }

    this.listRefs[index].current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }

  render() {
    const { suggestions = [], valueKey, query, onSelect, isLoading } = this.props;
    const { selected } = this.state;

    return (
      <div className="suggestions">
        {isLoading && <div className="suggestion-info">Loading ...</div>}
        {suggestions.length === 0 && !isLoading && <div className="suggestion-info">No Data</div>}
        {suggestions.map((item, index) => {
          const value = item[valueKey];
          const highlightedText = highlightString(query, value, 'suggestion-highlight');

          return (<div
            ref={this.listRefs[index]}
            className={`suggestion-item ${selected === index ? 'suggestion-active' : ''}`}
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
