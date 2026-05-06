import React, { useState } from "react";
import "../css/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // send value to parent (real-time search)
    onSearch(value);
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group search-wrapper">

            <span className="input-group-text bg-transparent border-end-0">
              <i className="bi bi-search" style={{ color: "#5c3d2e" }}></i>
            </span>

            <input
              type="text"
              className="form-control border-start-0 custom-search-input"
              placeholder="Search crafts..."
              value={query}
              onChange={handleChange}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;