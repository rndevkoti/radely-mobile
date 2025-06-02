import React from 'react';
import ScreenContainer from '../Screencontainer';
import Login from '../template/Login';

const LoginScreen = () => {
  return (
    <ScreenContainer isBottomHasTab={false}>
      <Login />
    </ScreenContainer>
  );
};

export default LoginScreen;