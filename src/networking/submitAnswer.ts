import axios from 'axios';
import { getAccessToken } from '../storage/signupStorage';

export const submitHealthResponses = async (responses: any[]) => {

    console.log('responses -->', responses);

    const baseUrl = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com/health-questionnaire';
    const token = await getAccessToken();

    const questionnaireRes = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });   
       const questionnaireData = await questionnaireRes.json();
       console.log('questionnaireData -->', questionnaireData);

    const questionnaireId = questionnaireData.data.data.id;
    console.log('questionnaireId -->', questionnaireId);


    
  const payload = {
    responses: responses.map(item => ({
      questionnaireId: questionnaireId,
      questionId: item.questionId,
      selectedOptionId: item.selectedoptionId,
      customResponse: item.customResponse ?? null
    }))
  };


  console.log('payload -->', payload);

  try {
    const submitRes = await fetch(`${baseUrl}/responses/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      console.log('submitRes submitted successfully:', submitRes);

      return submitRes;

  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Answer API error:', error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    } else {
        console.error('Unexpected error:', error);
        throw { message: 'Unexpected error occurred' };
    }    
  }
};
