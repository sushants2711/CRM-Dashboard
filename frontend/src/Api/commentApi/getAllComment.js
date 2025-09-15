export const getAllComment = async (id) => {
    try {
        // const url = `http://localhost:7060/api/v1/comment/get/${id}`;
        const url = `https://crm-dashboard-backend.onrender.com/api/v1/comment/get/${id}`;
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}