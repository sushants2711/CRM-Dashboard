import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { getAllSalesAgentApi } from "../../Api/SalesApi/getAllSalesAgent";
import { handleSuccess } from "../../toastMessage/successMessage/success.message";
import { handleError } from "../../toastMessage/errorMessage/error.message";
import { createLead } from "../../Api/LeadApi/createLead";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

export const CreateLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: "",
    timeToClose: "",
    priority: "",
    closedAt: "",
  });

  const [formError, setFormError] = useState(null);

  const [sales, setSales] = useState([]);

  const navigate = useNavigate();

  const allSalesAgents = async () => {
    try {
      const result = await getAllSalesAgentApi();
      const { success, message, error, data } = result;

      if (success) {
        // handleSuccess(message);
        setSales(data);
      } else if (!success) {
        // handleError(message);
        setSales([]);
      } else {
        // handleError(error);
        setSales([]);
      }
    } catch (error) {
      // handleError(error);
      setSales([]);
    }
  };

  useEffect(() => {
    allSalesAgents();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: name === "tags" ? value.split(", ").map((curr) => curr.trim()) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const { name, source, salesAgent, status, tags, timeToClose, priority, closedAt } = formData;

      if (!name || !source || !salesAgent || !status || !timeToClose || !priority || !tags) {
        handleError("All fields are required except than closeAt");
        return;
      };

      if(timeToClose < 0) {
        handleError("Time is must be positive");
        return;
      };

      const result = await createLead(formData);
      const { success, message, error } = result;

      // console.log(success, message)
      if (success) {
        handleSuccess(message);
        setFormData({
          name: "",
          source: "",
          salesAgent: "",
          status: "",
          tags: "",
          timeToClose: "",
          priority: "",
          closedAt: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (!success) {
        handleError(message);
      } else {
        handleError(error);
      };

    } catch (error) {
      setFormError(error.message);
    };
  };

  return (
    <Layout>
      
      <Helmet>
         <title>Create Leads Dashboard | CRM</title>
        <meta
          name="description"
          content={`Create the Lead CRM Dashboard. Get the best CRM Dashboard.`}
        />
        <meta
          name="keywords"
          content={`CRM Dashboard, Dashboard, CreateLeads, CreateLeadDashboard `}
        />
      </Helmet>

      <div className="container mt-4">
        <h2 className="text-center mb-4">Create a New Lead</h2>

        <form
          className="p-4 border rounded shadow-sm bg-light"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter lead name"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="source" className="form-label fw-bold">
              Source
            </label>
            <select
              name="source"
              id="source"
              className="form-select"
              onChange={handleChange}
              value={formData.source}
            >
              <option value="" selected disabled>
                -- Select any of them --
              </option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Sales Agent */}
          <div className="mb-3">
            <label htmlFor="sales" className="form-label fw-bold">
              Sales Agent
            </label>
            <select
              name="salesAgent"
              id="sales"
              className="form-select"
              onChange={handleChange}
              value={formData.salesAgent}
            >
              <option value="">Select Sales Agent</option>
              {sales.map((curr) => (
                <option key={curr._id} value={curr._id}>
                  {curr.email}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="mb-3">
            <label htmlFor="status" className="form-label fw-bold">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              onChange={handleChange}
              value={formData.status}
            >
              <option value="" selected disabled>
                {" "}
                -- Select any of them --{" "}
              </option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Tags */}
          <div className="mb-3">
            <label htmlFor="tags" className="form-label fw-bold">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              name="tags"
              id="tags"
              placeholder="Comma separated tags"
              onChange={handleChange}
              value={Array.isArray(formData.tags) ? formData.tags.join(", ") : formData.tags}
            />
          </div>

          {/* Time To Close */}
          <div className="mb-3">
            <label htmlFor="timeToClose" className="form-label fw-bold">
              Time to Close (Days)
            </label>
            <input
              type="number"
              className="form-control"
              name="timeToClose"
              id="timeToClose"
              onChange={handleChange}
              value={formData.timeToClose}
            />
          </div>

          {/* Priority */}
          <div className="mb-3">
            <label htmlFor="priority" className="form-label fw-bold">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              className="form-select"
              onChange={handleChange}
              value={formData.priority}
            >
              <option value="" selected disabled>
                --Select any one of them --
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Closed At */}
          <div className="mb-3">
            <label htmlFor="close" className="form-label fw-bold">
              Closed At
            </label>
            <input
              type="date"
              className="form-control"
              name="closedAt"
              id="close"
              onChange={handleChange}
              value={formData.closedAt}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-5">
            <button type="submit" className="btn btn-primary px-4 w-100">
              Add New Lead
            </button>
          </div>
        </form>
      </div>
      <ToastContainer limit={1} />
    </Layout>
  );
};
