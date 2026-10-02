import { lazy, Suspense,useContext } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import Layout from "./layout/minlayout";
import {getStoredUser} from "./utils/cookie";
import { UserContext } from "./context/usercontext";

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
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/signup"));


const Adminlayout = lazy(() => import("./admin/layout/adminlayout"));
const Dashboard = lazy(() => import("./admin/pages/dashboard"));
const Articles = lazy(() => import("./admin/pages/articles"));
const AddArticles = lazy(() => import("./admin/pages/addarticles"));
const AddCategories = lazy(() => import("./admin/pages/addcategories"));
const AddProjects = lazy(() => import("./admin/pages/projects"));
const ManageProjects = lazy(() => import("./admin/pages/manageprojects"));

function App() {
    const { user: contextUser } = useContext(UserContext);
  const user = contextUser || getStoredUser();

  const Navigate = useNavigate();

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
          <Route path="categories/:id" element={<CategoryDetails />} />
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


        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Adminlayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
        <Route index element={<Dashboard />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/add" element={<AddArticles />} />
        <Route path="categories/add" element={<AddCategories />} />
        <Route path="projects/add" element={<AddProjects />} />
        <Route path="manageprojects" element={<ManageProjects />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
