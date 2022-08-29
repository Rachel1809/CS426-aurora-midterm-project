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
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Notifications } from '../db/database';
import { firebase } from '../db/config';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 180 : 0
const {width, height} = Dimensions.get('window')

const NotiScreen = ({ navigation }) => {
    renderItem = ({item}) => {
        return (
            <View>
            {!!item.title && <View
                style={[style.card]}
            >
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.title}</Text>
            <Text style={{paddingTop: 5, color: '#bebebe', marginBottom: 15}}>{item.date}</Text>
            <TouchableOpacity style={style.buyBtn}>
              <Text
                style={{color: '#ffffff', fontSize: 14, fontWeight: 'bold'}}>
                Read More
              </Text>
            </TouchableOpacity>
            </View>
            }
            </View>
        )
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
        <Text style={{fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, color: '#fff'}}>Notification</Text>
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
            <FlatList
            data={Notifications}
            renderItem={renderItem}
            />
            </ScrollView>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  buyBtn: {
    width: 90,
    height: 35,
    backgroundColor: '#8B5D33',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default NotiScreen;