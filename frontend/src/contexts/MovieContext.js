import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });

  // Filter and search logic
  const applyFilters = (moviesList, search, yearFilter) => {
    let filtered = [...moviesList];

    // Apply search filter
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(movie => 
        movie.title && movie.title.toLowerCase().includes(searchLower)
      );
    }

    // Apply year filter
    if (yearFilter && yearFilter !== 'all') {
      filtered = filtered.filter(movie => {
        const movieYear = movie.publishingYear;
        if (!movieYear) return false;

        if (yearFilter === 'older') {
          return parseInt(movieYear) < 2018;
        } else {
          return movieYear.toString() === yearFilter;
        }
      });
    }

    return filtered;
  };

  const fetchMovies = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:3001/movies?page=${page}&limit=${limit}`);
      const { movies: moviesData, total, totalPages } = response.data;
      
      setMovies(moviesData);
      
      // Apply current filters to the new data
      const filtered = applyFilters(moviesData, searchTerm, filterYear);
      setFilteredMovies(filtered);
      
      setPagination({
        currentPage: page,
        totalPages,
        total,
        limit,
      });
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      setError(error.response?.data?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  // Search function
  const handleSearch = (search) => {
    setSearchTerm(search);
    const filtered = applyFilters(movies, search, filterYear);
    setFilteredMovies(filtered);
  };

  // Filter function
  const handleFilter = (yearFilter) => {
    setFilterYear(yearFilter);
    const filtered = applyFilters(movies, searchTerm, yearFilter);
    setFilteredMovies(filtered);
  };

  const createMovie = async (movieData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate file size (max 5MB)
      if (movieData.poster instanceof File && movieData.poster.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      // Validate file type
      if (movieData.poster instanceof File && !movieData.poster.type.startsWith('image/')) {
        throw new Error('Only image files are allowed');
      }

      const formData = new FormData();
      formData.append('title', movieData.title.trim());
      formData.append('publishingYear', movieData.publishingYear.toString());
      
      if (movieData.poster instanceof File) {
        formData.append('poster', movieData.poster);
      } else if (movieData.poster) {
        formData.append('poster', movieData.poster);
      }

      const response = await axios.post('http://localhost:3001/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
      });

      // Refresh the movies list
      await fetchMovies(pagination.currentPage, pagination.limit);
      
      return { success: true, movie: response.data };
    } catch (error) {
      console.error('Failed to create movie:', error);
      let errorMessage = 'Failed to create movie';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateMovie = async (id, movieData) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('title', movieData.title);
      formData.append('publishingYear', movieData.publishingYear);
      
      if (movieData.poster instanceof File) {
        formData.append('poster', movieData.poster);
      } else if (movieData.poster) {
        formData.append('poster', movieData.poster);
      }

      const response = await axios.patch(`http://localhost:3001/movies/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh the movies list
      await fetchMovies(pagination.currentPage, pagination.limit);
      
      return { success: true, movie: response.data };
    } catch (error) {
      console.error('Failed to update movie:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update movie';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await axios.delete(`http://localhost:3001/movies/${id}`);
      
      // Refresh the movies list
      await fetchMovies(pagination.currentPage, pagination.limit);
      
      return { success: true };
    } catch (error) {
      console.error('Failed to delete movie:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete movie';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getMovie = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/movies/${id}`);
      return { success: true, movie: response.data };
    } catch (error) {
      console.error('Failed to fetch movie:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch movie',
      };
    }
  };

  const value = {
    movies,
    filteredMovies,
    loading,
    error,
    pagination,
    searchTerm,
    filterYear,
    fetchMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovie,
    handleSearch,
    handleFilter,
    setError,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

