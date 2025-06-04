import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute,RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../utils/heightWidth';
import {useTheme} from '../theme/ThemeContext';
import {useProfile} from '../context/ProfileContext';
import forgotVerifyOTP from '../networking/forgotVerifyOTP';



type ResetPasswordRouteParams = {
  ResetPassword: {
    countryCode: string;
    mobile: string;
  };
};



const OtpVerifyLogin = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<any>([]);
  const navigation = useNavigation<any>();
  const {theme} = useTheme();
  const {profile} = useProfile();
  const [loading, setLoading] = useState<boolean>(false);



  

  const route = useRoute<RouteProp<ResetPasswordRouteParams, 'ResetPassword'>>();
  const {countryCode, mobile}= route?.params;

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const verifyOtpHandle = async () => {
    const code = otp.join('');
    if (code.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP.');
      return;
    }

    if (!countryCode || !mobile) {
      Alert.alert('Error', 'Missing country code or phone number.');
      return;
    }

    try {
      setLoading(true);
      const tokenData = await forgotVerifyOTP(countryCode, mobile, code);
      const token = tokenData.data?.data?.token;
      navigation.navigate('Reset', {token});
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Top Texts */}
      <View style={styles.headerContainer}>
        <Text style={[styles.heading, {color: theme.title}]}>OTP</Text>
        <Text style={[styles.subheading, {color: theme.title}]}>
          Verification
        </Text>
      </View>

      {/* Info Section */}
      <Text style={[styles.infoText, {color: '#fff'}]}>
        We've sent a verification code to
      </Text>
      <Text style={[styles.phoneNumber, {color: '#fff'}]}>+1 *** *** **98</Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref: TextInput | null) => {
              inputs.current[index] = ref;
            }}
            style={[
              styles.otpInput,
              {
                backgroundColor: theme.button,
                color: theme.buttonText,
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({nativeEvent}) => {
              if (
                nativeEvent.key === 'Backspace' &&
                otp[index] === '' &&
                index > 0
              ) {
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
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={verifyOtpHandle}
        disabled={loading}>
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
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 4,
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

export default OtpVerifyLogin;
