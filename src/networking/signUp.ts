import axios from 'axios';
import axiosInstance from './axios';
 
export interface SignUpPayload {
    first_name: string;
    last_name: string;
    email: string;
    country_code: string;
    phone_number: string;
    token: string;
    password: string;
    role: string;
    address: string;
    city: string;
    state: string;
    profile_picture_key?: string;
  
    patient_profile: {
      date_of_birth: string;
      preferred_pronoun: string;
      data_sharing_consent: boolean;
      preferred_language: string;
      education_level: string;
      occupation: string;
      marital_status: string;
      emergency_contact_name: string;
      emergency_contact_phone: string;
      emergency_contact_relationship: string;
    };
  }
  

const signUp = async (payload: SignUpPayload) => {
 
    console.log('payload --->',payload);


    try {
        const response = await axiosInstance.post('auth/signup', payload);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const messages = error?.response?.data?.message;

            console.error('Sign up API error:', messages);
 
            throw messages || { message: error.message };

        } else {
            console.error('Unexpected error:', error);
            throw { message: 'Unexpected error occurred' };
        }
    }
};

export default signUp;
