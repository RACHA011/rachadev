import React, { useState, useEffect } from "react";
import "../assets/css/Resume.css"; // Import the CSS file
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/FirebseConfig";

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState(null); // State to store the Base64 URL
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch the latest resume from Firestore
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, "resume", "latest");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const base64Resume = docSnap.data().resume;
          setResumeUrl(base64Resume); // Set the Base64 URL
        } else {
          setError("No resume found.");
        }
      } catch (err) {
        setError("Failed to fetch resume. Please try again later.");
        console.error("Error fetching resume:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return <div className="resume-container">Loading resume...</div>;
  }

  if (error) {
    return <div className="resume-container">{error}</div>;
  }

  return (
    <div className="resume-container">
      <h1 className="resume-heading">My Resume</h1>
      <div className="resume-content">
        {resumeUrl && (
          <>
            <iframe
              src={resumeUrl}
              title="myresume"
              className="resume-iframe"
            ></iframe>
            <a
              href={resumeUrl}
              download="RatshalingwaAdivhaho_Resume.pdf" // Replace with your name
              className="download-button"
            >
              Download Resume
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Resume;