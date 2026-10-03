import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/seo";

export default function Testimonials() {
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    {
      name: "Muhammad Ahmed",
      location: "Johar Town, Lahore",
      review:
        "Excellent quality and professional installation. The wall panels completely changed the look of our living room. We are extremely happy with the result.",
      image:
        "/images/home-cta.avif",
    },
    {
      name: "Sarah Ali",
      location: "Lahore",
      review:
        "Great designs and excellent finishing. The team was professional and completed the work exactly as we expected.",
      image:
        "/images/banner1.avif",
    },
    {
      name: "Ahmed Farooq",
      location: "Lahore",
      review:
        "Very helpful staff and a wide range of designs. The wallpapers we selected look beautiful in our home.",
      image:"/images/about-sec3.avif",
    },
    {
      name: "Nadia Usman",
      location: "Lahore",
      review:
        "The finishing was excellent and the quality was impressive. The entire room has a completely different feel now.",
      image:
        "/images/home-about.avif",
    },
  ];

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const previousReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[activeReview];

  return (
    <div style={{ backgroundColor: "#f8f5ef" }}>
      <SEO
        title="Client Reviews & Experiences"
        description="Read client testimonials and reviews for Bismillah Interiors in Lahore. Discover customer experiences with our wall paneling, wallpapers, and flooring work."
      />
      <section
        className="text-white d-flex align-items-center"
        style={{
          minHeight: "285px",
          backgroundImage:
            "linear-gradient(rgba(28,26,23,.58), rgba(28,26,23,.58)), url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <p
                className="text-uppercase fw-semibold small mb-2"
                style={{ color: "#c29a5b", letterSpacing: "2px" }}
              >
                What Our Clients Say
              </p>

              <h1 className="display-5 fw-semibold mb-2 " style={{color:"#ad8144"}}>
                Real Stories. Happy Homes.
              </h1>

              <p className="mb-0 text-white" style={{ maxWidth: "560px" }}>
                Discover what our clients have to say about their experience
                with Bismillah Interiors.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container position-relative "
        style={{ marginTop: "-55px" }}
      >
        <div
          className="bg-white rounded-4 shadow-sm overflow-hidden"
          style={{ border: "1px solid #e6dfd4" }}
        >
          <div className="row g-0 align-items-stretch">
            <div className="col-lg-6">
              <img
                src={currentReview.image}
                alt="Interior project"
                className="img-fluid w-100 h-100 object-fit-cover"
                style={{ maxHeight: "430px" }}
              />
            </div>
            <div className="col-lg-6 " style={{}}>
              <div className="p-4 p-lg-5 h-100 d-flex flex-column justify-content-center">
                <div className="fs-2 mb-2" style={{ color: "#ad8144" }}>
                  “
                </div>

                <p
                  className="fs-4 mb-3"
                  style={{
                    color: "#292621",
                    lineHeight: "1.45",
                  }}
                >
                  {currentReview.review}
                </p>

                <div
                  className="mb-3"
                  style={{ color: "#ad8144", letterSpacing: "2px" }}
                >
                  ★★★★★
                </div>

                <h6 className="mb-1 fw-semibold" style={{ color: "#292621" }}>
                  {currentReview.name}
                </h6>
                <small className="text-secondary">
                  {currentReview.location}
                </small>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-sm rounded-circle border"
                    onClick={previousReview}
                    aria-label="Previous review"
                    style={{
                      width: "38px",
                      height: "38px",
                      color: "#292621",
                      backgroundColor: "#f8f5ef",
                    }}
                  >
                    ←
                  </button>
                  <div className="d-flex gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className="border-0 p-0"
                        onClick={() => setActiveReview(index)}
                        style={{
                          width: index === activeReview ? "28px" : "8px",
                          height: "4px",
                          borderRadius: "10px",
                          backgroundColor:
                            index === activeReview ? "#ad8144" : "#ddd5ca",
                        }}
                        aria-label={`Review ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm rounded-circle border"
                    onClick={nextReview}
                    aria-label="Next review"
                    style={{
                      width: "38px",
                      height: "38px",
                      color: "#292621",
                      backgroundColor: "#f8f5ef",
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-5">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-lg-7">
            <p
              className="text-uppercase small fw-semibold mb-1"
              style={{
                color: "#ad8144",
                letterSpacing: "2px",
              }}
            >
              More Reviews
            </p>

            <h2 className="fw-semibold mb-2" style={{ color: "#292621" }}>
              What Our Clients Say
            </h2>

            <p className="text-secondary mb-0">
              Experiences from customers who trusted us with their interior
              projects.
            </p>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-3">
          {reviews.slice(1, 4).map((review, index) => (
            <div className="col" key={index}>
              <div
                className="card h-100 bg-white border-0 rounded-4 shadow-sm overflow-hidden"
                style={{ border: "1px solid #e6dfd4" }}
              >
                <img
                  src={review.image}
                  alt="Interior project"
                  className="card-img-top object-fit-cover"
                  style={{ height: "190px" }}
                />

                <div className="card-body p-4">
                  <div className="mb-2" style={{ color: "#ad8144" }}>
                    ★★★★★
                  </div>

                  <p
                    className="mb-4"
                    style={{
                      color: "#55504a",
                      lineHeight: "1.6",
                    }}
                  >
                    “{review.review}”
                  </p>

                  <div className="border-top pt-3">
                    <h6
                      className="mb-1 fw-semibold"
                      style={{ color: "#292621" }}
                    >
                      {review.name}
                    </h6>

                    <small className="text-secondary">{review.location}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-5" style={{ backgroundColor: "#eee8de" }}>
        <div className="container">
          <div className="row g-0 bg-white rounded-4 overflow-hidden shadow-sm align-items-center">
            <div className="col-lg-6">
              <img
                src="/images/banner1.avif"
                fetchPriority="low"
                alt="Elegant interior project"
                className="img-fluid w-100 object-fit-cover"
                style={{ height: "330px" }}
              />
            </div>

            <div className="col-lg-6">
              <div className="p-4 p-lg-5">
                <p
                  className="text-uppercase small fw-semibold mb-2"
                  style={{
                    color: "#ad8144",
                    letterSpacing: "2px",
                  }}
                >
                  Client Experience
                </p>

                <h2 className="fw-semibold mb-3" style={{ color: "#292621" }}>
                  Beautiful Spaces, Real People
                </h2>

                <p
                  className="mb-3"
                  style={{
                    color: "#55504a",
                    lineHeight: "1.7",
                  }}
                >
                  “We wanted something modern but elegant for our living room.
                  The team understood exactly what we were looking for and the
                  final result was beautiful.”
                </p>

                <div className="mb-3" style={{ color: "#ad8144" }}>
                  ★★★★★
                </div>

                <h6 className="fw-semibold mb-1">Rizwan Sheikh</h6>

                <small className="text-secondary">
                  Living Room Project · Lahore
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="text-white text-center"
        style={{
          backgroundColor: "#292621",
          backgroundImage:
            "linear-gradient(rgba(30,27,23,.78), rgba(30,27,23,.78)), url('/images/banner03.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-5">
          <h2 className="fw-semibold mb-2">Ready to Transform Your Space?</h2>

          <p className="text-white-50 mb-4">
            Explore our designs or get in touch with us for your next interior
            project.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
            <Link
              to="/products"
              className="btn px-4 py-2 fw-semibold"
              style={{
                backgroundColor: "#ad8144",
                color: "#fff",
              }}
            >
              View Products
            </Link>

            <Link to="/contact" className="btn btn-outline-light px-4 py-2 fw-semibold">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
