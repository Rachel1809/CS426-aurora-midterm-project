import React, { useState } from "react";
import { 
    View, 
    SafeAreaView, 
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

const {width, height} = Dimensions.get('window');

//ADD localhost address of your server
const API_URL = "https://denim-periodic-clerk.glitch.me";

const Payment = () => {
    const navigation = useNavigation();
    const email = Ticket.email;
    let amount = 0;

    const stripe = useStripe();

    const itemRender = (visitDate, name, adult, kid, total) => {
        amount = total;
        return (
            <View>
                <View style={styles.ticketDetail}>
                    <Text style={styles.ticketTitle}>Visit Date</Text>
                    <Text style={styles.ticketInfo}>{moment(visitDate).format("MMM Do YYYY")}</Text>
                  </View>
                  <View style={styles.ticketDetail}>
                    <Text style={styles.ticketTitle}>Visitors</Text>
                    <Text style={styles.ticketInfo}>{adult} adult(s), {kid} kid(s)</Text>
                  </View>
                  <View style={styles.ticketDetail}>
                    <Text style={styles.ticketTitle}>Type</Text>
                    <Text style={styles.ticketInfo}>{name}</Text>
                  </View>
                  <View style={styles.ticketDetail}>
                    <Text style={styles.ticketTitle}>Total payment</Text>
                    <Text style={styles.ticketInfo}>${total}</Text>
                  </View>
            </View>
        )
    }

    const clear = () => {
        Ticket.sum = 0;
        Ticket.list = [];
        navigation.navigate('Booking');
    }

    const buy = async () => {
    try {
        const finalAmount = parseInt(amount);
        

        const response = await fetch(`${API_URL}/buy`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                
            },
            body: JSON.stringify({ amount: finalAmount, email: email }),
        });
        const data = await response.json();
        if (!response.ok) {
            clear();

            return Alert.alert(data.message);
            
        }
        const initSheet = await stripe.initPaymentSheet({
            paymentIntentClientSecret: data.clientSecret,
        });
        if (initSheet.error) {
            console.error(initSheet.error);
            clear();


            return Alert.alert(initSheet.error.message);
        }
        const presentSheet = await stripe.presentPaymentSheet({
            clientSecret: data.clientSecret,
        });
        if (presentSheet.error) {
            console.error(presentSheet.error);
            clear();


            return Alert.alert(presentSheet.error.message);
        }
        Alert.alert("Pay successfully");
        } catch (err) {
            console.error(err);
            clear();
            Alert.alert("Payment failed!");
            
        }
        History.push.apply(History, Ticket.list);
        History.email = Ticket.email;
        clear();
        console.log(History);
        navigation.navigate('Aurora')
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 10}}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Review</Text>
            </View>
            <FlatList 
                data={Ticket.list}
                renderItem={({ item }) => itemRender(item.visitDate, item.name, item.adult, item.kid, item.total)}
                keyExtractor={(item) => item.key}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                <TouchableOpacity style={styles.buyBtn} onPress={buy}>
                <Text
                    style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
                    Checkout
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => { clear();}}>
                <Text
                    style={{color: '#8B5D33', fontSize: 18, fontWeight: 'bold'}}>
                    Cancel
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: 24}}></View>
            </View>
        </View>

  );
};
export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width,
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
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  cardContainer: {
    height: 50,
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