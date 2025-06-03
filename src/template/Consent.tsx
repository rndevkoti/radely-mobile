import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/heightWidth';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MEDICALRECORDSCREEN, MYCONSENTSCREEN, ONBOARDINGSCREEN } from '../appconstants';
 
const Consent = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [collect, setCollect] = useState(false);
  const [share, setShare] = useState(false);
  const navigation = useNavigation<any>();

  const allConsented = collect && share;

  // const onClickContinue= () => {
  //   console.log('click continue');
  //   navigation.navigate(ONBOARDINGSCREEN);
  // }

  const onClickContinue= () => {
    console.log('click continue');
    navigation.navigate(MYCONSENTSCREEN);
  }

  return (
    <LinearGradient
      colors={theme.gradient}
      style={styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {/* Back Icon */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.title }]}>
          {t('consent.title')}
        </Text>
        <Text style={[styles.subtitle, { color: theme.subtitle }]}>
          {t('consent.subtitle')}
        </Text>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.title }]}>
            {t('consent.data_collection.title')}
          </Text>
          <Text style={[styles.cardText, { color: theme.title }]}>
            {t('consent.data_collection.description')}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={[styles.link, { color: theme.link }]}>
              {t('consent.more_info')}
            </Text>
            <Switch value={collect} onValueChange={setCollect} />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.title }]}>
            {t('consent.data_sharing.title')}
          </Text>
          <Text style={[styles.cardText, { color: theme.title }]}>
            {t('consent.data_sharing.description')}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={[styles.link, { color: theme.link }]}>
              {t('consent.more_info')}
            </Text>
            <Switch value={share} onValueChange={setShare} />
          </View>
        </View>

        {!allConsented && (
          <Text style={[styles.alert, { color: theme.title }]}>
            {t('consent.consent_required')}
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.button },
            !allConsented && styles.disabled,
          ]}
          disabled={!allConsented}
          onPress={onClickContinue}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            {t('consent.continue_cta')}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.footerNote, { color: theme.subtitle }]}>
          {t('consent.withdraw_note')}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20, height: windowHeight },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Georgia',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  link: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  alert: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 90,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  footerNote: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Consent;
