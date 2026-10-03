import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { getToken } from "../../utils/cookie";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ProductsContext } from "../../context/aticlescontext";
import { CategoriesContext } from "../../context/categoriescontext";

export default function AddProduct() {
  const { setProducts } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);

  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

      const response = await fetch(`${API_URL}/product/`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to create product");
      }

      const newProduct = result?.product || result?.content || result;

      setProducts((prev) => [newProduct, ...prev]);

      reset();

    } catch (error) {
      console.error("Create product error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            Add Product
          </h1>

          <p
            className="mb-0"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
            }}
          >
            Add a new product to your website.
          </p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <small className="text-danger">{errors.price.message}</small>
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
                  Product Images
                </Form.Label>

                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  className="rounded-1 shadow-none"
                  {...register("images", {
                    required: "At least one product image is required",
                  })}
                />

                {errors.images && (
                  <small className="text-danger d-block">
                    {errors.images.message}
                  </small>
                )}

                <Form.Text
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "0.68rem",
                  }}
                >
                  Upload one or more images for this product.
                </Form.Text>
              </Form.Group>
            </div>
          </div>

          {/* Buttons */}
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
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
