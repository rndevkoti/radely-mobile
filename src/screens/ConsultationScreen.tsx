
import React from 'react';
import ScreenContainer from '../Screencontainer';
import Consultation from '../template/Consultation';
 

const ConsultationScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={true}>
			<Consultation />
		</ScreenContainer>
	);
};

export default ConsultationScreen;
