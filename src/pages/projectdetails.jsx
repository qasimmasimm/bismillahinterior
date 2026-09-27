import { Link, useParams } from "react-router-dom";
import projects from "../data/projectsdata";
import SEO from "../components/seo";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);

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

  const otherProjects = projects
    .filter((item) => item.id !== project.id)
    .slice(0, 3);

  const gallery = project.gallery || [];

  return (
    <main className="project-page">
      <SEO
        title={`${project.title} - ${project.location || "Lahore"}`}
        description={`${project.overview || `Interior design project ${project.title} by Bismillah Interiors in ${project.location || "Lahore"}.`}`}
        image={project.cover}
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.title,
          "headline": project.title,
          "description": project.overview,
          "image": project.cover,
          "locationCreated": {
            "@type": "Place",
            "name": project.location || "Lahore, Pakistan"
          },
          "creator": {
            "@type": "Organization",
            "name": "Bismillah Interiors"
          }
        }}
      />
      {/* Hero */}
      <section className="project-hero">
        <div className="project-container project-hero-grid">
          <div className="project-hero-image-wrap">
            <img
              src={project.cover}
              alt={project.title}
              className="project-hero-image"
            />
          </div>

          <div className="project-hero-info">
            <div>
              <div className="project-label-line">
                <span>{project.category || "Architecture"}</span>
                <i />
              </div>

              <h1>{project.title}</h1>

              <p className="project-location">
                {project.location || "Pakistan"}
              </p>
             <div className="project-overview-copy">
              <p>{project.overview}</p>
            </div>
            </div>

            <div className="project-meta">
              <div>
                <span>Category</span>
                <strong>{project.category || "—"}</strong>
              </div>
              <div>
                <span>Scope</span>
                <strong>{project.scope || "—"}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{project.location || "—"}</strong>
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
                {project.overview
                  ? "A thoughtful approach to contemporary living."
                  : "Designed with intention."}
              </h2>
            </div>

            <div className="project-overview-copy">
              <p>{project.overview}</p>
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
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    loading={index > 1 ? "lazy" : "eager"}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service row */}
      <section className="project-service">
        <div className="project-container">
          <div className="project-service-row">
            <div>
              <span>Service</span>
              <strong>
                {project.scope || project.category || "Architecture"}
              </strong>
            </div>

            <Link to="/projects">
              More Work <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* More work */}
      {otherProjects.length > 0 && (
        <section className="project-more-work">
          <div className="project-container">
            <div className="project-more-heading">
              <div>
                <span className="project-eyebrow">Portfolio</span>
                <h2>More Work</h2>
              </div>

              <Link to="/projects">
                View All Projects <span>→</span>
              </Link>
            </div>

            <div className="project-cards">
              {otherProjects.map((item) => (
                <Link
                  to={`/projects/${item.id}`}
                  className="project-card"
                  key={item.id}
                >
                  <div className="project-card-image">
                    <img src={item.cover} alt={item.title} loading="lazy" />
                  </div>
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
