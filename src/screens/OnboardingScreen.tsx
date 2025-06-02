import React from 'react';
import ScreenContainer from '../Screencontainer';
import Splash from '../template/Splash';
import Onboarding from '../template/Onboarding';

 

const OnboardingScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<Onboarding />
		</ScreenContainer>
	);
};

export default OnboardingScreen;

