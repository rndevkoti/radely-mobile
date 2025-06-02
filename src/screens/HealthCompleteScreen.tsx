// src/screens/SplashScreen.tsx

import React from 'react';
import ScreenContainer from '../Screencontainer';
import HealthComplete from '../template/Questions/HealthComplete';

 

const HealthCompleteScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<HealthComplete />
		</ScreenContainer>
	);
};

export default HealthCompleteScreen;

