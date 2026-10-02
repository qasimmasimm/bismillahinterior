import { useContext, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/seo";
import { FaSearch } from "react-icons/fa";
import { ProductsContext } from "../context/aticlescontext";
import { CategoriesContext } from "../context/categoriescontext";


function ProductCard({ product }) {
const API_URL=import.meta.env.VITE_API_URL
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
          <Link
            to={`/products/${productId}`}
            className="text-decoration-none"
          >
            {images.length > 0 ? (
              <img
                src={`${API_URL}/${images[active]}`}
                alt={productTitle}
                className="w-100 h-100 object-fit-cover"
              />
            ) : (
              <div
                className="w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "#f5f0e8" }}
              >
                <span className="text-secondary small">
                  No image available
                </span>
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
                      backgroundColor:
                        index === active ? "#292621" : "#ffffff",
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

          <h3
            className="h5 fw-semibold mt-2 mb-3"
            style={{ color: "#292621" }}
          >
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

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const categoryParam = searchParams.get("category") || "All";

  const { products = [] } = useContext(ProductsContext);
  const { categories = [] } = useContext(CategoriesContext);

  const selectedCategory = useMemo(() => {
    if (!categoryParam || categoryParam.toLowerCase() === "all") {
      return "All";
    }

    const matchedCategory = categories.find((category) => {
      const title = category.title?.toLowerCase() || "";
      const slug = category.slug?.toLowerCase() || "";
      const param = categoryParam.toLowerCase();

      return title === param || slug === param;
    });

    return matchedCategory?.title || categoryParam;
  }, [categoryParam, categories]);

  const handleCategoryChange = (categoryTitle) => {
    if (categoryTitle === "All") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      category: categoryTitle,
    });
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const categoryTitle =
        typeof product.category === "object"
          ? product.category?.title || ""
          : product.category || "";

      const matchesCategory =
        selectedCategory === "All" ||
        categoryTitle.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase();

      const productTitle =
        product.title || product.name || "";

      const matchesSearch =
        query === "" ||
        productTitle.toLowerCase().includes(query) ||
        categoryTitle.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const getCategoryProductCount = (categoryTitle) => {
    return products.filter((product) => {
      const productCategory =
        typeof product.category === "object"
          ? product.category?.title || ""
          : product.category || "";

      return (
        productCategory.trim().toLowerCase() ===
        categoryTitle.trim().toLowerCase()
      );
    }).length;
  };

  return (
    <main className="py-5" style={{ backgroundColor: "#fcfaf6" }}>
      <SEO
        title={
          selectedCategory === "All"
            ? "Products & Finishes"
            : `${selectedCategory} Products`
        }
        description={`Browse our catalog of ${
          selectedCategory === "All"
            ? "interior wall panels, flooring, ceiling tiles, and wallpapers"
            : selectedCategory
        } in Lahore by Bismillah Interiors.`}
      />

      <div className="container py-4">
        <div className="text-center mb-5">
          <small
            className="text-uppercase fw-semibold"
            style={{
              color: "#ad8144",
              letterSpacing: "2px",
            }}
          >
            Product Catalog
          </small>

          <h1
            className="display-4 fw-semibold mt-2 mb-3"
            style={{ color: "#292621" }}
          >
            Explore Our Collection
          </h1>

          <p
            className="text-secondary mb-0 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Discover our curated range of wall panels, ceilings, wallpapers,
            and flooring finishes for premium residential and commercial
            spaces.
          </p>
        </div>

        <div
          className="bg-white p-4 rounded-4 shadow-sm mb-5 border"
          style={{ borderColor: "#e5ddd2" }}
        >
          <div className="row g-3 align-items-center mb-4">
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span
                  className="input-group-text bg-light border-end-0"
                  style={{ borderColor: "#ddd5ca" }}
                >
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control bg-light border-start-0 ps-0"
                  style={{
                    borderColor: "#ddd5ca",
                    fontSize: "14px",
                  }}
                  placeholder="Search products, materials, or finishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{ fontSize: "12px" }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="col-12 col-md-6 text-md-end">
              <small className="text-secondary fw-semibold">
                Showing {filteredProducts.length} of {products.length}{" "}
                products
                {selectedCategory !== "All" &&
                  ` in ${selectedCategory}`}
              </small>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("All")}
              className="btn btn-sm rounded-pill px-3 py-2 fw-semibold"
              style={{
                backgroundColor:
                  selectedCategory === "All"
                    ? "#292621"
                    : "#f5f0e8",
                color:
                  selectedCategory === "All"
                    ? "#ffffff"
                    : "#292621",
                border: "1px solid #ddd5ca",
                fontSize: "13px",
              }}
            >
              All ({products.length})
            </button>

            {categories.map((category) => {
              const categoryTitle = category.title || "";
              const categoryKey =
                category._id || category.id || category.slug;

              const count =
                getCategoryProductCount(categoryTitle);

              const isActive =
                selectedCategory.toLowerCase().trim() ===
                categoryTitle.toLowerCase().trim();

              return (
                <button
                  key={categoryKey}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(categoryTitle)
                  }
                  className="btn btn-sm rounded-pill px-3 py-2 fw-semibold"
                  style={{
                    backgroundColor: isActive
                      ? "#ad8144"
                      : "#ffffff",
                    color: isActive
                      ? "#ffffff"
                      : "#292621",
                    border: isActive
                      ? "1px solid #ad8144"
                      : "1px solid #ddd5ca",
                    fontSize: "13px",
                  }}
                >
                  {categoryTitle}
                  {count > 0 && ` (${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-5 bg-white rounded-4 border p-5"
            style={{ borderColor: "#e5ddd2" }}
          >
            <h3
              className="h4 fw-semibold mb-2"
              style={{ color: "#292621" }}
            >
              No products found
            </h3>

            <p className="text-secondary mb-4">
              We couldn't find any products matching your current
              filters or search query.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSearchParams({});
              }}
              className="btn rounded-pill px-4 py-2 fw-semibold"
              style={{
                backgroundColor: "#292621",
                color: "#f5f0e8",
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
