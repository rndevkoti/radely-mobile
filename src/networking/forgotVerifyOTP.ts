import axios from 'axios';
import axiosInstance from './axios';

const forgotVerifyOTP = async (country_code: string, phone_number: string, otp: string) => {
    try {
        const response = await axiosInstance.post('auth/password/verify-otp', {
            country_code,
            phone_number,
            otp,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Verify OTP API error:', error.response?.data || error.message);
            throw error.response?.data || { message: error.message };
        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};

export default forgotVerifyOTP;
