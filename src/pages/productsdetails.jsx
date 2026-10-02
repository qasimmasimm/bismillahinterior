import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/seo";
import { ProductsContext } from "../context/aticlescontext";
import { FaWhatsapp } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;
const WHATSAPP_NUMBER = "923354496040";

const getImageUrl = (image) => {
  if (!image) return "";

  return `${API_URL.replace(/\/$/, "")}/${image
    .replace(/^\//, "")
    .replaceAll("\\", "/")}`;
};

export default function ProductDetails() {
  const { id } = useParams();
  const { products = [] } = useContext(ProductsContext);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find((item) => item._id === id);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <SEO
          title="Product Not Found | Bismillah Interiors"
          description="The requested product could not be found."
        />

        <div className="py-5">
          <p className="text-uppercase small mb-2">Our Products</p>

          <h1 className="display-5 fw-semibold mb-3">Product Not Found</h1>

          <p className="text-muted mb-4">
            The product you are looking for could not be found.
          </p>

          <Link to="/products" className="btn btn-dark px-4">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const categoryName =
    typeof product.category === "object"
      ? product.category?.title || product.category?.name || "Uncategorized"
      : product.category || "Uncategorized";

  const productImages = Array.isArray(product.images) ? product.images : [];

  const productName = product.name || "Untitled Product";

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${product._id}`
      : `/products/${product._id}`;

  const whatsappMessage = `Hello Bismillah Interiors,

I am interested in this product:

Product: ${productName}
Category: ${categoryName}
Price: PKR ${Number(product.price || 0).toLocaleString()}

Product Details:
${product.description}

Product Link:
${productUrl}

I would like to know more about this product.`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <>
      <SEO
        title={`${productName} | Bismillah Interiors`}
        description={product.description}
      />

      <div className="container-fluid py-4 py-lg-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-muted">
                Home
              </Link>
            </li>

            <li className="breadcrumb-item">
              <Link to="/products" className="text-decoration-none text-muted">
                Products
              </Link>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              {productName}
            </li>
          </ol>
        </nav>

        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-lg-7">
            <div className="product-details-image-wrap bg-light overflow-hidden">
              {productImages.length > 0 ? (
                <img
                  src={getImageUrl(productImages[activeImage])}
                  alt={productName}
                  className="w-100 h-100 object-fit-contain"
                  style={{ minHeight: "420px" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center text-muted"
                  style={{ minHeight: "520px" }}
                >
                  No image available
                </div>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="row g-2 mt-2">
                {productImages.map((image, index) => (
                  <div className="col-3 col-sm-2" key={image + index}>
                    <button
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`border-0 bg-light p-0 w-100 overflow-hidden ${
                        activeImage === index ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${productName} ${index + 1}`}
                        className="w-100 object-fit-contain"
                        style={{ height: "90px" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-5">
            <div className="sticky-lg-top" style={{ top: "30px" }}>
              <p className="text-uppercase small fw-semibold mb-2">
                {categoryName}
              </p>

              <h1 className="display-5 fw-semibold mb-3">{productName}</h1>

              <div className="mb-4">
                <span className="fs-4 fw-semibold">
                  PKR {Number(product.price || 0).toLocaleString()}
                </span>
              </div>

              <div className="border-top border-bottom py-4 mb-4">
                <h5 className="fw-semibold mb-3">Product Details</h5>

                <p className="text-muted mb-0">{product.description}</p>
              </div>

              <div className="d-grid gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg d-flex rounded-pill align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#25D366",
                    color: "#fff",
                    height: "38px",
                    border: "1px solid #25D366",
                    fontsize: "16px",
                  }}
                >
                  <FaWhatsapp size={20} />
                  Enquire on WhatsApp
                </a>

                <Link
                  to="/products"
                  className="btn btn-outline-dark rounded-pill btn-lg d-flex align-items-center justify-content-center"
                  style={{ height: "38px", fontsize: "16px" }}
                >
                  Continue Browsing
                </Link>
              </div>

              <div className="mt-4 pt-3 border-top">
                <div className="d-flex justify-content-between small">
                  <span className="text-muted">Category</span>
                  <span className="fw-medium">{categoryName}</span>
                </div>

                <div className="d-flex justify-content-between small mt-2">
                  <span className="text-muted">Images</span>
                  <span className="fw-medium">{productImages.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {productImages.length > 0 && (
          <section className="mt-5 pt-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <p className="text-uppercase small fw-semibold mb-2">
                  Product Gallery
                </p>

                <h2 className="fw-semibold mb-0">Explore {productName}</h2>
              </div>
            </div>

            <div className="row g-3">
              {productImages.map((image, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={image + index}>
                  <div className="bg-light overflow-hidden">
                    <img
                      src={getImageUrl(image)}
                      alt={`${productName} ${index + 1}`}
                      className="w-100 object-fit-contain"
                      style={{ height: "260px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-5 pt-5">
          <div className="bg-dark text-white p-4 p-md-5 text-center">
            <p className="text-uppercase small mb-2">
              Interested in this product?
            </p>

            <h2
              className="fw-semibold mb-3 "
              style={{ color: "var(--color-gold-light)" }}
            >
              Talk to Bismillah Interiors
            </h2>

            <p className="text-white-50 mb-4 mx-auto">
              Contact us on WhatsApp for availability, pricing, specifications,
              and further details about this product.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light px-4"
            >
              Ask About This Product
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
