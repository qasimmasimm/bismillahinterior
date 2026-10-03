import React from "react";
import SEO from "../components/seo";

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn more about Bismillah Interiors, Lahore's trusted interior finishes provider for wall panels, wallpapers, ceiling designs, and premium flooring."
      />
      <section className="py-1" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span
                className="text-uppercase"
                style={{
                  color: "#B08A45",
                  letterSpacing: "3px",
                  fontSize: "13px",
                }}
              >
                About Bismillah Interiors
              </span>

              <h1
                className="display-3 fw-semibold mt-3 mb-4"
                style={{
                  color: "#171717",
                  lineHeight: "1.1",
                }}
              >
                Spaces Designed
                <br />
                With Character.
              </h1>

              <p
                className="fs-5 mb-4"
                style={{
                  color: "#625D55",
                  maxWidth: "560px",
                  lineHeight: "1.8",
                }}
              >
                Bismillah Interiors brings together distinctive wall finishes,
                decorative panels, wallpapers, ceilings and flooring solutions
                to help create interiors that feel refined, personal and
                complete.
              </p>

              <div
                style={{
                  width: "55px",
                  height: "2px",
                  backgroundColor: "#B08A45",
                }}
              />
            </div>

            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="/images/home-about.avif"
                  alt="Elegant modern interior"
                  className="img-fluid w-100"
                  fetchPriority="low"
                  style={{
                    height: "560px",
                    objectFit: "cover",
                  }}
                />

                <div
                  className="position-absolute bottom-0 start-0 p-4"
                  style={{
                    backgroundColor: "#171717",
                    color: "#F5F0E8",
                    width: "190px",
                  }}
                >
                  <small
                    className="text-uppercase"
                    style={{
                      color: "#B08A45",
                      letterSpacing: "2px",
                    }}
                  >
                    Our Philosophy
                  </small>

                  <div className="mt-2 fw-semibold">
                    Beauty in every detail.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-1" style={{ backgroundColor: "#FCFAF6" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <span
                className="text-uppercase"
                style={{
                  color: "#B08A45",
                  letterSpacing: "3px",
                  fontSize: "13px",
                }}
              >
                Who We Are
              </span>

              <h2
                className="display-6 fw-semibold mt-3"
                style={{ color: "#171717" }}
              >
                Creating interiors that feel like you.
              </h2>
            </div>

            <div className="col-lg-7 offset-lg-1">
              <p
                className="fs-5"
                style={{
                  color: "#625D55",
                  lineHeight: "1.9",
                }}
              >
                Bismillah Interiors is an interior finishing business based in
                Johar Town, Lahore. Our work focuses on bringing together
                design, texture and functionality through carefully selected
                interior finishes.
              </p>

              <p
                style={{
                  color: "#625D55",
                  lineHeight: "1.9",
                }}
              >
                From contemporary wall panels and textured finishes to
                wallpapers, ceiling solutions and flooring, we offer options for
                customers looking to give their homes, offices and other spaces
                a distinctive new character.
              </p>

              <p
                style={{
                  color: "#625D55",
                  lineHeight: "1.9",
                }}
              >
                Our approach is simple: understand the space, understand the
                customer's vision, and help turn that vision into a finished
                interior.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-1" style={{ backgroundColor: "#171717" }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <img
                src="/images/about-section2.avif"
                fetchPriority="low"
                alt="Contemporary interior"
                className="img-fluid w-100"
                style={{
                  height: "600px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-lg-5">
              <span
                className="text-uppercase"
                style={{
                  color: "#B08A45",
                  letterSpacing: "3px",
                  fontSize: "13px",
                }}
              >
                Our Work
              </span>

              <h2
                className="display-6 fw-semibold mt-3 mb-4"
                style={{ color: "#F5F0E8" }}
              >
                Texture.
                <br />
                Depth.
                <br />
                Personality.
              </h2>

              <p
                style={{
                  color: "#B9B3A9",
                  lineHeight: "1.9",
                }}
              >
                Walls can completely change the atmosphere of a room. Our
                collection includes modern panels, textured finishes and
                decorative designs created to add depth and visual interest to
                interiors.
              </p>

              <p
                style={{
                  color: "#B9B3A9",
                  lineHeight: "1.9",
                }}
              >
                Whether the goal is a subtle contemporary look or a more
                distinctive feature wall, we help customers explore finishes
                that complement their space.
              </p>

              <a
                href="/products"
                className="btn rounded-0 px-4 py-3 mt-3"
                style={{
                  border: "1px solid #B08A45",
                  color: "#F5F0E8",
                }}
              >
                Explore Our Products
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-1" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-lg-7">
              <span
                className="text-uppercase"
                style={{
                  color: "#B08A45",
                  letterSpacing: "3px",
                  fontSize: "13px",
                }}
              >
                What We Offer
              </span>

              <h2
                className="display-6 fw-semibold mt-3"
                style={{ color: "#171717" }}
              >
                Interior finishes for
                <br />
                every kind of space.
              </h2>
            </div>
          </div>

          <div className="row g-0">
            <div className="col-md-4">
              <div
                className="p-4 p-lg-5 h-100"
                style={{
                  borderTop: "1px solid #C9BFAF",
                  borderRight: "1px solid #C9BFAF",
                }}
              >
                <span
                  style={{
                    color: "#B08A45",
                    fontSize: "28px",
                  }}
                >
                  01
                </span>

                <h4 className="fw-semibold mt-4" style={{ color: "#171717" }}>
                  Wall Panels
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: "#6D675E",
                    lineHeight: "1.8",
                  }}
                >
                  Contemporary textures, wood-inspired finishes and decorative
                  panels for feature walls and modern interiors.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="p-4 p-lg-5 h-100"
                style={{
                  borderTop: "1px solid #C9BFAF",
                  borderRight: "1px solid #C9BFAF",
                }}
              >
                <span
                  style={{
                    color: "#B08A45",
                    fontSize: "28px",
                  }}
                >
                  02
                </span>

                <h4 className="fw-semibold mt-4" style={{ color: "#171717" }}>
                  Wallpapers
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: "#6D675E",
                    lineHeight: "1.8",
                  }}
                >
                  A variety of patterns, colours and textures to introduce
                  warmth, character and visual depth to your interiors.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="p-4 p-lg-5 h-100"
                style={{
                  borderTop: "1px solid #C9BFAF",
                }}
              >
                <span
                  style={{
                    color: "#B08A45",
                    fontSize: "28px",
                  }}
                >
                  03
                </span>

                <h4 className="fw-semibold mt-4" style={{ color: "#171717" }}>
                  Flooring & Ceilings
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: "#6D675E",
                    lineHeight: "1.8",
                  }}
                >
                  Flooring and ceiling options that complete the overall look
                  and bring greater cohesion to an interior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-1" style={{ backgroundColor: "#FCFAF6" }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span
                className="text-uppercase"
                style={{
                  color: "#B08A45",
                  letterSpacing: "3px",
                  fontSize: "13px",
                }}
              >
                The Difference
              </span>

              <h2
                className="display-6 fw-semibold mt-3 mb-4"
                style={{ color: "#171717" }}
              >
                Good interiors begin with good details.
              </h2>

              <p
                style={{
                  color: "#625D55",
                  lineHeight: "1.9",
                }}
              >
                We believe the right finish can change more than the appearance
                of a room. It can change how the entire space feels.
              </p>

              <div className="mt-4">
                <div className="d-flex gap-3 mb-4">
                  <span
                    style={{
                      color: "#B08A45",
                      fontSize: "20px",
                    }}
                  >
                    —
                  </span>

                  <div>
                    <h6
                      className="fw-semibold mb-1"
                      style={{ color: "#171717" }}
                    >
                      Thoughtful Selection
                    </h6>

                    <p className="mb-0 small" style={{ color: "#716B62" }}>
                      Designs and finishes selected to complement different
                      interiors.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-4">
                  <span
                    style={{
                      color: "#B08A45",
                      fontSize: "20px",
                    }}
                  >
                    —
                  </span>

                  <div>
                    <h6
                      className="fw-semibold mb-1"
                      style={{ color: "#171717" }}
                    >
                      Attention to Detail
                    </h6>

                    <p className="mb-0 small" style={{ color: "#716B62" }}>
                      A focus on achieving a clean, finished appearance.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <span
                    style={{
                      color: "#B08A45",
                      fontSize: "20px",
                    }}
                  >
                    —
                  </span>

                  <div>
                    <h6
                      className="fw-semibold mb-1"
                      style={{ color: "#171717" }}
                    >
                      Personalized Guidance
                    </h6>

                    <p className="mb-0 small" style={{ color: "#716B62" }}>
                      Helping customers choose solutions suited to their space.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <img
                src="/images/about-sec3.avif"
                alt="Interior wall and furniture"
                className="img-fluid w-100"
                style={{
                  height: "560px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-1" style={{ backgroundColor: "#171717" }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span
                className="text-uppercase"
                style={{
                  color: "#B08A45",
                  letterSpacing: "3px",
                  fontSize: "13px",
                }}
              >
                Visit Bismillah Interiors
              </span>

              <h2
                className="display-6 fw-semibold mt-3 mb-3"
                style={{ color: "#F5F0E8" }}
              >
                Come and explore your next interior.
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#B9B3A9",
                  lineHeight: "1.8",
                  maxWidth: "650px",
                }}
              >
                Visit us in Johar Town, Lahore and explore interior finishing
                options for your home, office or commercial space.
              </p>
            </div>

            <div className="col-lg-4 mt-4 mt-lg-0">
              <div
                style={{
                  border: "1px solid #4A453D",
                  overflow: "hidden",
                }}
              >
                <iframe
                  src="https://www.google.com/maps?q=Bismillah+Interiors,+Johar+Town,+Lahore&output=embed"
                  width="100%"
                  height="250"
                  style={{
                    border: 0,
                    display: "block",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bismillah Interiors Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
