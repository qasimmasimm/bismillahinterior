import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import UserProvider from "./context/usercontext.jsx";
import ProjectProvider from "./context/projectcontext.jsx";
import ProjectCategoryProvider from "./context/projectcategorycontext.jsx";
import ProductsProvider from "./context/aticlescontext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ProjectProvider>
        <ProjectCategoryProvider>
          <UserProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </UserProvider>
        </ProjectCategoryProvider>
      </ProjectProvider>
    </BrowserRouter>
);
