import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faLayerGroup,
  faDiagramProject,
  faArrowRight,
  faPlus,
  faHouse,
  faFolderOpen,
  faTableCellsLarge,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

import { ProductsContext } from "../../context/aticlescontext";
import { CategoriesContext } from "../../context/categoriescontext";
import { ProjectContext } from "../../context/projectcontext";
import { getStoredUser } from "../../utils/cookie";
import { UserContext } from "../../context/usercontext";
export default function Dashboard() {
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);
  const { Project } = useContext(ProjectContext);

  const API_URL = import.meta.env.VITE_API_URL;

  const { user: contextUser } = useContext(UserContext);
  const user = contextUser || getStoredUser();
  const productList = Array.isArray(products) ? products : [];
  const categoryList = Array.isArray(categories) ? categories : [];
  const projectList = Array.isArray(Project) ? Project : [];

  const recentProducts = [...productList]
    .sort((a, b) => {
      const dateA = new Date(a?.createdAt || a?.updatedAt || 0);
      const dateB = new Date(b?.createdAt || b?.updatedAt || 0);
      return dateB - dateA;
    })
    .slice(0, 4);

  const recentProjects = [...projectList]
    .sort((a, b) => {
      const dateA = new Date(a?.createdAt || a?.updatedAt || 0);
      const dateB = new Date(b?.createdAt || b?.updatedAt || 0);
      return dateB - dateA;
    })
    .slice(0, 4);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container-fluid px-2 px-sm-3 px-lg-4 py-3 py-lg-4">
      {/* Header */}
      <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4">
        <div>
          <div
            className="text-uppercase small mb-1"
            style={{
              letterSpacing: "0.18rem",
              color: "var(--color-gold-dark)",
            }}
          >
            Welcome back,
          </div>

          <h1
            className="mb-1 fw-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-main)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {user?.name}
          </h1>

          <p
            className="mb-0"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
            }}
          >
            Here&apos;s what&apos;s happening with your Bismillah Interiors
            website.
          </p>
        </div>

        <div className="text-lg-end">
          <div
            className="small"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {formattedDate}
          </div>

          <div
            className="mt-1"
            style={{
              color: "var(--color-text-main)",
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
            }}
          >
            Interior Solutions
          </div>

          <div
            style={{
              color: "var(--color-gold-dark)",
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
            }}
          >
            for a Better Tomorrow
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div
            className="h-100 p-3 p-lg-4 rounded-2 border"
            style={{
              background: "var(--color-bg-light)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--color-bg-alt)",
                  color: "var(--color-gold-dark)",
                }}
              >
                <FontAwesomeIcon icon={faBoxOpen} />
              </div>

              <div>
                <div
                  className="small"
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Total Products
                </div>

                <div
                  className="fs-3 fw-semibold"
                  style={{
                    color: "var(--color-text-main)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {productList.length}
                </div>
              </div>
            </div>

            <div
              className="small mt-3"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="me-2"
                style={{ color: "var(--color-gold-dark)" }}
              />
              Products in your catalog
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="h-100 p-3 p-lg-4 rounded-2 border"
            style={{
              background: "var(--color-bg-light)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--color-bg-alt)",
                  color: "var(--color-gold-dark)",
                }}
              >
                <FontAwesomeIcon icon={faLayerGroup} />
              </div>

              <div>
                <div
                  className="small"
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Categories
                </div>

                <div
                  className="fs-3 fw-semibold"
                  style={{
                    color: "var(--color-text-main)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {categoryList.length}
                </div>
              </div>
            </div>

            <div
              className="small mt-3"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              <FontAwesomeIcon
                icon={faLayerGroup}
                className="me-2"
                style={{ color: "var(--color-gold-dark)" }}
              />
              Active product categories
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="h-100 p-3 p-lg-4 rounded-2 border"
            style={{
              background: "var(--color-bg-light)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--color-bg-alt)",
                  color: "var(--color-gold-dark)",
                }}
              >
                <FontAwesomeIcon icon={faDiagramProject} />
              </div>

              <div>
                <div
                  className="small"
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Total Projects
                </div>

                <div
                  className="fs-3 fw-semibold"
                  style={{
                    color: "var(--color-text-main)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {projectList.length}
                </div>
              </div>
            </div>

            <div
              className="small mt-3"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="me-2"
                style={{ color: "var(--color-gold-dark)" }}
              />
              Projects in your portfolio
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-8">
          <div
            className="h-100 rounded-2 border overflow-hidden"
            style={{
              background: "var(--color-bg-light)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between p-3 p-lg-4 border-bottom">
              <div>
                <h2
                  className="h5 mb-1 fw-semibold"
                  style={{
                    color: "var(--color-text-main)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Recent Products
                </h2>

                <p
                  className="small mb-0"
                  style={{
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Latest products added to your catalog.
                </p>
              </div>

              <Link
                to="/admin/articles"
                className="text-decoration-none small d-flex align-items-center gap-2"
                style={{
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-body)",
                }}
              >
                View All
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            <div className="d-none d-md-block px-3 px-lg-4 pt-2">
              <div
                className="row align-items-center g-0 py-2 border-bottom"
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                <div className="col-5">PRODUCT</div>
                <div className="col-3">CATEGORY</div>
                <div className="col-2">PRICE</div>
                <div className="col-2">DATE</div>
              </div>
            </div>

            <div className="px-3 px-lg-4">
              {recentProducts.length === 0 ? (
                <div className="text-center py-5">
                  <div
                    className="mb-2"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <FontAwesomeIcon icon={faBoxOpen} size="2x" />
                  </div>

                  <p
                    className="small mb-0"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    No products available.
                  </p>
                </div>
              ) : (
                recentProducts.map((product) => {
                  const categoryTitle = product?.category?.title;

                  return (
                    <div
                      key={product?._id}
                      className="row align-items-center g-0 py-2 py-lg-3 border-bottom"
                    >
                      <div className="col-12 col-md-5">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={`${API_URL}/${product?.images?.[0]}`}
                            alt={product?.name || "Product"}
                            className="rounded-1 object-fit-cover flex-shrink-0"
                            loading="lazy"
                            width="52"
                            height="52"
                          />

                          <div className="min-w-0">
                            <div
                              className="text-truncate fw-semibold"
                              style={{
                                color: "var(--color-text-main)",
                                fontFamily: "var(--font-body)",
                                fontSize: "0.78rem",
                              }}
                              title={product?.name}
                            >
                              {product?.name || "-"}
                            </div>

                            <div
                              className="d-md-none text-truncate mt-1"
                              style={{
                                color: "var(--color-text-muted)",
                                fontSize: "0.7rem",
                              }}
                            >
                              {categoryTitle || "Uncategorized"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-3 d-none d-md-block">
                        <div
                          className="text-truncate"
                          style={{
                            color: "var(--color-text-muted)",
                            fontSize: "0.74rem",
                          }}
                          title={categoryTitle}
                        >
                          {categoryTitle || "-"}
                        </div>
                      </div>

                      <div className="col-2 d-none d-md-block">
                        <div
                          style={{
                            color: "var(--color-text-main)",
                            fontSize: "0.74rem",
                          }}
                        >
                          {product?.price ?? "-"}
                        </div>
                      </div>

                      <div className="col-2 d-none d-md-block">
                        <div
                          style={{
                            color: "var(--color-text-muted)",
                            fontSize: "0.7rem",
                          }}
                        >
                          {formatDate(product?.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 col-xl-4">
          <div
            className="h-100 rounded-2 border p-3 p-lg-4"
            style={{
              background: "var(--color-bg-light)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="mb-3">
              <h2
                className="h5 mb-1 fw-semibold"
                style={{
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Quick Actions
              </h2>

              <p
                className="small mb-0"
                style={{ color: "var(--color-text-muted)" }}
              >
                Manage your website quickly.
              </p>
            </div>

            <div className="row g-2">
              <div className="col-6">
                <Link
                  to="/admin/articles"
                  className="text-decoration-none d-flex flex-column align-items-center justify-content-center text-center rounded-2 border p-3 h-100"
                  style={{
                    background: "var(--color-dark)",
                    borderColor: "var(--color-dark)",
                    color: "#fff",
                    minHeight: "110px",
                  }}
                >
                  <FontAwesomeIcon icon={faBoxOpen} className="mb-2" />

                  <span
                    className="small"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Products
                  </span>
                </Link>
              </div>

              <div className="col-6">
                <Link
                  to="/admin/categories"
                  className="text-decoration-none d-flex flex-column align-items-center justify-content-center text-center rounded-2 border p-3 h-100"
                  style={{
                    background: "var(--color-bg-alt)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-main)",
                    minHeight: "110px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="mb-2"
                    style={{ color: "var(--color-gold-dark)" }}
                  />

                  <span
                    className="small"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Categories
                  </span>
                </Link>
              </div>

              <div className="col-6">
                <Link
                  to="/admin/home"
                  className="text-decoration-none d-flex flex-column align-items-center justify-content-center text-center rounded-2 border p-3 h-100"
                  style={{
                    background: "var(--color-bg-alt)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-main)",
                    minHeight: "110px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHouse}
                    className="mb-2"
                    style={{ color: "var(--color-gold-dark)" }}
                  />

                  <span
                    className="small"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Home
                  </span>
                </Link>
              </div>

              <div className="col-6">
                <Link
                  to="/admin/manageprojects"
                  className="text-decoration-none d-flex flex-column align-items-center justify-content-center text-center rounded-2 border p-3 h-100"
                  style={{
                    background: "var(--color-bg-alt)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-main)",
                    minHeight: "110px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faDiagramProject}
                    className="mb-2"
                    style={{ color: "var(--color-gold-dark)" }}
                  />

                  <span
                    className="small"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Projects
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div
        className="rounded-2 border overflow-hidden mb-4"
        style={{
          background: "var(--color-bg-light)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="d-flex align-items-center justify-content-between p-3 p-lg-4 border-bottom">
          <div>
            <h2
              className="h5 mb-1 fw-semibold"
              style={{
                color: "var(--color-text-main)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Recent Projects
            </h2>

            <p
              className="small mb-0"
              style={{ color: "var(--color-text-muted)" }}
            >
              Latest projects added to your portfolio.
            </p>
          </div>

          <Link
            to="/admin/manageprojects"
            className="text-decoration-none small d-flex align-items-center gap-2"
            style={{
              color: "var(--color-text-main)",
              fontFamily: "var(--font-body)",
            }}
          >
            View All
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>

        <div className="p-3 p-lg-4">
          {recentProjects.length === 0 ? (
            <div className="text-center py-5">
              <div
                className="mb-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                <FontAwesomeIcon icon={faDiagramProject} size="2x" />
              </div>

              <p
                className="small mb-0"
                style={{ color: "var(--color-text-muted)" }}
              >
                No projects available.
              </p>
            </div>
          ) : (
            <div className="row g-3">
              {recentProjects.map((project) => (
                <div className="col-12 col-sm-6 col-lg-3" key={project?._id}>
                  <div className="h-100">
                    <img
                      src={`${API_URL}/${project?.cover}`}
                      alt={project?.title || project?.name || "Project"}
                      className="w-100 rounded-2 object-fit-contain"
                      loading="lazy"
                      style={{
                        height: "150px",
                      }}
                    />

                    <div className="pt-2">
                      <div
                        className="text-truncate fw-semibold"
                        style={{
                          color: "var(--color-text-main)",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.78rem",
                        }}
                        title={project?.title || project?.name}
                      >
                        {project?.title || project?.name || "-"}
                      </div>

                      <div
                        className="text-truncate mt-1"
                        style={{
                          color: "var(--color-text-muted)",
                          fontSize: "0.7rem",
                        }}
                      >
                        {project?.category.title || "-"}
                      </div>

                      <div
                        className="mt-1"
                        style={{
                          color: "var(--color-text-muted)",
                          fontSize: "0.68rem",
                        }}
                      >
                        {formatDate(project?.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
