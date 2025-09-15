import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { handleError } from '../../toastMessage/errorMessage/error.message';
import { gertAllSalesAgentDataClosed } from '../../Api/LeadApi/getAllSalesClosedAgent';
import { handleSuccess } from '../../toastMessage/successMessage/success.message';
import { Helmet } from "react-helmet"
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export const Agents = () => {

  const [salesClosedData, setSalesClosedData] = useState([]);

  const fetchSalesDataByUserClosed = async () => {
    try {
      const result = await gertAllSalesAgentDataClosed();
      const { success, message, error, data } = result;

      if (success) {
        handleSuccess(message);
        setSalesClosedData(data);
      } else if (!success) {
        handleError(message);
        setSalesClosedData([]);
      } else {
        handleError(error);
        setSalesClosedData([]);
      };
    } catch (error) {
      handleError(error.message);
    };
  };

  useEffect(() => {
    fetchSalesDataByUserClosed();
  }, []);

  const labels = salesClosedData.map((curr) => curr.agentName);
  const counts = salesClosedData.map((curr) => curr.totalLeadClosedByEachSalesAgent)

  const colors = [
    "#4caf50", // green
    "#2196f3", // blue
    "#ff9800", // orange
    "#9c27b0", // purple
    "#f44336", // red
    "#00bcd4", // cyan
    "#8bc34a", // light green
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Sales Record Closed By Each Member",
        data: counts,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        borderColor: labels.map((_, i) => colors[i % colors.length]),
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
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
          font: {
            size: 14,
            weight: "bold",
          },
        }
      },
    }
  };





  // console.log(salesClosedData)

  return (
    <Layout>

      <Helmet>
        <title>Sales-Agent-Report | CRM</title>
        <meta
          name="description"
          content={`Explore Our CRM Agent-Report. Get the best CRM Result.`}
        />
        <meta
          name="keywords"
          content={`CRM Report, Sales Agent Report `}
        />
      </Helmet>

      <div className='container-fluid my-5'>
        <div className="text-center my-4">
          <h2 className="fw-bold text-primary">
            Sales Closed by Agents
          </h2>
          <p className="text-muted">
            Overview of total leads closed by each sales agent
          </p>
        </div>

        <div className="shadow p-3 rounded bg-white mx-auto my-5" style={{ maxWidth: "800px", height: "400px" }}>
          <PolarArea data={data} options={options} />
        </div>

        <div className="row g-4 mt-5">
          {salesClosedData.map((curr) => (
            <div className="col-md-6 col-lg-4" key={curr.agentId}>
              <div className="card shadow-sm border-0 hover-shadow">
                <div className="card-body text-center">
                  <h5 className="fw-semibold">{curr.agentName}</h5>
                  <h2 className="fw-bold text-primary">{curr.totalLeadClosedByEachSalesAgent}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  )
}
