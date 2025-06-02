import axios from 'axios';
import axiosInstance from './axios';
import { getAccessToken } from '../storage/signupStorage';


const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';
//const API_BASE_URL = 'http://radley-api.axiongstaging.com/v2';

const questions = async () => {
    const apiURL = `${API_BASE_URL}/health-questionnaire`;
    console.log('api url -->', apiURL);
      const token = await getAccessToken();

      console.log('token', token);

    try {
        const response = await axios.post(
            apiURL,
            {}, // POST body — use `{}` if none
            {
                headers: {
                    Authorization: `Bearer ${token}`, // often needs Bearer prefix
                },
            }
        );
          console.log('response -->', response);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Question API error:', error.response?.data || error.message);
            throw error.response?.data || { message: error.message };
        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};
export const getAllQuestions = async (idString: string) => {
    console.log('ID String --->', idString);

    const apiURL = `${API_BASE_URL}/health-questionnaire/questions/all?id=${idString}`;
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
            console.error('Question API error:', error.response?.data || error.message);
            throw error.response?.data || { message: error.message };
        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};



export default questions;
