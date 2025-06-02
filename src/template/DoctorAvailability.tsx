import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getProviderappointmentiavailabilitybyID } from '../networking/providerappointmentavailability';

const DoctorAvailability = ({ doctor }: { doctor: any }) => {
    const { t } = useTranslation();
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [availability, setAvailability] = useState<any[]>([]);
    const [loadingAvailability, setLoadingAvailability] = useState(false);

    const defaultTimes = [
        '10:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM'
    ];

    const selectedDay = availability?.[selectedDateIndex];

    const fetchAvailability = async (startDate: string) => {
        if (!doctor?.id) return;

        setLoadingAvailability(true);
        try {
            const response = await getProviderappointmentiavailabilitybyID(doctor.id, startDate);
            setAvailability(response?.data?.data?.availability || []);
        } catch (error) {
            console.error('Failed to fetch availability:', error);
        } finally {
            setLoadingAvailability(false);
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        fetchAvailability(today);
    }, [doctor]);

    // Fetch again when a different date is selected (pass that date as startDate)
    useEffect(() => {
        if (availability.length > 0) {
            const newSelectedDate = availability[selectedDateIndex]?.date;
            if (newSelectedDate) {
                fetchAvailability(newSelectedDate);
            }
        }
    }, [selectedDateIndex]);

    return (
        <View>
            <Text style={styles.availabilityTitle}>{t('Availability Practice')} 🩺</Text>

            {/* Date Picker */}
            <View style={styles.dateContainer}>
                <Text style={styles.monthLabel}>
                    {selectedDay?.date ? new Date(selectedDay.date).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : ''}
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {availability?.map((item, index) => {
                        const dateNum = parseInt(item.date?.split('-')[2]);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dateBox,
                                    index === selectedDateIndex && styles.dateBoxActive
                                ]}
                                onPress={() => setSelectedDateIndex(index)}
                            >
                                <Text style={[
                                    styles.dateLabel,
                                    index === selectedDateIndex && styles.dateLabelActive
                                ]}>
                                    {item.dayOfWeek?.slice(0, 3)}
                                </Text>
                                <Text style={[
                                    styles.dateNumber,
                                    index === selectedDateIndex && styles.dateNumberActive
                                ]}>
                                    {dateNum}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Time Slots */}
            <View style={styles.timeSlotsWrapper}>
                {defaultTimes.map((time, index) => {
                    const isAvailable = selectedDay?.slots?.includes(time);
                    return (
                        <TouchableOpacity
                            key={index}
                            disabled={!isAvailable}
                            style={[
                                styles.timeSlot,
                                isAvailable ? styles.timeSlotAvailable : styles.timeSlotDisabled
                            ]}
                        >
                            <Text
                                style={[
                                    styles.timeSlotText,
                                    isAvailable ? styles.timeSlotTextAvailable : styles.timeSlotTextDisabled
                                ]}
                            >
                                {time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default DoctorAvailability;


const styles = StyleSheet.create({
    availabilityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 10,
    },

    monthLabel: {
        fontSize: 14,
        color: '#6C6C70',
        marginBottom: 8,
    },

    dateContainer: {
        marginBottom: 16,
    },

    dateBox: {
        backgroundColor: '#F1F3F5',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 8,
        width: 60,
    },

    dateBoxActive: {
        backgroundColor: '#2DB3A6',
    },

    dateLabel: {
        fontSize: 12,
        color: '#6C6C70',
    },

    dateLabelActive: {
        color: '#fff',
    },

    dateNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
    },

    dateNumberActive: {
        color: '#fff',
    },

    timeSlotsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'flex-start',
    },

    timeSlot: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        margin: 4,
        borderWidth: 1,
    },

    timeSlotAvailable: {
        backgroundColor: '#E7F9F7',
        borderColor: '#2DB3A6',
    },

    timeSlotDisabled: {
        backgroundColor: '#F1F1F1',
        borderColor: '#CCC',
    },

    timeSlotText: {
        fontSize: 14,
    },

    timeSlotTextAvailable: {
        color: '#2DB3A6',
    },

    timeSlotTextDisabled: {
        color: '#A0A0A0',
    },
});
