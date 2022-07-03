import React from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const DetailsScreen = ({navigation, route}) => {
  const album = route.params;
  console.log(album);
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
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>-</Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                1
              </Text>
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>+</Text>
              </View>
            </View>

            <View style={style.buyBtn}>
              <Text
                style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
                Add to Cart
              </Text>
            </View>
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