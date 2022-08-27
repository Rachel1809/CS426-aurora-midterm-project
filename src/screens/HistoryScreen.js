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

import { History } from '../db/database';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 180 : 0
const {width, height} = Dimensions.get('window')

const HistoryScreen = ({ navigation }) => {
    renderItem = ({item}) => {
      return (
          <View>
          {!!item.key && <TouchableOpacity onPress={() => {navigation.navigate('Ticket', item)}}
              style={[style.card]}
          >
          <Text style={{fontWeight: 'bold', fontSize: 20, padding: 10}}>{moment(item.visitDate).format("MMM D, YYYY")}</Text>
          <Text style={{paddingLeft: 10, color: '#bebebe', marginBottom: 10, fontSize: 18}}>{item.type == 1 ? "Day Tour" : "Night Tour"}</Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 22, paddingLeft: 10}}>
            <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
              <View style={{justifyContent: 'flex-start', flexDirection: 'row', }}>
                <MaterialCommunityIcons name={"human-male-female"} size={20}/>
                <Text style={{paddingLeft: 7, fontSize: 18}}>{item.adult}</Text>
              </View>
              <View style={{justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 15}}>
                <MaterialCommunityIcons name={"human-child"} size={20}/>
                <Text style={{paddingLeft: 5, fontSize: 18}}>{item.kid}</Text>
              </View>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
                <Text style={{ marginTop: -2, paddingRight: 18, fontSize: 24, fontWeight: 'bold'}}>${item.total}</Text>
              </View>
          </View>
          </TouchableOpacity>
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
        
        </View>
        
        <View style={style.imageContainer}>
        </View>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, color: '#fff'}}>History ({History.length})</Text>
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
            data={History}
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
    height: 150,
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
  },
});

export default HistoryScreen;