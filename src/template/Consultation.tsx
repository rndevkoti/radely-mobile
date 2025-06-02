import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConsultationEmpty from './ConsultationEmpty';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { DOCTORPROFILE, SELECTPROVIDER } from '../appconstants';
import getUpcomingAppointments from '../networking/UpcomingAppointments';

const { width } = Dimensions.get('window');

const Consultation = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('Consult');

    const handleSchedule = () => {
        navigation.navigate(SELECTPROVIDER);
    };

    const handleViewDetails = (id: string) => {
        navigation.navigate(DOCTORPROFILE, { id });
    };

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const data = await getUpcomingAppointments();
            const dataArray = data?.data?.data?.data || [];
            setAppointments(dataArray);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);
    const renderDoctorCard = (item: any) => {
        const {
            doctorName,
            specialization,
            doctorProfilePicture,
            dateTime,
            status,
        } = item;

        const formattedDate = new Date(dateTime).toDateString();
        const formattedTime = new Date(dateTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        const normalizedStatus = status?.toUpperCase();
        const isOngoing = normalizedStatus === 'ONGOING';

        const badgeStyle = {
            backgroundColor: isOngoing ? '#E3F2FD' : '#FFF8E1',
            borderColor: isOngoing ? '#2196F3' : '#FFA000',
        };

        const badgeTextColor = isOngoing ? '#2196F3' : '#FFA000';

        const handleChat = () => setActiveTab('Chat');
        const handleCall = () => setActiveTab('Call');

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Image
                        source={require('../assets/calendar-blank.png')}
                        style={styles.headerIcon}
                    />
                    <Text style={styles.headerText}>Meet & Consult with doctor</Text>
                    <View style={[styles.badge, badgeStyle]}>
                        <Text style={{ color: badgeTextColor, fontSize: 12, fontWeight: '600' }}>
                            {status}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <Image
                        source={
                            doctorProfilePicture
                                ? { uri: doctorProfilePicture }
                                : require('../assets/dr_johnson.png')
                        }
                        style={styles.doctorImage}
                    />

                    <View style={styles.info}>
                        <Text style={styles.doctorName}>{doctorName || 'Dr. Name'}</Text>
                        <Text style={styles.specialty}>{specialization || 'Specialist'}</Text>
                        <Text style={styles.datetime}>{formattedDate} | {formattedTime}</Text>

                        {isOngoing ? (
                            <TouchableOpacity onPress={handleSchedule} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={['#64B5F6', '#2196F3']}
                                    style={styles.visitBtn}
                                >
                                    <Text style={styles.visitText}>Visit Now</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={[styles.chatCallBtn, { borderColor: '#007AFF' }]}
                                    onPress={handleChat}
                                >
                                    <Text style={[styles.chatCallText, { color: '#007AFF' }]}>Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.chatCallBtn, { borderColor: '#34C759' }]}
                                    onPress={handleCall}
                                >
                                    <Text style={[styles.chatCallText, { color: '#34C759' }]}>Call</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    };
    const renderTabs = () => (
        <View style={styles.tabs}>
            {['Chat', 'Call', 'Consult'].map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={[styles.tab, activeTab === tab && styles.activeTab]}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === tab && styles.activeTabText,
                        ]}
                    >
                        {t(`consultations.${tab.toLowerCase()}`)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    if (!loading && appointments.length === 0) {
        return <ConsultationEmpty />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderTabs()}
            <FlatList
                contentContainerStyle={{ paddingBottom: 40 }}
                data={appointments}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={({ item }) => (
                    <>
                        <Text style={styles.date}>
                            {new Date(item.dateTime).toDateString()}
                        </Text>
                        {renderDoctorCard(item)}
                    </>
                )}
                ListFooterComponent={
                    <TouchableOpacity onPress={handleSchedule} activeOpacity={0.8} style={styles.footerBtnContainer}>
                        <LinearGradient
                            colors={['#64B5F6', '#2196F3']}
                            style={styles.footerBtn}
                        >
                            <Text style={styles.footerBtnText}>Schedule a Consultation</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }
            />
        </SafeAreaView>
    );
};

export default Consultation;
const styles = StyleSheet.create({
    filterBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
        marginRight: 8,
    },
    selectedFilter: {
        backgroundColor: '#2DB3A6',
        borderColor: '#2DB3A6',
    },
    filterText: {
        fontSize: 13,
        color: '#000',
    },
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
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
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        width: width - 48,
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
    date: {
        fontSize: 14,
        fontWeight: '500',
        color: '#444',
        marginLeft: 20,
        marginTop: 16,
        marginBottom: 20,
    },
    card: {
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 2,
        borderColor: '#EFEFF0',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerIcon: {
        width: 16,
        height: 16,
        marginRight: 6,
    },
    headerText: {
        fontSize: 13,
        color: '#444',
        flex: 1,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    cardBody: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    doctorImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    specialty: {
        fontSize: 14,
        color: '#888',
        marginBottom: 6,
    },
    datetime: {
        fontSize: 13,
        color: '#666',
        marginBottom: 12,
    },
    visitBtn: {
        borderRadius: 10,
        alignItems: 'center',
        height: 40
    },
    visitText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        margin: 12
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        tintColor: '#323232',
    },
    detailBtn: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        width: 220,
        borderColor: '#DDD',
    },
    detailText: {
        fontSize: 14,
        color: '#333',
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 10,
    },
    chatCallBtn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatCallText: {
        fontSize: 14,
        fontWeight: '600',
    },
    footerBtnContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    footerBtn: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    footerBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },


});
