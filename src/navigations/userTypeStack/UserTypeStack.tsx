import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BOTTOM_TAB, CONSENTSCREEN, HEALTHONBOARDINGSCREEN, MEDICALRECORDSCREEN, ONBOARDINGSCREEN, OTPVERIFICATION, PROFILE, QUESTIONSSCREEN, USERTYPE,LOGIN, WELCOME, MYCONSENTSCREEN } from '../../appconstants';
import UserTypeScreen from '../../screens/UserTypeScreen';
import OTPScreen from '../../screens/OTPScreen';
import ConsentScreen from '../../screens/ConsentScreen';
import { BottomTabNavigation } from '../bottomStack';
import OnboardingScreen from '../../screens/OnboardingScreen';
import MealRecordScreen from '../../screens/MealRecordScreen';
import HealthOnboardingScreen from '../../screens/HealthOnboardingScreen';
import { QuestionsStackNavigator } from '../questionsStack/QuestionsStackNavigator';
import MyConsentScreen from '../../screens/MyConsentScreen';
import Myconsent from '../../template/Myconsent';

const UserTypeStack = createNativeStackNavigator();

export const UserTypeNavigator = () => {
	return (
		<UserTypeStack.Navigator
		 initialRouteName={USERTYPE}
		// initialRouteName={MYCONSENTSCREEN}
		 >
			<UserTypeStack.Screen
				name={USERTYPE}
				component={UserTypeScreen}
				options={{ headerShown: false }}
			/>
			<UserTypeStack.Screen
				name={OTPVERIFICATION}
				component={OTPScreen}
				options={{ headerShown: false }}
			/>
			<UserTypeStack.Screen
				name={CONSENTSCREEN}
				component={ConsentScreen}
				options={{ headerShown: false }}
			/>
			<UserTypeStack.Screen
				name={MYCONSENTSCREEN}
				component={MyConsentScreen}
				options={{ headerShown: false }}
			/>
			<UserTypeStack.Screen
				name={ONBOARDINGSCREEN}
				component={OnboardingScreen}
				options={{ headerShown: false }}
			/>
			<UserTypeStack.Screen
				name={MEDICALRECORDSCREEN}
				component={MealRecordScreen}
				options={{ headerShown: false }}
			/>
			<UserTypeStack.Screen
				name={HEALTHONBOARDINGSCREEN}
				component={HealthOnboardingScreen}
				options={{ headerShown: false }}
			/>
			<UserTypeStack.Screen
				name={BOTTOM_TAB}
				component={BottomTabNavigation}
				options={{ headerShown: false }} />

			<UserTypeStack.Screen
				name={QUESTIONSSCREEN}
				component={QuestionsStackNavigator}
				options={{ headerShown: false }}
			/>
		</UserTypeStack.Navigator>
	);
};
