import { useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projectsdata";
import SEO from "../components/seo";
import {useContext} from 'react'
import { ProjectContext } from "../context/projectcontext";
import { ProjectCategoryContext } from "../context/projectcategorycontext";

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");
    const{projectCategory} = useContext(ProjectCategoryContext);

    const filters = ["All", "Residential", "Commercial", "Office"];

    const filteredProjects =
        activeFilter === "All"
            ? projects
            : projects.filter((project) => project.scope === activeFilter);

    return (
        <>
            <SEO
                title="Interior Projects & Portfolio"
                description="Explore recent residential, office, and commercial interior decoration projects by Bismillah Interiors in Lahore, Pakistan."
            />
            <section
                className="text-white d-flex align-items-center"
                style={{
                    minHeight: "280px",
                    backgroundImage:
                        "linear-gradient(rgba(35,31,26,.58), rgba(35,31,26,.58)), url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <p
                                className="text-uppercase small fw-semibold mb-2"
                                style={{
                                    color: "#b58a4b",
                                    letterSpacing: "2px",
                                }}
                            >
                                Our Work
                            </p>

                            <h1 className="display-5 fw-semibold mb-2" style={{color:"#ad8144"}}>
                                Recent Projects
                            </h1>

                            <p className="mb-0 text-white-50">
                                Explore some of our recent interior design and
                                installation projects across Lahore.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section
                className="py-5"
                style={{ backgroundColor: "#f8f5ef" }}
            >
                <div className="container">

                    {/* Filters */}
                    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className="btn rounded-pill px-4"
                                style={{
                                    backgroundColor:
                                        activeFilter === filter
                                            ? "#ad8144"
                                            : "#ffffff",
                                    color:
                                        activeFilter === filter
                                            ? "#ffffff"
                                            : "#292621",
                                    border:
                                        activeFilter === filter
                                            ? "1px solid #ad8144"
                                            : "1px solid #ddd5ca",
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Cards */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {filteredProjects.map((project) => (
                            <div className="col" key={project.id}>
                                <div
                                    className="card h-100 bg-white rounded-4 overflow-hidden shadow-sm"
                                    style={{
                                        border: "1px solid #e5ddd2",
                                    }}
                                >
                                    <img
                                        src={project.cover}
                                        alt={project.title}
                                        className="card-img-top w-100 object-fit-cover"
                                        style={{ height: "235px" }}
                                    />

                                    <div className="card-body p-4 d-flex flex-column">

                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <small
                                                className="text-uppercase fw-semibold"
                                                style={{
                                                    color: "#ad8144",
                                                    letterSpacing: "1px",
                                                }}
                                            >
                                                {project.scope}
                                            </small>

                                            <small className="text-secondary">
                                                {project.category}
                                            </small>
                                        </div>

                                        <h4
                                            className="h5 fw-semibold mb-2"
                                            style={{ color: "#292621" }}
                                        >
                                            {project.title}
                                        </h4>

                                        <p className="text-secondary small mb-3">
                                            {project.location}
                                        </p>

                                        {/* <p className="text-secondary mb-4">
                                            {project.overview}
                                        </p> */}

                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="text-decoration-none mt-auto fw-semibold"
                                            style={{ color: "#292621" }}
                                        >
                                            View Details
                                            <span className="ms-2">→</span>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-5">
                            <h5>No projects found.</h5>
                        </div>
                    )}

                </div>
            </section>

            {/* CTA */}
            <section
                className="text-white text-center"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(35,31,26,.78), rgba(35,31,26,.78)), url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container py-5">
                    <h2 className="fw-semibold mb-2">
                        Have a Project in Mind?
                    </h2>

                    <p className="text-white-50 mb-4">
                        Let's create a space that reflects your style.
                    </p>

                    <Link
                        to="/contact"
                        className="btn px-4"
                        style={{
                            backgroundColor: "#ad8144",
                            color: "#fff",
                        }}
                    >
                        Start Your Project
                    </Link>
                </div>
            </section>
        </>
    );
}