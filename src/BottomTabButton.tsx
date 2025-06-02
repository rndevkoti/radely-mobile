import { StyleProp, TextStyle, Text,Image, View,  Dimensions, StyleSheet } from 'react-native';
 
 
interface ButtonProps {
 label?: string;
 onPress?: () => void;
 labelStyle?: StyleProp<TextStyle>;
 accessibilityLabel?: string;
 dataId: string;
 icon?: any;
 focus?: boolean;
}
const screenWidth = Dimensions.get('screen').width;
const BottomTabButton = ({ label, dataId, icon, focus, accessibilityLabel }: ButtonProps) => {
 
 const ICON_ACTIVE = [{ tintColor: focus ? '#63BDA8' : '#858789' }];
 const LABEL_ACTIVE = [{ color: focus ? '#3A3B3B' : '#A3A5A8' }];
 const BG = [
  {
   backgroundColor: '#FAFAFA'  ,
   height: 24,
   width: screenWidth / 7,
  },
 ];
 const style = bottomButtonStyle()
 return (
  <View testID={dataId} accessibilityLabel={accessibilityLabel} style={BG}>
      <Image source={icon} style={[style.btmTabBtnTabIconStyle, ICON_ACTIVE]} />
      <Text style={[style.btmTabBtnTintLabel, LABEL_ACTIVE]}>{label}</Text>
      </View>
 );
};

export default BottomTabButton;

export const bottomButtonStyle = () => {
    return StyleSheet.create({
btmTabBtnTabIconStyle: {
    resizeMode: 'contain',
    width: 23,
    height: 23,
    alignSelf: 'center',
    marginTop: 10,
   },
   btmTabBtnTintLabel: {
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: 11,
    marginTop: 10,
   }
});
};