import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screens/SplashScreen';
import { BOTTOM_TAB, HEALTHONBOARDINGSCREEN, LANGUAGE, LOGIN, QUESTIONSSCREEN, SPLASH, USER_TYPE, USERTYPE, WELCOME } from '../../appconstants';
import LanguageScreen from '../../screens/LanguageScreen';
import WelcomeScreen from '../../screens/WelcomeScreen';
import UserTypeScreen from '../../screens/UserTypeScreen';
import { UserTypeNavigator } from '../userTypeStack';
import { QuestionsStackNavigator } from '../questionsStack/QuestionsStackNavigator';
import LoginScreen from '../../screens/LoginScreen';
import { BottomTabNavigation } from '../bottomStack';
import HealthOnboardingScreen from '../../screens/HealthOnboardingScreen';

const SplashStack = createNativeStackNavigator();

export const SplashNavigator = () => {
	return (
		<SplashStack.Navigator initialRouteName={SPLASH}>
			<SplashStack.Screen
				name={SPLASH}
				component={SplashScreen}
				options={{ headerShown: false }}
			/>
			<SplashStack.Screen
				name={LANGUAGE}
				component={LanguageScreen}
				options={{ headerShown: false }}
			/>
			<SplashStack.Screen
				name={WELCOME}
				component={WelcomeScreen}
				options={{ headerShown: false }}
			/>
			<SplashStack.Screen
				name={LOGIN}
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			{/* <SplashStack.Screen
				name={USERTYPE}
				component={UserTypeScreen}
				options={{ headerShown: false }}
			/> */}
			<SplashStack.Screen
				name={BOTTOM_TAB}
				component={BottomTabNavigation}
				options={{ headerShown: false }} />

			<SplashStack.Screen
				name={USER_TYPE}
				component={UserTypeNavigator}
				options={{ headerShown: false }}
			/>
			<SplashStack.Screen
				name={HEALTHONBOARDINGSCREEN}
				component={HealthOnboardingScreen}
				options={{ headerShown: false }}
			/>
			<SplashStack.Screen
				name={QUESTIONSSCREEN}
				component={QuestionsStackNavigator}
				options={{ headerShown: false }}
			/>


		</SplashStack.Navigator>
	);
};
