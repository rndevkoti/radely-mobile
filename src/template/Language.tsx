import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/heightWidth';
import { useNavigation } from '@react-navigation/native';
import { WELCOME } from '../appconstants';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';

const Language = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const { theme, setAppLanguage } = useTheme();

  const changeLanguage = async (lang: 'en' | 'es') => {
    await setAppLanguage(lang);
    i18n.changeLanguage(lang);
    navigation.reset({
      index: 0,
      routes: [{ name: WELCOME }],
    });
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          <Image
            source={require('../assets/welcome-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={[styles.title, { color: theme.title }]}>Quilt</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    i18n.language === 'en'
                      ? theme.selectionButton
                      : theme.deSelectionButton,
                },
              ]}
              onPress={() => changeLanguage('en')}
            >
              <Image
                source={require('../assets/bx_globe.png')}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.buttonTitle, { color:  i18n.language === 'en'
                      ? theme.selectionButtonText
                      : theme.deSelectionButtonText, }]}>
                  Proceed in English
                </Text>
                <Text
                  style={[styles.buttonSubtitle, { color: theme.selectionButtonSubtitle }]}
                >
                  Get personalized health guidance
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
               style={[
                styles.button,
                {
                  backgroundColor:
                    i18n.language === 'es'
                      ? theme.selectionButton
                      : theme.deSelectionButton,
                },
              ]}
              onPress={() => changeLanguage('es')}
            >
              <Image
                source={require('../assets/bx_globe_black.png')}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.buttonTitle, { color: theme.deSelectionButtonText }]}>
                  Proceder en Español
                </Text>
                <Text
                  style={[styles.buttonSubtitle, { color: theme.selectionButtonSubtitle }]}
                >
                  Get personalized health guidance
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.footer, { color: theme.title }]}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Language;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    height: windowHeight,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  textContainer: {
    marginLeft: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSubtitle: {
    fontSize: 13,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    padding: 20,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
