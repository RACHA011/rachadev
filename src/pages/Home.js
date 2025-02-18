import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/FirebseConfig";
import "../assets/css/Home.css";
import bg from "../assets/images/bg.jpg";
import Project from "../component/ProjectCard";
import Contact from "./Contact";
import me from "../assets/images/me.jpg";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1 className="home-title">
            Back-End Developer | Problem Solver | Tech Enthusiast
          </h1>
          <p className="home-description">
            Hi, I'm Adivhaho Ratshalingwa, a Back-End Developer with expertise
            in Java, Spring Boot, JavaScript, React, and MySQL. I focus on
            building efficient APIs, optimizing databases, and crafting scalable
            solutions.
          </p>
          <div className="home-button-container">
            <a href="/projects" className="home-button">
              View My Projects →
            </a>
          </div>
        </div>
        <div className="home-image">
          <img
            src={bg} // Replace `bg` with the actual path to your image
            alt="Code illustration"
            className="image"
          />
        </div>
      </div>

      <div className="projects-container">
        <h1 className="projects-heading">My Projects</h1>
        <div className="projects-grid">
          {projects.slice(0, 3).map(
            (
              project,
              index // Display only 3 projects
            ) => (
              <Project
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                link={project.link}
              />
            )
          )}
        </div>
        <a href="/projects" className="see-more-button">
          See More →
        </a>
      </div>
      <div className="about-me">
        <h2 className="about-heading">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm Adivhaho Ratshalingwa, a Back-End Developer with a strong
              foundation in building scalable and efficient systems. I hold a
              Bachelor of Science in Mathematical Science and Computer Science
              from the University of Limpopo. My expertise lies in Java, Spring
              Boot, RESTful APIs, and database management.
            </p>
            <p>
              I enjoy solving complex problems through clean and maintainable
              code. Whether optimizing databases, designing robust APIs, or
              integrating back-end solutions, I strive for efficiency and
              performance in every project I work on.
            </p>
            <p>Technologies I’ve been working with recently:</p>
            <ul className="skills-list">
              <li>Java</li>
              <li>Spring Boot</li>
              <li>Thymeleaf</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>React Native</li>
              <li>MySQL</li>
              <li>REST APIs</li>
            </ul>
            <a href="/resume" className="resume-button">
              My Resume
            </a>
          </div>
          <div className="about-image">
            <img
              src={me} // Replace with your image
              alt="Adivhaho Ratshalingwa"
              className="image"
            />
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default Home;
