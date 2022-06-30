import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListJar from '../components/ListJars';
import RecentActivity from '../components/LastActivity';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.greet_container}>
        <View style={styles.header}>
          <View style={styles.cart}>
          <TouchableOpacity>
            <Icon name="shopping-cart" size={25} color="#000" />
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Category</Text>
        <Text style={styles.title}>Management</Text>
        <ListJar/>
        <Text style={styles.title}>Last Activity</Text>
        <RecentActivity/>
      </ScrollView>
      <View style={styles.optBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
          <Icon name="map-pin" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  optBar: {
    backgroundColor: '#040F38',
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 100,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  greet_container: {
    flex: 0,
    backgroundColor: 'white',
    padding: 24,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,

  },
  hello: {
      fontSize: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cart: {
    alignItems: 'left'
  },
  card: {
    paddingTop: 0,
    paddingBottom: 40
  },
});