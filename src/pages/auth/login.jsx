import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../../context/usercontext";

export default function Login() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      /*
        NOTE:
        For production authentication, you should ideally
        let the backend set an HttpOnly cookie instead of
        storing the JWT with document.cookie.
      */

      document.cookie = `token=${encodeURIComponent(result.token)}; path=/`;

      /*
        If you want to store the user in a normal cookie,
        convert the object to JSON first.
      */
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(result.user),
      )}; path=/`;

      setUser(result.user);
      console.log(result.user);

      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      reset();

      toast.info("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong during login");
    }
  };

  return (
    <div className="position-relative min-vh-100 overflow-hidden">

  <img
    src="/images/login-banner.webp"
    alt="Bismillah Interiors"
    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
  />

  <div className="position-relative min-vh-100 d-flex align-items-center">
    <div className="container-fluid">
      <div className="row justify-content-start">

        <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4 ms-0 ms-md-4 ms-lg-5">

          <div className="bg-light shadow-sm rounded-4 p-4 p-md-5 my-4">

            <div className="d-flex flex-column justify-content-center">

              <h2
                className="mb-1 fw-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-dark)",
                  fontSize: "2rem",
                }}
              >
                Welcome Back
              </h2>

              <p
                className="text-muted mb-4"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                }}
              >
                Sign in to continue to your account
              </p>

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* EMAIL */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label mb-1 fw-medium small"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    className="form-control form-control-sm"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />

                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="mb-2">
                  <label
                    htmlFor="pass"
                    className="form-label mb-1 fw-medium small"
                  >
                    Password
                  </label>

                  <input
                    id="pass"
                    type="password"
                    className="form-control form-control-sm"
                    {...register("password", {
                      required: "Password required",
                      minLength: {
                        value: 8,
                        message: "At least 8 characters",
                      },
                    })}
                  />

                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="btn btn-sm rounded-2 w-100 mt-3 text-white"
                  style={{
                    backgroundColor: "var(--color-dark)",
                    fontFamily: "var(--font-body)",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>

              </Form>

              <p
                className="text-center text-muted small mt-3 mb-0"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                New here?{" "}

                <small
                  className="fw-semibold text-decoration-underline"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/register")}
                >
                  Create an Account
                </small>
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  </div>

</div>
  );
}
