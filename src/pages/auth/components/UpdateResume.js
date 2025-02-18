import React, { useState } from "react";
import "../../../assets/css/UploadResume.css";
import { doc, setDoc } from "firebase/firestore"; // Use setDoc to update a single document
import { db } from "../../../config/FirebseConfig";

const UpdateResume = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError("");
      } else {
        setFile(null);
        setError("Please upload a valid PDF file.");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        // Convert the file to Base64
        const base64Resume = await convertFileToBase64(file);

        // Store the Base64 string in Firestore
        await setDoc(doc(db, "resume", "latest"), {
          resume: base64Resume,
          createdAt: new Date(), // Add a timestamp
        });

        alert("Resume uploaded successfully!");
      } catch (error) {
        console.error("Error uploading resume:", error);
        setError("Failed to upload resume. Please try again.");
      }
    } else {
      setError("Please select a file to upload.");
    }
  };

  // Convert file to Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
      reader.onload = () => resolve(reader.result); // Resolve with the Base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <main className="upload-resume-container">
      <h2 className="upload-resume-title">Upload Resume</h2>
      <form className="upload-resume-form" onSubmit={handleSubmit}>
        <div className="file-upload-container">
          <label htmlFor="resume-upload" className="file-upload-label">
            <span className="file-upload-text">
              {file ? file.name : "Choose a PDF file"}
            </span>
            <input
              type="file"
              id="resume-upload"
              className="file-upload-input"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </label>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" className="upload-button">
          Upload Resume
        </button>
      </form>
      {file && (
        <div className="file-preview-container">
          <h3 className="file-preview-title">Preview</h3>
          <embed
            src={URL.createObjectURL(file)}
            type="application/pdf"
            width="100%"
            height="500px"
            className="file-preview"
          />
        </div>
      )}
    </main>
  );
};

export default UpdateResume;