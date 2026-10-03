import { Link } from "react-router-dom";
// import categories from "../data/categoriesdata";
import SEO from "../components/seo";
import { useContext } from "react";
import { CategoriesContext } from "../context/categoriescontext";

export default function Categories() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { categories } = useContext(CategoriesContext);
  return (
    <>
      <SEO
        title="Interior Collections & Finishes"
        description="Explore 12 curated interior collections by Bismillah Interiors: SPC flooring, WPC panels, 2x2 ceilings, designer wallpapers, skirtings, UV sheets, and mouldings."
      />
      <section className="categories-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="categories-hero-content">
                <span className="categories-eyebrow">Our Collections</span>

                <h1 className="categories-title">
                  Interior finishes
                  <br />
                  made to inspire.
                </h1>

                <p className="categories-intro">
                  Explore our collection of wall panels, wallpapers, ceiling
                  solutions and flooring designed to bring character and
                  elegance to your interior.
                </p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="categories-hero-image rounded-4 overflow-hidden shadow-sm">
                <img
                  src="/images/banner03.avif"
                  alt="Elegant interior design"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="text-center mb-5">
            <small
              className="text-uppercase fw-semibold"
              style={{ color: "#ad8144", letterSpacing: "2px" }}
            >
              Catalog Overview
            </small>
            <h2
              className="display-5 fw-semibold mt-2"
              style={{ color: "#292621" }}
            >
              Explore All 12 Collections
            </h2>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {categories.map((category, index) => (
              <div className="col" key={category._id}>
                <div
                  className="card h-100 bg-white rounded-4 overflow-hidden shadow-sm"
                  style={{ border: "1px solid #e5ddd2" }}
                >
                  <div className="position-relative">
                    <Link to={`/categories/${category._id}`}>
                      <img
                        src={`${API_URL}/${category.image}`}
                        alt={category.title}
                        className="card-img-top w-100 object-fit-cover"
                        style={{ height: "235px" }}
                      />
                    </Link>

                    <span
                      className="position-absolute top-0 start-0 m-3 d-flex align-items-center justify-content-center fw-semibold rounded"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "#292621",
                        color: "#f5f0e8",
                        fontSize: "12px",
                        letterSpacing: "1px",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small
                        className="text-uppercase fw-semibold"
                        style={{
                          color: "#ad8144",
                          letterSpacing: "1px",
                          fontSize: "11px",
                        }}
                      >
                        Collection
                      </small>
                    </div>

                    <h3
                      className="h5 fw-semibold mb-2"
                      style={{ color: "#292621" }}
                    >
                      <Link
                        to={`/categories/${category._id}`}
                        className="text-decoration-none"
                        style={{ color: "#292621" }}
                      >
                        {category.title}
                      </Link>
                    </h3>

                    <p className="text-secondary small mb-4 text-truncate">
                      {category.description}
                    </p>

                    <Link
                      to={`/categories/${category._id}`}
                      className="text-decoration-none mt-auto fw-semibold"
                      style={{ color: "#292621" }}
                    >
                      Explore Collection
                      <span className="ms-2">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories-cta">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <span className="categories-eyebrow">Find Your Finish</span>

              <h2>
                Create a space that feels
                <br />
                uniquely yours.
              </h2>

              <p>
                Explore our products or get in touch with Bismillah Interiors to
                discuss your interior requirements.
              </p>

              <Link to="/contact" className="categories-button">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
