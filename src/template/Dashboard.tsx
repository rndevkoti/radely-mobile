import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { screenWidth, windowWidth } from '../utils/heightWidth';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ChecklistItem } from './ChecklistCard';
import { useNavigation } from '@react-navigation/native';
import { HEALTHONBOARDINGSCREEN, MEDICALRECORDSCREEN } from '../appconstants';

const Dashboard = () => {
  const categories = [
    { label: 'consultation', icon: 'person' },
    { label: 'supplements', icon: 'medication' },
    { label: 'labs', icon: 'science' },
  ];
  const { theme } = useTheme();
  const { t } = useTranslation(); 
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
   
      <LinearGradient colors={theme.gradient} style={styles.header}>
        <View style={styles.topBar}>
         
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/profilePic.png')}
              style={styles.profileImage}
            />
            <Text style={styles.welcomeText}>
              {t('welcomeBack')}, {'\n'}
              <Text style={{ fontWeight: 'bold' }}>Abril</Text>
            </Text>
          </View>
          <View style={styles.aiContainer}>
            <Image
              source={require('../assets/aiIcon.png')}
              style={styles.askIcon}
            />
            <Text style={styles.askText}>
              {t('ask')}
              {'\n'}
              <Text style={{ fontWeight: 'bold' }}>QuiltAI</Text>
            </Text>
          </View>
        
          <View style={styles.notificationContainer}>
            <Image
              source={require('../assets/bell.png')}
              style={styles.bellIcon}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>99+</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>{t('yourDoctorInTheFamily')}</Text>
        <Text style={styles.subtitle}>{t('consultWithDoctors')}</Text>
        <View style={{ alignContent: 'center', alignSelf: 'center' }}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#999" />
            <TextInput
              placeholder={t('searchPlaceholder')}
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((cat, i) => (
          <TouchableOpacity key={i} style={styles.categoryCard}>
            <View style={styles.iconWrapper}>
              <Icon name={cat.icon} size={26} color="#3C8CE7" />
            </View>
            <Text style={styles.categoryText}>{t(cat.label)}</Text> 
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('upcomingSchedule')}</Text>
          <Text style={styles.sectionTitleRight}>{t('viewAll')}</Text>
        </View>
        <View style={styles.scheduleSection}>
          <View style={styles.scheduleHeaderRow}>
            <View style={styles.scheduleHeaderTitle}>
              <View style={styles.greyIconWrapper}>
                <Icon name="calendar-month" size={18} color="#000000" />
              </View>              
              <Text style={styles.scheduleTitle}>{t('meetAndConsult')}</Text>
            </View>
            <View style={styles.upcomingBadge}>
              <Text style={styles.upcomingText}>{t('upcoming')}</Text>
            </View>
          </View>

          <View style={styles.scheduleBody}>
            <Image
              source={require('../assets/dr_johnson.png')}
              style={styles.doctorImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.doctorName}>{t('drJohnson')}</Text>
              <Text style={styles.doctorSubtitle}>{t('yourHealthAdvisor')}</Text>
              <Text style={styles.scheduleTime}>April 05, 2025 | 9:00 AM</Text>
              <View style={styles.detailRow}>
                <View style={styles.whiteIconWrapper}>
                  <Icon name="calendar-today" size={16} color="#000" />
                </View>      
                <View style={styles.whiteIconWrapper}>
                  <Text style={styles.viewDetail}>{t('viewDetail')}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('healthChecklist')}</Text>
          <View style={styles.todoBadge}>
            <Text style={styles.todoText}>3 {t('toDo')}</Text>
          </View>
        </View>

        <ChecklistItem
          icon="calendar"
          title={t('completeHealthQuestionnaire')}
          subtitle={t('requiredForCarePlan')}
          buttonText={t('start')}
          buttonColor="#111"
          iconBackground="#FEC84B"
          onPress={() => {
            console.log("Exercise started!");
            // navigation.navigate(MEDICALRECORDSCREEN);
            navigation.navigate(HEALTHONBOARDINGSCREEN)}
           }
        />
        <View style={styles.divider} />
        <ChecklistItem
          icon="fitness-center"
          title={t('orderBloodTestKit')}
          subtitle={t('requiredBeforeConsultation')}
          buttonText={t('order')}
          buttonColor="#F04438"
          iconBackground="#FEE4E2"
          onPress={() => {
            console.log("Exercise started!");
           }}
        />
        <View style={styles.divider} />
        <ChecklistItem
          icon="insert-drive-file"
          title={t('uploadMedicalRecords')}
          subtitle={t('addPreviousHealthDocs')}
          buttonText={t('upload')}
          buttonColor="#F5F5F5"
          iconBackground="#DCF0E2"
          onPress={() => {
            console.log("Exercise started!");
           }}
        />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{t('recentActivity')}</Text>
        <TouchableOpacity style={styles.activityRow}>
          <View style={styles.iconBubble}>
            <Icon name="message-circle" size={20} color="#2970FF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.activityTitle}>{t('messageFromDrJohnson')}</Text>
            <Text style={styles.activitySubtitle}>15 {t('minutesAgo')}</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#98A2B3" />
        </TouchableOpacity>
      </View>

      <View style={styles.sleepCard}>
        <Text style={styles.sectionTitle}>{t('sleep')}</Text>
        <View style={styles.sleepSummaryContainer}>
          <Text style={styles.weeklyAvgText}>{t('weeklyAvg')}: 7.3 hrs</Text>
          <Text style={styles.sleepQualityText}>{t('quality')}: 82%</Text>
        </View>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [
              {
                data: [7.1, 6.5, 7.8, 8.1, 6.7, 7.2],
                color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth - 64}
          height={220}
          yAxisSuffix="h"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#6C63FF',
            },
          }}
          bezier
          style={styles.chartStyle}
        />
        <View style={styles.sleepStats}>
          <View style={styles.sleepStatItemDeep}>
            <Text style={styles.sleepStatLabel}>{t('deepSleep')}</Text>
            <Text style={styles.sleepStatValue}>1.8 hrs</Text>
          </View>
          <View style={styles.sleepStatItemRem}>
            <Text style={styles.sleepStatLabel}>{t('remSleep')}</Text>
            <Text style={styles.sleepStatValue}>2.3 hrs</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 80 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 0, 
    backgroundColor: '#F7F8FA' 
  },
  header: {
    padding: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A2B9BE',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  aiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A2B9BE',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: '#F7F8FA',
    borderWidth: 1,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 18,
  },
  askIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  askText: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 18,
  },
  notificationContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A2B9BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF5E7D',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop: 20, 
    textAlign: 'center' 
  },
  subtitle: { 
    color: '#fff', 
    fontSize: 14, 
    marginTop: 15, 
    textAlign: 'center', 
    width: windowWidth - 30 
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 20,
    width: windowWidth / 1.2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#333',
  },
  categories: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  categoryCard: {
    backgroundColor: '#EDF1F5',
    padding: 6,
    borderRadius: 28,
    marginRight: 12,
    alignItems: 'center',
    width: 160,
    height: 60,
    flexDirection: 'row',
  },
  categoryText: {
    paddingLeft: 10,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#9FA1A4',
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  sectionCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  sectionTitleRight: {
    fontSize: 12,
    color: '#9FA1A4',
  },
  greyIconWrapper: {
    backgroundColor: '#E0E0E0',
    padding: 6,
    borderRadius: 6,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleTitle: {
    fontSize: 12,
    color: '#555',
  },
  upcomingBadge: {
    backgroundColor: '#FFF3E1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  upcomingText: {
    color: '#FF9E2C',
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleSection: {
    backgroundColor: '#fff',
    borderColor: '#EEE',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  scheduleHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  doctorImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  doctorSubtitle: {
    fontSize: 14,
    color: '#777',
    marginVertical: 2,
  },
  scheduleTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  whiteIconWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  viewDetail: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 6,
    width: 140,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginVertical: 10,
  },
  todoBadge: {
    backgroundColor: '#111',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  todoText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  iconWrapper: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 4,
    marginRight: 8,
  },
  activityRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  iconBubble: {
    backgroundColor: '#E5EDFB',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  activityTitle: {
    fontWeight: '500',
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#888',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  /* Sleep section styles */
  sleepCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sleepSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weeklyAvgText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  sleepQualityText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  sleepStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sleepStatItemDeep: {
    flex: 1,
    backgroundColor: '#E8F0FE', // light blue background for Deep Sleep
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  sleepStatItemRem: {
    flex: 1,
    backgroundColor: '#E6FFE6', // light green background for REM Sleep
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  sleepStatLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  sleepStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Dashboard;
