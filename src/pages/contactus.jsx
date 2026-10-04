import React from "react";
import SEO from "../components/seo";

export default function Contact() {
  const whatsappNumber = "923354496040";

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const whatsappMessage = `Hello Bismillah Interiors,

Name: ${name}
Phone: ${phone}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="contact-page">
      <SEO
        title="Contact & Location in Lahore"
        description="Get in touch with Bismillah Interiors in Johar Town, Lahore. Visit our store or WhatsApp +92 335 4496040 for wall panels, wallpapers, ceilings, and flooring."
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Bismillah Interiors",
          description:
            "Contact and showroom details for Bismillah Interiors in Johar Town, Lahore.",
          mainEntity: {
            "@type": "HomeGoodsStore",
            name: "Bismillah Interiors",
            telephone: "+923354496040",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Sector B2, Block A3, Phase 1, Johar Town",
              addressLocality: "Lahore",
              addressCountry: "PK",
            },
          },
        }}
      />
      <div className="contact-top">
        <div className="contact-banner">
          <div className="container text-center">
            <span className="contact-gold small fw-semibold text-uppercase">
              Get In Touch
            </span>

            <h1 className="display-5 fw-semibold text-white mt-2 mb-2">
              Contact Us
            </h1>

            <p className="text-white-50 mb-0">
              Let's discuss your next interior project.
            </p>
          </div>
        </div>

        <div className="container contact-card-wrapper">
          <div className="row g-0 contact-card">
            <div className="col-lg-5 contact-info p-4">
              <span className="contact-gold small fw-semibold text-uppercase">
                Get In Touch
              </span>

              <h2 className="h4 fw-semibold contact-dark mt-2 mb-2">
                Let's talk about
                <br />
                your project.
              </h2>

              <p className="small contact-muted mb-3">
                Have a question about wall panels, wallpapers, flooring or
                interior finishes? We're here to help.
              </p>

              <div className="d-flex gap-3 mb-3">
                <div className="contact-icon">
                  <span>⌖</span>
                </div>

                <div>
                  <div className="small fw-semibold contact-dark">Visit Us</div>

                  <p className="small contact-muted mb-0">
                    Sector B2, Block A3, Phase 1,
                    <br />
                    Johar Town, Lahore
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-3">
                <div className="contact-icon">
                  <span>☎</span>
                </div>

                <div>
                  <div className="small fw-semibold contact-dark">
                    Call / WhatsApp
                  </div>

                  <p className="small contact-muted mb-0">+92 335 4496040</p>

                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="small text-decoration-none contact-gold fw-semibold"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>

              <div className="d-flex gap-3">
                <div className="contact-icon">
                  <span>◆</span>
                </div>

                <div>
                  <div className="small fw-semibold contact-dark">Business</div>

                  <p className="small contact-muted mb-0">
                    Bismillah Interiors
                    <br />
                    Interior & Wallpaper Store
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="col-lg-7 p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="contact-gold small fw-semibold text-uppercase">
                    Enquiry
                  </span>

                  <h2 className="h4 fw-semibold contact-dark mt-1 mb-1">
                    Send us a message
                  </h2>

                  <p className="small contact-muted mb-0">
                    Tell us about your requirements.
                  </p>
                </div>

                <span className="contact-number">01</span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-2">
                  <div className="col-md-6">
                    <label
                      htmlFor="name"
                      className="form-label small fw-semibold contact-muted mb-1"
                    >
                      Name *
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control contact-input"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="phone"
                      className="form-label small fw-semibold contact-muted mb-1"
                    >
                      Phone *
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control contact-input"
                      placeholder="Phone number"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="email"
                      className="form-label small fw-semibold contact-muted mb-1"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control contact-input"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="subject"
                      className="form-label small fw-semibold contact-muted mb-1"
                    >
                      Requirement *
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      className="form-select contact-input"
                      required
                    >
                      <option value="">Select requirement</option>
                      <option value="Wall Panels">Wall Panels</option>
                      <option value="Wallpapers">Wallpapers</option>
                      <option value="Flooring">Flooring</option>
                      <option value="Ceiling Solutions">
                        Ceiling Solutions
                      </option>
                      <option value="Interior Project">Interior Project</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="message"
                      className="form-label small fw-semibold contact-muted mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="2"
                      className="form-control contact-input"
                      placeholder="Tell us about your project..."
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 pt-1">
                    <button
                      type="submit"
                      className="btn contact-button px-4 py-2 fw-semibold"
                    >
                      Send via WhatsApp →
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="mb-3">
          <span className="contact-gold small fw-semibold text-uppercase">
            Find Us
          </span>

          <h2 className="h5 fw-semibold contact-dark mt-1 mb-0">
            Visit Our Location
          </h2>
        </div>

        <div className="contact-map rounded-4 overflow-hidden border">
          <iframe
            src="https://www.google.com/maps?q=Bismillah+Interiors,+Johar+Town,+Lahore&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bismillah Interiors Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
