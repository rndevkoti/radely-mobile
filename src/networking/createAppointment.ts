import axios from 'axios';
import { getAccessToken } from '../storage/signupStorage';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
 
export interface AppointmentPayload {
  doctorId: string;
  type: string;
  dateTime: string;
  duration: Double;
  notes: string;
  reason: string;
  location: string;
  followUp: boolean;
  isRecurring: boolean;
  recurringPattern: string;
}

const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

const createAppointment = async (payload: AppointmentPayload) => {
  const apiURL = `${API_BASE_URL}/appointments`;  
  const token = await getAccessToken();

  console.log('apiURL -->', apiURL);
  console.log('token -->', token);


  try {
    const response = await axios.post(apiURL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('response -->', response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('createAppointment API error:', error.response?.data || error.message);
      throw error.response?.data || { message: error.message };
    } else {
      console.error('Unexpected error:', error);
      throw { message: 'Unexpected error occurred' };
    }
  }
};

export default createAppointment;
