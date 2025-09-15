import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { handleError } from "../../toastMessage/errorMessage/error.message";
import { leadThatAreClosedInLastWeek } from "../../Api/LeadApi/leadThatClosedInLastWeek";
import { handleSuccess } from "../../toastMessage/successMessage/success.message";
import { allLeadContext } from "../../Context/LeadContext/LeadAllContext";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Helmet } from "react-helmet";


ChartJS.register(ArcElement, Tooltip, Legend);

export const Reports = () => {
  const [salesData, setSalesData] = useState([]);

  const fetchLeadClosed = async () => {
    try {
      const result = await leadThatAreClosedInLastWeek();
      const { success, message, error, data } = result;

      if (success) {
        handleSuccess(message);
        setSalesData(data);
      } else if (!success) {
        handleError(message);
        setSalesData([]);
      } else {
        handleError(error);
        setSalesData([]);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const { displayData, fetchAlwaysLead } = allLeadContext();

  useEffect(() => {
    fetchLeadClosed();
    fetchAlwaysLead();
  }, []);


  const totalLead = displayData.length;
  const leadsThatClosed = salesData.length;
  const remainingLead = totalLead - leadsThatClosed;

  const data = {
    labels: ["Closed (Last 7 Days)", "Remaining Other Leads"],
    datasets: [
      {
        label: "Leads Distribution",
        data: [leadsThatClosed, remainingLead],
        backgroundColor: ["#4caf50", "#f44336"],
        borderColor: ["#388e3c", "#d32f2f"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <Layout>
      <Helmet>
         <title>Get All the Reports | CRM</title>
        <meta
          name="description"
          content={`Get all the reports available of the lead. Get the best CRM Dashboard Visual Appearance.`}
        />
        <meta
          name="keywords"
          content={`CRM Dashboard, Dashboard, Visual Representation, Pie-Chart-Graph `}
        />
      </Helmet>
      <div className="container my-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Report Overview</h3>
          <p className="text-muted">Track your leads visually and interactively</p>
        </div>

        {/* Stats Row */}
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 hover-shadow">
              <div className="card-body text-center">
                <h5 className="fw-semibold">Total Leads</h5>
                <h2 className="fw-bold text-primary">{totalLead}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 hover-shadow">
              <div className="card-body text-center">
                <h5 className="fw-semibold">Closed in Last Week</h5>
                <h2 className="fw-bold text-success">{leadsThatClosed}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}

        <div className="text-center mt-5">
          <h5 className="fw-bold mb-3">Leads Distribution</h5>
        </div>

        <div className="d-flex justify-content-center">
          <div
            className="p-3 shadow-sm rounded bg-white text-light chart-container"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "400px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <Pie data={data} options={options} />
          </div>
        </div>
       
      </div>
    </Layout>
  );
};
