import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Pencil, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getAllSalesAgentApi } from '../../Api/SalesApi/getAllSalesAgent'
import { getAlllead } from '../../Api/LeadApi/getAllLead'
import { Helmet } from 'react-helmet'

export const Leads = () => {

  const [sales, setSales] = useState([]);
  const [salesError, setSalesError] = useState(null);

  const [tableData, setTableData] = useState([]);
  const [tableError, setTableError] = useState(null);

  const [searchData, setSearchData] = useState({
    name: "",
    source: "",
    status: "",
    priority: "",
    salesAgent: "",
    timeToClose: ""
  });

  const navigate = useNavigate();

  const handleClickToNavigate = () => {
    navigate("/create-lead")
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

  const getAllLeadApiCall = async () => {
    const result = await getAlllead();
    const { success, message, error, data } = result;

    if (success) {
      setTableData(data);
    } else if (!success) {
      setTableError(message);
    } else {
      setTableError(error);
    };
  };

  useEffect(() => {
    allSalesAgents();
    getAllLeadApiCall();
  }, []);

  // console.log(tableData)

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New":
        return "bg-primary p-1 rounded";
      case "Contacted":
        return "bg-info text-dark p-1 rounded";
      case "Qualified":
        return "bg-info text-dark p-1 rounded";
      case "Proposal Sent":
        return "bg-warning text-dark p-1 rounded";
      case "Closed":
        return "bg-success p-1 rounded";
      default:
        return "bg-dark p-1 rounded";
    }
  };


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const fetchFilteredLeads = async () => {
    if (
      searchData.name.length > 0 ||
      searchData.source.length > 0 ||
      searchData.salesAgent.length > 0 ||
      searchData.status.length > 0 ||
      searchData.priority.length > 0 ||
      searchData.timeToClose.length > 0
    ) {
      try {
        const result = await getAlllead(searchData);
        const { success, message, error, data } = result;

        // console.log(success)
        // console.log(message);
        // console.log(data);

        if (success) {
          setTableData(data);
        } else if (!success) {
          setTableData([]);
          setTableError(message);
        } else {
          setTableData([]);
          setTableError(error);
        }
      } catch (error) {
        setTableError(error.message);
      }
    } else {
      getAllLeadApiCall();
    }
  };

  useEffect(() => {
    fetchFilteredLeads();
  }, [searchData]);

  // console.log(searchData)

  return (
    <Layout>

      <Helmet>
         <title>All Leads Information | CRM</title>
        <meta
          name="description"
          content={`Get all the leads.`}
        />
        <meta
          name="keywords"
          content={`CRM Dashboard, Lead Dashboard, All-Leads `}
        />
      </Helmet>

      <div className='container-fluid my-4'>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
          <h4 className="fw-bold mb-2 mb-md-0">Leads Overview</h4>
          <button
            className="btn btn-primary px-4 d-flex align-items-center mt-4 mt-md-0"
            onClick={handleClickToNavigate}
          >
            Add New Lead <Pencil className="ms-3" size={18} />
          </button>
        </div>

        <div className="input-group mb-4 mt-5">
          <span className="input-group-text">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by lead name..."
            name='name'
            onChange={handleChange}
            value={searchData.name}
          />
        </div>

        <div className='row mt-5'>
          <div className='col-12 col-md-4 col-lg-3 mb-1'>
            <div className="mb-4 mt-2">
              <label htmlFor="sort" className="form-label fw-bold">
                Sort By Status
              </label>
              <select
                id="sort"
                className="form-select"
                name='status'
                value={searchData.status}
                onChange={handleChange}
              >
                <option value="" selected disabled>{" "}--Select Any Status--</option>
                <option value="">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className='col-12 col-md-4 col-lg-3'>
            <div className="mb-4 mt-2">
              <label htmlFor="sort1" className="form-label fw-bold">
                Sort By Source
              </label>
              <select
                id="sort1"
                className="form-select"
                name='source'
                value={searchData.source}
                onChange={handleChange}
              >
                <option value="" selected disabled>{" "}--Select Any Source--</option>
                <option value="">All</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className='col-12 col-md-4 col-lg-3 mb-1'>
            <div className="mb-4 mt-2">
              <label htmlFor="sort2" className="form-label fw-bold">
                Sort By SalesAgent
              </label>
              <select
                id="sort2"
                className="form-select"
                name='salesAgent'
                value={searchData.salesAgent}
                onChange={handleChange}
              >
                <option value="" selected disabled>{" "}--Select Any SalesAgent--</option>
                {sales.map((curr) => (
                  <option value={curr._id} key={curr._id}>{curr.email}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='col-12 col-md-4 col-lg-3 mb-1'>
            <div className="mb-4 mt-2">
              <label htmlFor="sort3" className="form-label fw-bold">
                Sort By Priority
              </label>
              <select
                id="sort3"
                className="form-select"
                name='priority'
                value={searchData.priority}
                onChange={handleChange}
              >
                <option value="" selected disabled>{" "}--Select Any Priority--</option>
                <option value="">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* radio button for timeToClose */}

        <p className='fw-bold'>Sort by Time To Close</p>

        <div>
          <input type="radio" name='timeToClose' id='asc' onChange={handleChange} value="asc" />
          <label htmlFor="asc" className='ms-2'>Ascending</label>
        </div>

        <div className='mt-2 mb-4'>
          <input type="radio" name='timeToClose' id='dsc' onChange={handleChange} value="dsc" />
          <label htmlFor="dsc" className='ms-2'>Descending</label>
        </div>

        <hr />


        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Source</th>
                <th>Status</th>
                <th>Sales Agent</th>
                <th>Time To Close</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              {tableData?.length > 0 ? (
                tableData.map((curr) => (
                  <tr key={curr._id}>
                    <td>{curr.name}</td>
                    <td>{curr.source}</td>
                    <td>
                      <span className={getStatusBadgeClass(curr.status)}>
                        {curr.status}
                      </span>
                    </td>
                    <td>{curr.salesAgent?.email || "N/A"}</td>
                    <td>{curr.timeToClose > 1 ? `${curr.timeToClose} days ` : `${curr.timeToClose} day`}</td>
                    <td>
                      <span
                        className={`badge ${curr.priority === "High"
                          ? "bg-danger"
                          : curr.priority === "Medium"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                          }`}
                      >
                        {curr.priority || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


      </div>
    </Layout>
  )
}
