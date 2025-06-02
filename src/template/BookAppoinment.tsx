import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image,
  ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { screenWidth } from '../utils/heightWidth';
import AppointmentType from './AppoinmentType';
import createAppointment from '../networking/createAppointment';
import { getProviderappointmentiavailabilitybyID } from '../networking/providerappointmentavailability';
import utc from 'dayjs/plugin/utc';

 
const BookAppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { doctorId } = route.params as { doctorId: string };

  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.startOf('month'));
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  const [availability, setAvailability] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('inPerson');
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
 

  const dates = Array.from({ length: 90 }, (_, i) => today.add(i, 'day'));
  const visibleDates = dates.slice(visibleStartIndex, visibleStartIndex + 5);
  dayjs.extend(utc); // Enable UTC support

  // 🔄 Fetch availability
  const fetchAvailability = async (startDate: string) => {
    if (!doctorId) return;
    setLoadingAvailability(true);
    try {
      const response = await getProviderappointmentiavailabilitybyID(doctorId, startDate);
      const data = response?.data?.data?.availability || [];
      setAvailability(data);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    } finally {
      setLoadingAvailability(false);
    }
  };

  useEffect(() => {
    fetchAvailability(today.format('YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    const found = availability.find(item =>
      dayjs(item.date).isSame(selectedDate, 'day')
    );
    setAvailableSlots(found?.slots?.filter((s: any) => s.isAvailable) || []);
  }, [selectedDate, availability]);

  const handleNextDays = () => {
    if (visibleStartIndex + 5 < dates.length) {
      setVisibleStartIndex(visibleStartIndex + 5);
    }
  };

  const handleMonthChange = (direction: 'next' | 'prev') => {
    const newMonth = direction === 'next'
      ? currentMonth.add(1, 'month')
      : currentMonth.subtract(1, 'month');
    setCurrentMonth(newMonth);
    const newIndex = dates.findIndex(date => date.isSame(newMonth, 'month'));
    setVisibleStartIndex(newIndex !== -1 ? newIndex : 0);
  };

  const handleBooking = async () => {
    try {
        if (!selectedSlot) {
            Alert.alert('Please select a time slot.');
            return;
          }
          
          const payload = {
            doctorId,
            type: appointmentType === 'inPerson' ? 'IN_PERSON' : 'VIDEO_CALL',
            dateTime: selectedSlot.startTime, // must be exact match
            duration: 30,
            notes: 'Follow-up for last checkup',
            reason: 'Headache and dizziness',
            location: 'LA Medical Center',
            followUp: false,
            isRecurring: false,
            recurringPattern: 'WEEKLY',
          };
  
      console.log('payload --> ', payload);
      const result = await createAppointment(payload);
      console.log('Appointment created:', result);
      Alert.alert('Appointment booked successfully!');
    //   navigation.goBack();
    } catch (error: any) {
      console.error('Booking failed:', error);
      Alert.alert(error?.response?.data?.message || 'Failed to book appointment.');
    }
  };
  


  const renderDate = (date: dayjs.Dayjs) => {
    const isSelected = date.isSame(selectedDate, 'day');
    return (
      <TouchableOpacity
        key={date.format('YYYY-MM-DD')}
        onPress={() => setSelectedDate(date)}
        style={[styles.dateItem, isSelected && styles.selectedDate]}>
        <Text style={[styles.dateDay, isSelected && styles.dateDaySelected]}>
          {date.format('ddd')}
        </Text>
        <Text style={[styles.dateNum, isSelected && styles.dateNumSelected]}>
          {date.format('D')}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTimeSlot = (slot: any) => {
    const time = dayjs(slot.startTime).format('HH:mm');
    const isSelected = selectedSlot?.startTime === slot.startTime;
  
    return (
      <TouchableOpacity
        key={slot.startTime}
        onPress={() => setSelectedSlot(slot)} // ✅ this stores the full slot object
        style={[
          styles.timeSlot,
          isSelected && styles.selectedTimeSlot,
        ]}
      >
        <Text style={styles.timeText}>{time}</Text>
      </TouchableOpacity>
    );
  };

  return (
<SafeAreaView style={styles.safe}>
  <ScrollView
    contentContainerStyle={[styles.container, { paddingBottom: 80 }]}
    showsVerticalScrollIndicator={false}
  >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Book Appointment</Text>
        </View>

        {/* Date Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>

          <View style={styles.datePickerContainer}>
            <View style={styles.monthContainer}>
              <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>
              <TouchableOpacity onPress={() => handleMonthChange('next')}>
                <Image source={require('../assets/IconButtons_circleright.png')} style={{ width: 34, height: 34 }} />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />
            <View style={styles.datesRow}>
              {visibleDates.map(renderDate)}
              <TouchableOpacity onPress={handleNextDays}>
                <Image source={require('../assets/IconButtons_rightcircle.png')} style={{ width: 34, height: 34 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Time</Text>
          {loadingAvailability ? (
            <ActivityIndicator color="#00B993" size="small" />
          ) : (
            <View style={styles.timeGrid}>
              {availableSlots.length > 0 ? (
                availableSlots.map(renderTimeSlot)
              ) : (
                <Text style={{ color: '#999' }}>No slots available for this day</Text>
              )}
            </View>
          )}
        </View>

        <AppointmentType type={appointmentType} setType={setAppointmentType} />

        {/* Booking Button */}
     
    <TouchableOpacity style={styles.button} onPress={handleBooking}>
      <LinearGradient colors={['#61C1A1', '#00B993']} style={styles.gradient}>
        <Text style={styles.buttonText}>Booking</Text>
      </LinearGradient>
    </TouchableOpacity>
  </ScrollView>
</SafeAreaView>
  );
};

export default BookAppointmentScreen;


const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
      },
      container: {
        flexGrow: 1,
        padding: 16,
      },
      button: {
        marginTop: 24,
        alignSelf: 'center',
        width: '100%',
      },
      gradient: {
        paddingVertical: 16,
        height: 70,
        borderRadius: 8,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
       },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 0, marginLeft: 20 },
    section: { marginVertical: 10 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
    datePickerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    monthLabel: { fontSize: 16, fontWeight: '500' },
    arrow: { fontSize: 20 },
    dateRow: { flexDirection: 'row', marginTop: 10 },
    dateBox: {
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginRight: 10,
        backgroundColor: '#F1F3F4',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        alignSelf: 'stretch',
        marginVertical: 10,
        marginHorizontal: -16,
        width: screenWidth / 1.1
    },
    selectedDateBox: {
        backgroundColor: '#00B993',
    },
    dateDay: { fontSize: 12, color: '#555' },
    dateNum: { fontSize: 14, fontWeight: 'bold', color: '#333' },
    dateDaySelected: { fontSize: 12, color: '#ffff' },
    dateNumSelected: { fontSize: 14, fontWeight: 'bold', color: '#ffff' },

    selectedText: { color: '#fff' },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 20
    },
    timeSlot: {
        backgroundColor: '#F1F3F4',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginBottom: 10,
    },
    selectedTimeSlot: {
        backgroundColor: '#00B993',
    },
    timeText: { color: '#333' },
    disabledSlot: {
        backgroundColor: '#ddd',
    },
    disabledText: { color: '#999' },
    typeBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#F1F3F4',
        marginBottom: 10,
    },
    selectedTypeBox: {
        borderWidth: 2,
        borderColor: '#00B993',
        backgroundColor: '#D0F1E7',
    },
   

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    datePickerContainer: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 20,
        padding: 12,
    },
    monthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    monthText: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 120
    },
    datesRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateItem: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 12,
        marginRight: 8,
    },
    selectedDate: {
        backgroundColor: '#38C8B9',
        borderColor: '#38C8B9',
    },

});
