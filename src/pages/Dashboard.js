import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchResults, setQuery } from '../slices/searchSlice';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import Pagination from '../components/Pagination';
import "./index.css";

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();

  // Load popular posts by default on mount
  useEffect(() => {
    const defaultQuery = ''; // Empty query for popular posts
    dispatch(setQuery(defaultQuery));
    dispatch(fetchSearchResults({ query: defaultQuery, page: 0 }));
  }, [dispatch]);

  return (
    <div>
      <div className='search-container'>
         <h2>Welcome, {username}</h2>
      <div className='search-card'>
         <SearchBar />
      </div>
      </div> 
      <div className='results-container'>
        <ResultsList />
        <div className='pagination'><Pagination /></div>
      </div>
    </div>
  );
};

export default Dashboard;
