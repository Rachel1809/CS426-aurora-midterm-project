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

import MapScreen from './MapScreen';
import { Albums, Cart } from '../db/database';

const Tab = createBottomTabNavigator();
const WIDTH = Dimensions.get('window').width;

const OptionItem = ({icon, bgColor, label, onPress, navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate(onPress)}
    >
      <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30}]}>
        <View style={[{alignItems: 'center', width: 60, height: 60, backgroundColor: '#fff', borderRadius: 13}]}>
          <View
            style = {{flex: 1, justifyContent: 'center'}}
          >
            <Entypo name = {icon} color = {bgColor} size={32}/>
          </View>
        </View>
        <Text style={{marginVertical: 10, fontSize: 12}}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}


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
        <Tab.Screen name={"History"} component={HomeScreen} options={{headerShown: false}}/>

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
    flex: 0.3,
    backgroundColor: '#58641d',
    borderBottomLeftRadius: 40,
    paddingBottom: 250
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
    justifyContent: 'center',
    marginLeft: WIDTH*0.5 - 40
  },
  cart: {
    alignItems: 'flex-end',
    paddingBottom: 24,
    paddingTop: 12
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
    marginRight: Dimensions.get('window').width/4 + 16,
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