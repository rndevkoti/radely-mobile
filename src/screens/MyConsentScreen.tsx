import React from 'react';
import ScreenContainer from '../Screencontainer';
import Consent from '../template/Consent';
import { Text } from 'react-native';
import Myconsent from '../template/Myconsent';

 

const ConsentScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<Myconsent />
		</ScreenContainer>
	);
};

export default ConsentScreen;
