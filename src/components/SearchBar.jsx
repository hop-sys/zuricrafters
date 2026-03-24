import React, { useState } from 'react';
import '../css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // This would filter your product list
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="search-wrapper" onSubmit={handleSearch}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="bi bi-search" style={{ color: '#5c3d2e' }}></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 custom-search-input"
                placeholder="Search for Kiondos, Ankara bags, or jewelry..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-search" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;