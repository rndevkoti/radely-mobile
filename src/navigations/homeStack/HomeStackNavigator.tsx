import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {

	DASHBOARD,
} from '../../appconstants';
import DashboardScreen from '../../screens/DashboardScreen';
 
const HomeStack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
	return (
		<HomeStack.Navigator
			initialRouteName={DASHBOARD}
			screenOptions={{ headerShown: false }}>

			<HomeStack.Screen
				name={DASHBOARD}
				component={DashboardScreen}
			/>

		</HomeStack.Navigator>
	);
};
