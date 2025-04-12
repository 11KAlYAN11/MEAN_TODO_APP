# MEAN Stack Todo Application with MongoDB

A simple todo application built with:
- **M**ongoDB (Database)
- **E**xpress.js (Backend Framework)
- **A**ngular (Frontend Framework)
- **N**ode.js (Runtime Environment)

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas cluster)
- Angular CLI (for frontend)

## Installation

1. Clone the repository
2. Install dependencies for both backend and frontend:
```bash
cd mean-todo-app/backend && npm install
cd ../todo-frontend && npm install
```

## Configuration

### Backend
1. Create a `.env` file in the backend directory with:
```env
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=3000

OR direcly mongo connection string
```

### Frontend
1. API base URL is configured in `environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## Running the Application

### Start MongoDB
```bash
sudo systemctl start mongod  # Linux
mongod                      # Mac/Windows
```

### Start Backend Server
```bash
cd backend
node server.js
```

### Start Frontend Development Server
```bash
cd todo-frontend
npm start

or 
ng serve
```

## Accessing the Application
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000/api/tasks

## Key Features
- Create, read, update, and delete tasks
- Real-time updates
- RESTful API backend
- MongoDB data persistence

## Project Structure
```
mean-todo-app/
├── backend/               # Node.js/Express server
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── todo-frontend/         # Angular application
│   ├── src/
│   │   ├── app/           # Angular components
│   │   │   ├── services/  # API services
│   │   │   └── models/    # TypeScript interfaces
│   │   └── main.ts        # Application entry point
└── README.md              # This file
```

## Troubleshooting
- If MongoDB connection fails, verify:
  - MongoDB service is running
  - Connection URI in `.env` is correct
  - No firewall blocking port 27017

- For Angular issues:
  - Check console errors in browser
  - Verify API responses in Network tab
  - Run `ng serve --open` to debug
