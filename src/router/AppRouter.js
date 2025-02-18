import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../component/NavBar.js";
import Footer from "../component/Footer.js";
import ThemeToggle from "../component/Toggle.js"; // Import the ThemeToggle component
import PrivateRoute from "../component/auth/PrivateRoute.js";

// Lazy loading components for better performance
const Home = lazy(() => import("../pages/Home.js"));
const Projects = lazy(() => import("../pages/Projects.js"));
const Resume = lazy(() => import("../pages/Resume.js"));
const Contact = lazy(() => import("../pages/Contact.js"));
const NotFound = lazy(() => import("../pages/404.js"));
const Login = lazy(() => import("../pages/Login.js"));
const Dashboard = lazy(() => import("../pages/auth/Dashboard.js"));

function AppRouter() {
  return (
    <Router>
      {/* Main container with flex layout to ensure footer sticks to the bottom */}
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar can be added here */}
        <Navbar />

        {/* Main content area */}
        <div className="flex-grow-1">
          {/* Suspense for lazy-loaded components with a fallback loading state */}
          <Suspense
            fallback={<div className="text-center mt-5">Loading...</div>}
          >
            <Routes>
              {/* Define routes for each page */}
              <Route path="/" element={<Home />} />

              {/* Protected Routes */}

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              {/* Public Routes */}
              <Route path="/projects" element={<Projects />} />

              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>

        {/* Footer can be added here */}
        <Footer />

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </div>
    </Router>
  );
}

export default AppRouter;
