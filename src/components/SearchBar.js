import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setPage, fetchSearchResults } from '../slices/searchSlice';
import './index.css';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const dispatch = useDispatch();

  // Get search history from Redux store
  const searchHistory = useSelector((state) => state.search.searchHistory);

  const handleSearch = (query) => {
    if (query.trim()) {
      dispatch(setQuery(query));
      dispatch(setPage(0));
      dispatch(fetchSearchResults({ query, page: 0 }));

      // Add input to search history if it's not already there
      if (!searchHistory.some((item) => item.query === query)) {
        dispatch({ type: 'search/addToHistory', payload: { query, time: new Date().toLocaleString() } });
      }

      setShowHistory(false); // Hide history dropdown after search
    }
  };

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    setShowHistory(newInput.length > 0); // Show history when input is not empty

    // Trigger search on every input change
    handleSearch(newInput);
  };

  const handleHistoryClick = (query) => {
    setInput(query);
    setShowHistory(false);
    handleSearch(query); // Perform search when clicking on history item
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(input); // Search when Enter key is pressed
    }
  };

  return (
    <div className='search-bar'>
      <input
        className='searchbar'
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add key down handler
        placeholder="Search Hacker News"
      />
      {showHistory && input && (
        <ul className='search-history'>
          {searchHistory.map((item, index) => (
            <li key={index} onClick={() => handleHistoryClick(item.query)}>
              {item.query} <span>{item.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
