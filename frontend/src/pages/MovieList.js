import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MovieContext';
import WavePattern from '../components/WavePattern';
import SearchAndFilter from '../components/SearchAndFilter';
import { API_BASE_URL_WITH_PREFIX } from '../constants/api';

const MovieList = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { 
    movies, 
    filteredMovies, 
    loading, 
    error, 
    pagination, 
    searchTerm, 
    filterYear,
    fetchMovies, 
    deleteMovie, 
    handleSearch, 
    handleFilter 
  } = useMovies();
  const [deleteLoading, setDeleteLoading] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchMovies(currentPage, itemsPerPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setDeleteLoading(prev => ({ ...prev, [id]: true }));
      const result = await deleteMovie(id);
      setDeleteLoading(prev => ({ ...prev, [id]: false }));
      
      if (!result.success) {
        alert(result.error);
      } else {
        // Refresh the current page after deletion
        fetchMovies(currentPage, itemsPerPage);
      }
    }
  };

  // Function to determine card type based on movie index for visual variety
  const getCardType = (index) => {
    const types = ['clapperboard', 'laptop', 'person'];
    return types[index % 3];
  };

  // Function to get display title (use actual movie title or fallback)
  const getDisplayTitle = (movie, index) => {
    return movie.title || `Movie ${index + 1}`;
  };

  // Function to get display year (use actual publishing year or fallback)
  const getDisplayYear = (movie) => {
    return movie.publishingYear || '2021';
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditMovie = (movieId) => {
    navigate(`/movies/${movieId}/edit`);
  };

  const renderMovieCard = (movie, index) => {
    // Check if movie has a real poster image
    const hasPoster = movie.poster && movie.poster.trim() !== '';
    const posterUrl = hasPoster 
      ? (movie.poster.startsWith('http') ? movie.poster : `${API_BASE_URL_WITH_PREFIX}${movie.poster}`)
      : null;

    return (
      <div 
        key={movie._id || movie.id} 
        className="dashboard-movie-card"
        onClick={() => handleEditMovie(movie._id || movie.id)}
        role="button"
        tabIndex="0"
        aria-label={`Edit movie: ${getDisplayTitle(movie, index)}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleEditMovie(movie._id || movie.id);
          }
        }}
      >
        <div className="movie-card-image">
          {hasPoster ? (
            <img
              src={posterUrl}
              alt={getDisplayTitle(movie, index)}
              className="movie-poster-image"
              onError={(e) => {
                // If image fails to load, fall back to CSS card type
                e.target.style.display = 'none';
                e.target.parentElement.classList.add(`movie-card-${getCardType(index)}`);
              }}
            />
          ) : (
            <div className={`movie-card-placeholder movie-card-${getCardType(index)}`}>
              {/* CSS-generated card content */}
            </div>
          )}
        </div>
        <div className="movie-card-info">
          <h3 className="movie-card-title">{getDisplayTitle(movie, index)}</h3>
          <p className="movie-card-year">{getDisplayYear(movie)}</p>
        </div>
      </div>
    );
  };

  const renderEmptyState = () => {
    const hasFilters = searchTerm || filterYear !== 'all';
    
    if (hasFilters) {
      return (
        <div className="dashboard-empty-state">
          <div className="empty-state-icon">🔍</div>
          <h2 className="empty-state-title">No movies found</h2>
          <p className="empty-state-description">
            No movies match your current search and filter criteria. Try adjusting your search terms or filters.
          </p>
          <button 
            onClick={() => {
              handleSearch('');
              handleFilter('all');
            }}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      );
    }
    
    return (
      <div className="dashboard-empty-state">
        <div className="empty-state-icon">🎬</div>
        <h2 className="empty-state-title">Your movie list is empty</h2>
        <p className="empty-state-description">
          You haven't added any movies yet. Start building your collection by adding your first movie!
        </p>
        <Link to="/movies/create" className="btn btn-primary">
          Add Your First Movie
        </Link>
      </div>
    );
  };

  const renderPagination = () => {
    // Always show pagination to match the design, even with one page
    const totalPages = pagination?.totalPages || 1;
    
    return (
      <div className="dashboard-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn pagination-prev"
        >
          Prev
        </button>
        
        <div className="pagination-numbers">
          {Array.from({ length: Math.max(2, totalPages) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-number ${page === currentPage ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn pagination-next"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading && movies.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="loading-text">Loading movies...</div>
        </div>
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Error Loading Movies</h2>
          <p className="error-message">{error}</p>
          <button onClick={() => fetchMovies(1, itemsPerPage)} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <WavePattern height="140px" animated={false} />
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">My movies</h1>
          <Link to="/movies/create" className="add-movie-icon">
            <span className="plus-icon">⊕</span>
          </Link>
        </div>
        <div className="header-right">
          <button onClick={logout} className="logout-btn">
            <span className="logout-text">Logout</span>
            <span className="logout-arrow">→</span>
          </button>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="search-filter-section">
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          searchValue={searchTerm}
          filterValue={filterYear}
          totalResults={filteredMovies.length}
        />
      </section>

      {/* Main Content - Movie Cards Grid */}
      <main className="dashboard-main">
        {filteredMovies.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="movie-cards-grid">
            {filteredMovies.slice(0, 8).map((movie, index) => renderMovieCard(movie, index))}
          </div>
        )}
      </main>

      {/* Pagination Section - Only show when there are movies */}
      {movies.length > 0 && (
        <footer className="dashboard-footer">
          {renderPagination()}
        </footer>
      )}
    </div>
  );
};

export default MovieList;