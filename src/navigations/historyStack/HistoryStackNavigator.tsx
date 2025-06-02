import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {

	DASHBOARD,
	HOME,

} from '../../appconstants';
import DashboardScreen from '../../screens/DashboardScreen';
 
const HistoryStack = createNativeStackNavigator();

export const HistoryStackNavigator = () => {
	return (
		<HistoryStack.Navigator
			initialRouteName={DASHBOARD}
			screenOptions={{ headerShown: false }}>

			<HistoryStack.Screen
				name={DASHBOARD}
				component={DashboardScreen}
			/>

		</HistoryStack.Navigator>
	);
};
