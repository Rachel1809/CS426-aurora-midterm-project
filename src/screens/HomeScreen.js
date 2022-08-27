import React, {Fragment} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Dimensions
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme } from '@react-navigation/native';

import Card from '../components/ListAlbums';
import ListService from '../components/ListServices';
import Icon from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';

import TicketScreen from './TicketScreen';
import { Albums, Cart } from '../db/database';

const Tab = createBottomTabNavigator();
const WIDTH = Dimensions.get('window').width;

export function HomeStackScreen() {    
    return (
      <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size }) => {
            let iconName;
            let rn = route.name;
            
            if (rn === "Home") {
              iconName = "home"
            }
            else if (rn === "History") {
              iconName = "back-in-time"
            }

            return <Entypo name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#58641D',
          tabBarInactiveTintColor: '#000000',
          tabBarShowLabel: false,
          tabBarStyle: [{
            position: 'absolute',
            padding: 10, 
            height: 70,
            backgroundColor: '#ffffff',
            ...styles.shadow
          }],
          headerStyle: {
            backgroundColor: "#040F38",
            ...styles.shadow
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#F3A712",
          },
        })}>

        <Tab.Screen name={"Home"} component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name={"History"} component={TicketScreen} options={{headerShown: false}}/>

      </Tab.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  
  return (
    <Fragment>
    <SafeAreaView style={{flex:0, backgroundColor: '#58641d'}}/>
    <SafeAreaView style={{flex:1, backgroundColor: '#fff', paddingTop: -50}}>
      <View style={styles.greet_container}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <Text style={styles.brandText}>suki</Text>
          </View>
        </View>
        <View style={styles.cart}>
            <View>
                <TouchableOpacity disabled = {!Cart || Cart.count == 0} onPress={() => navigation.navigate("Noti")}>
                    <Icon name="notifications-outline" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
          </View>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Services</Text>
        <ListService navigation = {navigation}/>
      </ScrollView>
    </SafeAreaView>
    </Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  greet_container: {
    backgroundColor: '#58641d',
    borderBottomLeftRadius: 40,
    paddingBottom: 250,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  hello: {
      fontSize: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 15,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  header: {
    marginLeft: WIDTH*0.5 - 40
  },
  cart: {
    paddingLeft: 90,
    paddingRight: 24, 
    marginTop: 20
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  searchGuide: {
    paddingTop: 4,
    paddingLeft: 5,
    color: '#CBD2D0',
  },
  brand: {
    marginRight: Dimensions.get('window').width/20,
  },
  brandText: {
    fontFamily: 'PTSerif-Regular',
    fontSize: 40,
    color:'#fff'
  }
});

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
  },
  backgroundColor: 'transparent'
};