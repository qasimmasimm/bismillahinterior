import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getToken } from "../../utils/cookie";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ProductsContext } from "../../context/aticlescontext";
import { CategoriesContext } from "../../context/categoriescontext";
import { FaPen } from "react-icons/fa";

export default function EditProduct({ product }) {
  const { setProducts } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);

  const API_URL = import.meta.env.VITE_API_URL;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (show && product) {
      reset({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category:
          typeof product.category === "object"
            ? product.category?._id
            : product.category || "",
      });
    }
  }, [show, product, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        toast.error("Please login again.");
        return;
      }

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);

      if (data.images?.length) {
        Array.from(data.images).forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await fetch(`${API_URL}/product/${product._id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to update product");
      }

      const updatedProduct = result?.product || result?.content || result;

      setProducts((prev) =>
        prev.map((item) => (item._id === product._id ? updatedProduct : item)),
      );

      setShow(false);
      reset();
    } catch (error) {
      console.error("Update product error:", error);
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

      <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
        <Modal.Header
          closeButton
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-bg-main)",
          }}
        >
          <div>
            <div
              className="text-uppercase fw-semibold mb-1"
              style={{
                color: "var(--color-gold-dark)",
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
              }}
            >
              Bismillah Interiors
            </div>

            <Modal.Title
              style={{
                color: "var(--color-text-main)",
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
              }}
            >
              Edit Product
            </Modal.Title>
          </div>
        </Modal.Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body
            style={{
              background: "var(--color-bg-main)",
            }}
          >
            <div className="row g-3">
              {/* Product Name */}
              <div className="col-12 col-md-6">
                <Form.Group>
                  <FloatingLabel label="Product Name">
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      className="rounded-1 shadow-none compact-input"
                      {...register("name", {
                        required: "Product name is required",
                      })}
                    />
                  </FloatingLabel>

                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </Form.Group>
              </div>

              {/* Category */}
              <div className="col-12 col-md-6">
                <Form.Group>
                  <FloatingLabel label="Category">
                    <Form.Select
                      className="rounded-1 shadow-none compact-input"
                      {...register("category", {
                        required: "Product category is required",
                      })}
                    >
                      <option value="">Select Category</option>

                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
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

              {/* Price */}
              <div className="col-12 col-md-6">
                <Form.Group>
                  <FloatingLabel label="Price">
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Price"
                      className="rounded-1 shadow-none compact-input"
                      {...register("price", {
                        required: "Product price is required",
                        min: {
                          value: 0,
                          message: "Price cannot be negative",
                        },
                      })}
                    />
                  </FloatingLabel>

                  {errors.price && (
                    <small className="text-danger">
                      {errors.price.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* Description */}
              <div className="col-12">
                <Form.Group>
                  <FloatingLabel label="Product Description">
                    <Form.Control
                      as="textarea"
                      placeholder="Product Description"
                      className="rounded-1 shadow-none compact-textarea"
                      {...register("description", {
                        required: "Product description is required",
                      })}
                    />
                  </FloatingLabel>

                  {errors.description && (
                    <small className="text-danger">
                      {errors.description.message}
                    </small>
                  )}
                </Form.Group>
              </div>

              {/* Product Images */}
              <div className="col-12">
                <Form.Group>
                  <Form.Label
                    className="fw-semibold mb-2"
                    style={{
                      color: "var(--color-text-main)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.76rem",
                    }}
                  >
                    Replace Product Images
                  </Form.Label>

                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    className="rounded-1 shadow-none"
                    {...register("images")}
                  />

                  <Form.Text
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "0.68rem",
                    }}
                  >
                    Leave empty to keep the existing images.
                  </Form.Text>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-bg-main)",
            }}
          >
            <Button
              type="button"
              onClick={handleClose}
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
              Cancel
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
              {loading ? "Updating..." : "Update Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
