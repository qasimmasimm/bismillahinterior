import { Link, useParams } from "react-router-dom";
import SEO from "../components/seo";
import { ProjectContext } from "../context/projectcontext";
import { useContext } from "react";

export default function ProjectDetails() {
  const { id } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  const { Project } = useContext(ProjectContext);

  const project = Project?.find((item) => String(item._id) === String(id));

  const getImageUrl = (image) => {
    if (!image) return "";

    return `${API_URL.replace(/\/$/, "")}/${image
      .replace(/^\//, "")
      .replaceAll("\\", "/")}`;
  };

  if (!project) {
    return (
      <main className="project-page project-not-found">
        <div className="project-container project-center">
          <span className="project-eyebrow">Portfolio</span>

          <h1>Project Not Found</h1>

          <p>The project you are looking for is not available.</p>

          <Link to="/projects" className="project-button">
            View Projects <span>→</span>
          </Link>
        </div>
      </main>
    );
  }

  const gallery = Array.isArray(project.gallery) ? project.gallery : [];

  const projectTitle = project.title || project.name || "Project";

  const projectOverview = project.overview || project.description || "";

  const projectCategory =
    typeof project.category === "object"
      ? project.category?.title || project.category?.name || "Architecture"
      : project.category || "Architecture";

  const projectLocation = project.location || "Lahore";

  const projectScope = project.scope || "—";

  return (
    <main className="project-page">
      <SEO
        title={`${projectTitle} - ${projectLocation}`}
        description={
          projectOverview ||
          `Interior design project ${projectTitle} by Bismillah Interiors in ${projectLocation}.`
        }
        image={getImageUrl(project.cover)}
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: projectTitle,
          headline: projectTitle,
          description: projectOverview,
          image: getImageUrl(project.cover),
          locationCreated: {
            "@type": "Place",
            name: projectLocation,
          },
          creator: {
            "@type": "Organization",
            name: "Bismillah Interiors",
          },
        }}
      />

      <section className="project-hero">
        <div className="project-container project-hero-grid">
          <div className="project-hero-image-wrap">
            {project.cover ? (
              <img
                src={getImageUrl(project.cover)}
                alt={projectTitle}
                className="project-hero-image"
              />
            ) : (
              <div className="project-hero-image-wrap d-flex align-items-center justify-content-center">
                <span>No project image available</span>
              </div>
            )}
          </div>

          <div className="project-hero-info">
            <div>
              <div className="project-label-line">
                <span>{projectCategory}</span>
                <i />
              </div>

              <h1>{projectTitle}</h1>

              <p className="project-location">{projectLocation}</p>

              <div className="project-overview-copy">
                <p>{projectOverview}</p>
              </div>
            </div>

            <div className="project-meta">
              <div>
                <span>Category</span>

                <strong>{projectCategory}</strong>
              </div>

              <div>
                <span>Scope</span>

                <strong>{projectScope}</strong>
              </div>

              <div>
                <span>Location</span>

                <strong>{projectLocation}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="project-overview">
        <div className="project-container">
          <div className="project-section-label">
            <i />
            <span>Project Overview</span>
          </div>

          <div className="project-overview-grid">
            <div>
              <h2>
                {projectOverview
                  ? "A thoughtful approach to contemporary living."
                  : "Designed with intention."}
              </h2>
            </div>

            <div className="project-overview-copy">
              <p>{projectOverview}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="project-gallery">
          <div className="project-container">
            <div className="project-gallery-grid">
              {gallery.map((image, index) => (
                <figure
                  className={`project-gallery-item ${
                    index === 0 ? "gallery-featured" : ""
                  }`}
                  key={`${image}-${index}`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`${projectTitle} - ${index + 1}`}
                    loading={index > 1 ? "lazy" : "eager"}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service */}
      <section className="project-service">
        <div className="project-container">
          <div className="project-service-row">
            <div>
              <span>Service</span>

              <strong>
                {projectScope !== "—" ? projectScope : projectCategory}
              </strong>
            </div>

            <Link to="/projects">
              More Work <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="project-cta">
        <div className="project-container">
          <div className="project-cta-line">
            <span />

            <p>Let’s build something timeless.</p>

            <span />
          </div>

          <Link to="/contact" className="project-cta-link">
            Get in Touch <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
