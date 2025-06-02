import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {

	BOOKAPPOINMENT,
	CUNSULTATION,
	DASHBOARD,
	DOCTORPROFILE,
	SCHEDULECONSULTATION,
	SELECTPROVIDER,
} from '../../appconstants';
import DashboardScreen from '../../screens/DashboardScreen';
import ConsultationScreen from '../../screens/ConsultationScreen';
import DoctorProfile from '../../template/DoctorProfile';
import BookAppoinment from '../../template/BookAppoinment';
import ScheduleConsultation from '../../template/ScheduleConsultation';
import SelectProvider from '../../template/SelectProvider';
 
const ConsultationStack = createNativeStackNavigator();

export const ConsultationStackNavigator = () => {
	return (
		<ConsultationStack.Navigator
			initialRouteName={CUNSULTATION}
			screenOptions={{ headerShown: false }}>

			<ConsultationStack.Screen
				name={CUNSULTATION}
				component={ConsultationScreen}
			/>
			<ConsultationStack.Screen
				name={DOCTORPROFILE}
				component={DoctorProfile}
			/>

		<ConsultationStack.Screen
				name={BOOKAPPOINMENT}
				component={BookAppoinment}
			/>
				<ConsultationStack.Screen
				name={SCHEDULECONSULTATION}
				component={ScheduleConsultation}
			/>
				<ConsultationStack.Screen
				name={SELECTPROVIDER}
				component={SelectProvider}
			/>
  
		</ConsultationStack.Navigator>
	);
};
