import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, fetchSearchResults } from '../slices/searchSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, query } = useSelector((state) => state.search);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    dispatch(fetchSearchResults({ query, page: newPage }));
  };

  return (
    <div>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</button>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
