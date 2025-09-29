# Movie Database - Setup Guide

## Quick Start

### Prerequisites
1. **Node.js** (v16 or higher) - Download from [nodejs.org](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local installation: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas (cloud): Create free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)

### Step 1: Install Dependencies

Open PowerShell/Command Prompt in the project root and run:

```bash
# Install all dependencies
npm run install:all
```

Or install manually:
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies  
cd ../frontend
npm install
```

### Step 2: Configure Environment

1. Copy the environment file:
   ```bash
   cd backend
   copy config.env .env
   ```

2. Edit `backend/.env` with your settings:
   ```env
   MONGODB_URI=mongodb://localhost:27017/moviedatabase
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=3001
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moviedatabase
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=3001
   ```

### Step 3: Start MongoDB

**Local MongoDB:**
- Start MongoDB service on your system
- Or run: `mongod` in a separate terminal

**MongoDB Atlas:**
- No local setup needed, just use the connection string

### Step 4: Start the Application

**Option 1: Use the batch files (Windows)**
```bash
# Start backend (in one terminal)
start-backend.bat

# Start frontend (in another terminal)  
start-frontend.bat
```

**Option 2: Manual start**
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api

## Troubleshooting

### Common Issues

**1. "nest is not recognized"**
- Solution: The scripts now use `npx nest` which should work

**2. "webpack is not recognized"**
- Solution: The scripts now use `npx webpack` which should work

**3. MongoDB connection issues**
- Check if MongoDB is running
- Verify the connection string in `.env`
- For Atlas, ensure your IP is whitelisted

**4. Port already in use**
- Change the PORT in `backend/.env`
- Or kill the process using the port

**5. Dependencies not installing**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Manual Commands

If the npm scripts don't work, try these manual commands:

**Backend:**
```bash
cd backend
npx nest start --watch
```

**Frontend:**
```bash
cd frontend
npx webpack serve --mode development
```

## Project Structure

```
moviedatabase/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication
│   │   ├── movies/         # Movie CRUD
│   │   ├── users/          # User management
│   │   └── main.ts         # Entry point
│   ├── uploads/            # File uploads
│   └── .env                # Environment config
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # State management
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app
│   └── public/             # Static assets
├── start-backend.bat       # Windows startup script
├── start-frontend.bat      # Windows startup script
└── README.md               # Main documentation
```

## Features

✅ **Authentication**: Sign up/Sign in with JWT
✅ **Movie Management**: Create, edit, delete, list movies
✅ **File Upload**: Drag & drop poster uploads
✅ **Responsive Design**: Works on all devices
✅ **API Documentation**: Swagger/OpenAPI docs
✅ **Form Validation**: Client & server-side validation
✅ **Pagination**: Efficient movie listing
✅ **Empty States**: User-friendly empty states

## Next Steps

1. **Test the application**: Create an account and add some movies
2. **Explore the API**: Visit http://localhost:3001/api
3. **Customize**: Modify colors, add features, etc.
4. **Deploy**: Consider deploying to Heroku, Vercel, etc.

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Verify all prerequisites are installed
3. Check the console for error messages
4. Ensure MongoDB is running and accessible

