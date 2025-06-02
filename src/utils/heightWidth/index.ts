import { Dimensions, Platform } from 'react-native';

//Get window width
const windowWidth = Dimensions.get('window').width;
//Get window height
const windowHeight = Dimensions.get('window').height;

//Get screen width
const screenWidth = Dimensions.get('screen').width;
//Get screen height
const screenHeight = Dimensions.get('screen').height;

//Get ios device operating system type
const IosPlatform = Platform.OS === 'ios';
//Get android device operating system type
const AndroidPlatform = Platform.OS === 'android';

//Totale bottom tab navigation height to set proper screen
const BottomTabHeight = 84;

export {
	windowWidth,
	windowHeight,
	screenHeight,
	screenWidth,
	IosPlatform,
	AndroidPlatform,
	BottomTabHeight,
};
