import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';
 
export const navigationRef = createNavigationContainerRef();

export function navigate(name) {
	if (navigationRef.isReady()) {
		try {
			navigationRef.navigate(name);
		} catch (e) {
			console.log('Error', e); // For catch the error
		}
	}
}
