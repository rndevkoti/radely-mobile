import axios from 'axios';
import { getAccessToken } from '../storage/signupStorage';

export interface UpdateAppointmentPayload {
  type: string;
  status: string;
  dateTime: string;
  duration: number;
  notes: string;
  reason: string;
  location: string;
  meetingUrl: string;
  roomName: string;
}

const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

const updateAppointment = async (
  appointmentId: string,
  payload: UpdateAppointmentPayload
) => {
  const apiURL = `${API_BASE_URL}/appointments/${appointmentId}`;
  const token = await getAccessToken();

  try {
    const response = await axios.put(apiURL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log('update response -->', response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('updateAppointment API error:', error.response?.data || error.message);
      throw error.response?.data || { message: error.message };
    } else {
      console.error('Unexpected error:', error);
      throw { message: 'Unexpected error occurred' };
    }
  }
};

export default updateAppointment;
