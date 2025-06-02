import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import { ONBOARDINGSCREEN, QUESTIONSSCREEN } from '../appconstants';
import { useNavigation } from '@react-navigation/native';
import { windowHeight, windowWidth } from '../utils/heightWidth';
import LinearGradient from 'react-native-linear-gradient';
import questions, { getAllQuestions } from '../networking/questions';
import { useProfile } from '../context/ProfileContext';

export default function HealthOnboarding({ }: any) {
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    // const [question, setQuestion] = useState<any[]>([]);
    // const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const { setQuestionnaire } = useProfile();


    const handleBegin = async () => {

        try {
            const questionResponse = await questions();

            console.log('questionResponse' , questionResponse);
            fetchAllQuestions(questionResponse);

      
           } catch (uploadErr) {
            console.warn('questionResponse failed:', uploadErr);
           }
         navigation.reset({
              index: 0,
              routes: [{ name: QUESTIONSSCREEN }],
            });
    }

    const fetchAllQuestions = async (questionResponse) => {
        console.log('questionResponse -->', questionResponse.data.data.id);      

        const allQuestions = await getAllQuestions(questionResponse.data.data.id)
        console.log('fetch data from api -->', allQuestions);      
        // setQuestion(allQuestions.data.data);
        setQuestionnaire(allQuestions.data.data);
        // console.log('fetch questions from api -->', question);      

    }

    return (
        <ImageBackground
            source={require('../assets/welcome-bg.png')}
            style={styles.background}
        >
            <View style={styles.wrapper}> 

                <View style={styles.card}>
                    <LinearGradient
                        colors={['rgba(99,134,149,0.7)', 'rgba(100,171,134,0.7)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
                    />
                    <Text style={styles.title}>
                        {t('healthOnboarding.title', 'Health Onboarding Questions')}
                    </Text>
                    <Text style={styles.subtitle}>
                        {t('healthOnboarding.subtitle', 'We’ll ask you a series of questions that will help us establish a baseline for your overall health and goals.')}
                    </Text>

                    <Pressable style={styles.button} onPress={() => handleBegin()}>
                        <Text style={styles.buttonText}>
                            {t('common.begin', 'Begin')}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 160,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        height: windowHeight
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        alignSelf: 'center',
        width: windowWidth / 1.1
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 12,
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginTop: 6,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        color: '#4449',
        fontWeight: '600',
        fontSize: 16,
    },
});
 
