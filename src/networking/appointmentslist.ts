import axios from 'axios';
import axiosInstance from './axios';
import { getAccessToken } from '../storage/signupStorage';


const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

export const getAllAppointments = async (status: string,type:string,doctorId:string,startDate:string,endDate:string,page: number,limit: number) => {
    console.log('search String --->', status);

    const apiURL = `${API_BASE_URL}/appointments`;
    console.log('api url -->', apiURL);

    const token = await getAccessToken();

    console.log('tokent -->', token);
    // Set the query parameters
    const params = {
        status: status.toString(),
        type:type.toString(),
        doctorId:doctorId.toString(),
        startDate:startDate.toString(),
        endDate:endDate.toString(),
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
            console.error('Appointments API error:', error.response?.data || error.message);
            throw error.response?.data || { message: error.message };
        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};