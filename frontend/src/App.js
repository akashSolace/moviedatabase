import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeToggle from './components/ThemeToggle';
import SignIn from './pages/SignIn';
import MovieList from './pages/MovieList';
import CreateMovie from './pages/CreateMovie';
import EditMovie from './pages/EditMovie';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <div className="App">
            {/* Global Theme Toggle - positioned in top right */}
            <div className="global-theme-toggle">
              <ThemeToggle />
            </div>
            
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <MovieList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/create"
                element={
                  <ProtectedRoute>
                    <CreateMovie />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditMovie />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/signin" replace />} />
            </Routes>
          </div>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
