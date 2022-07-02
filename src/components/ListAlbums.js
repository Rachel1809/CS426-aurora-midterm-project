import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {Cart} from '././../db/database';
const width = Dimensions.get('window').width / 2 - 30;

const Card = ({ navigation, album }) => {
  const [element, setElement] = React.useState(Cart.list); 
  const addToCart = (item) => {
    const isFound = element.some(e => {
      if (e.name === item.name) {
        e.quantity += 1;
        e.total = (e.quantity * e.price).toFixed(2);
      }
    });
    if (!isFound) {
      Cart.list.push({
        name: item.name,
        price: item.price,
        quantity: 1,
        total: item.price,
      });
      setElement(Cart.list);
    }
    Cart.sum = Cart.list.reduce((acc, cur) => {
      let s = acc + parseFloat(cur.total)
      s = parseFloat(s.toFixed(2));
      return s;
    }, 0);
    Cart.count = Cart.list.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', album)}>
      <View style={styles.card}>
        <View
          style={{
            height: 100,
            alignItems: 'center',
          }}>
          <Image
            source={album.cover}
            style={{flex: 1, resizeMode: 'contain'}}
          />
        </View>

        <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
          {album.name}
        </Text>
        <Text numberOfLines={1} style={{fontSize: 16, marginTop: 3}}>
          {album.artist}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: '#040F38'}}>
            ${album.price}
          </Text>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              backgroundColor: '#F3A712',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -5,
            }}
            onPress={() => addToCart(album)}
          >
            <Text
              style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  each: {
    paddingBottom: 8,
    height: 0.1,
    width: 0.1,
  },
  icon: {
    padding: 10,
    backgroundColor: 'white',
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {height: 10, width: 2},
    shadowOpacity: 0.7,
    shadowRadius: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    marginBottom: 20
  },
  card: {
    height: 225,
    width,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    paddingTop: 20,
  },
});