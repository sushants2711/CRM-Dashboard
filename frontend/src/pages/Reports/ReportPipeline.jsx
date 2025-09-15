import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { leadAllPipeLine } from "../../Api/LeadApi/allLeadPipeline";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Helmet } from "react-helmet";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const ReportPipeline = () => {
    const [pipelineData, setPipeLineData] = useState([]);

    const fetchReportPipeline = async () => {
        try {
            const result = await leadAllPipeLine();
            const { success, message, error, data } = result;
            if (success) {
                setPipeLineData(data);
            } else if (!success) {
                handleError(message);
                setPipeLineData([]);
            } else {
                handleError(error);
                setPipeLineData([]);
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    useEffect(() => {
        fetchReportPipeline();
    }, []);

    const labels = pipelineData.map((item) => item._id);
    const counts = pipelineData.map((item) => item.totalLeadsCounts);

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
                label: "Leads Distribution",
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
    }

    return (
        <Layout>
            <Helmet>
         <title>Lead Report pipeline | CRM</title>
        <meta
          name="description"
          content={`Get all the lead info. Get the best Visual Representation.`}
        />
        <meta
          name="keywords"
          content={`Visual Representation, Report Pipeline, Bar-Chart-Graphs, All leads `}
        />
      </Helmet>
            <div className="container my-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Lead Pipeline Overview</h2>
                    <p className="text-muted">
                        Visual representation of leads across pipeline stages.
                    </p>
                </div>

                {/* Bar Chart */}
                <div className="shadow p-3 rounded bg-white mx-auto my-5" style={{ maxWidth: "800px", height: "400px" }}>
                    <Bar data={data} options={options} />
                </div>

                {/* Pipeline cards below chart */}
                <div className="row g-4 mt-5">
                    {pipelineData.map((curr, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <div className="card shadow-sm border-0 hover-shadow">
                                <div className="card-body text-center">
                                    <h5 className="fw-semibold">{curr._id}</h5>
                                    <h2 className="fw-bold text-primary">{curr.totalLeadsCounts}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </Layout>
    );
};
