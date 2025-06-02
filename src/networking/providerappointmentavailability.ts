import axios from 'axios';
import axiosInstance from './axios';
import { getAccessToken } from '../storage/signupStorage';


const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

export const getProviderappointmentiavailabilitybyID = async (idString: string,startDate:string) => {
    console.log('ID String --->', idString);

    const apiURL = `${API_BASE_URL}/appointments/doctors/${idString}/availability`;
    console.log('api url -->', apiURL);

    const token = await getAccessToken();
const params = {
        startDate:startDate.toString(),
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
            console.error('getProviderappointmentiavailabilitybyID API error:', error.response?.data || error.message);
            throw error.response?.data || { message: error.message };
        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};
