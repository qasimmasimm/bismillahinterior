import { useContext } from "react";
import { CategoriesContext } from "../../context/categoriescontext";
import AddCategories from "../models/addcategory";
import DeletCategory from "../models/deletecategory";

export default function CategoriesAdmin() {
  const { categories } = useContext(CategoriesContext);

  const categoryList = Array.isArray(categories) ? categories : [];

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="container-fluid px-2 px-sm-3 px-lg-4 py-3 py-lg-4">
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
            Categories
          </h1>
          <p
            className="mb-0"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "0.78rem",
            }}
          >
            Manage your product categories ({categories.length})
          </p>
        </div>
        <AddCategories />
      </div>
      <div className="w-100">
        {categoryList.length === 0 ? (
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
              No categories found.
            </p>
          </div>
        ) : (
          categoryList.map((cat) => (
            <div
              key={cat?._id}
              className="row align-items-center g-0 w-100 mb-2 rounded-1 flex-nowrap"
              style={{
                minHeight: "52px",
                background: "var(--color-bg-light)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="col-auto">
                <img
                  src={`${API_URL}/${cat?.image}`}
                  alt={cat?.title || "Category"}
                  className="d-block object-fit-cover"
                  fetchPriority="low"
                  style={{
                    width: "52px",
                    height: "52px",
                  }}
                />
              </div>

              {/* Changed class from col-12 col-sm-4... to explicit col widths that apply to ALL screens */}
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
                  Slug
                </div>
                <div
                  className="text-truncate"
                  title={cat?.slug}
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-main)",
                    fontSize: "0.76rem",
                  }}
                >
                  {cat?.slug || "-"}
                </div>
              </div>

              <div
                className="col-3 col-sm-3 col-md-3 col-lg-2 px-2 px-sm-3 py-2"
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
                  Title
                </div>
                <div
                  className="text-truncate fw-semibold"
                  title={cat?.title}
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-main)",
                    fontSize: "0.78rem",
                  }}
                >
                  {cat?.title || "-"}
                </div>
              </div>

              {/* Made description fill the remaining space with 'col' on all viewports */}
              <div className="col px-2 px-sm-3 py-2" style={{ minWidth: 0 }}>
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
                  title={cat?.description}
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-main)",
                    fontSize: "0.76rem",
                  }}
                >
                  {cat?.description || "-"}
                </div>
              </div>

              <div className="col-auto px-2 px-sm-3">
                <DeletCategory cat={cat} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
