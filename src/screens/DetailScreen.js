import { onChange } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import React, {Fragment} from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { Cart } from '../db/database';
import MusicPlayer from './MusicPlayer';
import LinearGradient from 'react-native-linear-gradient';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Detail = ({ navigation, album }) => {
  const [element, setElement] = React.useState(Cart.list);
  const [quantity, setQuantity] = React.useState(1);
  
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
    setQuantity(1);
  }
  return (
    <View style={{flex:1}}>
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
          <View style={{marginHorizontal: 20, marginTop: 10, flex: 1}}>
            <ScrollView>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>About</Text>
              <Text style={style.info}> {album.description} </Text>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>Information</Text>
              <Text style={style.info}> Published year: {album.year} </Text>
              <Text style={style.info}> Number of songs: {album.songs.length} </Text>
            </ScrollView>
            <View
              style={{
              marginTop: 20,
                marginBottom: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity 
                  disabled={quantity < 2} 
                  activeOpacity = {quantity < 2 ? 1 : 0} 
                  style={style.borderBtn} 
                  onPress={remove}>
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
      </View>
  );
};



const DetailsScreen = ({ navigation, route }) => {
  const album = route.params;
  const screens = [
    <Detail navigation={navigation} album={album} />,
    <MusicPlayer album={album} />
  ]
  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" size={28} color='#000' />
          </TouchableOpacity>
          <View style={{position: 'relative', justifyContent: 'flex-end', marginTop: -8, marginLeft: WIDTH - 100}}>
          <View style={{
            backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
            height: 18,
            width: 18,
            marginBottom: -8,
            marginLeft: 18,
            zIndex: 5,
            borderRadius: 9,
            fontSize: 1
            }}>
            <Text>{Cart.count}</Text>
          </View> 
            <TouchableOpacity disabled = {!Cart.count} onPress={() => {navigation.navigate('Cart')}} >
              <Icon name="shopping-cart" size={28} color='#000' />
            </TouchableOpacity>
          </View>

        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontal
          style={style.wrap}
        >
          {screens.map((screen, index) => {
            return (
              <View key={index} style={style.wrap}>
                {screen}
              </View>
            );
          }
          )}
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#f0f0f0' }} />
    </Fragment>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT*0.91,
  },
  imageContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 2,
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
    textAlign: 'justify',
  }
});

export default DetailsScreen;
