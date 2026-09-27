import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/productsdata";
import categories from "../data/categoriesdata";
import SEO from "../components/seo";

export default function ProductDetails() {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="py-5" style={{ backgroundColor: "#fcfaf6", minHeight: "60vh" }}>
        <div className="container py-5 text-center">
          <small
            className="text-uppercase fw-semibold"
            style={{ color: "#ad8144", letterSpacing: "2px" }}
          >
            Product Catalog
          </small>

          <h1 className="display-5 fw-semibold mt-3 mb-3" style={{ color: "#292621" }}>
            Product Not Found
          </h1>

          <p className="text-secondary mb-4">
            The product design you are looking for is currently not in our online catalogue.
          </p>

          <Link
            to="/products"
            className="btn rounded-pill px-4 py-3 fw-semibold"
            style={{ backgroundColor: "#292621", color: "#f5f0e8" }}
          >
            Browse All Products <span className="ms-2">→</span>
          </Link>
        </div>
      </main>
    );
  }

  const gallery = product.images || [];
  const currentImage = gallery[selectedImageIndex] || gallery[0];

  // Find matching category object to get slug
  const categoryObj = categories.find(
    (c) => c.title.toLowerCase().trim() === product.category.toLowerCase().trim()
  );
  const categorySlug = categoryObj ? categoryObj.slug : encodeURIComponent(product.category);

  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3);

  const whatsappMessage = `Hello Bismillah Interiors, I am interested in: ${product.title} from the ${product.category} collection. Please share pricing and availability.`;

  return (
    <main style={{ backgroundColor: "#fcfaf6" }}>
      <SEO
        title={`${product.title} - ${product.category}`}
        description={`Explore ${product.title} from the ${product.category} collection by Bismillah Interiors. Premium interior finish available in Lahore.`}
        image={currentImage}
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.title,
          "category": product.category,
          "image": gallery,
          "description": `Premium ${product.title} in the ${product.category} collection by Bismillah Interiors Lahore.`,
          "brand": {
            "@type": "Brand",
            "name": "Bismillah Interiors"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "PKR",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "HomeGoodsStore",
              "name": "Bismillah Interiors Lahore"
            }
          }
        }}
      />
      {/* Product Hero & Info */}
      <section className="py-5">
        <div className="container py-lg-4">
          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0" style={{ fontSize: "13px" }}>
              <li className="breadcrumb-item">
                <Link to="/" className="text-secondary text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/categories" className="text-secondary text-decoration-none">
                  Categories
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/categories/${categorySlug}`} className="text-secondary text-decoration-none">
                  {product.category}
                </Link>
              </li>
              <li className="breadcrumb-item active fw-semibold" aria-current="page" style={{ color: "#ad8144" }}>
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="row g-5 align-items-center">
            {/* Gallery / Images */}
            <div className="col-12 col-lg-7">
              <div
                className="overflow-hidden rounded-4 shadow-sm border mb-3 bg-white"
                style={{ borderColor: "#e5ddd2" }}
              >
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-100 object-fit-cover"
                  style={{
                    height: "540px",
                    transition: "opacity 0.3s ease",
                  }}
                />
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="d-flex gap-3 overflow-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className="p-0 border-0 bg-transparent rounded-3 overflow-hidden shadow-sm"
                      style={{
                        width: "90px",
                        height: "90px",
                        flexShrink: 0,
                        outline: selectedImageIndex === idx ? "2px solid #ad8144" : "1px solid #e5ddd2",
                        opacity: selectedImageIndex === idx ? 1 : 0.7,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={img}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Description */}
            <div className="col-12 col-lg-5">
              <div className="ps-lg-3">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <Link
                    to={`/categories/${categorySlug}`}
                    className="text-uppercase fw-semibold text-decoration-none"
                    style={{
                      color: "#ad8144",
                      letterSpacing: "2px",
                      fontSize: "12px",
                    }}
                  >
                    {product.category}
                  </Link>

                  <span
                    style={{
                      width: "35px",
                      height: "1px",
                      backgroundColor: "#ad8144",
                    }}
                  />
                </div>

                <h1 className="display-5 fw-semibold mb-3" style={{ color: "#292621" }}>
                  {product.title}
                </h1>

                <p className="text-secondary lh-lg mb-4" style={{ maxWidth: "500px", fontSize: "15px" }}>
                  Explore our {product.title.toLowerCase()} from the {product.category} collection, curated for premium residential and commercial interior installations across Lahore.
                </p>

                {/* Specs Box */}
                <div
                  className="border-top border-bottom py-3 mb-4"
                  style={{ borderColor: "#e5ddd2" }}
                >
                  <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: "#f0eae0" }}>
                    <span className="text-secondary" style={{ fontSize: "14px" }}>
                      Catalog Category
                    </span>
                    <strong style={{ color: "#292621", fontSize: "14px" }}>
                      <Link to={`/categories/${categorySlug}`} className="text-decoration-none" style={{ color: "#292621" }}>
                        {product.category}
                      </Link>
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: "#f0eae0" }}>
                    <span className="text-secondary" style={{ fontSize: "14px" }}>
                      Design Name
                    </span>
                    <strong style={{ color: "#292621", fontSize: "14px" }}>
                      {product.title}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: "#f0eae0" }}>
                    <span className="text-secondary" style={{ fontSize: "14px" }}>
                      Available Views
                    </span>
                    <strong style={{ color: "#292621", fontSize: "14px" }}>
                      {gallery.length} Images
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between py-2">
                    <span className="text-secondary" style={{ fontSize: "14px" }}>
                      Availability
                    </span>
                    <strong className="text-success" style={{ fontSize: "14px" }}>
                      In Store / On Order (Lahore)
                    </strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column gap-2">
                  <a
                    href={`https://wa.me/923354496040?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn rounded-pill px-4 py-3 fw-semibold text-center"
                    style={{
                      backgroundColor: "#292621",
                      color: "#f5f0e8",
                    }}
                  >
                    Enquire on WhatsApp <span className="ms-2">→</span>
                  </a>

                  <Link
                    to="/contact"
                    className="btn btn-outline-dark rounded-pill px-4 py-3 fw-semibold text-center"
                  >
                    Book Site Visit / Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {gallery.length > 1 && (
        <section className="py-5" style={{ backgroundColor: "#f5f0e8" }}>
          <div className="container py-lg-3">
            <div className="mb-4">
              <small
                className="text-uppercase fw-semibold"
                style={{ color: "#ad8144", letterSpacing: "2px" }}
              >
                Detailed Gallery
              </small>

              <h2 className="display-6 fw-semibold mt-2" style={{ color: "#292621" }}>
                {product.title} Views
              </h2>
            </div>

            <div className="row g-4">
              {gallery.map((image, index) => (
                <div
                  className={index === 0 ? "col-12" : "col-12 col-md-6"}
                  key={`${image}-${index}`}
                >
                  <div className="overflow-hidden rounded-4 shadow-sm bg-white">
                    <img
                      src={image}
                      alt={`${product.title} detail view ${index + 1}`}
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

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-5">
          <div className="container py-lg-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <small
                  className="text-uppercase fw-semibold"
                  style={{ color: "#ad8144", letterSpacing: "2px" }}
                >
                  More Options
                </small>

                <h2 className="display-6 fw-semibold mt-1 mb-0" style={{ color: "#292621" }}>
                  More from {product.category}
                </h2>
              </div>

              <Link
                to={`/categories/${categorySlug}`}
                className="text-decoration-none fw-semibold d-none d-md-block"
                style={{ color: "#292621" }}
              >
                View Full Collection <span className="ms-2">→</span>
              </Link>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {relatedProducts.map((item) => (
                <div className="col" key={item.id}>
                  <Link to={`/products/${item.id}`} className="text-decoration-none">
                    <div
                      className="card h-100 bg-white rounded-4 overflow-hidden shadow-sm"
                      style={{ border: "1px solid #e5ddd2" }}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="card-img-top w-100 object-fit-cover"
                        style={{ height: "260px" }}
                        loading="lazy"
                      />

                      <div className="card-body p-4">
                        <small
                          className="text-uppercase fw-semibold"
                          style={{
                            color: "#ad8144",
                            letterSpacing: "1px",
                            fontSize: "11px",
                          }}
                        >
                          {item.category}
                        </small>

                        <h3 className="h5 fw-semibold mt-2 mb-0" style={{ color: "#292621" }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-5" style={{ backgroundColor: "#292621" }}>
        <div className="container py-4 text-center">
          <small
            className="text-uppercase fw-semibold"
            style={{ color: "#ad8144", letterSpacing: "2px" }}
          >
            Need Assistance or Samples?
          </small>

          <h2 className="display-6 fw-semibold mt-2 mb-3" style={{ color: "#f5f0e8" }}>
            Let's find the right finish for your space.
          </h2>

          <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Visit our showroom in Johar Town, Lahore or discuss your project requirements with our interior experts.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/contact"
              className="btn rounded-pill px-4 py-3 fw-semibold"
              style={{ backgroundColor: "#b08a45", color: "#292621" }}
            >
              Contact Us <span className="ms-2">→</span>
            </Link>
            <Link
              to={`/categories/${categorySlug}`}
              className="btn btn-outline-light rounded-pill px-4 py-3 fw-semibold"
            >
              Back to {product.category}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}