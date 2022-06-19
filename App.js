import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigator from './src/screens';
import { useFonts } from 'expo-font';

const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require('./assets/fonts/Roboto-Black.ttf'),
    "Roboto-Medium" : require('./assets/fonts/Roboto-Medium.ttf'),
    "RobotoCondensed-Regular" : require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    "RobotoCondensed-Bold" : require('./assets/fonts/RobotoCondensed-Bold.ttf'),
    "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
  })

  if(!loaded){
    return null;
  }
  return <Navigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;