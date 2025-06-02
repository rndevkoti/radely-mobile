import axios from 'axios';
import { Alert } from 'react-native';
import { Asset } from 'react-native-image-picker';

const API_BASE_URL = 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com';

const handleUpload = async (asset: Asset, authToken: string) => {
  console.log('Auth token is ---->', authToken);

  if (!authToken) {
    console.error('Auth token is missing');
    return;
  }

  try {
    const fileUri = asset.uri;
    const extension = asset.fileName?.split('.').pop() || 'png';
    const mimeType = asset.type || `image/${extension}`;

    console.log('mimeType -->', mimeType);

    // Step 1: Get presigned URL and form fields
    const presignUrl = `${API_BASE_URL}/upload/presign?ext=${extension}`;
    console.log('Presign URL -->', presignUrl);

    const presignRes = await axios.get(presignUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('presignRes -->', presignRes);


    const presignData = presignRes.data?.data?.data;

    console.log('presignData -->', presignData);

    const uploadUrl = presignData?.url;
    console.log('uploadUrl -->', uploadUrl);

    const fields = presignData?.fields;

    if (!uploadUrl || !fields) {
      throw new Error('Missing upload URL or fields from presign response');
    }

    console.log('Upload URL -->', uploadUrl);
    console.log('Upload fields -->', fields);

    // Step 2: Prepare file + form data
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('file', {
      uri: fileUri!,
      name: asset.fileName || `upload.${extension}`,
      type: mimeType,
    });

    // Step 3: Upload to S3
    const uploadRes = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (uploadRes.status === 204 || uploadRes.ok) {
      const imageUrl = `${uploadUrl}${fields.key}`;
      Alert.alert('Upload Success', 'Profile photo updated.');
      console.log('Uploaded image URL:', imageUrl);
      return imageUrl;
    } else {
      throw new Error(`Failed to upload image. Status: ${uploadRes.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      console.error('Axios error code:', error.code);
      console.error('Axios error code:', error.response);
      console.error('Axios error code: asafsdf', error);

      

    } else {
      console.error('Unexpected error:', error);
    }
    Alert.alert('Upload Failed', 'Something went wrong while uploading.');
  }
};

export default handleUpload;
