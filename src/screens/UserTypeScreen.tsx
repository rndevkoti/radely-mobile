import React, { useState } from 'react';
import ScreenContainer from '../Screencontainer';
import UserType from '../template/UserType';
import Profile from '../template/Profile';
import ProfileContinued from '../template/ProfileContinued';

const UserTypeScreen = () => {
  const [step, setStep] = useState(0); // Step 0: UserType, Step 1: Profile, etc.

  const handleContinue = () => {
    setStep(prev => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <UserType onContinue={handleContinue} step={step} />;
      case 1:
        return <Profile onContinue={handleContinue} step={step} />;
        case 2:
            return <ProfileContinued onContinue={handleContinue} step={step} />;      default:
        return null;
    }
  };

  return <ScreenContainer isBottomHasTab={false}>{renderStep()}</ScreenContainer>;
};

export default UserTypeScreen;
