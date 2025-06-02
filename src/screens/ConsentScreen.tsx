import React from 'react';
import ScreenContainer from '../Screencontainer';
import Consent from '../template/Consent';

 

const ConsentScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<Consent />
		</ScreenContainer>
	);
};

export default ConsentScreen;

