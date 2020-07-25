import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import './suggestions.css';
import { highlightString } from '../../utils/helpers';

const SuggestionsHooks = ({ suggestions = [], valueKey, query, onSelect, isLoading }) => {
  const [selected, setSelected] = useState(-1);

  const listRefs = useMemo(() => {
    return suggestions.map(() => React.createRef());
  }, [suggestions]);

  const handleScroll = (index) => {
    if (!listRefs || !listRefs[index]) {
      return;
    }

    listRefs[index].current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }

  const onKeyDownHandler = useCallback((event) => {
      const length = suggestions.length - 1;

      switch (event.key) {
        case 'ArrowDown':
          const downSel = selected !== length ? selected + 1 : selected;
          handleScroll(downSel);

          return setSelected(downSel);
        case 'ArrowUp':
          const upSel = selected ? selected - 1 : selected;

          handleScroll(upSel);
          return setSelected(upSel);

        case 'Enter':
          return onSelect(suggestions[selected][valueKey]);

        case 'Escape':
          return onSelect();
      }
    }, [selected, suggestions]);


  useEffect(() => {
    window.addEventListener('keydown', onKeyDownHandler);

    return () => window.removeEventListener('keydown', onKeyDownHandler);
  }, [onKeyDownHandler]);

  useEffect(() => setSelected(-1), [query]);

  return (
    <div className="suggestions">
      {isLoading && <div className="suggestion-info">Loading ...</div>}
      {suggestions.length === 0 && !isLoading && <div className="suggestion-info">No Data</div>}
      {suggestions.map((item, index) => {
        const value = item[valueKey];
        const highlightedText = highlightString(query, value, 'suggestion-highlight');

        return (<div
          ref={listRefs[index]}
          className={`suggestion-item ${selected === index ? 'suggestion-active' : ''}`}
          key={index}
          onClick={(event) => onSelect(value)}
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />)
      })}
    </div>
  );
}

SuggestionsHooks.propTypes = {
  onSelect: PropTypes.func,
  suggestions: PropTypes.array,
  valueKey: PropTypes.string.isRequired,
  query: PropTypes.string,
  isLoading: PropTypes.bool
};

export default SuggestionsHooks;
