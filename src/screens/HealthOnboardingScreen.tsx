// src/screens/SplashScreen.tsx

import React from 'react';
import ScreenContainer from '../Screencontainer';
import HealthOnboarding from '../template/HealthOnboarding';
 
 

const HealthOnboardingScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<HealthOnboarding />
		</ScreenContainer>
	);
};

export default HealthOnboardingScreen;

