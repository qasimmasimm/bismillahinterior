import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/minlayout";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/aboutus"));
const Categories = lazy(() => import("./pages/categories"));
const CategoryDetails = lazy(() => import("./pages/categorydetails"));
const Contact = lazy(() => import("./pages/contactus"));
const Testimonials = lazy(() => import("./pages/testimonials"));
const Projects = lazy(() => import("./pages/projects"));
const Products = lazy(() => import("./pages/products"));
const ProjectDetails = lazy(() => import("./pages/projectdetails"));
const ProductDetails = lazy(() => import("./pages/productsdetails"));
const Login=lazy(()=>import('./pages/auth/login'));
const Register=lazy(()=>import('./pages/auth/signup'))


function App() {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center min-vh-100"
          style={{ backgroundColor: "#fcfaf6" }}
        >
          <div
            className="spinner-border"
            style={{ color: "#ad8144" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:slug" element={<CategoryDetails />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
      </Routes>

    </Suspense>
  );
}

export default App;
