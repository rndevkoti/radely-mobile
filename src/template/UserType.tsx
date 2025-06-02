import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/heightWidth';
import { useTheme } from '../theme/ThemeContext';

const { height, width } = Dimensions.get('window');

const UserType = ({ onContinue, step }: { onContinue: () => void; step: number }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedUserType, setSelectedUserType] = useState<'patient' | 'advisor' | null>(null);

  return (
    <View style={styles.wrapper}>
      <LinearGradient colors={theme.gradient} style={styles.gradient}>
        <Image
          source={require('../assets/welcome_bottom_background.png')}
          style={styles.bottomBackground}
          resizeMode="stretch"
        />
        <View style={styles.container}>
          <Text style={[styles.heading, { color: theme.title }]}>
            {t('user_type.heading')}
          </Text>

          {/* Patient Option */}
          <TouchableOpacity
            style={[
              styles.option,
              { backgroundColor: selectedUserType === 'patient' ? theme.cardBackground : theme.inputBackground },
            ]}
            onPress={() => setSelectedUserType('patient')}
          >
            <Image
              source={require('../assets/profile_typeofuser.png')}
              style={styles.icon}
            />
            <View>
              <Text style={[styles.optionTitle, { color: theme.cardTitle }]}>
                {t('user_type.patient_title')}
              </Text>
              <Text style={[styles.optionSubtitle, { color: theme.cardText }]}>
                {t('user_type.patient_subtitle')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Advisor Option */}
          <TouchableOpacity
            style={[
              styles.option,
              { backgroundColor: selectedUserType === 'advisor' ? theme.cardBackground : theme.inputBackground },
            ]}
            onPress={() => setSelectedUserType('advisor')}
          >
            <Image
              source={require('../assets/profile_type_docotr.png')}
              style={styles.icon}
            />
            <View>
              <Text style={[styles.optionTitle, { color: theme.cardTitle }]}>
                {t('user_type.advisor_title')}
              </Text>
              <Text style={[styles.optionSubtitle, { color: theme.cardText }]}>
                {t('user_type.advisor_subtitle')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor: theme.button,
                opacity: !selectedUserType ? 0.5 : 1,
              },
            ]}
            onPress={onContinue}
            disabled={!selectedUserType}
          >
            <Text style={[styles.continueText, { color: theme.buttonText }]}>
              {t('common.continue')}
            </Text>
          </TouchableOpacity>

          {/* Page Indicators */}
          <View style={styles.pageControl}>
            {[0, 1, 2, 3].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      step === index ? theme.dotActive : theme.dotInActive,
                    opacity: step === index ? 1 : theme.dotInactiveOpacity,
                    width: step === index ? 10 : 8,
                    height: step === index ? 10 : 8,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default UserType;

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
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Georgia',
    marginBottom: 40,
  },
  option: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 16,
    resizeMode: 'contain',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionSubtitle: {
    fontSize: 13,
  },
  continueButton: {
    marginTop: 150,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  continueText: {
    fontWeight: '600',
    fontSize: 16,
  },
  pageControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
