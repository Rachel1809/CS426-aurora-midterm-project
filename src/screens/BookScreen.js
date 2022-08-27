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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from 'moment'
import CalendarPicker from 'react-native-calendar-picker';
import RNPickerSelect from 'react-native-picker-select';

import { Ticket, Tour, History } from '../db/database';
import { firebase } from '../db/config';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 180 : 0

const BookingScreen = ({ navigation }) => {
  const [date, setDate] = React.useState(new Date());
  const [adult, setAdult] = React.useState(0);
  const [kid, setKid] = React.useState(0);
  const [type, setType] = React.useState(1);
  const [element, setElement] = React.useState(Ticket.list);
  const [subtotal, setSubtotal] = React.useState(0);
  const [email, setEmail] = React.useState('')
  React.useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then(doc => {
            if (doc.exists) {
                setEmail(doc.data().email)
            }
            else {
                console.log('User does not exist')
            }
        })
    }, [])

  React.useEffect(() => {
    let x = Tour.filter(obj => obj.key === type)[0]
    setSubtotal(x.priceAdult * adult + x.priceKid * kid)
  } ,[adult, kid, subtotal, type]);



  const confirm = () => {
    Ticket.email = email;
    const isFound = element.some(e => {
      if (e.key === type) {
        e.adult += adult;
        e.kid += kid;
        e.total = (e.adult * e.priceAdult + e.kid * e.priceKid).toFixed(2);
        return true;
      }
    });
    if (!isFound) {
      let tmp = Tour.filter(obj => obj.key === type)[0]
      let key = History.length + 1
      var length = Math.log(key) * Math.LOG10E + 1 | 0;
      console.log(length)
      let code = (type === 1 ? "D" : "N") + "0".repeat(7-length) + String(key)
      Ticket.list.push({
        type: type,
        name: tmp.name,
        priceAdult: tmp.priceAdult,
        priceKid: tmp.priceKid,
        adult: adult,
        kid: kid,
        total: (adult * tmp.priceAdult + kid * tmp.priceKid).toFixed(2),
        key: key,
        code: code,
        bookDate: new Date().toJSON(),
        visitDate: date.toJSON(),
      });
      setElement(Ticket.list);
      console.log(Ticket.list)

    }
    Ticket.sum = Ticket.list.reduce((acc, cur) => {
      let s = acc + parseFloat(cur.total)
      s = parseFloat(s.toFixed(2));
      return s;
    }, 0);
    console.log(Ticket.sum)
    if (Ticket.sum !== 0)
      navigation.navigate('PaymentProvider');
    else
      return
    setAdult(0);
    setKid(0);
    setType(1);
    setDate(new Date());
  }

  return (
    <Fragment>
    <SafeAreaView 
    style={{
      flex: 1,
      backgroundColor: '#58641d',
    }}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Icon name="arrow-left" size={28} color='#fff' />
        </TouchableOpacity>
      </View>
      
      <View style={style.imageContainer}>
      </View>
      <Text style={{fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, color: '#fff'}}>Book tickets</Text>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
        </View>
          <View style={{marginHorizontal: 20, marginTop: 10, flex: 1}}>
          <ScrollView>
          <KeyboardAvoidingView 
            style={{flex: 1}} 
            behavior={"position"} 
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Visit date</Text>
            <CalendarPicker
                  startFromMonday={true}
            minDate={new Date()}
            selectedDayColor="#58641d"
            selectedDayTextColor="#FFFFFF"
            width = {WIDTH*0.9}
                  height={HEIGHT * 0.9}
                  onDateChange={(date) => {
                    setDate(date);
                  }
                  }
            />
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>Visitors</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
              <View style={[{ flexDirection:'row' , alignItems:'center'}]}>
                <MaterialCommunityIcons name={"human-male-female"} size={20}/>
                <TextInput
                  style={[style.input,{paddingLeft: 5, backgroundColor: '#f0f0f0'}]}
                  placeholder="Adults"
                  keyboardType="numeric"
                      returnKeyType="done"
                      onChangeText={(text) => { setAdult(parseInt(text)); }}
                      value={adult ? adult.toString() : ''}
                      

                />
            </View>
            <View style={[{flexDirection:'row' , alignItems:'center'}]}>
              <MaterialCommunityIcons name={"human-child"} size={20}/>
                <TextInput
                  style={[style.input, {paddingLeft: 5, backgroundColor: '#f0f0f0'}]}
                  placeholder="Kids"
                  keyboardType="numeric"
                  returnKeyType="done"
                  onChangeText={(text) => { setKid(parseInt(text)); }}
                  value={kid ? kid.toString(): ''}      
                />
            </View>
          </View>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 10}}>Type</Text>
                <RNPickerSelect
                  value={type}
                  style={pickerSelectStyles}
                  onValueChange={(itemValue) => {  setType(itemValue); } }
                  items={[
                      { label: 'Day Tour', value: 1 },
                      { label: 'Night Tour', value: 2 },
                  ]}
                />
          </KeyboardAvoidingView>
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
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 2,
                    fontWeight: 'bold',
                  }}>
                  Sub total
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 0,
                    fontWeight: 'bold',
                  }}>
                  ${parseFloat(subtotal).toString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={style.buyBtn} onPress={confirm}>
              <Text
                style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
    <SafeAreaView
      style={{
        flex: 0,
        backgroundColor: '#f0f0f0',
      }}/>
    </Fragment>
  );
};

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
    flex: 9,
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
    width: 100,
    borderWidth: 1,
    paddingLeft: 6,
    borderRadius: 8,
  },
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

export default BookingScreen;