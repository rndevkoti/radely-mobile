import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  WELCOME } from '../../appconstants';
import WelcomeScreen from '../../screens/WelcomeScreen';
import LoginScreen from '../../screens/LoginScreen';
 
const WelcomeStack = createNativeStackNavigator();

export const WelcomeNavigator = () => {
	return (
		<WelcomeStack.Navigator initialRouteName={WELCOME}>
			<WelcomeStack.Screen
				name={WELCOME}
				component={WelcomeScreen}
				options={{ headerShown: false }}
			/>
 <WelcomeStack.Screen
    name="Login"
    component={LoginScreen}
    options={{ headerShown: false }}
  />
		</WelcomeStack.Navigator>
	);
};
