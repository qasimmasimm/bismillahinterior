import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import SEO from "../components/seo";
import carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaComments,
  FaDraftingCompass,
  FaHardHat,
  FaLayerGroup,
  FaPhoneAlt,
  FaQuoteLeft,
  FaRulerCombined,
  FaTools,
  FaWhatsapp,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { getStoredUser, clearAuth } from "../utils/cookie";
import { UserContext } from "../context/usercontext";
import { ProjectContext } from "../context/projectcontext";
import { ProductsContext } from "../context/aticlescontext";
import { CategoriesContext } from "../context/categoriescontext";
const banners = [
  {
    image: "/images/banner1.avif",
    eyebrow: "Premium Wall Panels",
    title: "Transform Your Walls With Modern Elegance",
    text: "Explore premium wall panels designed to add texture, character and a refined finish to homes, offices and commercial spaces.",
  },
  {
    image: "/images/banner3.avif",
    eyebrow: "Modern Wall Solutions",
    title: "Walls That Make A Statement",
    text: "Discover stylish wall panels in a range of textures, patterns and finishes to create interiors that stand out.",
  },
  {
    image: "/images/banner03.avif",
    eyebrow: "Designed For Modern Interiors",
    title: "Elevate Your Space With Premium Panels",
    text: "From contemporary designs to timeless textures, find the perfect wall panel to complement your interior style.",
  },
];

const testimonials = [
  {
    name: "Ahmed R.",
    role: "Homeowner",
    text: "The team helped us choose the right wall finish for our living room. The final result completely changed the space.",
  },
  {
    name: "Usman K.",
    role: "Business Owner",
    text: "Professional service and a very clean finish. The team understood what we wanted and delivered a beautiful result.",
  },
  {
    name: "Hassan M.",
    role: "Homeowner",
    text: "From material selection to installation, the process was straightforward and the finished interior looks excellent.",
  },
];

function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={`home-section-heading ${light ? "heading-light" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ProductCard({ product }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [active, setActive] = useState(0);

  const images = Array.isArray(product.images) ? product.images : [];

  const productId = product._id || product.id;

  const categoryTitle =
    typeof product.category === "object"
      ? product.category?.title || ""
      : product.category || "";

  const productTitle = product.title || product.name || "Untitled Product";

  const next = (e) => {
    e.preventDefault();

    if (images.length > 0) {
      setActive((prev) => (prev + 1) % images.length);
    }
  };

  const previous = (e) => {
    e.preventDefault();

    if (images.length > 0) {
      setActive((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="col">
      <div
        className="card h-100 bg-white rounded-4 overflow-hidden shadow-sm"
        style={{ border: "1px solid #e5ddd2" }}
      >
        <div
          className="position-relative overflow-hidden"
          style={{ aspectRatio: "1 / 1" }}
        >
          <Link to={`/products/${productId}`} className="text-decoration-none">
            {images.length > 0 ? (
              <img
                src={`${API_URL}/${images[active]}`}
                alt={productTitle}
                className="w-100 h-100 object-fit-contain"
              />
            ) : (
              <div
                className="w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "#f5f0e8" }}
              >
                <span className="text-secondary small">No image available</span>
              </div>
            )}
          </Link>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={previous}
                className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle shadow-sm"
                style={{ width: "38px", height: "38px" }}
              >
                ←
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={next}
                className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle shadow-sm"
                style={{ width: "38px", height: "38px" }}
              >
                →
              </button>

              <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-1">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className="rounded-circle"
                    style={{
                      width: "7px",
                      height: "7px",
                      backgroundColor: index === active ? "#292621" : "#ffffff",
                      opacity: index === active ? 1 : 0.7,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="card-body p-4 d-flex flex-column">
          <small
            className="text-uppercase fw-semibold"
            style={{
              color: "#ad8144",
              letterSpacing: "1px",
              fontSize: "11px",
            }}
          >
            {categoryTitle}
          </small>

          <h3 className="h5 fw-semibold mt-2 mb-3" style={{ color: "#292621" }}>
            <Link
              to={`/products/${productId}`}
              className="text-decoration-none"
              style={{ color: "#292621" }}
            >
              {productTitle}
            </Link>
          </h3>

          <div className="mt-auto pt-2">
            <Link
              to={`/products/${productId}`}
              className="btn btn-sm rounded-pill px-3 py-2 fw-semibold w-100"
              style={{
                backgroundColor: "#f5f0e8",
                color: "#292621",
                border: "1px solid #e5ddd2",
              }}
            >
              View Details <span className="ms-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user: contextUser, setUser } = useContext(UserContext);
  const user = contextUser || getStoredUser();
  const navigate = useNavigate();
  const { Project } = useContext(ProjectContext);
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);

  const featuredProjects = Project?.slice(0, 4) || [];
  const featuredProducts = products?.slice(0, 4) || [];
  const featuredCategories = categories?.slice(0, 4) || [];
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="home-page">
      <SEO
        title="Premium Wall Panels, Ceilings & Flooring"
        description="Bismillah Interiors in Johar Town, Lahore provides luxury wall panels, 2x2 ceiling tiles, designer wallpapers, and durable SPC/wood flooring."
      />

      <section className="home-hero" aria-label="Bismillah Interiors">
        <Carousel
          fade
          controls
          indicators
          interval={5000}
          pause="hover"
          className="hero-carousel"
        >
          {banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <div className="hero-slide">
                <img
                  src={banner.image}
                  alt={`${banner.title} - Bismillah Interiors`}
                  className="hero-image"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />

                <div className="hero-overlay"></div>

                <div className="container hero-content">
                  <div className="hero-text">
                    <span className="hero-eyebrow">{banner.eyebrow}</span>

                    <h1 style={{ color: "white" }}>{banner.title}</h1>

                    <p>{banner.text}</p>

                    <div className="hero-buttons">
                      <Link to="/products" className="home-btn home-btn-dark">
                        Explore Products
                        <FaArrowRight />
                      </Link>

                      <Link to="/contact" className="home-btn home-btn-outline">
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
      <section className="home-section about-section" id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="about-image-wrap">
                <img
                  src="/images/home-about.avif"
                  alt="Elegant interior designed by Bismillah Interiors"
                  className="about-image"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="650"
                />

                <div className="about-experience">
                  <strong>01</strong>
                  <span>
                    Interior
                    <br />
                    Solutions
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <SectionHeading
                eyebrow="About Bismillah Interiors"
                title="We Turn Ordinary Spaces Into Beautiful Interiors"
                text="Bismillah Interiors provides interior finishing solutions designed to make homes and commercial spaces more attractive, functional and comfortable."
              />

              <p className="about-description">
                From decorative wall panels and wallpapers to ceiling solutions
                and flooring, we help you select finishes that complement your
                space and your personal style.
              </p>

              <div className="about-points">
                <div>
                  <FaCheck />
                  <span>Modern interior finishes</span>
                </div>

                <div>
                  <FaCheck />
                  <span>Quality materials and designs</span>
                </div>

                <div>
                  <FaCheck />
                  <span>Professional installation</span>
                </div>

                <div>
                  <FaCheck />
                  <span>Solutions tailored to your space</span>
                </div>
              </div>

              <Link to="/about" className="text-link">
                Discover More
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section services-section" id="services">
        <div className="container">
          <SectionHeading
            eyebrow="What We Offer"
            title="Interior Solutions For Every Space"
            text="Explore our range of interior finishing solutions for residential and commercial spaces."
          />

          <div className="row g-4">
            {featuredCategories.map((category, index) => (
              <div className="col-sm-6 col-lg-3" key={category._id}>
                <article className="service-card">
                  <div className="service-image-wrap">
                    <img
                      src={`${API_URL}/${category.image}`}
                      alt={category.title}
                      className="service-image"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="300"
                    />

                    <span className="service-number">0{index + 1}</span>
                  </div>

                  <div className="service-body">
                    <h3>{category.title}</h3>
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {category.description}
                    </p>

                    <Link
                      to={`/categories/${category._id}`}
                      className="service-link"
                    >
                      Explore
                      <FaArrowRight />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section why-section" id="why-us">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <SectionHeading
                eyebrow="Why Choose Us"
                title="Details That Make The Difference"
                text="A good interior is not only about appearance. The right materials, finishing and installation all work together to create a better space."
              />

              <div className="why-list">
                <div className="why-item">
                  <div className="why-icon">
                    <FaLayerGroup />
                  </div>

                  <div>
                    <h3>Quality Materials</h3>
                    <p>
                      Carefully selected finishes for attractive and durable
                      interiors.
                    </p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-icon">
                    <FaDraftingCompass />
                  </div>

                  <div>
                    <h3>Design Guidance</h3>
                    <p>
                      Get help selecting designs, textures and finishes suited
                      to your space.
                    </p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-icon">
                    <FaTools />
                  </div>

                  <div>
                    <h3>Professional Installation</h3>
                    <p>
                      Attention to detail during installation for a clean
                      finished look.
                    </p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-icon">
                    <FaComments />
                  </div>

                  <div>
                    <h3>Personal Consultation</h3>
                    <p>
                      Discuss your requirements before selecting the right
                      solution for your project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="why-image-wrap">
                <img
                  src="/images/why-us.avif"
                  alt="Premium wall panel interior"
                  className="why-image"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="650"
                />

                <div className="why-image-card">
                  <FaRulerCombined />
                  <div>
                    <strong>Made For Your Space</strong>
                    <span>Design • Material • Installation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section products-section" id="products">
        <div className="container">
          <SectionHeading
            eyebrow="Featured Collection"
            title="Explore Our Products"
            text="Discover selected wall panels and interior finishes available through Bismillah Interiors."
          />

          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div className="col-sm-6 col-lg-3" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="section-button">
            <Link to="/products" className="home-btn home-btn-dark">
              View All Products
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section projects-section" id="projects">
        <div className="container">
          <SectionHeading
            eyebrow="Our Work"
            title="Recent Projects"
            text="A selection of interior spaces transformed with modern finishes and thoughtful design."
          />

          <div className="row g-4">
            {featuredProjects.map((project) => (
              <div className="col-12 col-md-6 col-lg-3" key={project._id}>
                <Link
                  to={`/projects/${project._id}`}
                  className="text-decoration-none"
                >
                  <div className="card border-0 h-100 overflow-hidden">
                    <img
                      src={`${API_URL}/${project.cover}`}
                      alt={project.title}
                      className="w-100 object-fit-cover"
                      style={{ height: "250px" }}
                    />

                    <div className="p-3">
                      <small
                        className="text-uppercase"
                        style={{ color: "var(--color-gold)" }}
                      >
                        {project.category?.name}
                      </small>

                      <h5 className="text-dark mt-1 mb-1">{project.title}</h5>

                      {project.location && (
                        <small className="text-muted">{project.location}</small>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-5"></div>

          <div className="section-button">
            <Link to="/projects" className="- home-btn home-btn-dark">
              View All Projects
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section process-section" id="process">
        <div className="container">
          <SectionHeading
            eyebrow="Our Process"
            title="From Idea To Finished Space"
            text="We keep the process simple so you can focus on creating the space you want."
          />

          <div className="process-line"></div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="process-card">
                <div className="process-icon">
                  <FaComments />
                </div>
                <span>01</span>
                <h3>Consultation</h3>
                <p>
                  Tell us about your space, requirements and preferred style.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="process-card">
                <div className="process-icon">
                  <FaDraftingCompass />
                </div>
                <span>02</span>
                <h3>Selection</h3>
                <p>Explore materials, textures, patterns and finishes.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="process-card">
                <div className="process-icon">
                  <FaRulerCombined />
                </div>
                <span>03</span>
                <h3>Planning</h3>
                <p>We plan the required materials and installation details.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="process-card">
                <div className="process-icon">
                  <FaHardHat />
                </div>
                <span>04</span>
                <h3>Installation</h3>
                <p>
                  Our team brings the selected design together in your space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section testimonials-section" id="testimonials">
        <div className="container">
          <SectionHeading
            eyebrow="Client Experiences"
            title="What Our Customers Say"
            text="Customer experiences help us continue improving the way we work."
          />

          <div className="row g-4">
            {testimonials.map((testimonial) => (
              <div className="col-md-4" key={testimonial.name}>
                <article className="testimonial-card">
                  <FaQuoteLeft className="quote-icon" />

                  <p>{testimonial.text}</p>

                  <div className="testimonial-person">
                    <div className="testimonial-avatar">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section cta-section" id="contact">
        <div className="cta-background"></div>

        <div className="container">
          <div className="cta-content">
            <span>Start Your Project</span>

            <h2>Ready To Transform Your Space?</h2>

            <p>
              Tell us about your project and let’s discuss the right interior
              solution for your space.
            </p>

            <div className="cta-buttons">
              <Link to="/contact" className="home-btn home-btn-light">
                Get a Quote
                <FaArrowRight />
              </Link>

              <a
                href="https://wa.me/923354496040"
                target="_blank"
                rel="noreferrer"
                className="home-btn home-btn-whatsapp"
              >
                <FaWhatsapp />
                WhatsApp Us
              </a>

              <a href="tel:+923354496040" className="home-btn home-btn-call">
                <FaPhoneAlt />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
