import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Helmet } from 'react-helmet'
import { data, useNavigate, useParams } from 'react-router-dom'
import { getAllSalesAgentApi } from '../../Api/SalesApi/getAllSalesAgent'
import { leadDetailsApi } from '../../Api/LeadApi/leadDetails'
import { handleError } from '../../toastMessage/errorMessage/error.message'
import { updateLead } from '../../Api/LeadApi/updateLead'
import { handleSuccess } from '../../toastMessage/successMessage/success.message'
import { ToastContainer } from 'react-toastify'

export const UpdateLead = () => {
    const { id } = useParams();

    let encode = "";

    if (id) {
        encode = atob(id);
    }

    const navigate = useNavigate();

    const [sales, setSales] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        tags: "",
        timeToClose: "",
        priority: "",
    });

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

    const fetchLeadDetails = async () => {
        try {
            const result = await leadDetailsApi(encode);
            const { success, message, error, data } = result;
            if (success) {
                // handleSuccess(message);
                setFormData({
                    name: data.name,
                    source: data.source,
                    salesAgent: data.salesAgent._id,
                    status: data.status,
                    timeToClose: data.timeToClose,
                    priority: data.priority,
                    tags: data.tags
                })
            } else if (!success) {
                handleError(message);

            } else {
                handleError(error);

            }
        } catch (error) {
            handleError(error.message);

        }
    };

    //   console.log(formData)

    useEffect(() => {
        allSalesAgents();
        fetchLeadDetails();
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
        try {
            const { name, source, salesAgent, status, tags, timeToClose, priority } = formData;
            if (!name && !source && !salesAgent && !status && !tags && !timeToClose && !priority ) {
                handleError("At least on field is required");
                return;
            };

            if (timeToClose < 0) {
                handleError("Time is must be positive");
                return;
            };

            const result = await updateLead(encode, formData);
            const { success, message, error } = result;

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
                });
                
                setTimeout(() => {
                    navigate(-1);
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
                <title>Update Lead Dashboard Form | CRM</title>
                <meta
                    name='description'
                    content={`Update the Lead CRM Dashboard. Get the best CRM Lead.`} />
                <meta
                    name="keywords"
                    content={`CRM Dashboard, Update-Dashboard, Update-Leads `}
                />
            </Helmet>


            <div className='container-fluid mt-4'>
                <h2 className='text-center mb-4'>Update a Lead Form Data</h2>

                <form className="p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit}>
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
                            <option value="" selected disabled>Select Sales Agent</option>
                            {sales.map((curr) => (
                                <option key={curr._id} value={curr._id}>
                                    {curr.email}
                                </option>
                            ))}
                        </select>
                    </div>

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

                    {/* <div className="mb-3">
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
                    </div> */}

                    <div className="text-center mt-5">
                        <button type="submit" className="btn btn-primary px-4 w-100">
                            Update Lead
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </Layout>
    )
}
