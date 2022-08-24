import {StyleSheet, Animated, View, LogBox} from 'react-native';
import Navigator from './src/screens';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from "react";
import { firebase } from "./src/db/config";

import Login from './src/screens/Login';
import Registration from './src/screens/Registration';
import Welcome from './src/screens/Welcome';

const Stack = createStackNavigator();

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

  const [initial, setInitial] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initial) {
      setInitial(false);
    }
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }
  , []);

  if (initial) {
    return null;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
  else {
    return (
      <Navigator/>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;