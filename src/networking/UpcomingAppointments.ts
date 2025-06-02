import axios from 'axios';
import axiosInstance from './axios';
import { getAccessToken } from '../storage/signupStorage';


const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

export const getUpcomingAppointments = async () => {
    const apiURL = `${API_BASE_URL}/appointments/upcoming`;
    console.log('api url -->', apiURL);

    const token = await getAccessToken();

    try {
        const response = await axios.get(apiURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('response -->', response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('getUpcomingAppointments API error:', error.response?.data || error.message);
            throw error.response?.data || { message: error.message };
        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};
export default getUpcomingAppointments;