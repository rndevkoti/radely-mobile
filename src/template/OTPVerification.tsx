import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { windowHeight, windowWidth } from '../utils/heightWidth';
import { useTheme } from '../theme/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import signUp, { SignUpPayload } from '../networking/signUp';
import verifyOTP from '../networking/verifyOTP';
import { Asset } from 'react-native-image-picker';
import { getAccessToken, storeSignupResponse } from '../storage/signupStorage';
import handleUpload from '../networking/uploadPhoto';
import { CONSENTSCREEN, QUESTIONSSCREEN } from '../appconstants';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const { profile } = useProfile();
  const { profileContinued } = useProfile();
  const { lastVisitedQuestionStep } = useProfile();
  const { setLastVisitedQuestionStep } = useProfile();



  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    console.log('Verifying OTP:', code);
    if (code.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP.');
      return;
    }

    if (!profile.countryCode || !profile.phone) {
      Alert.alert('Error', 'Missing country code or phone number.');
      return;
    }

    try {
      setLoading(true);
      // Step 1: Verify OTP
      const tokenData = await verifyOTP(profile.countryCode, profile.phone, code);


      console.log('tokenData -->', tokenData)

      console.log('Raw DOB:', profile.dob);

      console.log('profileContinued.language', profileContinued.language);

      const payload: SignUpPayload = {
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        country_code: profile.countryCode,
        phone_number: profile.phone,
        token: tokenData.data.data.token || '',
        password: profile.password,
        role: 'PATIENT',
        address: profileContinued.streetAddress,
        city: profileContinued.city,
        state: profileContinued.state,
        profile_picture_key: profileContinued.photo?.fileName 
          ? `profile/${profileContinued.photo.fileName}` 
          : undefined, // Optional chaining if photo is available
      
        patient_profile: {
          date_of_birth: typeof profile.dob === 'string' 
            ? new Date(profile.dob).toISOString() 
            : '',
          preferred_pronoun: profileContinued.pronouns,
          data_sharing_consent: true,
          preferred_language: profileContinued.language?.toUpperCase()!,
          education_level: profileContinued.education!,
          occupation: profileContinued.occupation,
          marital_status: profileContinued.maritalStatus,
          emergency_contact_name: profileContinued.emergencyContactName,
          emergency_contact_phone: profileContinued.emergencyContactPhone,
          emergency_contact_relationship: profileContinued.relationship,
        },
      };
      


      // Step 3: Validate fields
      for (const [key, value] of Object.entries(payload)) {
        if (!value && key !== 'profile_picture_key') {
          Alert.alert('Validation Error', `Missing value for: ${key.replace(/_/g, ' ')}`);
          setLoading(false);
          return;
        }
      }

      const signUpResponse = await signUp(payload);

      Alert.alert('Success', 'Signup completed successfully!');

      console.log('signUpResponse->', signUpResponse);
      storeSignupResponse(signUpResponse);


      // Step 5: Upload photo if available
      if (profileContinued.photo) {
        try {
          const token = await getAccessToken();

          await handleUpload(profileContinued.photo, token!);
        } catch (uploadErr) {
          console.warn('Profile photo upload failed:', uploadErr);
          Alert.alert('Signup Done', 'Signup succeeded, but photo upload failed. Please try again later.');
          // You can store `authToken` locally here if needed
        }
      }
      if (lastVisitedQuestionStep) {
        navigation.navigate(QUESTIONSSCREEN);
        setLastVisitedQuestionStep(0);

      } else {
        navigation.navigate(CONSENTSCREEN);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }


  };
 
  const handleResend = () => {
    console.log('Resend OTP code');
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Top Texts */}
      <View style={styles.headerContainer}>
        <Text style={[styles.heading, { color: theme.title }]}>OTP</Text>
        <Text style={[styles.subheading, { color: theme.title }]}>Verification</Text>
      </View>

      {/* Info Section */}
      <Text style={[styles.infoText, { color: '#fff' }]}>We've sent a verification code to</Text>
      <Text style={[styles.phoneNumber, { color: '#fff' }]}>+1 *** *** **98</Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[styles.otpInput, { backgroundColor: theme.button, color: theme.buttonText }]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
                inputs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>

      {/* Resend Section */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code?</Text>
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendLink}>Resend Code</Text>
        </TouchableOpacity>
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  headerContainer: {
    marginTop: 120,
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 28,
    fontFamily: 'Georgia',
  },
  subheading: {
    fontSize: 22,
    fontFamily: 'Georgia',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
    marginTop: 40,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.75,
    marginBottom: 30,
  },
  otpInput: {
    width: 55,
    height: 55,
    borderRadius: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  resendLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: '#fff',
    fontSize: 14,
  },
  verifyButton: {
    backgroundColor: '#1b2c2d',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 100,
  },
  verifyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OtpVerification;
