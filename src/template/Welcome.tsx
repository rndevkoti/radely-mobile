import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { QUESTIONSSCREEN, USER_TYPE,LOGIN } from '../appconstants';
import { windowHeight } from '../utils/heightWidth';
import { useTheme } from '../theme/ThemeContext';

const { height, width } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const onTapSignUp = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: USER_TYPE }],
    });
  };

  const onTapLogin = () => {
     navigation.reset({
       index: 0,
       routes: [{ name: LOGIN }],
     });
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient colors={theme.gradient} style={styles.gradient}>
        <Image
          source={require('../assets/welcome_bottom_background.png')}
          style={styles.bottomBackground}
          resizeMode="stretch"
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            source={require('../assets/welcome-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={[styles.welcomeText, { color: theme.title }]}>{t('welcome_to')}</Text>
          <Text style={[styles.quiltTitle, { color: theme.title }]}>{t('quilt_health')}</Text>

          <Text style={[styles.tagline, { color: theme.title }]}>
            {t('tagline')}{' '}
            <Text style={[styles.highlight, { color: theme.link }]}>
              {t('tagline_highlight')}
            </Text>
          </Text>

          <Text style={[styles.description, { color: theme.subtitle }]}>
            {t('description')}
          </Text>

          <TouchableOpacity
            style={[styles.signUpButton, { backgroundColor: theme.button }]}
            onPress={onTapSignUp}
          >
            <Text style={[styles.signUpText, { color: theme.buttonText }]}>
              {t('sign_up')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.inputBackground }]}
            onPress={onTapLogin}
          >
            <Text style={[styles.loginText, { color: theme.inputText }]}>
              {t('log_in')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    height: windowHeight,
  },
  bottomBackground: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.3,
    zIndex: -1,
  },
  gradient: {
    flex: 1,
    zIndex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'Georgia',
  },
  quiltTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  tagline: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 20,
  },
  highlight: {
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 40,
  },
  signUpButton: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpText: {
    fontWeight: '600',
    fontSize: 16,
  },
  loginButton: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
