import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/heightWidth';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { ONBOARDINGSCREEN } from '../appconstants';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Myconsent = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [collect, setCollect] = useState(false);
    const [share, setShare] = useState(false);
    const navigation = useNavigation<any>();

    const allConsented = collect && share;


    const SIGNUP_RESPONSE_KEY = 'signupResponse';

    const onClickContinue = () => {
        console.log('click continue');
        navigation.navigate(ONBOARDINGSCREEN);
    };

    const [signupResponse, setSignupResponse] = useState(null)

    const getSignupResponse = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SIGNUP_RESPONSE_KEY);
            console.log(jsonValue, 'Secondchekcing')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Failed to fetch signup response:', e);
            return null;
        }
    };
console.log("----->log added")
    useEffect(() => {
        const fetchSignupResponse = async () => {
            const response = await getSignupResponse();
            console.log(response, 'firstchecking')
            setSignupResponse(response);
        };
        fetchSignupResponse();
    }, []);



    return (
        <LinearGradient
            colors={theme.gradient}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View>
                        <Image
                            resizeMode="contain"
                            source={require('../assets/myconsent.png')}
                            style={{ width: 36, height: 36, alignSelf: 'center' }}
                        />
                        <Text style={[styles.title, { color: theme.cardTitle }]}>
                            {t('myConsent.title')}
                        </Text>
                        <Text style={[styles.cardText, { color: theme.cardTitle }]}>
                            {t('myConsent.subtitle')}
                        </Text>
                    </View>

                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#ddd',
                            backgroundColor: '#fff',
                            padding: 10,
                            borderRadius: 8,
                            marginVertical: 10,

                            // iOS shadow
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            // Android shadow
                            elevation: 1,
                            rowGap: 4,
                        }}>
                        <Text style={[styles.InfoText, { color: theme.inputText }]}>
                            {t('myConsent.PatientInformation')}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 4 }}>

                            <Image
                                resizeMode="cover"
                                source={
                                    signupResponse?.data?.data?.user?.first_name?.profilePictureUrl
                                        ? { uri: signupResponse?.data?.data?.user?.first_name?.profilePictureUrl }
                                        : require('../assets/profilePic.png')
                                }
                                style={{ width: 20, height: 20, borderRadius: 20 }}
                            />

                            <Text
                                style={[styles.cardTextdescription, { color: theme.inputText }]}>
                                {signupResponse?.data?.data?.user?.first_name?.trim()}
                            </Text>
                        </View>

                        <Text style={[styles.cardTextdescription, { color: theme.dob }]}>
                            DOB:  {new Date(signupResponse?.data?.data?.user?.patient_profile?.date_of_birth)
                                .toLocaleDateString('en-GB')}
                        </Text>
                        <Text style={[styles.cardTextdescription, { color: theme.dob }]}>
                            DATE: {new Date(signupResponse?.timestamp)
                                .toLocaleDateString('en-GB')}
                        </Text>
                    </View>

                    {t('myConsent.subheadertitle', { returnObjects: true }).map(
                        (item: any, index: number) => (
                            <View key={index} style={{ marginBottom: 16 }}>
                                <Text style={[styles.cardTitle, { color: theme.cardTitle }]}>
                                    {item.title}
                                </Text>
                                <Text
                                    style={[
                                        styles.cardTextdescription,
                                        { color: theme.cardTitle },
                                    ]}>
                                    {item.description}
                                </Text>
                            </View>
                        ),
                    )}
                </View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.button }]}
                    onPress={onClickContinue}>
                    <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                        {t('consent.continue_cta')}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

export default Myconsent;

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    scrollContainer: {
        padding: 14,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    InfoText: {
        fontSize: 16,
        color: 'red',
        fontWeight: '900',
    },
    cardText: {
        fontSize: 16,
        marginHorizontal: 18,
        alignSelf: 'center',
        textAlign: 'center',
    },
    cardTextdescription: {
        fontSize: 16,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Georgia',
        marginVertical: 6,
    },
});
