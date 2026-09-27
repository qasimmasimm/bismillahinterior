import { Link, useParams } from "react-router-dom";
import categories from "../data/categoriesdata";
import products from "../data/productsdata";
import { useState } from "react";
import SEO from "../components/seo";

function ProductCard({ product }) {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((active + 1) % product.images.length);
  };

  const previous = () => {
    setActive((active - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="col">
      <div
        className="card h-100 bg-white rounded-4 overflow-hidden shadow-sm"
        style={{ border: "1px solid #e5ddd2" }}
      >
        <div className="position-relative overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
          <Link to={`/products/${product.id}`} className="text-decoration-none">
            <img
              src={product.images[active]}
              alt={product.title}
              className="w-100 h-100 object-fit-cover"
            />
          </Link>

          {product.images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.preventDefault();
                  previous();
                }}
                className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle shadow-sm"
                style={{ width: "38px", height: "38px" }}
              >
                ←
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle shadow-sm"
                style={{ width: "38px", height: "38px" }}
              >
                →
              </button>

              <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-1">
                {product.images.map((_, index) => (
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
            style={{ color: "#ad8144", letterSpacing: "1px", fontSize: "11px" }}
          >
            {product.category}
          </small>

          <h4 className="h5 fw-semibold mt-2 mb-3" style={{ color: "#292621" }}>
            <Link to={`/products/${product.id}`} className="text-decoration-none" style={{ color: "#292621" }}>
              {product.title}
            </Link>
          </h4>

          <div className="mt-auto pt-2">
            <Link
              to={`/products/${product.id}`}
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

export default function CategoryDetails() {
  const { slug } = useParams();

  // Normalize slug matching (matches "spc-flooring", "SPCFlooring", "WPCImportedPanels", etc.)
  const normalizedParam = slug ? slug.toLowerCase().replace(/[^a-z0-9]/g, "") : "";

  const category = categories.find((c) => {
    const normSlug = c.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    const normTitle = c.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    return normSlug === normalizedParam || normTitle === normalizedParam;
  });

  if (!category) {
    return (
      <main className="py-5" style={{ backgroundColor: "#fcfaf6", minHeight: "60vh" }}>
        <div className="container py-5 text-center">
          <small
            className="text-uppercase fw-semibold"
            style={{ color: "#ad8144", letterSpacing: "2px" }}
          >
            Collections
          </small>
          <h1 className="display-5 fw-semibold mt-3 mb-3" style={{ color: "#292621" }}>
            Collection Not Found
          </h1>
          <p className="text-secondary mb-4">
            The collection you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/categories"
            className="btn rounded-0 px-4 py-3 fw-semibold"
            style={{ backgroundColor: "#292621", color: "#f5f0e8" }}
          >
            View All Collections <span className="ms-2">→</span>
          </Link>
        </div>
      </main>
    );
  }

  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase().trim() === category.title.toLowerCase().trim()
  );

  const otherCategories = categories.filter((c) => c.slug !== category.slug).slice(0, 4);

  return (
    <main style={{ backgroundColor: "#fcfaf6" }}>
      <SEO
        title={`${category.title} Collection`}
        description={`Explore premium ${category.title.toLowerCase()} options in Lahore by Bismillah Interiors. ${category.description}`}
        image={category.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${category.title} - Bismillah Interiors`,
          "description": category.description,
          "url": `https://bismillahinteriors.pk/categories/${category.slug}`
        }}
      />
      {/* Hero Banner */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          minHeight: "320px",
          backgroundImage: `linear-gradient(rgba(28,26,23,.68), rgba(28,26,23,.68)), url('${category.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0" style={{ fontSize: "13px" }}>
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white-50 text-decoration-none">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/categories" className="text-white-50 text-decoration-none">
                      Collections
                    </Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">
                    {category.title}
                  </li>
                </ol>
              </nav>

              <small
                className="text-uppercase fw-semibold"
                style={{ color: "#d8b36a", letterSpacing: "2.5px" }}
              >
                Collection Catalog
              </small>

              <h1 className="display-4 fw-semibold mt-2 mb-3 text-white">
                {category.title}
              </h1>

              <p className="lead text-white-50 mb-0" style={{ maxWidth: "600px", fontSize: "16px" }}>
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-5">
        <div className="container py-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom" style={{ borderColor: "#e5ddd2" }}>
            <div>
              <h2 className="h4 fw-semibold mb-1" style={{ color: "#292621" }}>
                Available Designs & Finishes
              </h2>
              <small className="text-secondary">
                Showing {categoryProducts.length} {categoryProducts.length === 1 ? "design" : "designs"} in {category.title}
              </small>
            </div>

            <Link
              to={`/products?category=${encodeURIComponent(category.title)}`}
              className="btn btn-outline-dark btn-sm rounded-pill px-3 py-2 mt-2 mt-sm-0 fw-semibold"
            >
              Filter in All Products <span className="ms-1">→</span>
            </Link>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 border p-5" style={{ borderColor: "#e5ddd2" }}>
              <h3 className="h5 fw-semibold mb-2" style={{ color: "#292621" }}>
                Designs Available on Consultation
              </h3>
              <p className="text-secondary mb-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
                We have a comprehensive showroom catalogue for {category.title} in Lahore. Contact us for latest catalogue and samples.
              </p>
              <Link
                to="/contact"
                className="btn px-4 py-2 fw-semibold"
                style={{ backgroundColor: "#ad8144", color: "#fff" }}
              >
                Contact for Catalogue
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Other Collections */}
      <section className="py-5" style={{ backgroundColor: "#f5f0e8" }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <small
                className="text-uppercase fw-semibold"
                style={{ color: "#ad8144", letterSpacing: "2px" }}
              >
                Explore More
              </small>
              <h2 className="h3 fw-semibold mt-1 mb-0" style={{ color: "#292621" }}>
                Other Collections
              </h2>
            </div>
            <Link
              to="/categories"
              className="text-decoration-none fw-semibold"
              style={{ color: "#292621" }}
            >
              All Collections <span className="ms-1">→</span>
            </Link>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {otherCategories.map((cat) => (
              <div className="col" key={cat.slug}>
                <Link to={`/categories/${cat.slug}`} className="text-decoration-none">
                  <div
                    className="card h-100 bg-white rounded-4 overflow-hidden shadow-sm"
                    style={{ border: "1px solid #e5ddd2" }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-100 object-fit-cover"
                      style={{ height: "160px" }}
                      loading="lazy"
                    />
                    <div className="card-body p-3">
                      <h4 className="h6 fw-semibold mb-1" style={{ color: "#292621" }}>
                        {cat.title}
                      </h4>
                      <small className="text-secondary text-truncate d-block" style={{ fontSize: "12px" }}>
                        {cat.description}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5" style={{ backgroundColor: "#292621" }}>
        <div className="container py-4 text-center">
          <small
            className="text-uppercase fw-semibold"
            style={{ color: "#ad8144", letterSpacing: "2px" }}
          >
            Require Custom Sizing or Consultation?
          </small>
          <h2 className="display-6 fw-semibold mt-2 mb-3 text-white">
            Transform your space with {category.title}
          </h2>
          <p className="text-white-50 mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Reach out directly to Bismillah Interiors for quotes, physical sample viewing, and installation services in Lahore.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/contact"
              className="btn px-4 py-3 fw-semibold"
              style={{ backgroundColor: "#ad8144", color: "#fff" }}
            >
              Get a Quote <span className="ms-2">→</span>
            </Link>
            <a
              href={`https://wa.me/923354496040?text=${encodeURIComponent(
                `Hello Bismillah Interiors, I am inquiring about ${category.title} solutions.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light px-4 py-3 fw-semibold"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
