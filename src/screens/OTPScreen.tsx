import React from 'react';
import ScreenContainer from '../Screencontainer';
import OtpVerification from '../template/OTPVerification';

 

const OTPScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
			<OtpVerification />
		</ScreenContainer>
	);
};

export default OTPScreen;

