import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {

	DASHBOARD,
	HOME,

} from '../../appconstants';
import DashboardScreen from '../../screens/DashboardScreen';
 
const ProfileStack = createNativeStackNavigator();

export const ProfileStackNavigator = () => {
	return (
		<ProfileStack.Navigator
			initialRouteName={DASHBOARD}
			screenOptions={{ headerShown: false }}>

			<ProfileStack.Screen
				name={DASHBOARD}
				component={DashboardScreen}
			/>

		</ProfileStack.Navigator>
	);
};
