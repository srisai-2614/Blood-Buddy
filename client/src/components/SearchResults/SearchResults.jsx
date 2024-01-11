import React from 'react';
import './SearchResults.css';
import Contact from '../Contact/Contact';

const SearchResults = ({ results }) => {
  console.log(results);
  return (
    <div className="search-results">
      <h3>Search Results</h3>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((user) => (
            <li key={user.id}>
              <Contact user={user}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
