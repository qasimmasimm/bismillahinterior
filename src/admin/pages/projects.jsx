import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getToken } from "../../utils/cookie";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ProjectContext } from "../../context/projectcontext";

export default function AddProjects() {
  const { setProject } = useContext(ProjectContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [projcategory, setprojcategory] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${API_URL}/projectcategory`)
      .then((res) => res.json())
      .then((data) => {
        setprojcategory(data.categories || []);
      })
      .catch((error) => {
        console.error("Project category error:", error);
        toast.error("Failed to load project categories");
      });
  }, [API_URL]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        toast.error("Please login again.");
        return;
      }

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("location", data.location);
      formData.append("overview", data.overview);
      formData.append("scope", data.scope);

      if (data.cover?.[0]) {
        formData.append("cover", data.cover[0]);
      }

      if (data.gallery?.length) {
        Array.from(data.gallery).forEach((image) => {
          formData.append("gallery", image);
        });
      }
      const response = await fetch(`${API_URL}/project/create`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Failed to create project");
      }
      const newProject = result?.content || result;

      setProject((prev) => [newProject, ...prev]);
      reset();
    } catch (error) {
      console.error("Create project error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-3 px-lg-4 py-4">
      <div className="mb-4">
        <div
          className="text-uppercase fw-semibold mb-1"
          style={{
            color: "var(--color-gold-dark)",
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
          }}
        >
          Bismillah Interiors
        </div>
        <h1
          className="mb-1"
          style={{
            color: "var(--color-text-main)",
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
          }}
        >
          Add Project
        </h1>
        <p
          className="mb-0"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
          }}
        >
          Add a new completed project to your website.
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <Form.Group>
              <FloatingLabel label="Project Title">
                <Form.Control
                  type="text"
                  placeholder="Project Title"
                  className="rounded-1 shadow-none"
                  {...register("title", {
                    required: "Project title is required",
                  })}
                />
              </FloatingLabel>
              {errors.title && (
                <small className="text-danger">{errors.title.message}</small>
              )}
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group>
              <FloatingLabel label="Category">
                <Form.Select
                  className="rounded-1 shadow-none"
                  {...register("category", {
                    required: "Project category is required",
                  })}
                >
                  <option value="">Select Category</option>
                  {projcategory.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              {errors.category && (
                <small className="text-danger">{errors.category.message}</small>
              )}
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group>
              <FloatingLabel label="Location">
                <Form.Control
                  type="text"
                  placeholder="Location"
                  className="rounded-1 shadow-none"
                  {...register("location")}
                />
              </FloatingLabel>
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group>
              <FloatingLabel label="Project Overview">
                <Form.Control
                  as="textarea"
                  placeholder="Project Overview"
                  style={{ height: "130px" }}
                  className="rounded-1 shadow-none"
                  {...register("overview", {
                    required: "Project overview is required",
                  })}
                />
              </FloatingLabel>
              {errors.overview && (
                <small className="text-danger">{errors.overview.message}</small>
              )}
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group>
              <FloatingLabel label="Project Scope">
                <Form.Control
                  as="textarea"
                  placeholder="Project Scope"
                  style={{ height: "110px" }}
                  className="rounded-1 shadow-none"
                  {...register("scope", {
                    required: "Project scope is required",
                  })}
                />
              </FloatingLabel>
              {errors.scope && (
                <small className="text-danger">{errors.scope.message}</small>
              )}
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group>
              <Form.Label
                className="fw-semibold mb-2"
                style={{
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.76rem",
                }}
              >
                Cover Image
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                className="rounded-1 shadow-none"
                {...register("cover", {
                  required: "Cover image is required",
                })}
              />
              {errors.cover && (
                <small className="text-danger">{errors.cover.message}</small>
              )}
              <Form.Text
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.68rem",
                }}
              >
                Upload the main image for this project.
              </Form.Text>
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group>
              <Form.Label
                className="fw-semibold mb-2"
                style={{
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.76rem",
                }}
              >
                Project Gallery
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                className="rounded-1 shadow-none"
                {...register("gallery")}
              />
              <Form.Text
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.68rem",
                }}
              >
                Upload multiple images for this project.
              </Form.Text>
            </Form.Group>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
          <Button
            type="button"
            onClick={() => reset()}
            disabled={loading}
            className="rounded-1 px-4"
            style={{
              background: "transparent",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
            }}
          >
            Clear
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="border-0 rounded-1 px-4"
            style={{
              background: "var(--color-gold-dark)",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
            }}
          >
            {loading ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
