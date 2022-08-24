import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export const listServices = [
  {
    icon: 'ticket',
    label: 'Booking',
    bgColor: '#58641D',
    screen: 'Booking'
  },
  {
    icon: 'shopping-basket',
    label: 'Shopping',
    bgColor: '#58641D',
    screen: 'Shopping'
  },
  {
    icon: 'map',
    label: 'Map',
    bgColor: '#58641D',
    screen: 'Maps'
  },
  {
    icon: 'compass',
    label: 'Explore',
    bgColor: '#58641D',
    screen: 'Explore'
  },

];

const renderServiceItem = (item, navigation) => {
  return (
    <View key={item.label} style={styles.items}>
      <View style={styles.each}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Entypo name={item.icon} color={item.bgColor} size={32}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemText}>{item.label}</Text>
    </View>
  );
};

const ListService = ({navigation}) => {
  return (
    <View>
      <View style={styles.list}>{listServices.map((item) => renderServiceItem(item, navigation))}</View>
    </View>
  );
};

export default ListService;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: 10,
  },
  each: {
    paddingBottom: 8
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
});