import React, { useState } from 'react';
import ScreenContainer from '../Screencontainer';
import AlcoholUse from '../template/Questions/AlcoholUse';
import Depression from '../template/Questions/Depression';
import FinancialResources from '../template/Questions/FinancialResources';
import FoodSecurity from '../template/Questions/FoodSecurity';
import Physical from '../template/Questions/Physical';
import Postpartum from '../template/Questions/Postpartum';
import Safety from '../template/Safety';
import Security from '../template/Questions/Security';
import Social from '../template/Questions/Social';
import Stress from '../template/Questions/Stress';
import Tobacco from '../template/Questions/Tobacco';
import Transportation from '../template/Questions/Transportation';
import Utilities from '../template/Questions/Utilities';
import { useProfile } from '../context/ProfileContext';
import HousingSecurity from '../template/Questions/HousingSecurity';
import RelationshipSafety from '../template/Questions/RelationshipSafety';
import PostpartumWellbeing from '../template/Questions/PostpartumWellbeing';


const QuestionScreens = () => {
    const { Navstep, setNavStep, lastVisitedQuestionStep } = useProfile();

    const handleContinue = () => {
        setNavStep(prev => prev + 1);
    };

    const renderStep = () => {
       // switch (lastVisitedQuestionStep != 0 ? lastVisitedQuestionStep : Navstep) {
            switch (Navstep) {
            case 0:
                return <AlcoholUse onContinue={handleContinue} step={Navstep} />;
            case 1:
                return <Depression onContinue={handleContinue} step={Navstep} />;
            case 2:
                return <FinancialResources onContinue={handleContinue} step={Navstep} />;
            case 3:
                return <FoodSecurity onContinue={handleContinue} step={Navstep} />;
            case 4:
                return <HousingSecurity onContinue={handleContinue} step={Navstep} />;
            case 5:
                return <RelationshipSafety onContinue={handleContinue} step={Navstep} />;
            case 6:
                return <Physical onContinue={handleContinue} step={Navstep} />;
            case 7:
                return <PostpartumWellbeing onContinue={handleContinue} step={Navstep} />;
            case 8:
                return <Social onContinue={handleContinue} step={Navstep} />;
            case 9:
                return <Stress onContinue={handleContinue} step={Navstep} />;
            case 10:
                return <Tobacco onContinue={handleContinue} step={Navstep} />;
            case 11:
                return <Transportation onContinue={handleContinue} step={Navstep} />;
            case 12:
                return <Utilities onContinue={handleContinue} step={Navstep} />;

            default:
                return null;
        }
    };

    return <ScreenContainer isBottomHasTab={false}>{renderStep()}</ScreenContainer>;
};

export default QuestionScreens;
