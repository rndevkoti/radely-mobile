import { View, Image, StyleSheet, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { windowHeight } from "../utils/heightWidth";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { LANGUAGE } from "../appconstants";
const { height } = Dimensions.get('window');

const Splash: React.FC = () => {

    const navigation = useNavigation<any>(); 

    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate(LANGUAGE);
      }, 2000);
  
      return () => clearTimeout(timer); // Clean up timer
    }, [navigation]);

    return (
      <LinearGradient
        colors={['#60A98C', '#1C2B2F']}
        style={styles.container}
      >
        <View style={styles.content}>
          <Image
            source={require('../assets/splash-logo.png')} // Place your logo here
            style={styles.logo}
            resizeMode="contain"
          />
         </View>
      </LinearGradient>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: windowHeight
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: height * 0.1,
      height: windowHeight
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      fontFamily: 'Snell Roundhand', // Or use a custom font
      color: '#B8EAD6',
    },
  });
  
  export default Splash;
  