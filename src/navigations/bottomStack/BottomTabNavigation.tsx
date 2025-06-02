import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator } from '../homeStack/HomeStackNavigator';
import {  CUNSULTATION, DASHBOARD, DASHBOARDSTACK, HISTORY, PROFILETAB } from '../../appconstants';
import { ConsultationNavTab, DashboardNavTab, HistoryNavTab, ProfileNavTab } from '../../Tabs';
import { HistoryStackNavigator } from '../historyStack/HistoryStackNavigator';
import { ProfileStackNavigator } from '../profileStack/ProfileStackNavigator';
import { ConsultationStackNavigator } from '../consultationStack/ConsultationStackNavigator';
  
const Tab = createBottomTabNavigator();
export const BottomTabNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName={DASHBOARDSTACK}
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					flex: 1,
					flexWrap: 'wrap',
					position: 'absolute',
					bottom: 0,
					paddingTop: 0,
					paddingBottom: 0,
					backgroundColor: '#FAFAFA',
					height: 84,
					borderTopWidth: 1,
					elevation: 5,
				},
			}}>
			<Tab.Screen
				name={DASHBOARDSTACK}
				component={HomeStackNavigator}
				options={{
					...DashboardNavTab(),
 					tabBarAccessibilityLabel: '',
				}} />
			<Tab.Screen
				name={CUNSULTATION}
				component={ConsultationStackNavigator}
				options={{
					...ConsultationNavTab(),
 					tabBarAccessibilityLabel: '',
				}} />
				
			<Tab.Screen
				name={HISTORY}
				component={HistoryStackNavigator}
				options={{
					...HistoryNavTab(),
 					tabBarAccessibilityLabel: '',
				}} />
				<Tab.Screen
				name={PROFILETAB}
				component={ProfileStackNavigator}
				options={{
					...ProfileNavTab(),
 					tabBarAccessibilityLabel: '',
				}} />
		</Tab.Navigator>
	);
};
