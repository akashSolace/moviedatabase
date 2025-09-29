import React, { useState, useEffect } from 'react';
import './SearchAndFilter.css';

const SearchAndFilter = ({ 
  onSearch, 
  onFilter, 
  searchValue = '', 
  filterValue = 'all',
  totalResults = 0,
  showResults = true 
}) => {
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [selectedFilter, setSelectedFilter] = useState(filterValue);
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // Filter effect
  useEffect(() => {
    onFilter(selectedFilter);
  }, [selectedFilter, onFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSelectedFilter('all');
  };

  const hasActiveFilters = searchTerm || selectedFilter !== 'all';

  return (
    <div className="search-filter-container">
      {/* Search Bar */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <div className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="clear-search-btn"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 4H21M3 12H21M3 20H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Filters</span>
          {hasActiveFilters && <span className="filter-badge">●</span>}
        </button>

        {showFilters && (
          <div className="filter-dropdown">
            <div className="filter-group">
              <label htmlFor="year-filter" className="filter-label">Year</label>
              <select
                id="year-filter"
                value={selectedFilter}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="older">Older than 2018</option>
              </select>
            </div>

            <div className="filter-actions">
              <button
                onClick={clearFilters}
                className="clear-filters-btn"
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {showResults && (searchTerm || selectedFilter !== 'all') && (
        <div className="results-summary">
          <span className="results-text">
            {totalResults} movie{totalResults !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedFilter !== 'all' && ` in ${selectedFilter}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
