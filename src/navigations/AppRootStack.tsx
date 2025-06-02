import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { memo, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { APP_ROOT, USER_TYPE } from '../appconstants';
import { navigationRef } from './NavigationHelper';
import { SplashNavigator } from './splashStack/SplashStack';
import { useProfile } from '../context/ProfileContext';

const RootStack = createNativeStackNavigator();

const SplashWrapper = memo(() => {
  return (
    <View style={{ flex: 1 }}>
      <SplashNavigator />
    </View>
  );
});

export const AppRootNavigator = () => {
  const { setLastVisitedQuestionStep, Navstep } = useProfile();
  const appState = useRef(AppState.currentState);
  const hasHandledInitialNavigation = useRef(false); // ensure this runs only once

  // Run once on mount to handle resume logic
  useEffect(() => {
    if (navigationRef.isReady() && !hasHandledInitialNavigation.current) {
      hasHandledInitialNavigation.current = true;

      if (Navstep !== 0) {
        console.log('Resuming signup, navigating to USER_TYPE with Navstep:', Navstep);
        setLastVisitedQuestionStep(Navstep);
        navigationRef.reset({
          index: 0,
          routes: [{ name: USER_TYPE }],
        });
      }
    }
  }, [Navstep, setLastVisitedQuestionStep]);

  // Handle app coming back from background
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const wasInBackground =
        appState.current.match(/inactive|background/) && nextAppState === 'active';

      appState.current = nextAppState;

      if (wasInBackground && navigationRef.isReady() && Navstep !== 0) {
        console.log('App resumed. Navigating to USER_TYPE with Navstep:', Navstep);
        setLastVisitedQuestionStep(Navstep);
        navigationRef.reset({
          index: 0,
          routes: [{ name: USER_TYPE }],
        });
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [Navstep, setLastVisitedQuestionStep]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={APP_ROOT}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen
          name={APP_ROOT}
          options={{ headerLeft: () => null }}
          component={SplashWrapper}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
