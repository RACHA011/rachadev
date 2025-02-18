// Updated Projects.js
import React, { useEffect, useState } from 'react';
import Project from '../component/ProjectCard';

import { collection, getDocs } from 'firebase/firestore';
import "../assets/css/project.css";
import { db } from '../config/FirebseConfig';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectsData);
    };
    
    fetchProjects();
  }, []);

  return (
    <div className="projects-container">
      <h1 className="projects-heading">My Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <Project
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            image={project.image}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;