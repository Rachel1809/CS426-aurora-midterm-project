import React from 'react';
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
import Icon from 'react-native-vector-icons/Feather';
import MapScreen from './MapScreen';
import { Albums, Cart } from '../db/database';


const Tab = createBottomTabNavigator();

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
            else if (rn === "Maps") {
              iconName = "map-pin"
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F3A712',
          tabBarInactiveTintColor: '#ffffff',
          tabBarShowLabel: false,
          tabBarStyle: [{
            position: 'absolute',
            padding: 10, 
            height: 70,
            backgroundColor: '#040F38',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
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
        <Tab.Screen name={"Maps"} component={MapScreen} options={{headerShown: false}}/>

      </Tab.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', flexGrow: 1}}
    nestedScrollEnabled={true}>
      <View style={styles.greet_container}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <Text style={styles.brandText}>aurora</Text>
          </View>
          <View style={styles.cart}>
          <View style={{}}>
          <TouchableOpacity disabled = {!Cart || Cart.count == 0} onPress={() => navigation.navigate("Cart")}>
            <Icon name="shopping-cart" size={25} color="#000000" />
          </TouchableOpacity>
          </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1}>
          <TouchableOpacity style={styles.searchBar} onPress={()=>navigation.navigate('Search')}>
            <Icon name="search" size={25} color="#000000" />
            <Text style={styles.searchGuide}>What album motivates you today?</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>All items</Text>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={Albums}
          renderItem={({item}) => {
            return <Card navigation={navigation} album={item} />;
          }}
        />
      </ScrollView>
    </SafeAreaView>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  greet_container: {
    flex: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 18,
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
    fontSize: 24,
    paddingBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    marginRight: Dimensions.get('window').width/4 - 12,
  },
  brandText: {
    fontFamily: "FredokaOne-Regular",
    fontSize: 40,
  }
});

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
  },
  backgroundColor: 'transparent'
};