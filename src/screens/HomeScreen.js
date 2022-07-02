import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../components/ListAlbums';
import Icon from 'react-native-vector-icons/Feather';
import { Albums } from '../db/database';
import CartScreen from './CartScreen';
import SearchScreen from './SearchScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const HomeStack  = createStackNavigator();

export function HomeStackScreen() {
    return (
      <HomeStack.Navigator screenOptions={{
          headerShown: false
      }}>
        <HomeStack.Screen name="Aurora" component={HomeScreen} />
        <HomeStack.Screen name="Search" component={SearchScreen} />
        <HomeStack.Screen name="Cart" component={CartScreen} />
      </HomeStack.Navigator>
    );
  }

const HomeScreen = ({ navigation }) => {
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexGrow: 1}}
    nestedScrollEnabled={true}>
      <View style={styles.greet_container}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <Text style={styles.brandText}>Aurora</Text>
          </View>

          <View style={styles.cart}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Icon name="shopping-cart" size={25} color="#000" />
          </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1}>
          <TouchableOpacity style={styles.searchBar} onPress={()=>navigation.navigate('Search')}>
            <Icon name="search" size={25} color="#000" />
            <Text style={styles.searchGuide}>What album motivates you today?</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Category</Text>
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
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    alignItems: 'left',
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#000',
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
    marginRight: 120
  },
  brandText: {
    fontFamily: "FredokaOne-Regular",
    fontSize: 24,
  }
});