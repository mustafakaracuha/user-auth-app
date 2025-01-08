import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import PostsPage from "./pages/PostPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/posts"
                    element={
                        <PrivateRoute>
                            <PostsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <PostsPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
