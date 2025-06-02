import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import createLogin from '../networking/login';
import { useNavigation } from '@react-navigation/native';
import { BOTTOM_TAB } from '../appconstants';
import { storeSignupResponse } from '../storage/signupStorage';
 
const Login = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [countryCode, setCountryCode] = useState('+91');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [mobile, setMobile] = useState('8648636296');
  const [password, setPassword] = useState('Test@12345');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const countryCodes = [
    { code: '+1', name: 'US' },
    { code: '+91', name: 'IN' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'AU' },
  ];

  const handleLogin = async () => {
    if (!mobile.trim()) {
      Alert.alert('Validation Error', 'Mobile number is required.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Password is required.');
      return;
    }

    const payload = {
      country_code: countryCode,
      phone_number: mobile,
      password: password,
    };

    try {
      setLoading(true);
      const result = await createLogin(payload);
      setLoading(false);

      Alert.alert('Success', 'Login successful!');

      console.log('signUpResponse->', result);
      storeSignupResponse(result);

      navigation.navigate(BOTTOM_TAB);
      
    } catch (error) {
      setLoading(false);
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.flex}
  >
    <LinearGradient colors={theme.gradient} style={styles.flex}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
          <Image
            source={require('../assets/welcome-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={[styles.title, { color: theme.title }]}>Login</Text>

          {/* Mobile Field */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.title }]}>Mobile Number</Text>
            <View
              style={[styles.phoneContainer, { backgroundColor: theme.inputBackground }]}
            >
              <TouchableOpacity
                onPress={() => setShowCountryModal(true)}
                style={styles.countryCode}
              >
                <Text style={{ color: theme.inputText }}>{countryCode}</Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={16}
                  color={theme.inputText}
                />
              </TouchableOpacity>
              <TextInput
                style={[styles.phoneInput, { color: theme.inputText }]}
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
                {countryCodes.map((item) => (
                  <TouchableOpacity
                    key={item.code}
                    style={styles.modalItem}
                    onPress={() => {
                      setCountryCode(item.code);
                      setShowCountryModal(false);
                    }}
                  >
                    <Text style={styles.modalText}>{`${item.name} (${item.code})`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Password Field */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.title }]}>Password</Text>
            <View
              style={[styles.passwordContainer, { backgroundColor: theme.inputBackground }]}
            >
              <TextInput
                style={[styles.passwordInput, { color: theme.inputText }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter password"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.button }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.buttonText} />
            ) : (
              <Text style={[styles.loginText, { color: theme.buttonText }]}>Login</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  title: {
    fontSize: 30,
    fontFamily: 'Georgia',
    marginBottom: 40,
    textAlign: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    alignSelf: 'center',
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
  passwordContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  passwordInput: {
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
});
