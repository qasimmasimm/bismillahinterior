import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { getToken } from "../../utils/cookie";

export default function AddCategories() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    if (!loading) {
      setShow(false);
      reset();
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const token = getToken();
      if (!token) {
        console.log("no token");
      }
      const formData = new FormData();

      formData.append("slug", data.slug);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("img", data.image[0]);

      const response = await fetch(`${API_URL}/category/create`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create category");
      }

      //   toast.inf("Category created successfully!");
      handleClose();

      reset();
      setShow(false);
    } catch (error) {
      console.error("Create category error:", error);
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
        className="border-0 rounded-1 px-4 py-2"
        style={{
          background: "var(--color-gold-dark)",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
        }}
      >
        Add Category
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
              Add Category
            </Modal.Title>

            <p
              className="mb-0"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
              }}
            >
              Create a new product category for your website.
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
            <Form.Group className="mb-3">
              <Form.Label
                className="fw-semibold mb-2"
                style={{
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.76rem",
                }}
              >
                Category Title
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter category title"
                className="rounded-1 shadow-none"
                {...register("title", {
                  required: "Title is required",
                })}
              />

              {errors.title && (
                <small className="text-danger">{errors.title.message}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label
                className="fw-semibold mb-2"
                style={{
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.76rem",
                }}
              >
                Slug
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter category slug"
                className="rounded-1 shadow-none"
                {...register("slug", {
                  required: "Slug is required",
                })}
              />

              {errors.slug && (
                <small className="text-danger">{errors.slug.message}</small>
              )}

              <Form.Text
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.68rem",
                }}
              >
                Example: wood-flooring
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label
                className="fw-semibold mb-2"
                style={{
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.76rem",
                }}
              >
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter category description"
                className="rounded-1 shadow-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />

              {errors.description && (
                <small className="text-danger">
                  {errors.description.message}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="fw-semibold mb-2"
                style={{
                  color: "var(--color-text-main)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.76rem",
                }}
              >
                Category Image
              </Form.Label>

              <Form.Control
                type="file"
                accept="image/*"
                className="rounded-1 shadow-none"
                {...register("image", {
                  required: "Category image is required",
                })}
              />

              {errors.image && (
                <small className="text-danger">{errors.image.message}</small>
              )}

              <Form.Text
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.68rem",
                }}
              >
                Upload a clear image representing this category.
              </Form.Text>
            </Form.Group>
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
                {loading ? "Saving..." : "Save Category"}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
