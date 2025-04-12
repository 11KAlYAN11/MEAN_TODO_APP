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

OR directly mongo connection string
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
``` yaml
mean-todo-app/
├── backend/               # Node.js/Express server
│   ├── models/            # MongoDB models (e.g., Task.js for task schema)
│   ├── routes/            # API routes (e.g., tasks.js for task-related endpoints)
│   ├── middleware/        # Middleware for request handling (e.g., authentication, logging)
│   └── server.js          # Main server file to start the Express app
├── todo-frontend/         # Angular application
│   ├── src/               # Source code for the Angular app
│   │   ├── app/           # Angular components and services
│   │   │   ├── components/ # UI components (e.g., task list, task form)
│   │   │   ├── services/  # API services for HTTP requests (e.g., TodoService)
│   │   │   └── models/    # TypeScript interfaces (e.g., Task interface)
│   │   ├── assets/        # Static assets like images, stylesheets
│   │   ├── environments/  # Environment-specific configurations (e.g., API URLs)
│   │   └── main.ts        # Application entry point
│   ├── angular.json       # Angular CLI configuration file
│   ├── package.json       # Frontend dependencies and scripts
│   ├── tsconfig.json      # TypeScript configuration
│   └── README.md          # Frontend-specific documentation
└── README.md              # Main project documentation
```

## API Endpoints

### GET All Tasks
```bash
curl -X GET http://localhost:3000/api/tasks
```

### POST Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
-H "Content-Type: application/json" \
-d '{"title": "New Task", "dueDate": "2025-04-15T10:00:00Z"}'
```

### DELETE a Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/<task_id>
```

### Using Postman
1. Import the following endpoints into Postman:
   - **GET**: `http://localhost:3000/api/tasks`
   - **POST**: `http://localhost:3000/api/tasks`
   - **DELETE**: `http://localhost:3000/api/tasks/<task_id>`
2. Set headers for POST requests:
   - `Content-Type: application/json`
3. Use the body tab in Postman to send JSON data for POST requests.

## Troubleshooting
- If MongoDB connection fails, verify:
  - MongoDB service is running
  - Connection URI in `.env` is correct
  - No firewall blocking port 27017

- For Angular issues:
  - Check console errors in browser
  - Verify API responses in Network tab
  - Run `ng serve --open` to debug
