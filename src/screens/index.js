import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import {HomeStackScreen} from '../screens/HomeScreen';
import CartScreen from './CartScreen';
import SearchScreen from './SearchScreen';
import DetailsScreen from './DetailScreen';
import BookingScreen from './BookScreen';
import MapScreen from './MapScreen';
import ShoppingScreen from './ShoppingScreen';
import ExploreScreen from './ExploreScreen';
import NotiScreen from './NotiScreen';
import TicketScreen from './TicketScreen';
import TourScreen from './TourScreen';
import AnimalScreen from './AnimalScreen';
import PaymentProvider from './PaymentProvider';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
    backgroundColor: 'transparent'
};

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
          <HomeStack.Screen name="Booking" component={BookingScreen} />
          <HomeStack.Screen name="Maps" component={MapScreen} />
          <HomeStack.Screen name="Shopping" component={ShoppingScreen} />
          <HomeStack.Screen name="Explore" component={ExploreScreen} />
          <HomeStack.Screen name="Noti" component={NotiScreen} />
          <HomeStack.Screen name="Ticket" component={TicketScreen} />
          <HomeStack.Screen name="Tour" component={TourScreen} />
          <HomeStack.Screen name="Animal" component={AnimalScreen} />
          <HomeStack.Screen name="PaymentProvider" component={PaymentProvider} options={{gestureEnabled: false}}/>
        </HomeStack.Navigator>
      </NavigationContainer>
    );
}

export default Navigator;