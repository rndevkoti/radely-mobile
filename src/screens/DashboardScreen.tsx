
import React from 'react';
import ScreenContainer from '../Screencontainer';
import Dashboard from '../template/Dashboard';


const DashboardScreen = () => {
	return (
		<ScreenContainer isBottomHasTab={true}>
			<Dashboard />
		</ScreenContainer>
	);
};

export default DashboardScreen;
