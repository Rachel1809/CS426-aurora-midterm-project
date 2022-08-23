import React, {useEffect} from 'react';
import {StyleSheet, Animated, View, LogBox} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/screens';
import { useFonts } from 'expo-font';
import SplashScreen from './src/screens/SplashScreen';
const App = () => {
  const [loaded] = useFonts({
    "FredokaOne-Regular": require('./assets/fonts/FredokaOne-Regular.ttf'),
    "PTSerif-Regular": require('./assets/fonts/PTSerif-Regular.ttf'),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "RobotoCondensed-Bold": require("./assets/fonts/RobotoCondensed-Bold.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  })
  useEffect(() => {
    
    LogBox.ignoreAllLogs();
  });

  if (!loaded) {
    console.log('Cannot load');
  }

  return (
    <SafeAreaProvider>
      <View style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      <SplashScreen/>
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.04)',
        zIndex: 0,
        transform: [
            { translateY: 0 }
        ]
    }}>

      <Navigator />

    </Animated.View>
    </View>
    </SafeAreaProvider>
    
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;