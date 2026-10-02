import { useContext, useState } from "react";
import { CategoriesContext } from "../../context/categoriescontext";
import { getToken } from "../../utils/cookie";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteCategory({ cat }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setCategories } = useContext(CategoriesContext);

  const handleClose = () => {
    if (!loading) {
      setShow(false);
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleDelete = async () => {
    const token = getToken();

    if (!token) {
      toast.error("Please login again.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/category/${cat?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Delete failed");
        return;
      }

      setCategories((prev) =>
        prev.filter(
          (category) => category?._id !== cat?._id
        )
      );
      setShow(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleShow}
        title="Delete category"
        className="border-0 p-2 rounded-1"
        style={{
          background: "transparent",
          color: "#a94442",
        }}
      >
        <FaTrash size={14} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header
          closeButton
          className="border-0 px-3 px-sm-4 pt-3 pt-sm-4 pb-2"
          style={{
            background: "var(--color-bg-light)",
          }}
        >
          <Modal.Title
            style={{
              color: "var(--color-text-main)",
              fontFamily: "var(--font-heading)",
              fontSize: "1.8rem",
            }}
          >
            Delete Category
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="px-3 px-sm-4 py-3"
          style={{
            background: "var(--color-bg-light)",
          }}
        >
          <div className="text-center py-2 py-sm-3">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "56px",
                height: "56px",
                background: "rgba(169, 68, 66, 0.08)",
                color: "#a94442",
              }}
            >
              <FaTrash size={20} />
            </div>

            <h5
              className="mb-2"
              style={{
                color: "var(--color-text-main)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Are you sure you want to delete this category?
            </h5>

            <p
              className="mb-2"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
              }}
            >
              You are about to delete:
            </p>

            <div
              className="d-inline-block px-3 py-2 rounded-1"
              style={{
                background: "var(--color-bg-alt)",
                color: "var(--color-text-main)",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 600,
              }}
            >
              {cat?.title || "This category"}
            </div>

            <p
              className="mt-3 mb-0"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
              }}
            >
              This action cannot be undone.
            </p>
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
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="order-1 order-sm-2 border-0 rounded-1 px-4"
              style={{
                background: "#a94442",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
              }}
            >
              {loading ? "Deleting..." : "Delete Category"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}