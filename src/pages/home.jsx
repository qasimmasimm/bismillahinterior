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
import { useContext } from "react";
import { getStoredUser, clearAuth } from "../utils/cookie";
import { UserContext } from "../context/usercontext";
import { ProjectContext } from "../context/projectcontext";
import { ProductsContext } from "../context/aticlescontext";

const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=75&fm=webp",
    eyebrow: "Premium Interior Solutions",
    title: "Transform Your Space With Timeless Elegance",
    text: "Premium wall panels, ceilings, wallpapers and interior finishes for homes, offices and commercial spaces.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=75&fm=webp",
    eyebrow: "Designed For Your Space",
    title: "Beautiful Interiors. Thoughtful Details.",
    text: "Create an interior that reflects your style with carefully selected textures, finishes and materials.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=75&fm=webp",
    eyebrow: "Lahore Interior Specialists",
    title: "Give Your Walls A New Character",
    text: "Discover modern decorative wall solutions designed to elevate the look and feel of your space.",
  },
];

const services = [
  {
    image:
      "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=600&q=75&fm=webp",
    title: "Wall Panels",
    text: "Modern decorative wall panels in a variety of textures, patterns and finishes.",
    slug: "wpc-imported-panels",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=75&fm=webp",
    title: "Ceiling Solutions",
    text: "Elegant ceiling treatments that add depth, character and visual balance to your interiors.",
    slug: "ceiling-2x2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=600&q=75&fm=webp",
    title: "Wallpapers",
    text: "Transform plain walls with carefully selected patterns, textures and contemporary designs.",
    slug: "wallpapers",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=75&fm=webp",
    title: "Flooring",
    text: "Stylish flooring solutions including modern wood-look and durable contemporary finishes.",
    slug: "spc-flooring",
  },
];

// const products = [
//   {
//     image:
//       "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=75&fm=webp",
//     title: "Wood Texture Wall Panel",
//     category: "Wall Panels",
//     id: "wpc-imported-01",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=600&q=75&fm=webp",
//     title: "Modern Decorative Panel",
//     category: "Wall Panels",
//     id: "wpc-solid-01",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=600&q=75&fm=webp",
//     title: "Textured Interior Finish",
//     category: "Wallpapers",
//     id: "wallpaper-01",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=600&q=75&fm=webp",
//     title: "Oak Wood SPC Flooring",
//     category: "SPC Flooring",
//     id: "spc-01",
//   },
// ];

const projects = [
  {
    id: "modern-living-room",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=75&fm=webp",
    title: "Modern Living Room",
    category: "Residential Interior",
  },
  {
    id: "elegant-bedroom",
    image:
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=700&q=75&fm=webp",
    title: "Elegant Feature Wall",
    category: "Wall Panel Installation",
  },
  {
    id: "contemporary-tv-unit",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=75&fm=webp",
    title: "Contemporary Interior",
    category: "Residential Project",
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

export default function Home() {
  const { user: contextUser, setUser } = useContext(UserContext);
  const user = contextUser || getStoredUser();
  const navigate = useNavigate();
  const { Project } = useContext(ProjectContext);
  const { products } = useContext(ProductsContext);

  const featuredProjects = Project?.slice(0, 4) || [];
  const featuredProducts = products?.slice(0, 4) || [];
  const API_URL = import.meta.env.VITE_API_URL;

  // console.log("Current Project from Context:", Project);

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
                  width="1200"
                  height="700"
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
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=75&fm=webp"
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
            {services.map((service, index) => (
              <div className="col-sm-6 col-lg-3" key={service.title}>
                <article className="service-card">
                  <div className="service-image-wrap">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-image"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="300"
                    />

                    <span className="service-number">0{index + 1}</span>
                  </div>

                  <div className="service-body">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>

                    <Link
                      to={`/categories/${service.slug}`}
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
                  src="https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=800&q=75&fm=webp"
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
                <article className="product-card">
                  <div className="product-image-wrap">
                    {product.images?.length > 0 ? (
                      <Carousel
                        indicators={false}
                        controls={product.images.length > 1}
                        interval={null}
                      >
                        {product.images.map((image, index) => (
                          <Carousel.Item key={`${product._id}-${index}`}>
                            <img
                              src={`${API_URL}/${image.replaceAll("\\", "/")}`}
                              alt={`${product.name} ${index + 1}`}
                              className="product-image"
                              loading={index === 0 ? "eager" : "lazy"}
                              decoding="async"
                              style={{
                                width: "100%",
                                height: "330px",
                                objectFit: "contain",
                              }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    ) : (
                      <img
                        src="https://via.placeholder.com/400x330?text=No+Image"
                        alt="No product image available"
                        className="product-image"
                        width="400"
                        height="330"
                      />
                    )}

                    <span className="product-category">
                      {product.category?.title}
                    </span>
                  </div>

                  <div className="product-body">
                    <h3>{product.name}</h3>

                    <Link
                      to={`/products/${product._id}`}
                      className="product-link"
                    >
                      View Product
                      <FaArrowRight />
                    </Link>
                  </div>
                </article>
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
                      style={{ height: "320px" }}
                    />

                    <div className="pt-3">
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
            <Link to="/projects" className="text-link">
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
