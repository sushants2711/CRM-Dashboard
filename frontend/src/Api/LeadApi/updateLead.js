export const updateLead = async (id, data) => {
    try {
        // const url = `http://localhost:7060/api/v1/lead/update/${id}`;
         const url = `https://crm-dashboard-backend.onrender.com/api/v1/lead/update/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}