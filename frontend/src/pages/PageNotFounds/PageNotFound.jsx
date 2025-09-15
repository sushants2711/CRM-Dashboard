import React from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-3 text-danger fw-bold mb-3">404</h1>
      <h2 className="fw-semibold mb-2">Page Not Found</h2>
      <p className="text-muted mb-4">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="d-flex flex-column flex-sm-row gap-3">
      
        <button
          className="btn btn-primary px-4"
          onClick={() => navigate("/")}
        >
          Go to Dashboard
        </button>

      
        <button
          className="btn btn-outline-secondary px-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
