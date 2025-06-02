import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
 	HEALTHCOMPLETESCREEN,
	QUESTIONS,
 } from '../../appconstants';
import QuestionScreens from '../../screens/QuestionScreens';
import HealthCompleteScreen from '../../screens/HealthCompleteScreen';
 
const QuestionsStack = createNativeStackNavigator();

export const QuestionsStackNavigator = () => {
	return (
		<QuestionsStack.Navigator
			initialRouteName={QUESTIONS}
			screenOptions={{ headerShown: false }}>

			<QuestionsStack.Screen
				name={QUESTIONS}
				component={QuestionScreens}
			/>
		 <QuestionsStack.Screen
				name={HEALTHCOMPLETESCREEN}
				component={HealthCompleteScreen}
				options={{ headerShown: false }}
			/>
		</QuestionsStack.Navigator>
	);
};
