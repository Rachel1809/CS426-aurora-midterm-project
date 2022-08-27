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
  import { Albums, Cart, Souvenirs } from '../db/database';

  const ShoppingScreen = ({ navigation }) => {
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', flexGrow: 1}}
      nestedScrollEnabled={true}>
        <View style={styles.greet_container}>
          <View style={styles.header}>
            <View style={{paddingTop: 6}}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" size={28} color='#000' />
                </TouchableOpacity>
            </View>
            <View style={styles.brand}>
              <Text style={styles.brandText}>souvenir</Text>
            </View>

            <View style={styles.cart}>
            <View>
                <TouchableOpacity disabled = {!Cart || Cart.count == 0} onPress={() => navigation.navigate("Cart")}>
                    <Icon name="shopping-cart" size={25} color="#000000" />
                </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1}>
          <TouchableOpacity style={styles.searchBar} onPress={()=>navigation.navigate('Search')}>
            <Icon name="search" size={25} color="#000000" />
            <Text style={styles.searchGuide}>Search for an animal</Text>
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
          data={Souvenirs}
          renderItem={({item}) => {
            return <Card navigation={navigation} album={item} />;
          }}
        />
      </ScrollView>
    </SafeAreaView>
    
  );
};

export default ShoppingScreen;

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
    fontSize: 20,
    paddingBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cart: {
    alignItems: 'flex-end',
    paddingBottom: 24,
    paddingTop: 6,
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
    paddingLeft: 72,
  },
  brandText: {
    fontFamily: "FredokaOne-Regular",
    fontSize: 28
  }
});

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
  },
  backgroundColor: 'transparent'
};