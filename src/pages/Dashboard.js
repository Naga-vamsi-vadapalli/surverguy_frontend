import React from 'react';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import Pagination from '../components/Pagination';
import "./index.css"

const Dashboard = () => {
  const username = localStorage.getItem('username');

  return (
    <div>
      <div className='search-container'>
         <h2>Welcome, {username}</h2>
      <div className='search-card'>
         <SearchBar />
      </div>
      </div> 
      <div className='results-container'>
        <ResultsList/>
        <div className='pagination'><Pagination/></div>

      </div>

      
      
      
    </div>
  );
};

export default Dashboard;
