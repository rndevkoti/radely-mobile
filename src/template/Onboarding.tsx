import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { windowHeight } from '../utils/heightWidth';
import { BOTTOM_TAB } from '../appconstants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';

export default function Onboarding() {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const navigation = useNavigation<any>();


      useEffect(() => {

        const timeout = setTimeout(() => {
          navigation.navigate(BOTTOM_TAB);
        }, 2000); 

        return () => clearTimeout(timeout);
      }, []);

    return (
        <ImageBackground
            source={require('../assets/welcome-bg.png')}
            style={styles.background}
        >

            <BlurView
                style={StyleSheet.absoluteFill}
                blurAmount={6}
                blurType="light"
                reducedTransparencyFallbackColor="transparent"
            />
            <LinearGradient
                colors={['rgba(99,134,149,0.8)', 'rgba(100,171,134,0.7)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.logoWrapper}>
                <Image
                    source={require('../assets/welcome-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.welcomeText}>
                {t('welcomeScreen.title', 'Welcome to the Quilt Health Family')}
            </Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        height: windowHeight
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight
    },
    logoWrapper: {
        marginBottom: 20,
        alignSelf: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        tintColor: '#A4D4C0', // Soft mint green (match from image)
    },
    welcomeText: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'serif', // or custom font if you're using one
        fontWeight: '600',
    },
});
