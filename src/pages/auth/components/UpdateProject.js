import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import "../../../assets/css/project.css";
import { db } from "../../../config/FirebseConfig";

const UpdateProject = ({ project }) => {
  const [fileImage, setFileImage] = useState("");
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    technologies: project.technologies.join(", "),
    image: project.image,
    link: project.link,
  });
  // const [imageUrl, setImageUrl] = useState(formData.image); // Initialize image URL with the existing project image

  if (!project) {
    return <div>No project data available.</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "projects", project.id), {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
        image: formData.image,
        link: formData.link,
      });
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleSaveImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(URL.createObjectURL(file));
      // setImageUrl(URL.createObjectURL(file)); // Preview the image
      setFormData({ ...formData, image: await convertImageToBase64(file) }); // Update the form data with the new image URL
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <div className="update-project-container">
      <h2 className="update-project-title">Edit Project</h2>
      <form className="update-project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="form-input"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Technologies (comma separated):</label>
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) =>
              setFormData({ ...formData, technologies: e.target.value })
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image:</label>
          <input
            type="file"
            id="image-url"
            className="form-input"
            onChange={handleSaveImage}
            accept="image/*"
          />
          {fileImage && (
            <img src={fileImage} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Project Link:</label>
          <input
            type="text"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
