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
import { useNavigation, useRoute ,RouteProp} from '@react-navigation/native';
import resetPasswordOtp from '../networking/resetPasswordOtp';

type ResetPasswordRouteParams= {
    Params:{
        token:string
    }
}

interface screenProps {
    navigate:(screen:string)=>void
}


const ResetPassword = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<screenProps>();
  const route = useRoute<RouteProp<ResetPasswordRouteParams, 'Params'>>();


  const { token } = route.params;

  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !resetPassword) {
      Alert.alert('Error', 'Both password fields are required.');
      return;
    }
  
    if (password !== resetPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await resetPasswordOtp(token, password);
      console.log(response, 'Password Reset Response');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password.');
    } finally {
      setLoading(false);
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
          {/* Logo */}
          <Image
            source={require('../assets/welcome-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={[styles.title, { color: theme.title }]}>Reset Password</Text>

          {/* New Password */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.title }]}>Password</Text>
            <View style={[styles.passwordContainer, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.passwordInput, { color: theme.inputText }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
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

          {/* Confirm Password */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.title }]}>Confirm Password</Text>
            <View style={[styles.passwordContainer, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.passwordInput, { color: theme.inputText }]}
                value={resetPassword}
                onChangeText={setResetPassword}
                secureTextEntry={!showResetPassword}
                placeholder="Confirm your password"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => setShowResetPassword(!showResetPassword)}>
                <Ionicons
                  name={showResetPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.button }]}
            onPress={handleReset}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.buttonText} />
            ) : (
              <Text style={[styles.loginText, { color: theme.buttonText }]}>SUBMIT</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

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
    fontFamily: 'Georgia',
    marginBottom: 40,
    textAlign: 'center',
  },
  field: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
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
});
