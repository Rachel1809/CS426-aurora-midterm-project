import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from './MapScreen';
import { Feather } from '@expo/vector-icons';


const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
    backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 24,
  }
})

const Tab = createBottomTabNavigator();

const Navigator = () => {
    
    return (
    <>
      <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size }) => {
            let iconName;
            let rn = route.name;
            
            if (rn === "Home") {
              iconName = "home"
            }
            else if (rn === "Maps") {
              iconName = "map-pin"
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          "tabBarActiveTintColor": '#F3A712',
          "tabBarInactiveTintColor": 'white',
          "tabBarShowLabel": false,
          "tabBarStyle": [{
            position: 'absolute',
            padding: 10, 
            height: 70,
            backgroundColor: '#040F38',
            borderRadius: 30,
            ...styles.shadow
          }]
        })}>

        <Tab.Screen name={"Home"} component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name={"Maps"} component={MapScreen} options={{headerShown: false}}/>

      </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;