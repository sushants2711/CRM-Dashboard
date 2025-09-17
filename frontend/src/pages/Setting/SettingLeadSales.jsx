import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { allLeadContext } from '../../Context/LeadContext/LeadAllContext'
import { Delete, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../toastMessage/errorMessage/error.message';
import { deleteLead } from '../../Api/LeadApi/deleteLead';
import { handleSuccess } from '../../toastMessage/successMessage/success.message';
import { ToastContainer } from 'react-toastify';
import { getAllSalesAgentApi } from '../../Api/SalesApi/getAllSalesAgent';
import { deleteSalesApi } from '../../Api/SalesApi/deleteSalesApi';

export const SettingLeadSales = () => {

  const { displayData, displayError, fetchAlwaysLead } = allLeadContext();
  const [displayTable, setDisplayTable] = useState(false);

  const [saleData, setSaleData] = useState([]);

  const [displaySalesTable, setDisplaySalesTable] = useState(false);

  const navigate = useNavigate();

  const fetchSalesAgentData = async () => {
    const result = await getAllSalesAgentApi();
    const { success, message, error, data } = result;

    if (success) {
      // handleSuccess(message);
      setSaleData(data);
    } else if (!success) {
      // handleError(message);
      setSaleData([]);
    } else {
      // handleError(error);
      setSaleData([]);
    };
  };

  useEffect(() => {
    fetchAlwaysLead();
    fetchSalesAgentData();
  }, []);

  // console.log(displayData);

  const handleToUpdate = (id) => {
    if (id) {
      const decode = btoa(id);
      navigate(`/update-lead/${decode}`);
    };
  };

  const handleToDelete = async (id) => {
    try {
      const result = await deleteLead(id);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchAlwaysLead();
      } else if (!success) {
        handleError(message);
      } else {
        handleError(error);
      };

    } catch (error) {
      handleError(error.message);
    };
  };

  const handleToDeleteSalesAgent = async (id) => {
    try {
      const result = await deleteSalesApi(id);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchSalesAgentData();
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

      <div className='container-fluid my-5'>

        <h2 className='mb-4 text-secondary'>All Active Leads</h2>

        <button
          className={`btn btn-sm btn-primary mb-4 px-5 py-2 ${displayTable ? "btn-warning" : "btn-primary"}`}
          onClick={() => setDisplayTable(!displayTable)}
        >
          {displayTable ? "Hide Leads Data" : "Show Leads Data"}
        </button>


        {
          displayTable &&
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle" onClick={() => setDisplayTable(!displayTable)}>
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Sales Agent</th>
                  <th>Priority</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {
                  displayData.length > 0 ? (
                    displayData.map((curr) => (
                      <tr key={curr._id}>
                        <td>{curr.name}</td>
                        <td>{curr.salesAgent?.email}</td>
                        <td>{curr.priority}</td>
                        <td className='text-center text-warning'><Pencil onClick={() => handleToUpdate(curr._id)} style={{ cursor: "pointer" }} /></td>
                        <td className='text-center text-danger'><Delete onClick={() => handleToDelete(curr._id)} style={{ cursor: "pointer" }} /></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No leads found.
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        }

        <h2 className='my-4 text-secondary'>All Active Sales Agents</h2>

        <button
          className={`btn btn-sm btn-primary mb-4 px-5 py-2 ${displaySalesTable ? "btn-warning" : "btn-primary"}`}
          onClick={() => setDisplaySalesTable(!displaySalesTable)}
        >
          {displaySalesTable ? "Hide Sales Agents" : "Show Sales Agents"}
        </button>
        {
          displaySalesTable &&

          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>CreatedAt</th>
                  {/* <th>Update</th> */}
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {saleData?.length > 0 ? (
                  saleData.map((curr) => (
                    <tr key={curr._id}>
                      <td>{curr.name}</td>
                      <td>{curr.email}</td>
                      <td>{new Date(curr.createdAt).toLocaleDateString()}</td>
                      {/* <td className='text-center text-warning'><Pencil onClick={() => handleToUpdateSalesAgentData(curr._id)} style={{ cursor: "pointer" }} /></td> */}
                      <td className='text-center text-danger'><Delete onClick={() => handleToDeleteSalesAgent(curr._id)} style={{ cursor: "pointer" }} /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                        <p className="fw-bold fs-4 text-danger mb-0">
                          No Sales Agent Data found.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        }
        <ToastContainer />
      </div>
    </Layout>
  )
}
