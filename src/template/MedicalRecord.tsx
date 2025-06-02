import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { BlurView } from '@react-native-community/blur';
import { HEALTHONBOARDINGSCREEN } from '../appconstants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { windowHeight, windowWidth } from '../utils/heightWidth';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

export default function MedicalRecord({ }: any) {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  return (
    <ImageBackground
      source={require('../assets/welcome-bg.png')}
      style={styles.background}
    >

      <BlurView
        style={StyleSheet.absoluteFill}
        blurAmount={6}
        blurType="light"
        reducedTransparencyFallbackColor="transparent"
      />
      <LinearGradient
        colors={['rgba(99,134,149,0.8)', 'rgba(100,171,134,0.7)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.card}>
        <Ionicons name="medical" size={32} color="#3DA18D" />

        <Text style={styles.title}>
          {t('medicalRecords.title', 'Medical Records')}
        </Text>
        <Text style={styles.subtitle}>
          {t('medicalRecords.subtitle', 'First, let\'s import your existing medical history')}
        </Text>

        <Pressable style={styles.button} onPress={() => navigation.navigate(HEALTHONBOARDINGSCREEN)}>
          <Text style={styles.buttonText}>
            {t('common.begin', 'Begin')}
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: windowWidth / 1.1,
    alignSelf: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 12,
    fontFamily: 'serif',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#4449',
    fontWeight: '600',
    fontSize: 16,
  },
});
