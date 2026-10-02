import {useContext} from "react";
import {CategoriesContext} from "../../context/categoriescontext";

export default function AddCategories() {
    const {setCategories,categories} = useContext(CategoriesContext);
    console.log(categories);
    
    return (
        <>
        <h1>Add Category</h1>
        </>
    )
}