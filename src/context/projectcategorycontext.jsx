import {createContext, useState, useEffect} from 'react';
export const ProjectCategoryContext=createContext({
    projcatgeory:null,
    setProjectCategory:()=>{},
});

export default function ProjectCategoryProvider({children}){
    const [projectCategory, setProjectCategory] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;
     useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_URL}/projectcategory`);
        const data = await res.json();
        setProjectCategory(data);
      } catch (err) {
        console.error("Error fetching project category data:", err);
      }
    };

    fetchProject();
  }, []);

    return (
        <ProjectCategoryContext.Provider value={{projectCategory, setProjectCategory}}>
            {children}
        </ProjectCategoryContext.Provider>
    )
}