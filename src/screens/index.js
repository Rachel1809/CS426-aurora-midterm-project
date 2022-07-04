import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen, {HomeStackScreen} from '../screens/HomeScreen';
import CartScreen from './CartScreen';
import SearchScreen from './SearchScreen';
import DetailsScreen from './DetailScreen';

import { Feather } from '@expo/vector-icons';


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
    shadowRadius: 21,
    elevation: 24,
  }
})

const HomeStack  = createStackNavigator();

const Navigator = () => {
    return (
      <NavigationContainer theme={theme}>
        <HomeStack.Navigator screenOptions={{
            headerShown: false
        }}>
          <HomeStack.Screen name="Aurora" component={HomeStackScreen} />
          <HomeStack.Screen name="Search" component={SearchScreen} />
          <HomeStack.Screen name="Cart" component={CartScreen} />
          <HomeStack.Screen name="Details" component={DetailsScreen} />
        </HomeStack.Navigator>
      </NavigationContainer>
    );
}

export default Navigator;