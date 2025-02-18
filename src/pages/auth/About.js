import React from "react";
import "../../assets/css/About.css"; // Import the CSS file
import me from "../../assets/images/me.jpg"; //"

const About = () => {
  return (
    <div className="welcome-admin-container">
      <img
        src={me} // Replace with your avatar image
        alt="Adivhaho Ratshalingwa"
        className="admin-avatar"
      />
      <h1 className="welcome-title">About Me</h1>
      <p className="welcome-description">
        Hi, I'm Adivhaho Ratshalingwa, a passionate back-end developer with a
        love for building robust and scalable applications. I specialize in
        Java, Spring Boot, and API development, and I enjoy solving complex
        problems with elegant solutions.
      </p>
      <div className="about-me-card">
        <h2 className="about-me-title">My Journey</h2>
        <p className="about-me-description">
          I'm a third-year Computer Science student at the University of
          Limpopo, pursuing a Bachelor of Science in Mathematical Science and
          Computer Science. Over the years, I've worked on multiple projects,
          including web applications and APIs, gaining hands-on experience with
          Java, JavaScript, React, and database management. My journey has
          taught me the importance of clean code, collaboration, and continuous
          learning. I aspire to become a software engineer and am actively
          building projects to strengthen my expertise.
        </p>
      </div>
    </div>
  );
};

export default About;
