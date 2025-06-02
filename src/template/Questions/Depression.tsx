import React, { useContext, useState } from 'react';
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
import QuestionCard from '../../QuestionCard';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { GlobalProvider, useProfile } from '../../context/ProfileContext';
import { windowHeight } from '../../utils/heightWidth';
import { submitHealthResponses } from '../../networking/submitAnswer';

const Depression = ({ onContinue, step }: { onContinue: () => void; step: number }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const navigation = useNavigation<any>();
    const { questionnaire } = useProfile();
    const { answers, setAnswers } = useProfile();

    const { setHealthPayloads, healthPayloads } = useProfile();

    const depresionQuestions = questionnaire.DEPRESSION || [];

    console.log('depresionQuestions -->', depresionQuestions);

    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
        answers.DEPRESSION || Array(depresionQuestions.length).fill('')
    );
    const stepHeader = 2;
    const totalSteps = 13;
    const progress = (step / totalSteps) * 100;
    const { Navstep, setNavStep } = useProfile();


    const handleNext = async () => {
        const allAnswered = selectedAnswers.every(ans => ans !== '');
        if (!allAnswered) return;

        const formattedResponses = depresionQuestions.map((question, idx) => {
            const selectedOption = question.options.find(
                opt => opt.optionText === selectedAnswers[idx]
            );

            return {
                questionId: question.id,
                selectedoptionId: selectedOption?.id || null,
                customResponse: null,
            };
        });

        console.log('submit payload -->', formattedResponses);
        const fullPayload = [...healthPayloads, ...formattedResponses];

        try {
            const response = await submitHealthResponses(fullPayload);
            if (response?.status === 200) {
                setHealthPayloads(fullPayload);
                onContinue();
            } else {
                console.warn('Submission failed:', response?.status);
            }
        } catch (error) {
            console.error('Error submitting health responses:', error);
        }
    };

    const handleSelect = (index: number, value: string) => {
        const updated = [...selectedAnswers];
        updated[index] = value;
        setSelectedAnswers(updated);

        setAnswers(prev => ({
            ...prev,
            DEPRESSION: updated
        }));

    };

    return (
        <LinearGradient colors={theme.gradient} style={styles.gradient}>
            <View
                style={styles.scrollContent}
            >
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/health_questions.png')}
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
                <Text style={styles.title}>{t('depression')}</Text>
                {depresionQuestions.map((q, index) => (
                    <View key={q.id} style={styles.questionBlock}>
                        <Text style={styles.question}>{q.questionText}</Text>
                        <QuestionCard
                            options={q.options.map(opt => opt.optionText)}
                            selected={selectedAnswers[index]}
                            onSelect={(value) => handleSelect(index, value)}
                        />
                    </View>
                ))}

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setNavStep(0)}
                    >
                        <Text style={styles.backText}>{t('back')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={[
                            styles.nextButton,
                            !selectedAnswers.every(ans => ans !== '') && styles.buttonDisabled
                          ]}
                        onPress={handleNext}
                        
                        disabled={selectedAnswers.includes('')}
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
        height: windowHeight
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
    button: {
        backgroundColor: '#213732',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#9DA9A0',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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

export default Depression;
