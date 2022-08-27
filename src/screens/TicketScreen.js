import React, {Fragment} from 'react';
import {
  View, 
  SafeAreaView, 
  Image, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { History } from '../db/database';
import moment from 'moment'
import QRCode from 'react-native-qrcode-svg';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 180 : 0

const TicketScreen = ({ navigation, route }) => {
  const item = route.params;
    return (
      <Fragment>
        <SafeAreaView
          style={[{
            flex: 1}, item.type == 1 ?  {backgroundColor: '#E4B363'} : {backgroundColor: '#21295C'}]}>
          <View style={style.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
              <Icon name="arrow-left" size={28} color='#fff' />
            </TouchableOpacity>
          </View>
      
          <View style={style.imageContainer}>
          </View>
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, color: '#fff' }}>Visitor Pass</Text>
          <View style={style.detailsContainer}>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 10, flex: 1 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                  <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Ticket details</Text>
                  <View style={style.ticketDetail}>
                    <Text style={style.ticketTitle}>Booked on</Text>
                    <Text style={style.ticketInfo}>{moment(item.bookDate).format("hh:mm:ss A, MMM Do YYYY")}</Text>
                  </View>
                  <View style={style.ticketDetail}>
                    <Text style={style.ticketTitle}>Ticket no.</Text>
                    <Text style={style.ticketInfo}>{item.code}</Text>
                  </View>
                  <View style={style.ticketDetail}>
                    <Text style={style.ticketTitle}>Visit Date</Text>
                    <Text style={style.ticketInfo}>{moment(item.visitDate).format("MMM Do YYYY")}</Text>
                  </View>
                  <View style={style.ticketDetail}>
                    <Text style={style.ticketTitle}>Visitors</Text>
                    <Text style={style.ticketInfo}>{item.adult} adult(s), {item.kid} kid(s)</Text>
                  </View>
                  <View style={style.ticketDetail}>
                    <Text style={style.ticketTitle}>Type</Text>
                    <Text style={style.ticketInfo}>{item.type == 1 ? "Day Tour" : "Night Tour"}</Text>
                  </View>
                  <View style={style.ticketDetail}>
                    <Text style={style.ticketTitle}>Total payment</Text>
                    <Text style={style.ticketInfo}>${item.total}</Text>
                  </View>
                  <View style={{marginVertical: 15, alignItems: 'center'}}>
                    <QRCode value={item.code} size={150} backgroundColor={'transparent'}/>
                  </View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Notes</Text>
                  <Text style={style.noteInfo}>- Tickets will not be refunded in any cases.</Text>
                  <Text style={style.noteInfo}>- Please wear a face mask during visiting our zoo.</Text>
                  <View style={{marginBottom: 40}}></View>
              </ScrollView>
            </View>
          </View>
      
        </SafeAreaView>
        <SafeAreaView
          style={{
            flex: 0,
            backgroundColor: '#f0f0f0',
          }} />
      </Fragment>
  
    );
}

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    flex: 15,
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 20,
    paddingTop: 20,
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
    backgroundColor: '#8B5D33',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: '#58641D',
    width: 100,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  input: {
    height: 40,
    width: 120,
    borderWidth: 1,
    paddingLeft: 6,
    borderRadius: 8,
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
  noteInfo: {
    fontSize: 14, 
    marginBottom: 10
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8, // with vertical padding, chevron disappears
    paddingHorizontal: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    color: 'black',
    paddingRight: 30,
  },
});

export default TicketScreen;