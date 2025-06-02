import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
 import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SELECTPROVIDER } from '../appconstants';

const { width } = Dimensions.get('window');

const ConsultationEmpty = ({  }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Consult');
  const navigation = useNavigation<any>();

  const handleSchedule = () => {
    // navigation.navigate('ScheduleConsultation');
            navigation.navigate(SELECTPROVIDER);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {['Chat', 'Call', 'Consult'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {t(`consultations.${tab.toLowerCase()}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={require('../assets/chat-bubble.png')} 
          style={styles.image}
        />

        <Text style={styles.title}>{t('consultations.noHistory')}</Text>
        <Text style={styles.subtitle}>
          {t('consultations.noHistorySubtitle')}
        </Text>

        {/* Schedule Button */}
        <TouchableOpacity onPress={handleSchedule} activeOpacity={0.8}>
          <LinearGradient
            colors={['#4DD4B0', '#2DB3A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Image
              source={require('../assets/stethoscope.png')} 
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {t('consultations.scheduleBtn')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConsultationEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#F1F3F5',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 6,
  },
  tabText: {
    color: '#8E8E93',
    fontSize: 15,
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 120,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  subtitle: {
    fontSize: 14,
    color: '#6C6C70',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    width: width - 48,
    height: 50,
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
