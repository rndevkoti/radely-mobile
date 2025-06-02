import axios from 'axios';
import { getAccessToken } from '../storage/signupStorage';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
 
export interface loginPayload {
  country_code: string;
  phone_number: string;
  password: string;
}

const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

const createLogin = async (payload: loginPayload) => {
  const apiURL = `${API_BASE_URL}/auth/login`;  
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
      console.error('createLogin API error:', error.response?.data || error.message);
      throw error.response?.data || { message: error.message };
    } else {
      console.error('Unexpected error:', error);
      throw { message: 'Unexpected error occurred' };
    }
  }
};

export default createLogin;
