import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    TouchableOpacity, 
    FlatList, 
    Dimensions,
    ImageBackground
  } from 'react-native';
  
import {SafeAreaView} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import MapScreen from './MapScreen';
import { Albums, Cart, Tour, Animals } from '../db/database';

const {width, height} = Dimensions.get('window')

const ExploreScreen = ({ navigation }) => {
    renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={[
                    styles.card,
                    {
                        height: height*0.3,
                    }
                ]}
            >
            <ImageBackground 
                source={item.cover} 
                resizeMode="cover" 
                style={styles.image} 
                imageStyle={{ borderRadius: 10, opacity: 0.9}}
            >
                <Text style={styles.imgText}>{item.name}</Text>
            </ImageBackground>
            </TouchableOpacity>
        )
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', flexGrow: 1}}
      nestedScrollEnabled={true}>
        <View style={styles.greet_container}>
          <View style={styles.header}>
            <View style={{paddingTop: 6}}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" size={28} color='#000' />
                </TouchableOpacity>
            </View>
            <View style={styles.brand}>
              <Text style={styles.brandText}>explore</Text>
            </View>
        </View>
      </View>
      
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Our tours</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Tour}
          renderItem={renderItem}
        />
        </ScrollView>
        <Text style={styles.title}>Our animals</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={Animals}
          renderItem={renderItem}
        />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
    
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  greet_container: {
    flex: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  hello: {
      fontSize: 20
  },
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cart: {
    alignItems: 'flex-end',
    paddingBottom: 24,
    paddingTop: 6,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  searchGuide: {
    paddingTop: 4,
    paddingLeft: 5,
    color: '#CBD2D0',
  },
  brand: {
    marginRight: Dimensions.get('window').width/4 + 24,
    paddingLeft: 82,
  },
  brandText: {
    fontFamily: "FredokaOne-Regular",
    fontSize: 28
  },
  card: {
    width: width*0.5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    marginRight: 30,
    alignItems: 'center'
  },
  image: {
    height: height*0.3,
    width: width*0.5,
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  imgText: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'PTSerif-Regular',
      marginBottom: 20,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 5,
      width: width*0.5,
      textAlign: 'center'
  }
});

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
  },
  backgroundColor: 'transparent'
};