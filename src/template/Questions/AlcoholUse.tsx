import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import QuestionCard from '../../QuestionCard';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';
import { submitHealthResponses } from '../../networking/submitAnswer';
import healthIcon from '../../assets/health.png';

const AlcoholUse = ({ onContinue, step }: { onContinue: () => void; step: number }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const { questionnaire } = useProfile();
    const { answers, setAnswers } = useProfile();
    const { setHealthPayloads } = useProfile();


    const alcoholQuestions = questionnaire.ALCOHOL_USE || [];

    console.log('alcoholQuestions -->', alcoholQuestions);

    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
        answers.ALCOHOL_USE || Array(alcoholQuestions.length).fill('')
    );
    

    const allAnswered = selectedAnswers.every(ans => ans !== '');

    console.log('selectedAnswers -->', selectedAnswers);

    console.log('allAnswered -->', allAnswered);

    useEffect(() => {
        console.log('Updated questionnaire context:', questionnaire);
      }, [questionnaire]);

      useEffect(() => {
        if (alcoholQuestions.length > 0 && selectedAnswers.length === 0) {
          const initial = answers.ALCOHOL_USE || Array(alcoholQuestions.length).fill('');
          setSelectedAnswers(initial);
        }
      }, [alcoholQuestions]);


    const handleNext = async () => {
        const allAnswered = selectedAnswers.every(ans => ans !== '');
        if (!allAnswered) return;

        const formattedResponses = alcoholQuestions.map((question, idx) => {
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
        try {
            const response = await submitHealthResponses(formattedResponses);
            if (response?.status === 200) {
                setHealthPayloads(formattedResponses);
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
            ALCOHOL_USE: updated
        }));
    };


    const stepHeader = 1;
    const totalSteps = 13;
    const progress = (step / totalSteps) * 100;

    return (
        <LinearGradient colors={theme.gradient} style={styles.container}>
            <View style={styles.scrollContainer}>

                <View style={styles.headerRow}>
                    <Image
                        source={healthIcon}
                        style={styles.icon}
                    />
                    <View style={styles.headerContent}>
                        <View style={styles.headerTopRow}>
                            <Text style={styles.headerTitle}>{t('health_questions')}</Text>
                            <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
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

                {/* Step */}
                <Text style={styles.step}>{t('step', { current: stepHeader, total: totalSteps })}</Text>


                {/* Title */}
                <Text style={styles.title}>{t('alcohol_use')}</Text>

                {/* Dynamically render questions */}
                {alcoholQuestions.length > 0 && alcoholQuestions.map((q, index) => (
                    <View key={q.id} style={styles.questionBlock}>
                        <Text style={styles.question}>{q.questionText}</Text>
                        <QuestionCard
                            options={q.options.map(opt => opt.optionText)}
                            selected={selectedAnswers[index]}
                            onSelect={(value) => handleSelect(index, value)}
                        />
                    </View>
                ))}
                {/* Continue Button */}
                <TouchableOpacity
                 style={[
                    styles.button,
                    !selectedAnswers.every(ans => ans !== '') && styles.buttonDisabled
                  ]}
                    onPress={() => handleNext()}
                    disabled={selectedAnswers.includes('')}
                >
                    <Text style={styles.buttonText}>{t('next')}</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    topImage: {
        width: '100%',
        height: 100,
        marginBottom: 10,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    step: {
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 8,
    },
    headerTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerContent: {
        flex: 1,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    progressPercent: {
        color: '#fff',
        fontSize: 14,
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: '#ffffff50',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: 10,
        borderRadius: 5,
    },

});

export default AlcoholUse;
