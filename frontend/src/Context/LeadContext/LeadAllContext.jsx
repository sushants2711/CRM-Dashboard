import React, { createContext, useContext, useState } from 'react'
import { getAllleadDashboard } from '../../Api/LeadApi/getAllLead';
import { handleSuccess } from '../../toastMessage/successMessage/success.message';
import { handleError } from '../../toastMessage/errorMessage/error.message';

export const LeadAllContext = createContext();

export const allLeadContext = () => useContext(LeadAllContext);

export const LeadContextProvider = ({ children }) => {

    const [displayData, setDisplayData] = useState([]);
    const [displayError, setDisplayError] = useState(null);

    const fetchAlwaysLead = async (status) => {
        try {
            let result = "";

            if (status) {
                result = await getAllleadDashboard(status)
            }
            else {
                result = await getAllleadDashboard();
            }

            // console.log(result)

            const { success, message, error, data } = result;

            if (success) {
                // handleSuccess(message);
                setDisplayData(data);
            }
            else if (!success) {
                // handleError(message)
                setDisplayData([])
            }
            else {
                // handleError(error)
                setDisplayData([])
            };
        }
        catch (error) {
            setDisplayError(error.message);
        };
    };

    return (
        <LeadAllContext.Provider value={{ displayData, displayError, fetchAlwaysLead }}>
            {children}
        </LeadAllContext.Provider>
    )
}