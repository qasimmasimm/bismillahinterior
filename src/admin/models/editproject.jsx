import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import { getToken } from "../../utils/cookie";
import { FaPen } from "react-icons/fa";
import {ProjectContext} from "../../context/projectcontext";

export default function Editproject({ project }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const {setProject}=useContext(ProjectContext)

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projcategory, setprojcategory] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    if (!loading) {
      setShow(false);
    }
  };

  const handleShow = () => {
    setShow(true);
  };

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

  useEffect(() => {
    if (show && project) {
      reset({
        title: project?.title || "",
        category:
          typeof project?.category === "object"
            ? project?.category?._id || ""
            : project?.category || "",
        location: project?.location || "",
        overview: project?.overview || "",
        scope: project?.scope || "",
      });
    }
  }, [show, project, reset]);

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

      const response = await fetch(
        `${API_URL}/project/update/${project?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to update project");
      }
      const updatedProject = result.content || result;

      setProject((prev) =>
        prev.map((item) => (item._id === project._id ? updatedProject : item)),
      );
      setShow(false);
      reset();
    } catch (error) {
      console.error("Update project error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleShow}
        className="border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
        style={{
          background: "var(--color-gold-dark)",
          width: "34px",
          height: "34px",
        }}
        title="Edit Project"
      >
        <FaPen size={13} />
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header
          closeButton
          className="border-0 px-3 px-sm-4 pt-3 pt-sm-4 pb-2"
          style={{
            background: "var(--color-bg-light)",
          }}
        >
          <div className="w-100">
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

            <Modal.Title
              className="mb-1"
              style={{
                color: "var(--color-text-main)",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 4vw, 2rem)",
              }}
            >
              Edit Project
            </Modal.Title>

            <p
              className="mb-0"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
              }}
            >
              Update the information and images for this project.
            </p>
          </div>
        </Modal.Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body
            className="px-3 px-sm-4 py-3"
            style={{
              background: "var(--color-bg-light)",
            }}
          >
            <div className="row g-3">
              {/* TITLE */}
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
                    <small className="text-danger">
                      {errors.title.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* CATEGORY */}
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
                    <small className="text-danger">
                      {errors.category.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* LOCATION */}
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

              {/* OVERVIEW */}
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
                    <small className="text-danger">
                      {errors.overview.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* SCOPE */}
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
                    <small className="text-danger">
                      {errors.scope.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* COVER */}
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
                    Replace Cover Image
                  </Form.Label>

                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="rounded-1 shadow-none"
                    {...register("cover")}
                  />

                  <Form.Text
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "0.68rem",
                    }}
                  >
                    Leave empty to keep the current cover image.
                  </Form.Text>
                </Form.Group>
              </div>

              {/* GALLERY */}
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
                    Add Gallery Images
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
                    Select images to add to the project gallery.
                  </Form.Text>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer
            className="border-0 px-3 px-sm-4 pb-3 pb-sm-4 pt-2"
            style={{
              background: "var(--color-bg-light)",
            }}
          >
            <div className="d-flex flex-column flex-sm-row gap-2 w-100 justify-content-end">
              <Button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="order-2 order-sm-1 rounded-1 px-4"
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="order-1 order-sm-2 border-0 rounded-1 px-4"
                style={{
                  background: "var(--color-gold-dark)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
