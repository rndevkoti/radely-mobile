import React from 'react';
import BottomTabButton from './BottomTabButton';


export const DashboardNavTab = (label = 'Dashboard') => {
 return {
  tabBarLabel: () => '',
  tabBarIcon: ({ focused }: any) => (
   <BottomTabButton
    label={label}
    dataId={''}
    icon={require('../src/assets/state-layer.png')} 
    accessibilityLabel={'true'}
    focus={focused}
   />
  ),
 };
};

export const ConsultationNavTab = (label = 'Consultation') => {
 return {
  tabBarLabel: () => '',
  tabBarIcon: ({ focused }: any) => (
   <BottomTabButton
    label={label}
    dataId={''}
    icon={require('../src/assets/chat-circle.png')}
    accessibilityLabel={'true'}
    focus={focused}
   />
  ),
 };
};

export const HistoryNavTab = (label = 'History') => {
 return {
  tabBarLabel: () => '',
  tabBarIcon: ({ focused }: any) => (
   <BottomTabButton
    label={label}
    dataId={''}
    icon={require('../src/assets/scroll.png')}
    accessibilityLabel={'true'}
    focus={focused}
   />
  ),
 };
};

export const ProfileNavTab = (label = 'Profile') => {
 return {
  tabBarLabel: () => '',
  tabBarIcon: ({ focused }: any) => (
   <BottomTabButton
    label={label}
    dataId={''}
    icon={require('../src/assets/user-circle.png')}
    accessibilityLabel={'true'}
    focus={focused}
   />
  ),
 };
};