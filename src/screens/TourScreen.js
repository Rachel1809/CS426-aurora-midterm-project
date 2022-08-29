import React, { useState } from "react";
import { 
    View, 
    ImageBackground, 
    Text, 
    StyleSheet, 
    Dimensions, 
    FlatList, 
    TouchableOpacity, 
    Alert 
} from "react-native";

import { useStripe } from "@stripe/stripe-react-native";
import {Ticket, History} from '../db/database';
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

import Icon from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

//ADD localhost address of your server

const TourScreen = ({navigation, route}) => {
    const item = route.params
    return (
        <View style={styles.container}>
            <View style={{paddingLeft: 20, paddingTop: 6, paddingBottom: 16}}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" size={28} color='#fff' />
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10, padding: 10}}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.name}</Text>
            </View>
            <ImageBackground 
                source={item.cover}
                resizeMode="cover"
                style={styles.image} 
                imageStyle={{ borderRadius: 10, opacity: 0.9, backgroundColor: '#000'}}
            ></ImageBackground>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: height/4 - 40, padding: 10}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>No info to show</Text>
            </View>
            </View>
        </View>

  );
};
export default TourScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#58641d'
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    height: height - 180,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  cardContainer: {
    height,
    marginVertical: 30,
  },
  ticketDetail: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 10
  },
  ticketTitle: {
    fontSize: 16
  },
  ticketInfo: {
    fontSize: 18, 
    fontWeight: 'bold'
  },
  image: {
    height: 175,
    alignItems: 'center',
    borderRadius: 10,
  },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: '#8B5D33',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  cancelBtn: {
    width: 130,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8B5D33',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});