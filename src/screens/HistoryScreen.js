import React, {Fragment} from 'react';
import {
  View, 
  SafeAreaView, 
  Text,
  StyleSheet, 
  Dimensions, 
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList
} from 'react-native';

import { History } from '../db/database';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HistoryScreen = ({ navigation }) => {

  
  const renderItem = ({item}) => {
      return (
          <View>
          {!!item.key && <TouchableOpacity onPress={() => {navigation.navigate('Ticket', item)}}
              style={[style.card, item.type == 1 ?  {backgroundColor: '#E4B363'} : {backgroundColor: '#21295C'}]}
          >
          <Text style={{fontWeight: 'bold', fontSize: 20, padding: 10, color: '#fff'}}>{moment(item.visitDate).format("MMM D, YYYY")}</Text>
          <Text style={{paddingLeft: 10, color: '#fff', marginBottom: 10, fontSize: 18}}>{item.type == 1 ? "Day Tour" : "Night Tour"}</Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 22, paddingLeft: 10}}>
            <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
              <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                <MaterialCommunityIcons name={"human-male-female"} size={20} color={'#fff'}/>
                <Text style={{paddingLeft: 7, fontSize: 18, color: '#fff'}}>{item.adult}</Text>
              </View>
              <View style={{justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 15}}>
                <MaterialCommunityIcons name={"human-child"} size={20} color={'#fff'}/>
                <Text style={{paddingLeft: 5, fontSize: 18, color: '#fff'}}>{item.kid}</Text>
              </View>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
                <Text style={{ marginTop: -2, paddingRight: 18, fontSize: 24, fontWeight: 'bold', color: '#fff'}}>${item.total}</Text>
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
        backgroundColor: '#f0f0f0',
    }}>
        <View style={style.header}>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 10, marginHorizontal: 20, fontFamily: 'FredokaOne-Regular'}}>history</Text>
        </View>
        
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
    justifyContent: 'center',
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
    marginTop: 0,
    paddingTop: 20,
  },
  card: {
    height: 150,
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