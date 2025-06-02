import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,
    Dimensions, SafeAreaView, ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import DoctorDetails from './DoctorDetails';
import DoctorAvailability from './DoctorAvailability';
import DoctorReview from './DoctorReview';
import { BOOKAPPOINMENT } from '../appconstants';
import { getProviderappointmentiavailabilitybyID } from '../networking/providerappointmentavailability';
import { getProviderProfilebyID } from '../networking/ProviderprofilebyID';

const { width } = Dimensions.get('window');

const DoctorProfile = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'Details' | 'Availability' | 'Review'>('Details');
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { id } = route.params as { id: string };

    const [doctor, setDoctor] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const profile = await getProviderProfilebyID(id);
                console.log('preofile ---->', profile);
                setDoctor(profile.data.data);
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctorProfile();
    }, [id]);

   

    const handleBookAppoinment = () => {
        navigation.navigate(BOOKAPPOINMENT, { doctorId: id });
    };

    const getDoctorImage = () => {
        if (!doctor?.profilePicture) {
            return require('../assets/dr_johnson.png');
        }
        return typeof doctor.profilePicture === 'string'
            ? { uri: doctor.profilePicture }
            : doctor.profilePicture;
    };
    const generateDoctorDescription = (doctor: any) => {
        if (!doctor) return '';

        return `Dr. ${doctor.firstName} ${doctor.lastName} is an experienced ${doctor.specialization.toLowerCase()} based in ${doctor.city}, ${doctor.state}. With over ${doctor.yearsOfExperience} years of experience and fluency in ${doctor.languagesSpoken.join(', ')}, Dr. ${doctor.lastName} is dedicated to delivering high-quality care and building trust with patients.`;
    };

    if (loading || !doctor) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#2DB3A6" style={{ marginTop: 100 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                        <Image source={require('../assets/arrow-left.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Image source={require('../assets/share-network.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                {/* Doctor Image */}
                <Image source={getDoctorImage()} style={styles.doctorImage} />

                {/* Overlay Card */}
                <View style={styles.overlayCard}>
                    <Text style={styles.name}>{doctor.firstName} {doctor.lastName}</Text>
                    <Text style={styles.specialty}>{doctor.specialization}</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoTag}>ID: {doctor.medicalLicenseId}</Text>
                        <Text style={styles.infoTag}>{doctor.yearsOfExperience} Years Exp.</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Image source={require('../assets/star.png')} style={styles.inlineIcon} />
                        <Text style={styles.ratingText}>{doctor.averageRating} ({doctor.reviewCount ?? 0} reviews)</Text>
                        <Image source={require('../assets/map-pin.png')} style={[styles.inlineIcon, { marginLeft: 10 }]} />
                        <Text style={styles.ratingText}>{doctor.distanceKm ?? '2KM'}</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabs}>
                    {['Details', 'Availability', 'Review'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab as any)}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {t(`doctorProfile.${tab.toLowerCase()}`)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                <View style={styles.tabContent}>
                    {activeTab === 'Details' && (
                        <DoctorDetails
                            description={generateDoctorDescription(doctor)}
                            location={doctor.location}
                        />
                    )}                
                       {activeTab === 'Availability' && (
                         
                             <DoctorAvailability doctor={doctor}  />
                    )}
                    {activeTab === 'Review' && <DoctorReview doctorId={doctor?.id}/>}
                </View>

                {/* Booking Button */}
                <View style={styles.bookingContainer}>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleBookAppoinment} style={styles.selectButton}>
                        <Text style={styles.selectButtonText}>{t('doctorProfile.booking')}</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default DoctorProfile;

const styles = StyleSheet.create({
    bookingContainer: {
        //position: 'absolute',
        //bottom: 30,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    selectButton: {
        width: '70%',
        backgroundColor: '#2DB3A6',
        borderRadius: 14,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconBtn: {
        padding: 8,
        backgroundColor: '#F6F6F6',
        borderRadius: 24,
    },
    icon: {
        width: 16,
        height: 16,
        tintColor: '#000',
    },
    doctorImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    overlayCard: {
        position: 'absolute',
        top: 220,
        left: 20,
        right: 20,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    specialty: {
        fontSize: 14,
        color: '#6C6C70',
        marginVertical: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        flexWrap: 'wrap',
    },
    infoTag: {
        fontSize: 12,
        color: '#444',
        backgroundColor: '#F1F3F5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    inlineIcon: {
        width: 14,
        height: 14,
        tintColor: '#FFA000',
        marginRight: 4,
    },
    ratingText: {
        fontSize: 13,
        color: '#444',
    },
    tabs: {
        flexDirection: 'row',
        marginTop: 120,
        marginHorizontal: 20,
        backgroundColor: '#F1F3F5',
        borderRadius: 12,
        overflow: 'hidden',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 6,
    },
    tabText: {
        fontSize: 14,
        color: '#8E8E93',
    },
    activeTabText: {
        fontWeight: '600',
        color: '#000',
    },
    tabContent: {
        paddingHorizontal: 20,
        marginTop: 16,
    },
    aboutTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 6,
    },
    emoji: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        color: '#6C6C70',
        lineHeight: 20,
    },
    seeMore: {
        color: '#2DB3A6',
        fontWeight: '500',
    },

    bookingButton: {
        borderRadius: 14,
        alignItems: 'center',
        height: 50,
        bottom: 10
    },
    bookingText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        margin: 14,
    },
    placeholder: {
        color: '#888',
        fontSize: 14,
        marginTop: 12,
    },

});
