export const leadDetailsApi = async (id) => {
    try {
        const url = `http://localhost:7060/api/v1/lead/lead-detail/${id}`;
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