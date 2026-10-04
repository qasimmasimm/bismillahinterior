import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";
import { getStoredUser } from "../utils/cookie";
import { CategoriesContext } from "../context/categoriescontext";

export default function Footer() {
  const { user: contextUser } = useContext(UserContext);
  const user = contextUser || getStoredUser();
  const { categories } = useContext(CategoriesContext);
  const whatsappNumber = "923354496040";

  const featuredCategries = categories?.slice(0, 6);
  return (
    <footer className="bg-dark text-light">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-semibold mb-1" style={{ color: "#c5a059" }}>
              BISMILLAH
            </h4>
            <small className="text-uppercase text-secondary">Interiors</small>

            <p className="text-secondary mt-3 mb-0">
              Transforming spaces with timeless elegance. We provide quality
              wall panels, ceiling solutions, wallpapers, flooring and interior
              finishes for residential and commercial spaces.
            </p>

            <div className="d-flex gap-2 mt-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="footer-social"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a href="/login" className="footer-social">
                <FaUser />
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase mb-3 text-light">Quick Links</h6>

            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase mb-3 text-light">Our Categories</h6>

            <ul className="list-unstyled footer-links">
              <ul className="list-unstyled footer-links">
                {featuredCategries?.map((category) => (
                  <li key={category._id}>
                    <Link to={`/categories/${category._id}`}>
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase mb-3 text-light">Get In Touch</h6>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <FaMapMarkerAlt />
              </div>

              <span>
                College Road, Khokar Chowk,
                <br />
                Lahore, Pakistan
              </span>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <FaPhoneAlt />
              </div>

              <a href="tel:+923354496040">+92 335 4496040</a>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <FaWhatsapp />
              </div>

              <a
                href="https://wa.me/923354496040"
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top border-secondary">
        <div className="container py-3">
          <div className="row align-items-center g-2">
            <div className="col-md-6">
              <small className="text-secondary">
                © 2026 Bismillah Interiors. All Rights Reserved.
              </small>
            </div>

            <div className="col-md-6 text-md-end">
              <small className="text-light ">
                Designed & Developed by <a className="developername fw-bold text-decoration-none"
                 href="https://wa.me/923295810323"
                target="_blank"
                rel="noreferrer"
              > M. Qasim Bin Asim</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
