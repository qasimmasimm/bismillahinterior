import { useContext } from "react";
import { ProductsContext } from "../../context/aticlescontext";
import AddProduct from "./addarticles";
import EditProduct from "../models/editproduct";
import DeleteProduct from "../models/deleteproducts";

export default function Articles() {
    const API_URL=import.meta.env.VITE_API_URL;
  const {
    products,
    loading,
    loadingMore,
    hasMore,
    totalProducts,
    fetchMoreProducts,
  } = useContext(ProductsContext);

  return (
    <div className="container-fluid px-2 px-sm-3 px-lg-4 py-3 py-lg-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3 mb-lg-4">
        <div>
          <h1
            className="mb-1"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-main)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            }}
          >
            Products
          </h1>

          <p
            className="mb-0"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "0.78rem",
            }}
          >
            Manage your products ({totalProducts})
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="w-100">
        {loading && products.length === 0 ? (
          <div
            className="text-center py-5 rounded-1"
            style={{
              background: "var(--color-bg-light)",
              border: "1px solid var(--color-border)",
            }}
          >
            <p
              className="mb-0"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
                fontSize: "0.8rem",
              }}
            >
              Loading products...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div
            className="text-center py-5 rounded-1"
            style={{
              background: "var(--color-bg-light)",
              border: "1px solid var(--color-border)",
            }}
          >
            <p
              className="mb-0"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
                fontSize: "0.8rem",
              }}
            >
              No products found.
            </p>
          </div>
        ) : (
          products.map((product) => {
            const categoryTitle =
              typeof product?.category === "object"
                ? product.category?.title
                : "";

            return (
              <div
                key={product?._id}
                className="row align-items-center g-0 w-100 mb-2 rounded-1 flex-nowrap"
                style={{
                  minHeight: "64px",
                  background: "var(--color-bg-light)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="col-auto">
                  <img
                    src={`${API_URL}/${product?.images?.[0]}`}
                    alt={product?.name || "Product"}
                    className="d-block object-fit-cover"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "64px",
                      height: "64px",
                    }}
                  />
                </div>

                {/* Name */}
                <div
                  className="col-3 col-sm-3 col-md-3 col-lg-2 px-2 px-sm-3 py-2"
                  style={{ minWidth: 0 }}
                >
                  <div
                    className="text-uppercase text-truncate"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-muted)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Product
                  </div>

                  <div
                    className="text-truncate fw-semibold"
                    title={product?.name}
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-main)",
                      fontSize: "0.78rem",
                    }}
                  >
                    {product?.name || "-"}
                  </div>
                </div>

                {/* Category */}
                <div
                  className="col-3 col-sm-3 col-md-3 col-lg-2 px-2 px-sm-3 py-2"
                  style={{ minWidth: 0 }}
                >
                  <div
                    className="text-uppercase text-truncate"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-muted)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Category
                  </div>

                  <div
                    className="text-truncate"
                    title={categoryTitle}
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-main)",
                      fontSize: "0.76rem",
                    }}
                  >
                    {categoryTitle || "-"}
                  </div>
                </div>

                {/* Description */}
                <div
                  className="col px-2 px-sm-3 py-2"
                  style={{ minWidth: 0 }}
                >
                  <div
                    className="text-uppercase"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-muted)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Description
                  </div>

                  <div
                    className="text-truncate"
                    title={product?.description}
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-main)",
                      fontSize: "0.76rem",
                    }}
                  >
                    {product?.description || "-"}
                  </div>
                </div>

                {/* Price */}
                <div
                  className="col-2 col-md-1 px-2 px-sm-3 py-2"
                  style={{ minWidth: 0 }}
                >
                  <div
                    className="text-uppercase"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-muted)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Price
                  </div>

                  <div
                    className="text-truncate"
                    title={product?.price}
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-main)",
                      fontSize: "0.76rem",
                    }}
                  >
                    {product?.price ?? "-"}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-auto px-2 px-sm-3">
                  <div className="d-flex align-items-center gap-2">
                    <EditProduct product={product} />

                    <DeleteProduct product={product} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {products.length > 0 && hasMore && (
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={() => fetchMoreProducts(12)}
            disabled={loadingMore}
            className="btn rounded-1 px-4"
            style={{
              background: "var(--color-gold-dark)",
              border: "none",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: "0.74rem",
            }}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}