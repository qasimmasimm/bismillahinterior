import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProjectContext } from "../context/projectcontext";
import SEO from "../components/seo";

export default function ProjectDetails() {
  const { id } = useParams();
  const { Project } = useContext(ProjectContext);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const project = Project?.find((item) => item._id === id);

  const API_URL = import.meta.env.VITE_API_URL;

  const getImageUrl = (image) => {
    if (!image) return "";

    return `${API_URL}/${image.replaceAll("\\", "/")}`;
  };

  if (!project) {
    return (
      <main
        className="py-5"
        style={{
          backgroundColor: "#fcfaf6",
          minHeight: "60vh",
        }}
      >
        <div className="container py-5 text-center">
          <small
            className="text-uppercase fw-semibold"
            style={{
              color: "#ad8144",
              letterSpacing: "2px",
            }}
          >
            Our Projects
          </small>

          <h1
            className="display-5 fw-semibold mt-3 mb-3"
            style={{ color: "#292621" }}
          >
            Project Not Found
          </h1>

          <p className="text-secondary mb-4">
            The project you are looking for could not be found.
          </p>

          <Link
            to="/projects"
            className="btn rounded-pill px-4 py-3 fw-semibold"
            style={{
              backgroundColor: "#292621",
              color: "#f5f0e8",
            }}
          >
            Browse All Projects
            <span className="ms-2">→</span>
          </Link>
        </div>
      </main>
    );
  }

  const gallery = project.gallery || [];
  const images = [project.cover, ...gallery].filter(Boolean);
  const currentImage = images[selectedImageIndex] || project.cover;

  const categoryName = project.category?.name || "Project";

  return (
    <main style={{ backgroundColor: "#fcfaf6" }}>
      <SEO
        title={`${project.title} - ${categoryName}`}
        description={
          project.overview ||
          `Explore ${project.title}, a ${categoryName.toLowerCase()} project by Bismillah Interiors.`
        }
        image={getImageUrl(project.cover)}
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          headline: project.title,
          description: project.overview,
          image: images.map(getImageUrl),
          locationCreated: project.location || undefined,
          creator: {
            "@type": "Organization",
            name: "Bismillah Interiors",
          },
        }}
      />

      <section className="py-5">
        <div className="container py-lg-4">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0" style={{ fontSize: "13px" }}>
              <li className="breadcrumb-item">
                <Link
                  to="/"
                  className="text-secondary text-decoration-none"
                >
                  Home
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link
                  to="/projects"
                  className="text-secondary text-decoration-none"
                >
                  Projects
                </Link>
              </li>

              <li
                className="breadcrumb-item active fw-semibold"
                aria-current="page"
                style={{ color: "#ad8144" }}
              >
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-7">
              <div
                className="overflow-hidden rounded-4 shadow-sm border mb-3 bg-white"
                style={{ borderColor: "#e5ddd2" }}
              >
                <img
                  src={getImageUrl(currentImage)}
                  alt={project.title}
                  className="w-100 object-fit-cover"
                  style={{
                    height: "540px",
                    transition: "opacity 0.3s ease",
                  }}
                />
              </div>

              {images.length > 1 && (
                <div className="d-flex gap-3 overflow-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className="p-0 border-0 bg-transparent rounded-3 overflow-hidden shadow-sm"
                      style={{
                        width: "90px",
                        height: "90px",
                        flexShrink: 0,
                        outline:
                          selectedImageIndex === index
                            ? "2px solid #ad8144"
                            : "1px solid #e5ddd2",
                        opacity:
                          selectedImageIndex === index ? 1 : 0.7,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${project.title} view ${index + 1}`}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="col-12 col-lg-5">
              <div className="ps-lg-3">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <span
                    className="text-uppercase fw-semibold"
                    style={{
                      color: "#ad8144",
                      letterSpacing: "2px",
                      fontSize: "12px",
                    }}
                  >
                    {categoryName}
                  </span>

                  <span
                    style={{
                      width: "35px",
                      height: "1px",
                      backgroundColor: "#ad8144",
                    }}
                  />
                </div>

                <h1
                  className="display-5 fw-semibold mb-3"
                  style={{ color: "#292621" }}
                >
                  {project.title}
                </h1>

                {project.location && (
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <span
                      style={{
                        color: "#ad8144",
                        fontSize: "13px",
                      }}
                    >
                      Location
                    </span>

                    <span
                      className="text-secondary"
                      style={{ fontSize: "14px" }}
                    >
                      {project.location}
                    </span>
                  </div>
                )}

                <p
                  className="text-secondary lh-lg mb-4"
                  style={{
                    maxWidth: "500px",
                    fontSize: "15px",
                  }}
                >
                  {project.overview}
                </p>

                <div
                  className="border-top border-bottom py-3 mb-4"
                  style={{ borderColor: "#e5ddd2" }}
                >
                  <div
                    className="d-flex justify-content-between py-2 border-bottom"
                    style={{ borderColor: "#f0eae0" }}
                  >
                    <span
                      className="text-secondary"
                      style={{ fontSize: "14px" }}
                    >
                      Category
                    </span>

                    <strong
                      style={{
                        color: "#292621",
                        fontSize: "14px",
                      }}
                    >
                      {categoryName}
                    </strong>
                  </div>

                  <div
                    className="d-flex justify-content-between py-2 border-bottom"
                    style={{ borderColor: "#f0eae0" }}
                  >
                    <span
                      className="text-secondary"
                      style={{ fontSize: "14px" }}
                    >
                      Location
                    </span>

                    <strong
                      style={{
                        color: "#292621",
                        fontSize: "14px",
                      }}
                    >
                      {project.location || "Lahore"}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between py-2">
                    <span
                      className="text-secondary"
                      style={{ fontSize: "14px" }}
                    >
                      Project Images
                    </span>

                    <strong
                      style={{
                        color: "#292621",
                        fontSize: "14px",
                      }}
                    >
                      {images.length}
                    </strong>
                  </div>
                </div>

                <div className="mb-4">
                  <h6
                    className="text-uppercase fw-semibold mb-2"
                    style={{
                      color: "#ad8144",
                      letterSpacing: "1.5px",
                      fontSize: "12px",
                    }}
                  >
                    Scope of Work
                  </h6>

                  <p
                    className="text-secondary mb-0 lh-lg"
                    style={{ fontSize: "14px" }}
                  >
                    {project.scope}
                  </p>
                </div>

                <div className="d-flex flex-column gap-2">
                  <Link
                    to="/contact"
                    className="btn rounded-pill px-4 py-3 fw-semibold text-center"
                    style={{
                      backgroundColor: "#292621",
                      color: "#f5f0e8",
                    }}
                  >
                    Discuss Your Project
                    <span className="ms-2">→</span>
                  </Link>

                  <Link
                    to="/projects"
                    className="btn btn-outline-dark rounded-pill px-4 py-3 fw-semibold text-center"
                  >
                    View All Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {images.length > 1 && (
        <section
          className="py-5"
          style={{ backgroundColor: "#f5f0e8" }}
        >
          <div className="container py-lg-3">
            <div className="mb-4">
              <small
                className="text-uppercase fw-semibold"
                style={{
                  color: "#ad8144",
                  letterSpacing: "2px",
                }}
              >
                Project Gallery
              </small>

              <h2
                className="display-6 fw-semibold mt-2"
                style={{ color: "#292621" }}
              >
                {project.title}
              </h2>
            </div>

            <div className="row g-4">
              {images.map((image, index) => (
                <div
                  className={
                    index === 0
                      ? "col-12"
                      : "col-12 col-md-6"
                  }
                  key={`${image}-${index}`}
                >
                  <div className="overflow-hidden rounded-4 shadow-sm bg-white">
                    <img
                      src={getImageUrl(image)}
                      alt={`${project.title} detail view ${index + 1}`}
                      className="w-100 object-fit-cover"
                      loading={index > 1 ? "lazy" : "eager"}
                      style={{
                        height: index === 0 ? "500px" : "360px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-5"
        style={{ backgroundColor: "#292621" }}
      >
        <div className="container py-4 text-center">
          <small
            className="text-uppercase fw-semibold"
            style={{
              color: "#ad8144",
              letterSpacing: "2px",
            }}
          >
            Have a Similar Project?
          </small>

          <h2
            className="display-6 fw-semibold mt-2 mb-3"
            style={{ color: "#f5f0e8" }}
          >
            Let's create something beautiful for your space.
          </h2>

          <p
            className="text-white-50 mb-4 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Discuss your interior requirements with Bismillah
            Interiors and explore the possibilities for your next
            project.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/contact"
              className="btn rounded-pill px-4 py-3 fw-semibold"
              style={{
                backgroundColor: "#b08a45",
                color: "#292621",
              }}
            >
              Contact Us
              <span className="ms-2">→</span>
            </Link>

            <Link
              to="/projects"
              className="btn btn-outline-light rounded-pill px-4 py-3 fw-semibold"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}