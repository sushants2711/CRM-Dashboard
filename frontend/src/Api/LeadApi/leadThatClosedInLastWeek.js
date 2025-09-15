export const leadThatAreClosedInLastWeek = async () => {
    try {
        // const url = "http://localhost:7060/api/v1/lead/report/last-week";
        const url = `https://crm-dashboard-backend.onrender.com/api/v1/lead/report/last-week`;
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