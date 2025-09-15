import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allLeadContext } from "../../Context/LeadContext/LeadAllContext";
import { Helmet } from "react-helmet";

export const Dashboard = () => {
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const { displayData, displayError, fetchAlwaysLead } = allLeadContext();

  const handleClickToNavigate = () => {
    navigate("/create-lead");
  };

  const handleNewApi = async (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    if (selectedStatus && selectedStatus.length > 0) {
      await fetchAlwaysLead(selectedStatus);
    } else {
      await fetchAlwaysLead();
    }
  };

  const fetchAlways = async () => {
    await fetchAlwaysLead();
  };

  useEffect(() => {
    fetchAlways();
  }, []);

  // Status summary counts
  const statusCounts = displayData?.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  // Bootstrap badge colors by status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New":
        return "bg-primary";
      case "Contacted":
        return "bg-info text-dark";
      case "Qualified":
        return "bg-info text-dark";
      case "Proposal Sent":
        return "bg-warning text-dark";
      case "Closed":
        return "bg-success";
      default:
        return "bg-dark";
    }
  };

  const handleClickToDetails = (id) => {
    const encoded = btoa(id);
    navigate(`/lead-detail/${encoded}`)
  }

  return (
    <Layout>
       <Helmet>
        <title>Leads Dashboard | CRM</title>
        <meta
          name="description"
          content={`Explore Our CRM Dashboard Page. Get the best CRM Dashboard.`}
        />
        <meta
          name="keywords"
          content={`CRM Dashboard, Dashboard, Leads `}
        />
      </Helmet>

      <div className="container-fluid mt-3">
        <div className="row">
          {/* Main Content */}
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
              <h4 className="fw-bold mb-2 mb-md-0">Leads Dashboard</h4>
              <button
                className="btn btn-primary px-4 d-flex align-items-center mt-4 mt-md-0"
                onClick={handleClickToNavigate}
              >
                Add New Lead <Pencil className="ms-3" size={18} />
              </button>
            </div>


            {/* Sort by Dropdown */}
            <div className="mb-4 mt-4">
              <label htmlFor="sort" className="form-label fw-bold">
                Sort By Status
              </label>
              <select
                id="sort"
                className="form-select"
                value={status}
                onChange={handleNewApi}
              >
                <option value="">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Status Summary */}
            <div className="row mb-4 mt-5">
              {statusCounts &&
                Object.keys(statusCounts).map((curr) => (
                  <div key={curr} className="col-12 col-md-4 col-lg-2 mb-3">
                    <div
                      className={`card shadow-sm border-0 text-center text-white ${getStatusBadgeClass(
                        curr
                      )}`}
                    >
                      <div className="card-body py-3">
                        <h6 className="fw-bold mb-1">{curr}</h6>
                        <p className="mb-0">{statusCounts[curr]} Leads</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Leads List */}
            <div className="row">
              {displayError && (
                <p className="text-danger">Error: {displayError}</p>
              )}
              {displayData?.length > 0 ? (
                displayData.map((lead) => (
                  <div key={lead._id} className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="card shadow-sm border-0" onClick={() => handleClickToDetails(lead._id)}>
                      <div className="card-body">
                        <h5 className="fw-bold">{lead.name}</h5>
                        <span
                          className={`badge ${getStatusBadgeClass(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No leads found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
