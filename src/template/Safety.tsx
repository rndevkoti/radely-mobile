import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuestionCard from '../QuestionCard';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const Safety = ({ onContinue, step }: { onContinue: () => void; step: number }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const navigation = useNavigation<any>();

    const stepHeader = 1;
    const totalSteps = 13;
    const progress = (step / totalSteps) * 100;
    const questions = t('food_security.questions', { returnObjects: true }) as string[];
    const options = t('food_security.options', { returnObjects: true }) as string[];
  
    return (
        <LinearGradient colors={theme.gradient} style={styles.gradient}>
            <View
                style={styles.scrollContent}
            >
                <View style={styles.header}>
                    <Image
                        source={require('../assets/health_questions.png')}
                        style={styles.icon}
                    />
                    <View style={styles.progressContent}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>{t('health_questions')}</Text>
                            <Text style={styles.percent}>{Math.round(progress)}%</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <LinearGradient
                                colors={['#A0E1B8', '#6AC3A1']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.progressBarFill, { width: `${progress}%` }]}
                            />
                        </View>
                    </View>
                </View>

                <Text style={styles.stepText}>{t('step', { current: stepHeader, total: totalSteps })}</Text>
                <Text style={styles.title}>{t('food_security.title')}</Text>

                <View style={styles.questionBlock}>
                <Text style={styles.question}>{questions[0]}</Text>
                <QuestionCard options={options} selected={q1} onSelect={setQ1} />


                </View>

                <View style={styles.questionBlock}>
                <Text style={styles.question}>{questions[1]}</Text>
                <QuestionCard options={options} selected={q2} onSelect={setQ2} />

                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backText}>{t('back')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.nextButton, (!q1 || !q2) && { opacity: 0.5 }]}
                        onPress={onContinue}
                        disabled={!q1 || !q2}
                    >
                        <Text style={styles.nextText}>{t('next')}</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    progressContent: {
        flex: 1,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#fff',
        fontSize: 14,
    },
    percent: {
        color: '#fff',
        fontSize: 14,
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: '#ffffff50',
        borderRadius: 5,
        marginTop: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: 10,
        borderRadius: 5,
    },
    stepText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        marginBottom: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'left',
    },
    questionBlock: {
        marginBottom: 30,
    },
    question: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 16, // Requires RN >= 0.71; otherwise use marginRight on backButton
    },

    backButton: {
        backgroundColor: '#D8DED9',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 50,
    },

    nextButton: {
        backgroundColor: '#213732',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 50,
    },

    backText: {
        color: '#4D2C91', // Dark purple text
        fontWeight: 'bold',
        fontSize: 16,
    },

    nextText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

});

export default Safety;
