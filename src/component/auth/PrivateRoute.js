// src/components/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/FirebseConfig";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>; // Show a loading spinner
  }

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the protected component
  return children;
};

export default PrivateRoute;