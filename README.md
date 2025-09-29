# Movie Database Manager

A full-stack movie database application built with ReactJS (frontend) and NestJS (backend). This application allows users to manage their movie collection with authentication, CRUD operations, and a modern responsive UI.

## Features

### Frontend (ReactJS)
- **Authentication**: Sign in/Sign up with form validation
- **Movie Management**: Create, read, update, and delete movies
- **Responsive Design**: Mobile-first approach with modern UI
- **Dark/Light Mode**: Toggle between dark and light themes with persistent preference
- **Search & Filter**: Real-time search by title and filter by year with instant results
- **State Management**: Context API for global state
- **Form Validation**: Client-side validation with error messages
- **Image Upload**: Drag and drop poster upload functionality
- **Pagination**: Efficient movie list pagination
- **Empty States**: User-friendly empty state when no movies exist

### Backend (NestJS)
- **REST API**: Complete CRUD operations for movies
- **Authentication**: JWT-based authentication system
- **Database**: MongoDB integration with Mongoose
- **File Upload**: Multer for handling image uploads
- **Validation**: Server-side validation with class-validator
- **API Documentation**: Swagger/OpenAPI documentation
- **Security**: Password hashing with bcrypt

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Webpack for bundling
- CSS3 with custom design system

### Backend
- NestJS
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Swagger for API documentation
- bcryptjs for password hashing

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd moviedatabase
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp config.env .env

# Edit .env file with your configuration
# MONGODB_URI=mongodb://localhost:27017/moviedatabase
# JWT_SECRET=your-super-secret-jwt-key
# PORT=3001

# Start MongoDB (if running locally)
# Make sure MongoDB is running on your system

# Start the backend server
npm run start:dev
```

The backend will be available at `http://localhost:3001`

**📚 API Documentation (Swagger)**: Once the backend is running, you can access the interactive API documentation at `http://localhost:3001/api`. This Swagger UI allows you to:
- View all available API endpoints
- Test API calls directly from the browser
- See request/response schemas
- Authenticate using JWT tokens

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Movies
- `GET /movies` - Get all movies (with pagination)
- `POST /movies` - Create a new movie
- `GET /movies/:id` - Get a specific movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

## Usage

### 1. Authentication
- Visit `http://localhost:3000`
- You'll be redirected to the sign-in page
- Create a new account or sign in with existing credentials

### 2. Movie Management
- After authentication, you'll see the movie list page
- Click "Add Movie" to create a new movie
- Fill in the movie details (title, year, poster)
- Upload a poster image by clicking or dragging and dropping
- Edit or delete movies using the action buttons

### 3. API Documentation & Testing
- **Access Swagger UI**: Visit `http://localhost:3001/api` to explore and test the API
- **Interactive Testing**: Use Swagger to test endpoints without the frontend
- **Authentication**: Use the "Authorize" button to add JWT tokens for protected endpoints
- **API Reference**: View complete endpoint documentation with examples

### 4. Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes using the switch in the top-right corner
- **Search & Filter**: 
  - Real-time search by movie title with instant results
  - Filter movies by year (2024, 2023, 2022, etc., or older than 2018)
  - Combined search and filter functionality
  - Clear filters option for easy reset
- **Pagination**: Navigate through your movie collection
- **Image Upload**: Support for common image formats
- **Form Validation**: Real-time validation with error messages
- **Empty States**: Helpful messages when no movies exist or no search results found

## Project Structure

```
moviedatabase/
├── backend/
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── movies/         # Movies CRUD module
│   │   ├── users/          # User management
│   │   ├── app.module.ts   # Main app module
│   │   └── main.ts         # Application entry point
│   ├── uploads/            # File upload directory
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── public/             # Static assets
│   └── package.json
└── README.md
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/moviedatabase
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
```

## Development

### Backend Development
```bash
cd backend
npm run start:dev  # Start with hot reload
npm run build      # Build for production
npm run start:prod # Start production build
```

### Frontend Development
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
```

## 📚 API Documentation (Swagger)

The application includes comprehensive API documentation powered by Swagger/OpenAPI. Here's how to access and use it:

### Accessing Swagger Documentation

1. **Start the backend server** (if not already running):
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Open your web browser** and navigate to:
   ```
   http://localhost:3001/api
   ```

### Using Swagger UI

The Swagger interface provides:

- **📋 Complete API Reference**: All endpoints with descriptions, parameters, and response schemas
- **🧪 Interactive Testing**: Test API calls directly from the browser
- **🔐 Authentication Support**: JWT token authentication for protected endpoints
- **📖 Request/Response Examples**: See example payloads and responses

### Testing Protected Endpoints

To test endpoints that require authentication (like `/movies`):

1. **Register a new user** using the `/auth/register` endpoint
2. **Login** using the `/auth/login` endpoint
3. **Copy the JWT token** from the response
4. **Click the "Authorize" button** in Swagger UI
5. **Enter**: `Bearer YOUR_JWT_TOKEN_HERE`
6. **Now you can test protected endpoints** like creating, updating, or deleting movies

### Available Endpoints

- **Authentication**: `/auth/login`, `/auth/register`
- **Movies**: `/movies` (GET, POST), `/movies/:id` (GET, PUT, DELETE)
- **File Upload**: Support for image uploads with multipart/form-data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please create an issue in the repository.

## Future Enhancements

- [ ] Multi-language support (i18n)
- [ ] Favorites/watchlist feature
- [ ] Movie ratings and reviews
- [ ] Social features (sharing, comments)       
- [ ] Advanced image processing
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

