import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { getToken } from "../../utils/cookie";
import { useContext } from "react";
import  { ProjectContext } from "../../context/projectcontext";

export default function DeleteProject({ project, setProjects }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const {setProject}=useContext(ProjectContext)

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

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

      const res = await fetch(`${API_URL}/project/delete/${project?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: ` ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Delete failed");
        return;
      }

      setProject((prev) => prev.filter((item) => item?._id !== project?._id));

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
        className="border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
        style={{
          background: "#b02a37",
          width: "34px",
          height: "34px",
        }}
        title="Delete Project"
      >
        <FaTrash size={13} />
      </Button>

      <Modal show={show} onHide={handleClose} centered size="md">
        <Modal.Header
          closeButton
          className="border-0"
          style={{
            background: "var(--color-bg-light)",
          }}
        >
          <Modal.Title
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-main)",
            }}
          >
            Delete Project
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            background: "var(--color-bg-light)",
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
            fontSize: "0.85rem",
          }}
        >
          Are you sure you want to delete{" "}
          <strong style={{ color: "var(--color-text-main)" }}>
            {project?.title}
          </strong>
          ? This action cannot be undone.
        </Modal.Body>

        <Modal.Footer
          className="border-0"
          style={{
            background: "var(--color-bg-light)",
          }}
        >
          <Button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-1 px-3"
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
            className="border-0 rounded-1 px-3"
            style={{
              background: "#b02a37",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
            }}
          >
            {loading ? "Deleting..." : "Delete Project"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
