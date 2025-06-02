import axios from 'axios';
import axiosInstance from './axios';
import { getAccessToken } from '../storage/signupStorage';


const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

export const getAllProviders = async (searchString: string,page: number,limit: number) => {
    console.log('search String --->', searchString);

    const apiURL = `${API_BASE_URL}/doctors/search/`;
    console.log('api url -->', apiURL);

    const token = await getAccessToken();
    // Set the query parameters
    const params = {
        searchString: searchString.toString(),
        page: page.toString(),
        limit:limit.toString(),
    };

    try {
        const response = await axios.get(apiURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params
        });
        console.log('response -->', response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Providers API error:', error.response?.data || error.message);
            throw error.response?.data || { message: error.message };
        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};