// src/screens/SplashScreen.tsx

import React from 'react';
import ScreenContainer from '../Screencontainer';
import MedicalRecord from '../template/MedicalRecord';

 

const MealRecordScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<MedicalRecord />
		</ScreenContainer>
	);
};

export default MealRecordScreen;

