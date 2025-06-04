import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {customFonts} from '../theme/fonts';
import forgotSendOtp from '../networking/forgotSendOtp';


interface navigationProps {
    navigate:(screen:string,params?:{countryCode:string,mobile:string})=>void
}

const ForgotPassword = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const navigation = useNavigation<navigationProps>();

  const [countryCode, setCountryCode] = useState('+91');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const countryCodes = [
    {code: '+1', name: 'US'},
    {code: '+91', name: 'IN'},
    {code: '+44', name: 'UK'},
    {code: '+61', name: 'AU'},
  ];

  const handleForgot = async () => {
      Alert.alert('Validation Error', 'Mobile number is required.');

    if (!mobile.trim()) {
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      Alert.alert(
        'Validation Error',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }

    setLoading(true);

    try {
      const response = await forgotSendOtp(countryCode, mobile);
      Alert.alert('Success', 'OTP received successfully');
      console.log('OTP Response:', response);

      navigation.navigate('OtpLoginVerification', {
        countryCode,
        mobile,
      });
    } catch (error: any) {
      Alert.alert('OTP Failed', error.message || 'Something went wrong.');
      console.error('OTP Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}>
      <LinearGradient colors={theme.gradient} style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Image
            source={require('../assets/welcome-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={[styles.title, {color: theme.title}]}>
            Forgot Password
          </Text>
          <Text style={styles.subtitle}>
            Enter your Phone Number and we'll send you an OTP to verify your
            account.
          </Text>

          {/* Mobile Field */}
          <View style={styles.field}>
            <Text style={[styles.label, {color: theme.title}]}>
              Mobile Number
            </Text>
            <View
              style={[
                styles.phoneContainer,
                {backgroundColor: theme.inputBackground},
              ]}>
              <TouchableOpacity
                onPress={() => setShowCountryModal(true)}
                style={styles.countryCode}>
                <Text style={{color: theme.inputText}}>{countryCode}</Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={16}
                  color={theme.inputText}
                />
              </TouchableOpacity>
              <TextInput
                style={[styles.phoneInput, {color: theme.inputText}]}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                placeholder="Enter mobile number"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Country Code Modal */}
          {showCountryModal && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                {countryCodes.map(item => (
                  <TouchableOpacity
                    key={item.code}
                    style={styles.modalItem}
                    onPress={() => {
                      setCountryCode(item.code);
                      setShowCountryModal(false);
                    }}>
                    <Text
                      style={
                        styles.modalText
                      }>{`${item.name} (${item.code})`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Send Instructions Button */}
          <TouchableOpacity
            style={[styles.loginButton, {backgroundColor: theme.button}]}
            onPress={handleForgot}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color={theme.buttonText} />
            ) : (
              <Text style={[styles.loginText, {color: theme.buttonText}]}>
                Send Instructions
              </Text>
            )}
          </TouchableOpacity>

          {/* Back to Login */}
          <View style={styles.rememberPasswordContainer}>
            <Text style={[styles.label, {color: theme.title}]}>
              Remember Your Password?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.label, {color: 'black'}]}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    height: 800,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: customFonts.interRegular,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 26,
    color: '#525252',
    fontFamily: customFonts.interRegular,
  },
  field: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  phoneContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
  },
  rememberPasswordContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
