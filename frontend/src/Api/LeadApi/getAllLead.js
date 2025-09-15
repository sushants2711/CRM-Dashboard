export const getAllleadDashboard = async (status) => {
    try {
        let url = `http://localhost:7060/api/v1/lead/get`;

        if(status) {
            url = `http://localhost:7060/api/v1/lead/get?status=${status}`;
        }

        console.log(url);

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};



// getAllLead.js
export const getAlllead = async (filters = {}) => {
  try {
    let url = `http://localhost:7060/api/v1/lead/get`;

    // Convert filters object to query string dynamically
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value); // only append non-empty values
    });

    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
console.log(url)
    return await response.json();
  } catch (error) {
    // console.error("Error fetching leads:", error);
    // return { success: false, message: error.message };
    throw new Error(error.message);
  };
};
