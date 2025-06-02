import axios from 'axios';
import { getAccessToken } from '../storage/signupStorage';

const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

const deleteAppointment = async (appointmentId: string) => {
  const apiURL = `${API_BASE_URL}/appointments/${appointmentId}`;
  const token = await getAccessToken();

  try {
    const response = await axios.delete(apiURL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    console.log('delete response -->', response.status);
    return response.status === 204 ? 'Appointment deleted successfully' : response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('deleteAppointment API error:', error.response?.data || error.message);
      throw error.response?.data || { message: error.message };
    } else {
      console.error('Unexpected error:', error);
      throw { message: 'Unexpected error occurred' };
    }
  }
};

export default deleteAppointment;
