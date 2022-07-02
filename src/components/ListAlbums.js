import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
const width = Dimensions.get('window').width / 2 - 30;

const Card = ({album}) => {
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
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: '#F3A712',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
                +
              </Text>
            </View>
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