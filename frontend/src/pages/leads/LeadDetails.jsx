import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { leadDetailsApi } from "../../Api/LeadApi/leadDetails";
import { handleSuccess } from "../../toastMessage/successMessage/success.message";
import { handleError } from "../../toastMessage/errorMessage/error.message";
import { getAllComment } from "../../Api/commentApi/getAllComment";
import { getAllSalesAgentApi } from "../../Api/SalesApi/getAllSalesAgent";
import { createComment } from "../../Api/commentApi/createComment";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

export const LeadDetails = () => {
  const [showData, setShowData] = useState({});
  const [showError, setShowError] = useState(null);
  const [showComment, setShowComment] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [sales, setSales] = useState([]);
  const [salesError, setSalesError] = useState(null);

  const [formData, setFormData] = useState({
    author: "",
    commentText: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  let decode = "";
  if (id) decode = atob(id);

  const fetchLeadDetails = async () => {
    try {
      const result = await leadDetailsApi(decode);
      const { success, message, error, data } = result;
      if (success) {
        // handleSuccess(message);
        setShowData(data);
      } else if(!success){
        // handleError(message);
        setShowError(message);
        setShowData({});
      }else {
        handleError(error);
        setShowError(error);
        setShowData({});
      }
    } catch (error) {
      // handleError(error.message);
      setShowError(error.message);
      setShowData({});
    }
  };

  const fetchComment = async () => {
    try {
      const result = await getAllComment(decode);
      const { success, message, error, data } = result;
      if (success) {
        // handleSuccess(message);
        setShowComment(data);
      } else {
        // handleError(message || error);
        setCommentError(message || error);
        setShowComment([]);
      }
    } catch (error) {
      // handleError(error.message);
      setCommentError(error.message);
      setShowComment([]);
    }
  };

  const allSalesAgents = async () => {
    try {
      const result = await getAllSalesAgentApi();
      const { success, message, error, data } = result;

      if (success) {
        // handleSuccess(message);
        setSales(data);
      } else if (!success) {
        // handleError(message);
        setSalesError(message);
        setSales([]);
      } else {
        // handleError(error);
        setSalesError(error);
        setSales([]);
      }
    } catch (error) {
      // handleError(error);
      setSalesError(error.message);
    };
  };

  useEffect(() => {
    fetchLeadDetails();
    fetchComment();
    allSalesAgents();
  }, []);

  // console.log(sales);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Closed":
        return "badge bg-success";
      case "Proposal Sent":
        return "badge bg-info text-dark";
      case "In Progress":
        return "badge bg-warning text-dark";
      default:
        return "badge bg-secondary";
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
 try {
    const { author, commentText } = formData;

    if (!author || !commentText) {
      handleError("All fields are required to add a new Comment.")
      return;
    };

    if (commentText.length < 5) {
      handleError("Comment Text length must be greater than 5.");
      return;
    };

   
      // console.log("decode", decode);
      // console.log("fromData", formData);
      const result = await createComment(decode, formData);
      // console.log(result);
      const { success, message, error, data } = result;
      // console.log(success);
      if (success) {
        handleSuccess(message);
        setFormData({
          author: "",
          commentText: ""
        });
        fetchComment();
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
         <title>Lead-Details Dashboard | CRM</title>
        <meta
          name="description"
          content={`Get the Lead Details. Best Lead Information.`}
        />
        <meta
          name="keywords"
          content={`CRM Dashboard, Lead, LeadDetails `}
        />
      </Helmet>
      <div className="container-fluid my-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">
            <i className="bi bi-briefcase-fill me-2 text-primary"></i> Lead Overview
          </h2>
          <button className="btn btn-outline-dark px-4" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
        </div>

        {showError && <div className="alert alert-danger">{showError}</div>}

        {/* Lead Info Card */}
        {showData && showData.name ? (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 rounded-4 bg-dark text-light">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold text-primary">{showData.name}</h4>
                  </div>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={getStatusBadge(showData.status)}>
                      {showData.status}
                    </span>
                  </p>

                  <p>
                    <strong>Source:</strong> {showData.source}
                  </p>
                  <p>
                    <strong>Priority:</strong>{" "}
                    <span className="badge bg-warning text-dark">
                      {showData.priority}
                    </span>
                  </p>
                  <p>
                    <strong>Tags:</strong>{" "}
                    {showData.tags?.map((tag, idx) => (
                      <span key={idx} className="badge bg-secondary me-1">
                        {tag}
                      </span>
                    ))}
                  </p>

                  <hr />
                  <h6 className="text-danger mb-3">Sales Agent</h6>
                  <p className="mb-0">{showData.salesAgent?.name ?? "N/A"}</p>
                  <small className="text-light">
                    {showData.salesAgent?.email ?? "N/A"}
                  </small>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 rounded-4 ">
                <div className="card-header bg-light fw-bold">
                  <i className="bi bi-clock-history me-2 "></i> Timeline
                </div>
                <div className="card-body bg-dark text-light">
                  <ul className="list-unstyled">
                    <li className="mb-4">
                      <strong>Created:</strong>
                      <br />
                      <small className="text-light">
                        {showData.createdAt
                          ? new Date(showData.createdAt).toLocaleString()
                          : "N/A"}
                      </small>
                    </li>
                    <li className="mb-4">
                      <strong>Updated:</strong>
                      <br />
                      <small className="text-light">
                        {showData.updatedAt
                          ? new Date(showData.updatedAt).toLocaleString()
                          : "N/A"}
                      </small>
                    </li>
                    {showData.closedAt && (
                      <li>
                        <strong>Closed:</strong>
                        <br />
                        <small className="text-success">
                          {new Date(showData.closedAt).toLocaleString()}
                        </small>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted">Loading lead details...</p>
        )}

        {/* Comments Section */}
        <div className="card shadow-sm border-0 rounded-4 mt-4">
          <div className="card-header bg-light fw-bold">
            <i className="bi bi-chat-dots me-2"></i> Comments
          </div>
          <div className="card-body">
            {commentError && <div className="alert alert-warning">{commentError}</div>}
            {showComment.length > 0 ? (
              <div className="timeline">
                {showComment.map((comment, idx) => (
                  <div key={comment._id} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <strong>{comment?.author?.name ?? "Anonymous"}</strong>
                      <small className="text-muted">
                        {comment?.createdAt
                          ? new Date(comment.createdAt).toLocaleString()
                          : "Unknown"}
                      </small>
                    </div>
                    <p className="mb-0">{comment?.commentText ?? "No comment"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>
        </div>


        {/* Add Comment Form */}
        <div className="card shadow-sm border-0 rounded-4 mt-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Add a Comment</h5>
            <form onSubmit={handleAddComment}>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">Sales Agent</label>
                <select
                  id="author"
                  name="author"
                  className="form-select"
                  value={formData.author}
                  onChange={handleChange}
                >
                  <option value="" selected disabled>Select Sales Agent</option>
                  {sales.map((curr) => (
                    <option value={curr._id} key={curr._id}>{curr.email}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Comment</label>
                <textarea
                  id="comment"
                  name="commentText"
                  className="form-control"
                  placeholder="Enter your comment"
                  rows={4}
                  value={formData.commentText}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                <i className="bi bi-chat-dots me-2"></i> Add Comment
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};
