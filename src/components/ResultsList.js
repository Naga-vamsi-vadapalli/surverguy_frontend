import React from 'react';
import { useSelector } from 'react-redux';
import './ResultsList.css'; // Import the CSS file for styling

const ResultsList = () => {
  const { results } = useSelector((state) => state.search);

  return (
    <ul className="results-list">
      {results.map((result) => (
        <li key={result.objectID} className="result-item">
          <a href={`https://news.ycombinator.com/item?id=${result.objectID}`} className="result-title">
            {result.title}
          </a>
          <span className="result-details">
            {result.url ? (
              <span className='text'>
                {` (${result.url} | `}
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="original-source">
                  Original Source
                </a>
                {`)`}
              </span>
            ) : (
              ' (N/A)' 
            )}
            {` ${result.points} points | ${result.author} | ${new Date(result.created_at).toLocaleDateString()} | ${result.num_comments} comments`}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
