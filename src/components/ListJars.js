import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Album from '../db'

export const listJars = [
  {
    name: 'NEC',
    percent: 55,
    firstColor: "#c31432",
    secondColor: "#240b36",
  },
  {
    name: 'FFA',
    percent: 10,
    firstColor: "#F09819",
    secondColor: "#EDDE5D",
  },
  {
    name: 'LTSS',
    percent: 10,
    firstColor: "#FFA17F",
    secondColor: "#00223E",
  },
  {
    name: 'PLAY',
    percent: 10,
    firstColor: "#000046",
    secondColor: "#1CB5E0",
  },
  {
    name: 'EDU',
    percent: 10,
    firstColor: "#5C258D",
    secondColor: "#4389A2",
  },
  {
    name: 'GIVE',
    percent: 5,
    firstColor: "#11998e",
    secondColor: "#38ef7d",
  },
];

const renderJarItem = item => {
  return (
    <View key={item.name} style={styles.items}>
      <View style={styles.each}>
        <TouchableOpacity>
        <CircularProgress 
          value={item.percent} 
          radius={44}
          activeStrokeWidth={12}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeWidth={8}
          activeStrokeColor={item.firstColor}
          activeStrokeSecondaryColor={item.secondColor}
          valueSuffix={'%'}
        />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
};

const ListJar = () => {
  return (
    <View>
      <View style={styles.list}>{listJars.map(renderJarItem)}</View>
    </View>
  );
};

export default ListJar;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: 10,
  },
  each: {
    paddingBottom: 8
  },
  icon: {
    padding: 10,
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    shadowColor: '#000000',
    shadowOffset: {height: 10, width: 2},
    shadowOpacity: 0.7,
    shadowRadius: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    marginBottom: 20
  },
});