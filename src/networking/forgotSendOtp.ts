import axios from 'axios';
import axiosInstance from './axios';


const forgotSendOtp = async (country_code: string, phone_number: string) => {
    try {
        const response = await axiosInstance.post('auth/password/send-otp', {
            country_code,
            phone_number,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Send OTP API error:', error.response?.data || error.message);
            throw error.response?.data || { message: error.message };
        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};

export default forgotSendOtp;
