export const gertAllSalesAgentDataClosed = async () => {
    try {
        // const url = "http://localhost:7060/api/v1/lead/report/closed-by-agent";
        const url = "https://crm-dashboard-backend.onrender.com/api/v1/lead/report/closed-by-agent";
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};