import React, {useRef} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigator from './src/screens';
import { useFonts } from 'expo-font';

const App = () => {
  const [loaded] = useFonts({
    "FredokaOne-Regular": require('./assets/fonts/FredokaOne-Regular.ttf'),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "RobotoCondensed-Bold": require("./assets/fonts/RobotoCondensed-Bold.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  })

  if (!loaded) {
    console.log('Cannot load');
  }

  return <Navigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;