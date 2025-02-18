import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FiFile, FiInfo, FiLogOut, FiPlus } from "react-icons/fi";
import { GoProjectRoadmap } from "react-icons/go";
import "../../assets/css/Dashboard.css";
import { auth } from "../../config/FirebseConfig";
import AddProject from "./components/AddProject";
import UpdateResume from "./components/UpdateResume";
import UpdateProject from "./components/UpdateProject";
import Projects from "../Projects";
import About from "./About";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAddProject, setIsAddProject] = useState(false);
  const [isUpdateResume, setIsUpdateResume] = useState(false);
  const [isUpdateProject, setIsUpdateProject] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isProject, setIsProject] = useState(true);
  const [project, setProject] = useState(null);

  // Access the project data from route state
  useEffect(() => {
    if (location.state?.project) {
      setProject(location.state.project);
      setIsUpdateProject(true); // Show the UpdateProject component
      setIsAddProject(false);
      setIsUpdateResume(false);
      setIsProject(false);
      setIsAbout(false);

      // Reset the location state to null after using it
      // navigate(location.pathname, { replace: true, state: null });
    } else {
      setIsUpdateProject(false); // Hide the UpdateProject component if no project data is passed
    }
  }, [location.state, location.pathname, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = () => {
    setIsAddProject(!isAddProject);
    setIsUpdateResume(false);
    setIsProject(false);
    setIsUpdateProject(false);
    setIsAbout(false);
  };

  const handleProject = () => {
    setIsProject(!isProject);
    setIsAddProject(false);
    setIsUpdateResume(false);
    setIsUpdateProject(false);
    setIsAbout(false);
  };

  const handleUpdateResume = () => {
    setIsUpdateResume(!isUpdateResume);
    setIsAddProject(false);
    setIsProject(false);
    setIsUpdateProject(false);
    setIsAbout(false);
  };

  const handleAbout = () => {
    setIsUpdateResume(false);
    setIsAddProject(false);
    setIsProject(false);
    setIsUpdateProject(false);
    setIsAbout(!isAbout);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="sidebar-title">Admin Dashboard</h1>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <div className="sidebar-link" onClick={handleProject}>
                <GoProjectRoadmap className="icon" />
                <span>Projects</span>
              </div>
            </li>
            <li>
              <div className="sidebar-link" onClick={handleAddProject}>
                <FiPlus className="icon" />
                <span>Add Project</span>
              </div>
            </li>

            <li>
              <div className="sidebar-link" onClick={handleUpdateResume}>
                <FiFile className="icon" />
                <span>Update Resume</span>
              </div>
            </li>
          </ul>
        </nav>
        <div className="sidebar-section">
          <h2 className="sidebar-subtitle">Account</h2>
          <div className="sidebar-link" onClick={handleLogout}>
            <FiLogOut className="icon" />
            <span>Logout</span>
          </div>
        </div>
        <div className="sidebar-section">
          <h2 className="sidebar-subtitle">More</h2>
          <div className="sidebar-link" onClick={handleAbout}>
            <FiInfo className="icon" />
            <span>About</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      {isAddProject && <AddProject />}
      {isProject && <Projects />}
      {isUpdateResume && <UpdateResume />}
      {isUpdateProject && project && <UpdateProject project={project} />}
      {isAbout && <About />}
    </div>
  );
};

export default Dashboard;
