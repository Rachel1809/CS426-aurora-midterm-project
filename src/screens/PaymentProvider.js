import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from './Payment';


const PaymentProvider = () => {
    return (
        <View style={styles.container}>
            <StripeProvider publishableKey="pk_test_51LaxkgER5vAr4cR0UZOUhSBcyFLCHXnE2ClSWxvMoLNE8talxbnPVOd65EcmfAUjK70UmQ2hj07wL4hH61k0F82600iOs00z4R">
                <Payment />
            </StripeProvider>

        </View>
        
    );
}

export default PaymentProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});