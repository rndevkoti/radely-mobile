import React from 'react';
import ScreenContainer from '../Screencontainer';
import ResetPassword from '../template/ResetPassword';

const ResetPasswordScreen = () => {
  return (
    <ScreenContainer isBottomHasTab={false}>
      <ResetPassword />
    </ScreenContainer>
  );
};

export default ResetPasswordScreen;