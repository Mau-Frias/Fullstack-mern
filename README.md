# Node.js and React Full-Stack Application

This is a full-stack application built with Node.js for the backend and React for the frontend. The application includes user authentication, CRUD operations, and a responsive user interface.

## Features

- **Backend**:
  - User authentication (login and registration).
  - CRUD operations for user management.
  - Password hashing using `bcrypt`.
  - RESTful API endpoints.

- **Frontend**:
  - Login page with form validation.
  - Responsive design using React.
  - Navigation with `react-router-dom`.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- bcrypt (for password hashing)
- JSON Web Tokens (JWT) for authentication

### Frontend
- React.js
- React Router
- Fetch API for HTTP requests

## Installation

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed and running.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-repo-folder
   ```

2. Install dependencies for the backend:
   ```bash
   cd server
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the `server` directory and add the following:
   ```
   PORT=3000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

5. Start the backend server:
   ```bash
   cd ../server
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   cd ../client
   npm start
   ```

## API Endpoints

### User Routes
- `POST /api/auth/login` - Login a user.
- `POST /api/auth/register` - Register a new user.
- `GET /api/users` - Retrieve all users.
- `GET /api/users/:id` - Retrieve a user by ID.
- `PUT /api/users/:id` - Update a user by ID.
- `DELETE /api/users/:id` - Delete a user by ID.

## Folder Structure

```
ns/
├── client/                # Frontend code
│   ├── src/
│   │   ├── pages/         # React pages (e.g., Login)
│   │   ├── components/    # Reusable components
│   │   └── App.js         # Main React app
├── server/                # Backend code
│   ├── src/
│   │   ├── controllers/   # API controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── server.js      # Entry point for the backend
└── README.md              # Project documentation
```

## Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
