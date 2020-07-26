import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './autocomplet.css'
import SuggestionsHooks from '../suggestions/suggestions-hooks';
import { debounce } from '../../utils/helpers';

const AutocompleteHooks = ({ onSearch, placeholder, onSelect }) => {
  const autocomplete = useRef(null);
  const [text, setText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestionsStr = async (value) => {
    try {
      const response = await onSearch(value);

      setSuggestions(response);
    } finally {
      setLoading(false);
    }
  };

  const toggleSuggestions = (event) => {
    setShowSuggestions(autocomplete.current.contains(event.target));
  };

  const onChange = (value) => {
    setText(value);
    setLoading(true);
    setShowSuggestions(true);

    getSuggestions(value);
  };

  const onSelectVal = (value) => {
    if (value) {
      setText(value);
    }

    setShowSuggestions(false);
  }

  useEffect(() => {
    window.addEventListener('mousedown', toggleSuggestions);

    return () => window.removeEventListener('mousedown', toggleSuggestions);
  }, [])

  const getSuggestions = useMemo(() => {
    return debounce(function (str) {
      return getSuggestionsStr(str);
    }, 400)
  }, []);

  return (
    <div className="autocomplete-wrapper">
      <div className="autocomplete-container" ref={autocomplete}>
        <input
          type="text"
          value={text}
          onChange={(event) => onChange(event.target.value)}
          className={`autocomplete-input ${showSuggestions ? 'autocomplete-suggestion' : ''}`}
          placeholder={placeholder || 'input search text'}
        />

        <div className="autocomplete-holder">
          {showSuggestions && <SuggestionsHooks
            valueKey="name"
            suggestions={suggestions}
            query={text}
            isLoading={isLoading}
            onSelect={onSelectVal}
          />
          }
        </div>
      </div>
      <button disabled={!text} onClick={() => {
        onSelect(text);
        setText('');
      }} className="ok-btn">OK
      </button>
    </div>
  );
}

AutocompleteHooks.propTypes = {
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
};

export default AutocompleteHooks;
