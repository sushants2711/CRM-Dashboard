export const createComment = async (id, data) => {
    try {
        const url = `http://localhost:7060/api/v1/comment/add/${id}`;
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};