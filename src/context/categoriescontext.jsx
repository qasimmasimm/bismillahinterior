import {createContext,useState,useEffect} from 'react';

export const CategoriesContext = createContext({
    categories: null,
    setCategories: () => {},
})

export default function CategoriesProvider({children}) {
    const [categories, setCategories]=useState(null);
    const API_URL=import.meta.env.VITE_API_URL;
    useEffect(()=>{
        const fetchCategories=async()=>{
       try{
        const res=await fetch(`${API_URL}/category`);
        const data=await res.json();
        setCategories(data);
       }catch(err){
        console.error("Error fetching categories data:", err);
       }
        }
        fetchCategories();
    },[])
    return(
        <CategoriesContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoriesContext.Provider>
    )
}