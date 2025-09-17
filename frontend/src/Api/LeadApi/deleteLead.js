export const deleteLead = async (id) => {
    try {
        // const url = `http://localhost:7060/api/v1/lead/delete/${id}`;
        const url = `https://crm-dashboard-backend.onrender.com/api/v1/lead/delete/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}