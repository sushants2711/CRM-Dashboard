import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { handleError } from "../../toastMessage/errorMessage/error.message";
import { ToastContainer } from "react-toastify";
import { createSales } from "../../Api/SalesApi/createSales";
import { handleSuccess } from "../../toastMessage/successMessage/success.message";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const CreateSales = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email } = formData;

      if (!name || !email) {
        handleError("All fields are required.");
        return;
      };

      if (!email.includes("@")) {
        handleError("Invalid Email Id format.");
        return;
      };

      const result = await createSales(formData);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setFormData({
          name: "",
          email: ""
        });
        setTimeout(() => {
          navigate("/sales");
        }, 3000);
      } else if (!success) {
        handleError(message);
      } else {
        handleError(error);
      };
    } catch (error) {
      handleError(error.message);
    };
  };

  return (
    <Layout>
      <Helmet>
         <title>Create Sales | CRM</title>
        <meta
          name="description"
          content={`Create the Sales Register Page. Get the best CRM Dashboard.`}
        />
        <meta
          name="keywords"
          content={`Create-Sales, CRM-Sales-Page, Createsales, RegisterSalesPage `}
        />
      </Helmet>
      
      <div className="container-fluid mt-4">
        <h2 className="text-center my-5">Register a New SalesAgent</h2>

        <form
          className="p-4 border rounded shadow-sm bg-light my-5"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter salesAgent name"
              className="form-control"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your SalesAgent Email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="text-center mt-5">
            <button type="submit" className="btn btn-primary px-4 w-100">
              Add New SalesAgent
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </Layout>
  );
};
