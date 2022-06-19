import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import InputScreen from '../screens/InputScreen'
const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};


const Navigator = () => {
    
    return (
    <>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
                  />
            <Stack.Screen
                name="Input"
                component={InputScreen}
                options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;