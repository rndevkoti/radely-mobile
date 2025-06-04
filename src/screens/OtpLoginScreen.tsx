
import React from 'react';
import ScreenContainer from '../Screencontainer';
import VerifyOtpLogin from '../template/OtpVerifyLogin';

 

const OtpLoginScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={false}>
	  <VerifyOtpLogin/>
		</ScreenContainer>
	);
};

export default OtpLoginScreen;
