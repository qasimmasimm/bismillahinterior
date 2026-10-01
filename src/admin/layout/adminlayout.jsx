import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Offcanvas, Button, Container, Navbar } from "react-bootstrap";
import { FaBars } from "react-icons/fa6";
import Sidebar from "../components/sidebar";

export default function Adminlayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => {
    setShowSidebar(false);
  };

  const handleShow = () => {
    setShowSidebar(true);
  };

  return (
    <div className="admin-layout min-vh-100">
      <div className="d-none d-lg-block">
        <div className="admin-desktop-sidebar">
          <Sidebar />
        </div>

        <main className="admin-desktop-main min-vh-100">
          <Outlet />
        </main>
      </div>

      <div className="d-lg-none">
        <Navbar className="admin-mobile-navbar fixed-top border-bottom">
          <Container
            fluid
            className="px-3 d-flex align-items-center justify-content-between"
          >
            <Button
              variant="light"
              onClick={handleShow}
              className="border shadow-none d-flex align-items-center justify-content-center"
            >
              <FaBars />
            </Button>

            <Link
              to="/admin"
              className="text-decoration-none text-dark text-center"
            >
              <div className="admin-mobile-brand">
                BISMILLAH
              </div>

              <div className="admin-mobile-brand-subtitle">
                INTERIORS
              </div>
            </Link>

            <div className="invisible">
              <FaBars />
            </div>
          </Container>
        </Navbar>

        <Offcanvas
          show={showSidebar}
          onHide={handleClose}
          className="admin-mobile-offcanvas"
        >
          <Offcanvas.Body className="p-0">
            <Sidebar onNavigate={handleClose} />
          </Offcanvas.Body>
        </Offcanvas>

        <main className="admin-mobile-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}