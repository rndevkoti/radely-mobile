import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllProviders } from '../networking/providers';
import { useNavigation } from '@react-navigation/native';
import { DOCTORPROFILE } from '../appconstants';

const SelectProvider = () => {
    const { t } = useTranslation();
    const [providers, setProviders] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<any>();

    const handleContinue = () => {
        navigation.navigate(DOCTORPROFILE, { id: selectedId }); 
    };

     useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await getAllProviders('', 1, 10); 
                console.log('response screen--->', response);
                setProviders(response?.data.data.data || []); 
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    {['Chat', 'Call', 'Consult'].map((label) => (
                        <View key={label} style={[styles.tab, label === 'Consult' && styles.activeTab]}>
                            <Text style={[styles.tabText, label === 'Consult' && styles.activeTabText]}>
                                {label}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Step Indicator */}
                <View style={styles.stepWrapper}>
                    <View style={styles.stepTag}>
                        <Text style={styles.stepText}>{t('Step 2/5')}</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>{t('Select Provider')}</Text>
                <Text style={styles.subtitle}>{t('Choose a provider for your consultation')}</Text>

                {/* Loading */}
                {loading && (
                    <ActivityIndicator size="large" color="#00B993" style={{ marginVertical: 30 }} />
                )}

                {/* Error */}
                {error && (
                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>{error}</Text>
                )}

                {/* Doctor Cards */}
                {!loading && !error && providers.map((doctor: any) => (
                    <View key={doctor.id} style={styles.card}>
                        <View style={styles.cardTop}>
                            <Image
                                source={
                                    doctor.profilePicture
                                        ? { uri: doctor.profilePicture }
                                        : require('../assets/dr_johnson.png')
                                }
                                style={styles.avatar}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.doctorName}>{`${doctor.firstName} ${doctor.lastName}`}</Text>
                                <Text style={styles.doctorSpecialty}>{doctor.specialization}</Text>
                                <View style={styles.languageRow}>
                                    {(doctor.languagesSpoken || []).map((lang: string) => (
                                        <View key={lang} style={styles.languageTag}>
                                            <Text style={styles.languageText}>{lang}</Text>
                                        </View>
                                    ))}
                                </View>
                                <TouchableOpacity
                                    style={[
                                        styles.selectBtn,
                                        selectedId === doctor.id && styles.selectedBtn
                                    ]}
                                    onPress={() => setSelectedId(doctor.id)}
                                >
                                    <Text style={styles.selectText}>{t('Select')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.videoBtn}>
                            <Icon name="play-circle-outline" size={20} color="#00B993" />
                            <Text style={styles.videoText}>{t('Play video intro')}</Text>
                        </TouchableOpacity>
                    </View>
                ))}


                {/* Continue Button */}
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <LinearGradient colors={['#61C1A1', '#00B993']} style={styles.gradient}>
                        <View style={styles.buttonContent}>
                            <Icon name="stethoscope" size={20} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.buttonText}>{t('Continue')}</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                 {/* Spacer to prevent clipping on Android */}
                  <View style={{ height: 60 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SelectProvider;


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F5F7F9',
        borderRadius: 12,
        marginBottom: 24,
        paddingVertical: 8,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: '#DFF5EF',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
    },
    activeTabText: {
        color: '#00B993',
        fontWeight: '600',
    },
    stepWrapper: {
        alignItems: 'center',
        marginBottom: 16,
    },
    stepTag: {
        backgroundColor: '#00B993',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 20,
    },
    stepText: {
        color: '#fff',
        fontWeight: '600',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
        marginBottom: 24,
    },
    card: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    cardTop: {
        flexDirection: 'row',
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 12,
        marginRight: 16,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#888',
        marginVertical: 4,
    },
    languageRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    languageTag: {
        backgroundColor: '#EAF3FF',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 6,
        marginTop: 4,
    },
    languageText: {
        fontSize: 12,
        color: '#4A90E2',
    },
    selectBtn: {
        backgroundColor: '#00B993',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: '70%',
        alignItems: 'center',
        marginTop: 8,
    },
    selectedBtn: {
        borderWidth: 2,
        borderColor: '#007E6A',
    },
    selectText: {
        color: '#fff',
        fontWeight: '600',
    },
    videoBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    videoText: {
        marginLeft: 6,
        color: '#00B993',
        fontSize: 14,
        fontWeight: '500',
    },
    button: {
        marginTop: 16,
    },
    gradient: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
