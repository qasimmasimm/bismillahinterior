import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/seo";
import { FaSearch } from "react-icons/fa";
import { ProjectContext } from "../context/projectcontext";
import { ProjectCategoryContext } from "../context/projectcategorycontext";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { Project } = useContext(ProjectContext);
  const { projcatgeory } = useContext(ProjectCategoryContext);

  const projectList = Array.isArray(Project) ? Project : [];
  const categoryList = Array.isArray(projcatgeory)
    ? projcatgeory
    : [];

  const filters = useMemo(() => {
    return [
      {
        _id: "all",
        title: "All",
      },
      ...categoryList,
    ];
  }, [categoryList]);

  const getProjectCategoryId = (project) => {
    if (!project?.category) return "";

    if (typeof project.category === "object") {
      return (
        project.category?._id ||
        project.category?.id ||
        project.category?.slug ||
        ""
      );
    }

    return project.category;
  };

  const getProjectCategoryTitle = (project) => {
    if (!project?.category) return "";

    if (typeof project.category === "object") {
      return (
        project.category?.title ||
        project.category?.name ||
        project.category?.slug ||
        ""
      );
    }

    const matchedCategory = categoryList.find(
      (category) =>
        String(category?._id) === String(project.category) ||
        String(category?.id) === String(project.category) ||
        String(category?.slug) === String(project.category)
    );

    return (
      matchedCategory?.title ||
      matchedCategory?.name ||
      matchedCategory?.slug ||
      String(project.category)
    );
  };

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projectList.filter((project) => {
      const categoryId = getProjectCategoryId(project);
      const categoryTitle = getProjectCategoryTitle(project);

      const matchesCategory =
        activeFilter === "All" ||
        String(categoryId).toLowerCase() ===
          String(activeFilter).toLowerCase() ||
        String(categoryTitle).toLowerCase() ===
          String(activeFilter).toLowerCase();

      const title = project.title || "";
      const location = project.location || "";
      const scope = project.scope || "";
      const overview = project.overview || "";

      const matchesSearch =
        query === "" ||
        title.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        scope.toLowerCase().includes(query) ||
        overview.toLowerCase().includes(query) ||
        categoryTitle.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [
    projectList,
    categoryList,
    activeFilter,
    searchQuery,
  ]);

  const getCategoryProjectCount = (category) => {
    return projectList.filter((project) => {
      const categoryId = getProjectCategoryId(project);
      const categoryTitle = getProjectCategoryTitle(project);

      return (
        String(categoryId).toLowerCase() ===
          String(category?._id).toLowerCase() ||
        String(categoryId).toLowerCase() ===
          String(category?.id).toLowerCase() ||
        String(categoryId).toLowerCase() ===
          String(category?.slug).toLowerCase() ||
        String(categoryTitle).toLowerCase() ===
          String(category?.title).toLowerCase()
      );
    }).length;
  };

  const handleCategoryChange = (value) => {
    setActiveFilter(value);
  };

  const resetFilters = () => {
    setActiveFilter("All");
    setSearchQuery("");
  };

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <>
      <SEO
        title="Our Projects | Bismillah Interiors"
        description="Explore our completed interior projects including wall panels, ceilings, flooring, wallpapers and decorative interior solutions."
      />

      <section
        className="py-5"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f0e8",
        }}
      >
        <div className="container">

          {/* Header */}
          <div className="text-center mb-5">
            <span
              className="text-uppercase fw-semibold"
              style={{
                color: "#ad8144",
                letterSpacing: "2px",
                fontSize: "12px",
              }}
            >
              Our Work
            </span>

            <h1
              className="display-4 fw-semibold mt-2 mb-3"
              style={{
                color: "#292621",
              }}
            >
              Explore Our Projects
            </h1>

            <p
              className="text-secondary mx-auto mb-0"
              style={{
                maxWidth: "700px",
              }}
            >
              Explore our completed interior projects and discover
              how our materials and finishes transform spaces.
            </p>
          </div>

          {/* Search & Filters */}
          <div
            className="bg-white p-4 rounded-4 shadow-sm mb-5 border"
            style={{
              borderColor: "#e5ddd2",
            }}
          >
            <div className="row g-3 align-items-center mb-4">

              {/* Search */}
              <div className="col-12 col-md-6">
                <div className="input-group">

                  <span
                    className="input-group-text bg-light border-end-0"
                    style={{
                      borderColor: "#ddd5ca",
                    }}
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
                    placeholder="Search projects, locations, or categories..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                  />

                  {searchQuery && (
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setSearchQuery("")}
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="col-12 col-md-6 text-md-end">
                <small className="text-secondary fw-semibold">
                  Showing {filteredProjects.length} of{" "}
                  {projectList.length} projects
                  {activeFilter !== "All" &&
                    ` in ${
                      categoryList.find(
                        (category) =>
                          String(category?._id) ===
                            String(activeFilter) ||
                          String(category?.id) ===
                            String(activeFilter) ||
                          String(category?.slug) ===
                            String(activeFilter)
                      )?.title || activeFilter
                    }`}
                </small>
              </div>
            </div>

            {/* Category Badges */}
            <div className="d-flex flex-wrap gap-2">

              {filters.map((category) => {
                const isAll = category.title === "All";

                const filterValue = isAll
                  ? "All"
                  : category._id ||
                    category.id ||
                    category.slug ||
                    category.title;

                const categoryTitle =
                  category.title || "";

                const count = isAll
                  ? projectList.length
                  : getCategoryProjectCount(category);

                const isActive =
                  String(activeFilter).toLowerCase().trim() ===
                  String(filterValue).toLowerCase().trim();

                return (
                  <button
                    key={
                      category._id ||
                      category.id ||
                      category.slug ||
                      category.title
                    }
                    type="button"
                    onClick={() =>
                      handleCategoryChange(filterValue)
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

                    {count > 0 && (
                      <span className="ms-1">
                        ({count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count / Reset */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <span
                className="small"
                style={{
                  color: "#6c675f",
                }}
              >
                Showing{" "}
                <strong
                  style={{
                    color: "#292621",
                  }}
                >
                  {filteredProjects.length}
                </strong>{" "}
                {filteredProjects.length === 1
                  ? "project"
                  : "projects"}
              </span>
            </div>

            {(activeFilter !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={resetFilters}
                className="btn btn-sm rounded-pill px-3"
                style={{
                  color: "#ad8144",
                  border: "1px solid #ad8144",
                  backgroundColor: "transparent",
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredProjects.map((project) => {
                const projectId =
                  project._id || project.id;

                const image =
                  project.cover ||
                  project.image ||
                  "/images/ooo.avif";

                const imagePath = image
                  .replaceAll("\\", "/")
                  .replace(/^\/+/, "");

                const categoryTitle =
                  getProjectCategoryTitle(project);

                return (
                  <div
                    className="col"
                    key={projectId}
                  >
                    <div
                      className="h-100 bg-white overflow-hidden"
                      style={{
                        borderRadius: "16px",
                        border: "1px solid #e4ddd3",
                      }}
                    >

                      {/* Image */}
                      <div
                        className="position-relative overflow-hidden"
                        style={{
                          height: "270px",
                        }}
                      >
                        <img
                          src={`${API_URL}/${imagePath}`}
                          alt={
                            project.title ||
                            "Interior project"
                          }
                          className="w-100 h-100"
                          style={{
                            objectFit: "cover",
                          }}
                        />

                        {categoryTitle && (
                          <span
                            className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill"
                            style={{
                              backgroundColor:
                                "rgba(41, 38, 33, 0.88)",
                              color: "#ffffff",
                              fontSize: "11px",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {categoryTitle}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">

                        <h3
                          className="h5 fw-semibold mb-2"
                          style={{
                            color: "#292621",
                            fontFamily:
                              "Georgia, serif",
                          }}
                        >
                          {project.title ||
                            "Untitled Project"}
                        </h3>

                        {project.location && (
                          <p
                            className="small mb-3"
                            style={{
                              color: "#ad8144",
                            }}
                          >
                            {project.location}
                          </p>
                        )}

                        {project.overview && (
                          <p
                            className="small text-secondary mb-3"
                            style={{
                              display:
                                "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient:
                                "vertical",
                              overflow: "hidden",
                              textOverflow:
                                "ellipsis",
                            }}
                          >
                            {project.overview}
                          </p>
                        )}

                        {project.scope && (
                          <p
                            className="small text-secondary mb-3"
                            style={{
                              display:
                                "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient:
                                "vertical",
                              overflow: "hidden",
                              textOverflow:
                                "ellipsis",
                            }}
                          >
                            {project.scope}
                          </p>
                        )}

                        <Link
                          to={`/projects/${projectId}`}
                          className="text-decoration-none fw-semibold small"
                          style={{
                            color: "#ad8144",
                          }}
                        >
                          View Project →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div
              className="text-center py-5 px-4 bg-white rounded-4 border"
              style={{
                borderColor: "#e4ddd3",
              }}
            >
              <div className="py-4">

                <h3
                  className="h4 fw-semibold mb-2"
                  style={{
                    color: "#292621",
                    fontFamily:
                      "Georgia, serif",
                  }}
                >
                  No Projects Available
                </h3>

                <p
                  className="text-secondary mb-4 mx-auto"
                  style={{
                    maxWidth: "500px",
                  }}
                >
                  No projects are available for
                  this category or search. Please
                  try another category or reset
                  your filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn rounded-pill px-4 py-2 fw-semibold"
                  style={{
                    backgroundColor: "#292621",
                    color: "#f5f0e8",
                    border: "1px solid #292621",
                  }}
                >
                  View All Projects
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}