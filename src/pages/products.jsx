import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import products from "../data/productsdata";
import categories from "../data/categoriesdata";
import SEO from "../components/seo";
import { FaSearch } from "react-icons/fa";

function ProductCard({ product }) {
  const [active, setActive] = useState(0);

  const next = (e) => {
    e.preventDefault();
    setActive((prev) => (prev + 1) % product.images.length);
  };

  const previous = (e) => {
    e.preventDefault();
    setActive((prev) => (prev - 1 + product.images.length) % product.images.length);
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

          <h3 className="h5 fw-semibold mt-2 mb-3" style={{ color: "#292621" }}>
            <Link to={`/products/${product.id}`} className="text-decoration-none" style={{ color: "#292621" }}>
              {product.title}
            </Link>
          </h3>

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

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";

  const selectedCategory = useMemo(() => {
    if (!categoryParam || categoryParam.toLowerCase() === "all") return "All";
    const matched = categories.find(
      (c) =>
        c.title.toLowerCase() === categoryParam.toLowerCase() ||
        c.slug.toLowerCase() === categoryParam.toLowerCase()
    );
    return matched ? matched.title : categoryParam;
  }, [categoryParam]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (catTitle) => {
    if (catTitle === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catTitle });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="py-5" style={{ backgroundColor: "#fcfaf6" }}>
      <SEO
        title={selectedCategory === "All" ? "Products & Finishes" : `${selectedCategory} Products`}
        description={`Browse our catalog of ${
          selectedCategory === "All" ? "interior wall panels, flooring, ceiling tiles, and wallpapers" : selectedCategory
        } in Lahore by Bismillah Interiors.`}
      />
      <div className="container py-4">
        <div className="text-center mb-5">
          <small
            className="text-uppercase fw-semibold"
            style={{ color: "#ad8144", letterSpacing: "2px" }}
          >
            Product Catalog
          </small>

          <h1 className="display-4 fw-semibold mt-2 mb-3" style={{ color: "#292621" }}>
            Explore Our Collection
          </h1>

          <p className="text-secondary mb-0 mx-auto" style={{ maxWidth: "600px" }}>
            Discover our curated range of wall panels, ceilings, wallpapers, and flooring finishes for premium residential and commercial spaces.
          </p>
        </div>
        <div className="bg-white p-4 rounded-4 shadow-sm mb-5 border" style={{ borderColor: "#e5ddd2" }}>
          <div className="row g-3 align-items-center mb-4">
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0" style={{ borderColor: "#ddd5ca" }}>
                  <FaSearch/>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 ps-0"
                  style={{ borderColor: "#ddd5ca", fontSize: "14px" }}
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
                Showing {filteredProducts.length} of {products.length} products
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </small>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("All")}
              className="btn btn-sm rounded-pill px-3 py-2 fw-semibold"
              style={{
                backgroundColor: selectedCategory === "All" ? "#292621" : "#f5f0e8",
                color: selectedCategory === "All" ? "#ffffff" : "#292621",
                border: "1px solid #ddd5ca",
                fontSize: "13px",
              }}
            >
              All ({products.length})
            </button>

            {categories.map((cat) => {
              const count = products.filter(
                (p) => p.category.toLowerCase().trim() === cat.title.toLowerCase().trim()
              ).length;
              const isActive = selectedCategory.toLowerCase().trim() === cat.title.toLowerCase().trim();

              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => handleCategoryChange(cat.title)}
                  className="btn btn-sm rounded-pill px-3 py-2 fw-semibold"
                  style={{
                    backgroundColor: isActive ? "#ad8144" : "#ffffff",
                    color: isActive ? "#ffffff" : "#292621",
                    border: isActive ? "1px solid #ad8144" : "1px solid #ddd5ca",
                    fontSize: "13px",
                  }}
                >
                  {cat.title} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border p-5" style={{ borderColor: "#e5ddd2" }}>
            <h3 className="h4 fw-semibold mb-2" style={{ color: "#292621" }}>
              No products found
            </h3>
            <p className="text-secondary mb-4">
              We couldn't find any products matching your current filters or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                searchParams.delete("category");
                setSearchParams(searchParams);
              }}
              className="btn rounded-pill px-4 py-2 fw-semibold"
              style={{ backgroundColor: "#292621", color: "#f5f0e8" }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}