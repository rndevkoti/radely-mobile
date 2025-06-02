import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SELECTPROVIDER } from '../appconstants';
import { useNavigation } from '@react-navigation/native';

const ScheduleConsultation = () => {
    const { t } = useTranslation();
    const [selectedType, setSelectedType] = useState<'baseline' | 'followup'>('baseline');
    const navigation = useNavigation<any>();

    const handleContinue = () => {
        navigation.navigate(SELECTPROVIDER);
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* Top Tab Selection */}
                <View style={styles.tabContainer}>
                    {['Chat', 'Call', 'Consult'].map((tab, index) => (
                        <View
                            key={tab}
                            style={[
                                styles.tab,
                                tab === 'Consult' && styles.activeTab
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    tab === 'Consult' && styles.activeTabText
                                ]}
                            >
                                {tab}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Step indicator */}
                <View style={styles.stepWrapper}>
                    <View style={styles.stepTag}>
                        <Text style={styles.stepText}>{t('Step 1/5')}</Text>
                    </View>
                </View>

                {/* Title & Subtitle */}
                <Text style={styles.title}>{t('Schedule a Consultation')}</Text>
                <Text style={styles.subtitle}>{t('Choose the type of consultation you need')}</Text>

                {/* Consultation Options */}
                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedType === 'baseline' && styles.selectedOption
                    ]}
                    onPress={() => setSelectedType('baseline')}
                >
                    <View style={styles.iconWrapper}>
                        <Image source={require('../assets/Icon_healthconsult.png')} style={{ width: 34, height: 34 }} />
                    </View>
                    <View>
                        <Text style={styles.optionTitle}>{t('Baseline Health Consultation')}</Text>
                        <Text style={styles.optionDesc}>{t('New patient assessment')}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.option,
                        selectedType === 'followup' && styles.selectedOption
                    ]}
                    onPress={() => setSelectedType('followup')}
                >
                    <View style={styles.iconWrapper}>
                        <Image source={require('../assets/Icon_profile.png')} style={{ width: 34, height: 34 }} />
                    </View>
                    <View>
                        <Text style={styles.optionTitle}>{t('Follow-Up Consultation')}</Text>
                        <Text style={styles.optionDesc}>{t('Continue your care plan')}</Text>
                    </View>
                </TouchableOpacity>

                {/* Continue Button */}
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <LinearGradient
                        colors={['#61C1A1', '#00B993']}
                        style={styles.gradient}
                    >
                        <View style={styles.buttonContent}>
                            <Icon name="stethoscope" size={20} color="#fff" style={{ marginRight: 8, marginBottom: 20 }} />
                            <Text style={styles.buttonText}>{t('Continue')}</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ScheduleConsultation;
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
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
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    selectedOption: {
        borderColor: '#00B993',
        backgroundColor: '#E8FBF5',
    },
    iconWrapper: {
        marginRight: 16,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    optionDesc: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    button: {
        marginTop: 32,
    },
    gradient: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 20
    },
});
