import AsyncStorage from '@react-native-async-storage/async-storage';

const SIGNUP_RESPONSE_KEY = 'signupResponse';

interface SignupResponse {
  data: {
    data: {
      accessToken: string;
      access_token: string;
      refreshToken: string;
      [key: string]: any;
    };
    user: {
      id: string;
      email: string;
      phone_number: string;
      first_name: string;
      last_name: string;
      [key: string]: any;
    };
  };
  statusCode: number;
  timestamp: string;
}

/**
 * Stores the signup response in AsyncStorage
 */
export const storeSignupResponse = async (signupResponse: SignupResponse) => {
  try {
    await AsyncStorage.setItem(SIGNUP_RESPONSE_KEY, JSON.stringify(signupResponse));
    console.log('Signup response saved');
  } catch (error) {
    console.error('Error saving signup response:', error);
  }
};

/**
 * Retrieves the access token from stored signup response
 */
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const storedResponse = await AsyncStorage.getItem(SIGNUP_RESPONSE_KEY);
    console.log('storedResponse ->',storedResponse);
    if (storedResponse) {
      const parsed: SignupResponse = JSON.parse(storedResponse);

      console.log('parsed -->', parsed);
      console.log('parsed?.data?.data?.accessToken -->', parsed?.data?.data?.accessToken);
      console.log('parsed?.data?.data?.access_token -->', parsed?.data?.data?.access_token);

      return parsed?.data?.data?.accessToken !== undefined ? parsed?.data?.data?.accessToken : parsed?.data?.data?.access_token;
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
  return null;
};

export const getUserID = async (): Promise<string | null> => {
    try {
      const storedResponse = await AsyncStorage.getItem(SIGNUP_RESPONSE_KEY);
      if (storedResponse) {
        const parsed: SignupResponse = JSON.parse(storedResponse);
        return parsed?.data?.data?.user.id ?? null;
      }
    } catch (error) {
      console.error('Error retrieving User ID:', error);
    }
    return null;
  };
