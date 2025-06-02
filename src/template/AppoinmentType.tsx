import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const AppointmentType = () => {
  const [selectedType, setSelectedType] = useState<'inPerson' | 'video'>('inPerson');

  const appointmentOptions = [
    {
      key: 'inPerson',
      icon: require('../assets/Icon_calendarblack.png'), // 🗓️ Replace with actual path
      title: 'Meet & Consult with doctor',
      price: '$100',
    },
    {
      key: 'video',
      icon: require('../assets/Icon_videoblack.png'), // 🎥 Replace with actual path
      title: 'Video call with doctor',
      price: '$50',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appointment Type</Text>
      {appointmentOptions.map((option) => (
        <TouchableOpacity
          key={option.key}
          onPress={() => setSelectedType(option.key)}
          style={[
            styles.card,
            selectedType === option.key && styles.cardSelected,
          ]}
        >
          <Image source={option.icon} style={styles.icon} />

          <View style={styles.textContainer}>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.price}>{option.price}</Text>
          </View>

          <View style={styles.radioOuter}>
            {selectedType === option.key && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AppointmentType;

const styles = StyleSheet.create({
    container: {
       marginTop: 20,
    },
    heading: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
      color: '#000',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9F9F9',
      borderWidth: 1,
      borderColor: '#DADADA',
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },
    cardSelected: {
      borderColor: '#007AFF',
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 12,
      borderRadius: 8,
      backgroundColor: '#F2F2F2',
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 14,
      color: '#444',
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 4,
      color: '#000',
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#007AFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#007AFF',
    },
  });
  