# MERN Stack Project

This project is a simple implementation of a MERN (MongoDB, Express, React, Node.js) stack project. It is a full-stack application that allows users to register, login, and manage their profiles.

## Features

- User registration and login
- Profile management (update, delete)
- Role request system (become a teacher)
- Admin dashboard (view role requests, approve teachers)

## Technologies Used

- Front-end: React
- Back-end: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## How to Run

1. Clone the repository
2. Install dependencies by running `npm install`
3. Start the server by running `npm run start`
4. Open a web browser and navigate to `http://localhost:3000`

## API Endpoints

### User Endpoints

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login an existing user
- `GET /user/me`: Get the current user's profile
- `PATCH /user/me`: Update the current user's profile
- `DELETE /user/me`: Delete the current user's profile

### Role Request Endpoints

- `POST /user/become-teacher`: Become a teacher
- `GET /admin/role-requests`: Get all role requests
- `PATCH /admin/approve-teacher/:teacher`: Approve a teacher role request

### Admin Endpoints

- `GET /admin/role-requests`: Get all role requests
- `PATCH /admin/approve-teacher/:teacher`: Approve a teacher role request
