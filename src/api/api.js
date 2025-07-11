import axios from "axios";

export const getCountries = async () => { 
    try {
        const API_ENDPOINT = "https://restcountries.com/v3.1/all";
        
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response) {
            throw new Error('Network response was not ok');
        }
        return response;
    }
    catch(error){
        console.error("Error fetching countries:", error);
        throw error;
    }
}