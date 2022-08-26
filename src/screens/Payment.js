import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from "react-native";
import { CardField, useConfirmPayment, useStripe } from "@stripe/stripe-react-native";
import {Ticket} from '../db/database';
import { useNavigation } from '@react-navigation/native'


//ADD localhost address of your server
const API_URL = "http://192.168.2.7:3000";

const Payment = () => {
    const navigation = useNavigation();
    const email = Ticket.list[0].email;
    const amount = Ticket.sum;
    const stripe = useStripe();

    const itemRender = (email, name, adult, kid) => {
        return (
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 200, padding: 10}}>
                    <Text style={{fontSize: 30}}>Email: {email}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 10}}>
                    <Text style={{fontSize: 30}}>Type: {name}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 10}}>
                    <Text style={{fontSize: 30}}>Number of adults: {adult}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 10}}>
                    <Text style={{fontSize: 30}}>Number of kids: {kid}</Text>
                </View>

            </View>
        )
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
            return Alert.alert(data.message);
        }
        const initSheet = await stripe.initPaymentSheet({
            paymentIntentClientSecret: data.clientSecret,
        });
        if (initSheet.error) {
            console.error(initSheet.error);
            return Alert.alert(initSheet.error.message);
        }
        const presentSheet = await stripe.presentPaymentSheet({
            clientSecret: data.clientSecret,
        });
        if (presentSheet.error) {
            console.error(presentSheet.error);
            return Alert.alert(presentSheet.error.message);
        }
        Alert.alert("Pay successfully");
        } catch (err) {
            console.error(err);
            Alert.alert("Payment failed!");
        }
        Ticket.list = [];
        console.log(Ticket)
        navigation.navigate('Aurora')
    };

    return (
        <View>
            <FlatList 
                data={Ticket.list}
                renderItem={({ item }) => itemRender(item.email, item.name, item.adult, item.kid)}
                keyExtractor={(item) => item.key}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 10}}>
                <Text style={{ fontSize: 30 }}>Amount of money: ${amount}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: "green", justifyContent:'center', alignSelf:'center' }} onPress={buy}>
                <Text style={{ fontSize: 30, color: "white", padding: 10 }}>Buy</Text>
                </TouchableOpacity>
        </View>

  );
};
export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});