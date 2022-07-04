import React from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Cart } from '../db/database';
import LinearGradient from 'react-native-linear-gradient';

const DetailsScreen = ({navigation, route}) => {
  const [element, setElement] = React.useState(Cart.list);
  const [quantity, setQuantity] = React.useState(1);
  const album = route.params;
  const add = () => {
    setQuantity(quantity + 1)
  }
  const remove = () => {
    setQuantity(quantity - 1)
  }

  const confirm = () => {
    const isFound = element.some(e => {
      if (e.id === album.id) {
        e.quantity += quantity;
        e.total = (e.quantity * e.price).toFixed(2);
        return true;
      }
    });
    if (!isFound) {
      Cart.list.push({
        id: album.id,
        name: album.name,
        artist: album.artist,
        price: album.price,
        quantity: quantity,
        total: (quantity * album.price).toFixed(2),
        cover: album.cover
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
    navigation.navigate('Cart');
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <View style={style.header}>
        <Icon name="arrow-left" size={28} onPress={() => navigation.goBack()} />
        <Icon name="shopping-cart" size={28} />
      </View>
      <View style={style.imageContainer}>
        <Image source={album.cover} style={{resizeMode: 'contain', flex: 1}} />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 5,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>{album.name}</Text>
          <Text style={{fontSize: 20, paddingTop: 10 }}>{album.artist}</Text>
          </View>
          <View style={style.priceTag}>
            <Text
              style={{
                marginHorizontal: 15,
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              ${album.price}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 10, flexWrap: 'wrap', flex: 1}}>
          <ScrollView>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>About</Text>
            <Text style={style.info}> {album.description} </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>Information</Text>
            <Text style={style.info}> Published year: {album.year} </Text>
            <Text style={style.info}> Number of songs: {album.songs.length} </Text>
          </ScrollView>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={style.borderBtn} onPress={remove}>
                <Text style={style.borderBtnText}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                {quantity}
              </Text>
              <TouchableOpacity style={style.borderBtn} onPress={add}>
                <Text style={style.borderBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={style.buyBtn} onPress={confirm}>
              <Text
                style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    height: 450,
    backgroundColor: '#f0f0f0',
    marginBottom: 7,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 170,
    height: 50,
    backgroundColor: '#040F38',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: '#F3A712',
    width: 100,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  info: {
    color: 'grey',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 5,
    marginRight: 75,
    textAlign: 'justify',
  }
});

export default DetailsScreen;