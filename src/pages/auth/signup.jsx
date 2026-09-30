import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/usercontext";

export default function Register() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
    //   const formData = new FormData();

    //   formData.append("name", data.name);
    //   formData.append("email", data.email);
    //   formData.append("phone", data.phone);
    //   formData.append("password", data.password);

      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Registration failed");
        return;
      }

      setUser(result.user);
      reset();

      toast.info("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong during registration");
    }
  };

  return (
    <div className="position-relative min-vh-100 overflow-hidden">
      <img
        src="/images/signupbg.png"
        alt="Bismillah Interiors"
        loading="lazy"
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      />

      <div className="position-relative min-vh-100 d-flex align-items-center">
        <div className="container-fluid">
          <div className="row min-vh-100 align-items-center py-4 py-md-5">
            <div className="col-12 col-md-5 col-lg-6">
              <div className="text-center text-md-start px-4 px-md-5 ms-md-4 ms-lg-5">
                <h1
                  className="mb-0 fw-semibold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-dark)",
                    letterSpacing: "3px",
                  }}
                >
                  BISMILLAH
                </h1>

                <span
                  className="d-block text-uppercase mt-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-gold-dark)",
                    letterSpacing: "5px",
                    fontSize: "0.8rem",
                  }}
                >
                  INTERIORS
                </span>

                <h2
                  className="mt-4 mb-2 fw-semibold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-dark)",
                  }}
                >
                  Beautiful Spaces
                  <br />
                  Begin Here
                </h2>

                <p
                  className="text-muted small mb-0"
                  style={{
                    fontFamily: "var(--font-body)",
                    maxWidth: "340px",
                  }}
                >
                  Premium wall panels and interior solutions designed to bring
                  warmth, character, and elegance to modern spaces.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-7 col-lg-5 ms-lg-auto">
              <div className="bg-white shadow rounded-4 p-4 p-md-5 mx-auto">
                <h2
                  className="fw-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-dark)",
                  }}
                >
                  Create Account
                </h2>

                <p
                  className="text-muted small mb-4"
                  style={{
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Join Bismillah Interiors today
                </p>

                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Row className="g-2 mb-2">
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-medium mb-1">
                          Name
                        </Form.Label>

                        <Form.Control
                          type="text"
                          size="sm"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "At least 2 characters",
                            },
                          })}
                        />

                        {errors.name && (
                          <small className="text-danger d-block">
                            {errors.name.message}
                          </small>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-medium mb-1">
                          Phone
                        </Form.Label>

                        <Form.Control
                          type="tel"
                          size="sm"
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[0-9]{10,15}$/,
                              message: "Enter a valid phone number",
                            },
                          })}
                        />

                        {errors.phone && (
                          <small className="text-danger d-block">
                            {errors.phone.message}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-2">
                    <Form.Label className="small fw-medium mb-1">
                      Email Address
                    </Form.Label>

                    <Form.Control
                      type="email"
                      size="sm"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email",
                        },
                      })}
                    />

                    {errors.email && (
                      <small className="text-danger d-block">
                        {errors.email.message}
                      </small>
                    )}
                  </Form.Group>

                  <Row className="g-2 mb-3">
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-medium mb-1">
                          Password
                        </Form.Label>

                        <Form.Control
                          type="password"
                          size="sm"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message: "At least 8 characters",
                            },
                          })}
                        />

                        {errors.password && (
                          <small className="text-danger d-block">
                            {errors.password.message}
                          </small>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-medium mb-1">
                          Confirm Password
                        </Form.Label>

                        <Form.Control
                          type="password"
                          size="sm"
                          {...register("confirmPassword", {
                            required: "Confirm your password",
                            validate: (value) =>
                              value === password || "Passwords do not match",
                          })}
                        />

                        {errors.confirmPassword && (
                          <small className="text-danger d-block">
                            {errors.confirmPassword.message}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    type="submit"
                    variant="dark"
                    size="sm"
                    className="w-100 rounded-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </Form>

                <p className="text-center text-muted small mt-3 mb-0">
                  Already have an account?{" "}
                  <span
                    className="fw-semibold text-decoration-underline"
                    onClick={() => navigate("/login")}
                    role="button"
                  >
                    Sign in
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
