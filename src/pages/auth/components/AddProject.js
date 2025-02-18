import React, { useState } from "react";
import "../../../assets/css/AddProject.css"; // Import the CSS file
import { db } from "../../../config/FirebseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import addDoc

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [imageFile, setImageFile] = useState(null); // Store the image file
  const [imageUrl, setImageUrl] = useState(""); // Store the image URL for preview
  const [projectLink, setProjectLink] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageBase64 = "";

      // Convert image file to Base64 if a file is selected
      if (imageFile) {
        imageBase64 = await convertImageToBase64(imageFile);
      }

      // Add project data to Firestore
      await addDoc(collection(db, "projects"), {
        title,
        description,
        technologies: technologies.split(",").map((tech) => tech.trim()), // Convert string to array
        image: imageBase64, // Save the Base64 string
        link: projectLink,
        createdAt: new Date(), // Add a timestamp
      });

      // Reset form fields
      setTitle("");
      setDescription("");
      setTechnologies("");
      setImageFile(null);
      setImageUrl("");
      setProjectLink("");

      alert("Project added successfully!");
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project. Please try again.");
      alert("Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save the file for upload
      setImageUrl(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Function to convert image file to Base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <main className="add-project-main">
      <h2 className="add-project-title">Add Project</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="technologies">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            id="technologies"
            className="form-input"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="e.g., React, Firebase, CSS"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="image-url">
            Image
          </label>
          <input
            type="file"
            id="image-url"
            className="form-input"
            onChange={handleSaveImage}
            accept="image/*"
            required
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="image-preview"
              style={{
                marginTop: "10px",
                maxWidth: "100%",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="project-link">
            Project Link
          </label>
          <input
            type="text"
            id="project-link"
            className="form-input"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            placeholder="Enter project link"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </main>
  );
};

export default AddProject;