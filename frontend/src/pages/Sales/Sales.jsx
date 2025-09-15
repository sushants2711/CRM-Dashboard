import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { getAllSalesAgentApi } from '../../Api/SalesApi/getAllSalesAgent';
import { handleSuccess } from '../../toastMessage/successMessage/success.message';
import { handleError } from '../../toastMessage/errorMessage/error.message';
import { Helmet } from 'react-helmet';

export const Sales = () => {

  const [saleData, setSaleData] = useState([]);

  const navigate = useNavigate();

  const handleClickToNavigate = () => {
    navigate("/create-sale")
  }

  const fetchSalesAgentData = async () => {
    const result = await getAllSalesAgentApi();
    const { success, message, error, data } = result;

    if (success) {
      handleSuccess(message);
      setSaleData(data);
    } else if (!success) {
      handleError(message);
      setSaleData([]);
    } else {
      handleError(error);
      setSaleData([]);
    };
  };

  useEffect(() => {
    fetchSalesAgentData();
  }, []);

  // console.log(saleData);
  return (
    <Layout>

      <Helmet>
         <title>Sales Dashboard | CRM</title>
        <meta
          name="description"
          content={`Get Sales CRM Dashboard. Get the best CRM Sales Dashboard.`}
        />
        <meta
          name="keywords"
          content={`CRM Sales Dashboard, Sales Dashboard, getSales, Sales-Graph-Visual-Dashboard `}
        />
      </Helmet>

      <div className='container-fluid my-4'>

        <div className='d-flex flex-column flex-md-row justify-content-between alingn-items-md-center mb-3'>
          <h4 className="fw-bold mb-2 mb-md-0">Sales Overview</h4>
          <button
            className="btn btn-primary px-4 d-flex align-items-center mt-4 mt-md-0"
            onClick={handleClickToNavigate}
          >
            Add New Sales Agent <Pencil className="ms-3" size={18} />
          </button>
        </div>


        {/* display all sales agents */}

        <div className="table-responsive mt-4 mt-md-5">
          <table className="table table-bordered table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {saleData?.length > 0 ? (
                saleData.map((curr) => (
                  <tr key={curr._id}>
                    <td>{curr.name}</td>
                    <td>{curr.email}</td>
                    <td>{new Date(curr.createdAt).toLocaleDateString()}</td>
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

        <div className='mt-3'>
          <h5 className='text-secondary fw-bold'>Total SalesAgents: {saleData.length}</h5>
        </div>

      </div>

    </Layout>
  )
}
