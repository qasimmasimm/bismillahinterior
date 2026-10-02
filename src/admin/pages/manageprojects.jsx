import { useContext } from "react";
import { ProjectContext } from "../../context/projectcontext";
import Editproject from "../models/editproject";
import DeleteProject from "../models/deleteproject";

export default function ManageProjects() {
  const { Project } = useContext(ProjectContext);

  const projectList = Array.isArray(Project) ? Project : [];

  const API_URL = import.meta.env.VITE_API_URL;

  const getImageUrl = (image) => {
    if (!image) return "";

    return `${API_URL.replace(/\/$/, "")}/${String(image)
      .replace(/^\//, "")
      .replaceAll("\\", "/")}`;
  };

  return (
    <div className="container-fluid px-2 px-sm-3 px-lg-4 py-3 py-lg-4">
      <div className="mb-3 mb-lg-4">
        <h1
          className="mb-1"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-main)",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          }}
        >
          Manage Projects
        </h1>

        <p
          className="mb-0"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
            fontSize: "0.78rem",
          }}
        >
          View and manage your projects
        </p>
      </div>

      {projectList.length === 0 ? (
        <div
          className="w-100 text-center py-5 rounded-1"
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
            No projects found.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {projectList.map((project) => (
            <div
              key={project?._id}
              className="w-100 rounded-1 overflow-hidden"
              style={{
                background: "var(--color-bg-light)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="d-flex align-items-center w-100">
                <div className="flex-shrink-0">
                  <img
                    src={getImageUrl(project?.cover)}
                    alt={project?.title || "Project"}
                    className="d-block object-fit-cover"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                </div>

                <div className="flex-grow-1 min-w-0 px-3 py-2">
                  <h2
                    className="mb-1 text-truncate"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-text-main)",
                      fontSize: "1.05rem",
                    }}
                  >
                    {project?.title}
                  </h2>
                  <p
                    className="mb-1 text-truncate"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-muted)",
                      fontSize: "0.72rem",
                      maxWidth: "700px",
                    }}
                  >
                    {project?.overview}
                  </p>

                  <div
                    className="d-flex align-items-center gap-3 flex-wrap"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-muted)",
                      fontSize: "0.68rem",
                    }}
                  >
                    <span>
                      {typeof project?.category === "object"
                        ? project?.category?.name
                        : "Project"}
                    </span>

                    {project?.location && <span>{project.location}</span>}
                  </div>
                </div>

                <div className="flex-shrink-0 d-flex align-items-center gap-1 px-2 px-sm-3">
                  <Editproject project={project} />

                  <DeleteProject project={project} setProjects={null} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
