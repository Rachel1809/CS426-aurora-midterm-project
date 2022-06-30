import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';

import { useIsFocused } from "@react-navigation/native"; 

const width_screen = Dimensions.get('window').width;

const card_item = width_screen - 24 * 2;

const card_size = {
  width: 325,
  height: 196,
};

export const CardInfo = {
  currency: 'VND',
  balance: '0.00',
  holder: 'Tom L',
}

const Card = (val) => {
  const focus = useIsFocused();
  const [balance, setBalance] = React.useState(CardInfo.balance)
  React.useEffect(() => {  // whenever you are in the current screen, it will be true vice versa
    setBalance(CardInfo.balance)
  }, [focus]);


  return (
    <ImageBackground
      source={require('../assets/card_visa_bg.png')}
      style={styles.card}>
      <View style={styles.cardBalance}>
        <Text style={styles.cardBalanceText}>{CardInfo.currency + ' ' + balance}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardHolderName}>Card holder</Text>
          <Text style={styles.cardName}>{CardInfo.holder}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: card_item,
    height: (card_item * card_size.height) / card_size.width,
    padding: 24,
  },
  cardBalance: {
    flex: 1,
    justifyContent: 'center',
  },
  cardBalanceText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  cardHolderName: {color: 'rgba(255,255,255,0.4)'},
  cardName: {color: 'white', fontSize: 20},
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});