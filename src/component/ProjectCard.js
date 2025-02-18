import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/project.css";
import { auth, db } from "../config/FirebseConfig";
import ImageModal from "./ImageModal";

const ProjectCard = ({ id, title, description, technologies, image, link }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAdmin = auth().currentUser; // Check if user is logged in as admin
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "projects", id));
      alert("Project deleted successfully!");
      window.location.reload(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateProject = () => {
    navigate("/dashboard", {
      state: { project: { id, title, description, technologies, image, link } },
    });
  };
  const handleViewImage = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="project-card">
        {isAdmin && (
          <div className="admin-controls">
            <button className="edit-btn" onClick={handleUpdateProject}>
              ✏️
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              🗑️
            </button>
          </div>
        )}

        <div className="project-image" onClick={handleViewImage}>
          <img src={image} alt={title} className="image" />
        </div>

        <div className="project-content">
          <h2 className="project-title">{title}</h2>
          <p className="project-description">{description}</p>
          <div className="project-technologies">
            <strong>Technologies:</strong> {technologies.join(", ")}
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-button"
          >
            View Project →
          </a>
        </div>
      </div>
      {isModalOpen && (
        <ImageModal image={image} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ProjectCard;
