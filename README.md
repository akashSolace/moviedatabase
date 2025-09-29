# 🎬 Movie Database Manager

<div align="center">

![Movie Database](https://img.shields.io/badge/Movie-Database-blue?style=for-the-badge&logo=film)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![NestJS](https://img.shields.io/badge/NestJS-11-red?style=for-the-badge&logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)

</div>

A full-stack movie database application built with **ReactJS** (frontend) and **NestJS** (backend). This application allows users to manage their movie collection with authentication, CRUD operations, and a modern responsive UI.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd moviedatabase
npm run install:all

# Start both frontend and backend
npm run start:dev
```

**Frontend**: http://localhost:3000 | **Backend**: http://localhost:3001 | **API Docs**: http://localhost:3001/api

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│                 │ ◄─────────────────► │                 │
│   React Frontend │                     │   NestJS Backend│
│                 │                     │                 │
│  • Authentication│                     │  • JWT Auth     │
│  • Movie CRUD    │                     │  • REST API     │
│  • File Upload   │                     │  • File Storage │
│  • State Mgmt    │                     │  • Validation   │
└─────────────────┘                     └─────────────────┘
         │                                        │
         │                                        │
         ▼                                        ▼
┌─────────────────┐                     ┌─────────────────┐
│   Browser       │                     │   MongoDB       │
│   • Local Storage│                     │   • User Data   │
│   • Session     │                     │   • Movie Data  │
└─────────────────┘                     └─────────────────┘
```

## 📱 App Screenshots

### 🔐 Authentication
- **Sign In/Sign Up**: Clean, modern authentication forms with validation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🎬 Movie Management
- **Movie List**: Grid layout with search and filter functionality
- **Create/Edit**: Intuitive forms with drag-and-drop image upload
- **Dark/Light Mode**: Toggle between themes with persistent preference

### 🔍 Search & Filter
- **Real-time Search**: Instant results as you type
- **Year Filtering**: Filter by specific years or date ranges
- **Combined Search**: Search and filter work together seamlessly

## ✨ Features

### 🎨 Frontend (ReactJS)
- 🔐 **Authentication**: Sign in/Sign up with form validation
- 🎬 **Movie Management**: Create, read, update, and delete movies
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes with persistent preference
- 🔍 **Search & Filter**: Real-time search by title and filter by year with instant results
- 🗂️ **State Management**: Context API for global state
- ✅ **Form Validation**: Client-side validation with error messages
- 📤 **Image Upload**: Drag and drop poster upload functionality
- 📄 **Pagination**: Efficient movie list pagination
- 🎭 **Empty States**: User-friendly empty state when no movies exist

### ⚙️ Backend (NestJS)
- 🚀 **REST API**: Complete CRUD operations for movies
- 🔑 **Authentication**: JWT-based authentication system
- 🗄️ **Database**: MongoDB integration with Mongoose
- 📁 **File Upload**: Multer for handling image uploads
- ✔️ **Validation**: Server-side validation with class-validator
- 📚 **API Documentation**: Swagger/OpenAPI documentation
- 🔒 **Security**: Password hashing with bcrypt

## 🛠️ Tech Stack

### 🎨 Frontend
- ⚛️ **React 18** - Modern UI library
- 🛣️ **React Router DOM** - Client-side routing
- 🌐 **Axios** - HTTP client for API calls
- 📦 **Webpack** - Module bundler
- 🎨 **CSS3** - Custom design system with animations

### ⚙️ Backend
- 🚀 **NestJS** - Progressive Node.js framework
- 🗄️ **MongoDB** - NoSQL database with Mongoose ODM
- 🔑 **JWT** - JSON Web Tokens for authentication
- 📁 **Multer** - File upload middleware
- 📚 **Swagger** - API documentation
- 🔒 **bcryptjs** - Password hashing

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

## 🔌 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/login` | User login | ❌ |
| `POST` | `/auth/register` | User registration | ❌ |
| `GET` | `/auth/verify` | Verify JWT token | ✅ |

### 🎬 Movies
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/movies` | Get all movies (with pagination) | ✅ |
| `POST` | `/movies` | Create a new movie | ✅ |
| `GET` | `/movies/:id` | Get a specific movie | ✅ |
| `PATCH` | `/movies/:id` | Update a movie | ✅ |
| `DELETE` | `/movies/:id` | Delete a movie | ✅ |

### 📚 API Documentation
- **Swagger UI**: http://localhost:3001/api
- **Interactive Testing**: Test all endpoints directly from the browser
- **Authentication**: JWT token support for protected endpoints

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

## 📁 Project Structure

```
🎬 moviedatabase/
├── 🎨 frontend/                    # React Frontend
│   ├── src/
│   │   ├── 📱 components/          # Reusable UI components
│   │   │   ├── SearchAndFilter.js  # Search & filter component
│   │   │   ├── ThemeToggle.js      # Dark/light mode toggle
│   │   │   └── WavePattern.js      # Animated background
│   │   ├── 🗂️ contexts/            # React Context providers
│   │   │   ├── AuthContext.js      # Authentication state
│   │   │   ├── MovieContext.js     # Movie data management
│   │   │   └── ThemeContext.js     # Theme state
│   │   ├── 📄 pages/               # Page components
│   │   │   ├── SignIn.js           # Authentication page
│   │   │   ├── MovieList.js        # Movie listing page
│   │   │   ├── CreateMovie.js      # Add new movie
│   │   │   └── EditMovie.js        # Edit existing movie
│   │   ├── 🎨 App.css              # Global styles
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # Entry point
│   ├── public/                     # Static assets
│   └── package.json
├── ⚙️ backend/                     # NestJS Backend
│   ├── src/
│   │   ├── 🔐 auth/                # Authentication module
│   │   │   ├── auth.controller.ts  # Auth endpoints
│   │   │   ├── auth.service.ts     # Auth business logic
│   │   │   ├── jwt.strategy.ts     # JWT validation
│   │   │   └── dto/                # Data transfer objects
│   │   ├── 🎬 movies/              # Movies CRUD module
│   │   │   ├── movies.controller.ts# Movie endpoints
│   │   │   ├── movies.service.ts   # Movie business logic
│   │   │   ├── schemas/            # MongoDB schemas
│   │   │   └── dto/                # Movie DTOs
│   │   ├── 👥 users/               # User management
│   │   │   ├── users.service.ts    # User business logic
│   │   │   └── schemas/            # User schema
│   │   ├── 🛠️ common/              # Shared utilities
│   │   │   └── filters/            # Exception filters
│   │   ├── ⚙️ config/              # Configuration files
│   │   ├── app.module.ts           # Main app module
│   │   └── main.ts                 # Application entry point
│   ├── 📁 uploads/                 # File upload directory
│   └── package.json
├── 📋 package.json                 # Root package.json
├── 📖 README.md                    # This file
└── 🚀 start-*.bat                  # Quick start scripts
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/moviedatabase
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
```

## 🚀 Development

### ⚙️ Backend Development
```bash
cd backend
npm run start:dev  # 🔥 Start with hot reload
npm run build      # 📦 Build for production
npm run start:prod # 🚀 Start production build
npm run lint       # 🔍 Run ESLint
npm run test       # 🧪 Run tests
```

### 🎨 Frontend Development
```bash
cd frontend
npm start          # 🌐 Start development server
npm run build      # 📦 Build for production
npm run test       # 🧪 Run tests
```

### 🔄 Development Workflow
```bash
# 1. Start both frontend and backend
npm run start:dev

# 2. Make changes to code
# 3. Hot reload will automatically update

# 4. Test API endpoints
# Visit: http://localhost:3001/api

# 5. Test frontend
# Visit: http://localhost:3000
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

## 🚀 Future Enhancements

- [ ] 🌍 Multi-language support (i18n)
- [ ] ⭐ Favorites/watchlist feature
- [ ] 📊 Movie ratings and reviews
- [ ] 👥 Social features (sharing, comments)       
- [ ] 🖼️ Advanced image processing
- [ ] 🧪 Unit and integration tests
- [ ] 🐳 Docker containerization
- [ ] 🔄 CI/CD pipeline
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🔔 Real-time notifications

---

<div align="center">

### 🎬 Movie Database Manager

**Built with ❤️ using React, NestJS, and MongoDB**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/yourusername/moviedatabase)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)

**⭐ Star this repository if you found it helpful!**

</div>

