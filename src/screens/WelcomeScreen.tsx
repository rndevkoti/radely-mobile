import React from 'react';
import ScreenContainer from '../Screencontainer';
import Welcome from '../template/Welcome';

 

const WelcomeScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<Welcome />
		</ScreenContainer>
	);
};

export default WelcomeScreen;

