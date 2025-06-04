import axios from 'axios';
import axiosInstance from './axios';


const resetPasswordOtp = async (token: string, newPassword: string) => {
    try {
        const response = await axiosInstance.post('auth/password/reset', {
            token,
            newPassword   });
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

export default resetPasswordOtp;
