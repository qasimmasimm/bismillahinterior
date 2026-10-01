import { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext({
  Project: null,
  setProject: () => {},
});

export default function ProjectProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [Project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_URL}/project/getall`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetching project data:", err);
      }
    };
    fetchProject();
  }, []);
  return (
    <ProjectContext.Provider value={{ Project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
}
