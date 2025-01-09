# User Authentication (JWT) App

This project is a full-stack application built with **React.js**, **Node.js**, and **MongoDB** that enables user registration and authentication. It leverages **JWT (JSON Web Tokens)** for secure authentication and implements a clean, modern UI using **Tailwind CSS**. The application includes additional functionality such as user listing and detailed animations to enhance the user experience.

---

## Features

- **User Registration:** Users can create an account by providing necessary details.
- **User Login:** Authenticate with secure password validation.
- **JWT Authentication:** Token-based secure session management.
- **User Management:**
  - View the total number of users.
  - List all registered users with detailed information.
- **Responsive Design:** Built with Tailwind CSS to ensure a seamless experience on all devices.
- **Modern UI/UX:** Integrated animations using Framer Motion.

---

## Tech Stack

### **Frontend:**
- **React.js:** For building dynamic user interfaces.
- **Tailwind CSS:** For rapid UI styling.
- **React Icons:** To include a variety of modern icons.
- **Framer Motion:** For smooth and visually appealing animations.
- **Boring Avatars:** For generating customizable user avatars.
- **React Router DOM:** For client-side routing and navigation.

### **Backend:**
- **Node.js:** For server-side functionality.
- **Express.js:** For building RESTful APIs.
- **JWT:** For secure token-based authentication.
- **MongoDB:** For database management.

### **Other Libraries and Tools:**
- **JWT Decode:** For decoding JWT tokens to extract user information.
- **Dotenv:** For managing environment variables.

---

### **Backend (Server):**
```
server/
├── config/         # Database connection configuration
├── controllers/    # Controller functions for handling requests
├── models/         # Mongoose models for database schema
├── routes/         # API routes for user-related operations
├── middleware/     # Authentication middleware
├── server.js      # Main server entry point
```

### **Frontend (Client):**
```
client/
├── src/
    ├── components/    # Reusable React components (e.g., forms, buttons)
    ├── pages/         # Application pages (e.g., Login, Register, Dashboard)
    ├── styles/        # CSS and Tailwind CSS files for global styling
    ├── App.js         # Main React application entry point
    ├── Index.jsx      # Main React application entry point (JSX format)
    ├── index.js       # ReactDOM rendering

```

## API Endpoints

### **Auth Routes:**
| Method | Endpoint        | Description                |
|--------|-----------------|----------------------------|
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/login`    | Authenticate a user        |
| GET    | `/api/auth/users`    | Get a list of all users    |
| GET    | `/api/auth/user-count`    | Total number of users      |
---

## Screenshots

### **Registration Page:**
A clean and responsive form for user registration with real-time validation.

### **Login Page:**
A secure login page with animations for a smooth user experience.

### **Profile Page:**
A personalized user profile page that displays user details,

---

## Key Libraries and Their Purpose

| Library           | Purpose                                      |
|-------------------|----------------------------------------------|
| Tailwind CSS      | Styling the application                     |
| Framer Motion     | Adding animations for better user experience|
| React Icons       | Providing modern icons for UI elements      |
| JWT               | Secure authentication and session handling  |
| Boring Avatars    | Generating dynamic user avatars             |
| JWT Decode        | Decoding JWT tokens to fetch user data      |

---

## Screenshots

| **Registration Page**                                  | **Login Page**                                     |
|--------------------------------------------------------|---------------------------------------------------|
| ![Registration Preview](https://github.com/mustafakaracuha/user-auth-app/blob/master/client/src/assets/screenshots/register.png) | ![Login Preview](https://github.com/mustafakaracuha/user-auth-app/blob/master/client/src/assets/screenshots/login.png) |

---

## Demo Link
You can view the application live by visiting the Live Demo.
👉🏼 [L I V E ](https://user-auth-jwt.netlify.app)


Happy coding! If you have any questions or suggestions, feel free to open an issue. 🎉🤞🏼

