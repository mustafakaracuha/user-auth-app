import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./utils/PrivateRoute";
import PostsPage from "./pages/PostPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
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
