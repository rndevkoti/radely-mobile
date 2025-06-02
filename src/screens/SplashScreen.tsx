// src/screens/SplashScreen.tsx

import React from 'react';
import ScreenContainer from '../Screencontainer';
import Splash from '../template/Splash';

 

const SplashScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<Splash />
		</ScreenContainer>
	);
};

export default SplashScreen;

