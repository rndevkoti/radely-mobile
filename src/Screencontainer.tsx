import * as React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { screenWidth, windowHeight, BottomTabHeight } from './utils/heightWidth';
import { useHeaderHeight } from '@react-navigation/elements';

type ScreenContainerProps = {
	children: any;
	chatBot?: any;
	isBottomHasTab?: boolean;
};

function ScreenContainer({ children,  isBottomHasTab = true }: ScreenContainerProps) {
 	const headerHeight = useHeaderHeight();
	//  const headerHeight = (() => {
	// 	try {
	// 	  return useHeaderHeight();
	// 	} catch {
	// 	  return 0;
	// 	}
	//   })();
	const KeyBoardStyle = { backgroundColor: 'white' };
	let ScrollViewStyle = {};
	if (isBottomHasTab) {
		ScrollViewStyle = {
			flex: 1,
			backgroundColor: 'white',
			width: screenWidth,
			height: windowHeight - (BottomTabHeight + headerHeight),
		};
	} else {
		ScrollViewStyle = {
			flex: 1,
			backgroundColor: 'white',
			width: screenWidth ,
		};
	}
	const FLEX = { flex: 1, backgroundColor: 'white' };
	return (
		<SafeAreaView style={FLEX}>
			<KeyboardAwareScrollView
				extraHeight={windowHeight * 0.13}
				style={KeyBoardStyle}
				enableOnAndroid={true}
				nestedScrollEnabled
				keyboardDismissMode="on-drag"
				bounces={false}
				enableAutomaticScroll={Platform.OS === 'ios'}
				keyboardShouldPersistTaps="handled">
				<StatusBar
					backgroundColor={'white'}
					barStyle={'dark-content'}
					hidden={false}
				/>
				<ScrollView
					style={ScrollViewStyle}
					keyboardShouldPersistTaps={'handled'}
					keyboardDismissMode="on-drag"
					nestedScrollEnabled
					bounces={false}>
					{children}
				</ScrollView>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

export default ScreenContainer;
