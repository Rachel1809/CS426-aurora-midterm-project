import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card, {CardInfo} from '../components/Card';
import ListJar from '../components/ListJars';
import RecentActivity from '../components/LastActivity';

  
const HomeScreen = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(CardInfo);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <View style={styles.greet_container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.userName}>Tom L!</Text>
          </View>
          <View style={styles.pay}>
            <TouchableOpacity onPress={() => navigation.navigate('Input')}>
              <Image source={require('../assets/ic_pay.png')} />
              <Text>Input</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Card />
        </View>
        <Text style={styles.title}>Management</Text>
        <ListJar/>
        <Text style={styles.title}>Last Activity</Text>
        <RecentActivity/>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  greet_container: {
    flex: 0,
    backgroundColor: 'white',
    padding: 24,
  },
  container: {
    flex: 2,
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
    justifyContent: 'space-between',
    marginTop: 30
  },
  pay: {
    paddingVertical: 14,
    align: 'center'
  },
  card: {
    paddingTop: 0,
    paddingBottom: 40
  },
});