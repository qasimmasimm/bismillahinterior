import React, { useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import {
  FaChartPie,
  FaFileLines,
  FaFolderOpen,
  FaLayerGroup,
  FaGear,
  FaImage,
  FaGlobe,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { UserContext } from "../../context/usercontext";
import { toast } from "react-toastify";
import { getStoredUser, clearAuth } from "../../utils/cookie";

export default function Sidebar({ onNavigate }) {
  const { user: contextUser, setUser } = useContext(UserContext);
  const user = contextUser || getStoredUser();

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    onNavigate?.();
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    toast.info("Admin Logout Successfully!");
    navigate("/");
  };
  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar d-flex flex-column vh-100">
      <div className="px-3 pt-4 pb-3 flex-shrink-0">
        <button
          type="button"
          onClick={() => handleNavigate("/admin")}
          className="btn border-0 text-white w-100 p-0"
        >
          <div className="text-center">
            <div className="admin-brand-title">BISMILLAH</div>
            <div className="admin-brand-subtitle">INTERIORS</div>
          </div>
        </button>
      </div>

      <div className="flex-grow-1 overflow-auto px-3 pb-3">
        <div className="mb-4">
          <div className="admin-sidebar-label px-2 mb-2">Overview</div>

          <button
            type="button"
            onClick={() => handleNavigate("/admin")}
            className={`admin-sidebar-link ${
              isActive("/admin") ? "active" : ""
            }`}
          >
            <FaChartPie />
            <span>Dashboard</span>
          </button>
        </div>

        <div className="mb-4">
          <div className="admin-sidebar-label px-2 mb-2">Content</div>

          <Accordion className="admin-sidebar-accordion">
            <Accordion.Item eventKey="articles">
              <Accordion.Header>
                <FaFileLines />
                <span>Products</span>
              </Accordion.Header>

              <Accordion.Body>
                <button
                  type="button"
                  onClick={() => handleNavigate("/admin/articles/add")}
                  className="admin-sidebar-subitem"
                >
                  <span>Add Products</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate("/admin/articles")}
                  className="admin-sidebar-subitem"
                >
                  <span>Manage Products</span>
                </button>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="categories">
              <Accordion.Header>
                <FaLayerGroup />
                <span>Categories</span>
              </Accordion.Header>

              <Accordion.Body>
                <button
                  type="button"
                  onClick={() => handleNavigate("/admin/categories")}
                  className="admin-sidebar-subitem"
                >
                  <span>Manage Categories</span>
                </button>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="projects">
              <Accordion.Header>
                <FaFolderOpen />
                <span>Projects</span>
              </Accordion.Header>

              <Accordion.Body>
                <button
                  type="button"
                  onClick={() => handleNavigate("/admin/projects/add")}
                  className="admin-sidebar-subitem"
                >
                  <span>Add Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate("/admin/manageprojects")}
                  className="admin-sidebar-subitem"
                >
                  <span>Manage Projects</span>
                </button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <button
            type="button"
            onClick={() => handleNavigate("/")}
            className={`admin-sidebar-link`}
          >
            <FaGlobe />
            <span> Home</span>{" "}
          </button>
        </div>
      </div>

      <div className="px-3 pb-3 flex-shrink-0">
        <div className="admin-sidebar-image position-relative overflow-hidden rounded mb-3">
          <img
            src="/images/login-banner.webp"
            alt="Bismillah Interiors"
            className="w-100 h-100 object-fit-cover"
          />

          <div className="admin-sidebar-image-overlay position-absolute bottom-0 start-0 w-100 p-3">
            <div className="admin-sidebar-image-small">BISMILLAH INTERIORS</div>

            <div className="admin-sidebar-image-title">Better Spaces</div>

            <div className="admin-sidebar-image-title">Better Living</div>
          </div>
        </div>

        <div className="border-top border-secondary pt-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 overflow-hidden">
            <div className="admin-user-avatar flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="overflow-hidden">
              <div className="admin-user-name text-truncate">
                {user?.name || "Admin"}
              </div>

              <div className="admin-user-role text-truncate">
                {user?.role || "Administrator"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="btn border-0 text-white-50 p-2"
            title="Logout"
          >
            <FaArrowRightFromBracket />
          </button>
        </div>
      </div>
    </aside>
  );
}
