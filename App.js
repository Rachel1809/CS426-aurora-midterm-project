import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigator from './src/screens';
import { useFonts } from 'expo-font';

const App = () => {
  const [loaded] = useFonts({
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