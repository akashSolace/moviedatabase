import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import WavePattern from '../components/WavePattern';

const CreateMovie = () => {
  const navigate = useNavigate();
  const { createMovie, loading } = useMovies();
  const [formData, setFormData] = useState({
    title: '',
    publishingYear: new Date().getFullYear(),
    poster: null,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.publishingYear) {
      newErrors.publishingYear = 'Publishing year is required';
    } else if (formData.publishingYear < 1900 || formData.publishingYear > 2030) {
      newErrors.publishingYear = 'Publishing year must be between 1900 and 2030';
    }

    if (!formData.poster) {
      newErrors.poster = 'Poster is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitError('');

    const result = await createMovie(formData);
    
    if (result.success) {
      navigate('/movies');
    } else {
      setSubmitError(result.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publishingYear' ? parseInt(value) || '' : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        poster: file,
      }));
      
      if (errors.poster) {
        setErrors(prev => ({
          ...prev,
          poster: '',
        }));
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          poster: file,
        }));
        
        if (errors.poster) {
          setErrors(prev => ({
            ...prev,
            poster: '',
          }));
        }
      }
    }
  };

  const handleCancel = () => {
    navigate('/movies');
  };

  return (
    <div className="create-movie-page">
      <WavePattern height="140px" animated={false} />
      {/* Breadcrumb title */}
      <div className="breadcrumb-title">Create a new movie</div>
      
      {/* Main content area */}
      <div className="create-movie-container">
        {/* Page title */}
        <h1 className="create-movie-title">Create a new movie</h1>
        
        {/* Form with two-column layout */}
        <form onSubmit={handleSubmit} className="create-movie-form">
          <div className="form-layout">
            {/* Left section - Image upload */}
            <div className="form-left-section">
              <div
                className={`image-upload-area ${dragActive ? 'drag-active' : ''} ${errors.poster ? 'error' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !formData.poster && document.getElementById('poster').click()}
                role="button"
                tabIndex="0"
                aria-label="Upload movie poster image"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    !formData.poster && document.getElementById('poster').click();
                  }
                }}
              >
                <input
                  type="file"
                  id="poster"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input-hidden"
                  aria-describedby="poster-error"
                />
                
                {/* Show image preview if file is selected */}
                {formData.poster ? (
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(formData.poster)}
                      alt="Movie poster preview"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="change-image-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('poster').click();
                      }}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Upload icon */}
                    <div className="upload-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14L12 9L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    
                    {/* Upload text */}
                    <div className="upload-text">Drop an image here</div>
                  </>
                )}
              </div>
              
              {errors.poster && <div id="poster-error" className="form-error-message" role="alert">{errors.poster}</div>}
            </div>
            
            {/* Right section - Form fields */}
            <div className="form-right-section">
              {/* Title input */}
              <div className="form-field">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`form-input ${errors.title ? 'error' : ''}`}
                  placeholder="Title"
                  aria-describedby={errors.title ? "title-error" : undefined}
                />
                {errors.title && <div id="title-error" className="form-error-message" role="alert">{errors.title}</div>}
              </div>
              
              {/* Publishing year input */}
              <div className="form-field">
                <input
                  type="number"
                  name="publishingYear"
                  value={formData.publishingYear}
                  onChange={handleChange}
                  className={`form-input ${errors.publishingYear ? 'error' : ''}`}
                  placeholder="Publishing year"
                  min="1900"
                  max="2030"
                  aria-describedby={errors.publishingYear ? "publishingYear-error" : undefined}
                />
                {errors.publishingYear && <div id="publishingYear-error" className="form-error-message" role="alert">{errors.publishingYear}</div>}
              </div>
              
              {/* Buttons */}
              <div className="form-buttons">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-button"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
          
          {submitError && (
            <div className="form-error-message submit-error">{submitError}</div>
          )}
        </form>
      </div>
      
    </div>
  );
};

export default CreateMovie;