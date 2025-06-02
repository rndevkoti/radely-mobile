import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
 import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme/ThemeContext';
import { windowHeight } from '../../utils/heightWidth';
import { useProfile } from '../../context/ProfileContext';
import { BOTTOM_TAB } from '../../appconstants';

const HealthComplete = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
 
  const handleBack = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    navigation.navigate(BOTTOM_TAB);
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
                        source={require('../../assets/health_questions.png')}
                        style={styles.icon}
          />
          <View style={styles.progressContent}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>{t('health_questions')}</Text>
              <Text style={styles.percent}>100%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={['#A0E1B8', '#6AC3A1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: '100%' }]}
              />
            </View>
          </View>
        </View>

        <Text style={styles.stepText}>{t('step', { current: 13, total: 13 })}</Text>

        <View style={styles.card}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.completeTitle}>{t('health_profile_complete') || 'Health Profile Complete'}</Text>
          <Text style={styles.description}>
            {t('health_profile_description') ||
              'Thank you for sharing your health information. This helps us provide better care for you.'}
          </Text>
          <Text style={styles.subDescription}>
            {t('health_profile_saved') ||
              "Your responses have been securely saved. Based on your answers, we'll prepare personalized recommendations for your next consultation."}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backText}>{t('back')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneText}>{t('done_go_dashboard')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    height: windowHeight
  },
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  progressContent: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#fff',
    fontSize: 14,
  },
  percent: {
    color: '#fff',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#ffffff50',
    borderRadius: 5,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 10,
    borderRadius: 5,
  },
  stepText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
  },
  checkCircle: {
    backgroundColor: '#A0E1B8',
    borderRadius: 40,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkMark: {
    fontSize: 30,
    color: '#213732',
    fontWeight: 'bold',
  },
  completeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  subDescription: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  backButton: {
    backgroundColor: '#D8DED9',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 12, // spacing between buttons
  },
  doneButton: {
    backgroundColor: '#213732',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
  },  
  backText: {
    color: '#4D2C91',
    fontWeight: 'bold',
    fontSize: 16,
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HealthComplete;
