import React, {useState, useEffect} from 'react';
import { Cart, Albums } from '../db/database';
import {
    SafeAreaView, View, FlatList, StyleSheet, Text, Image, ScrollView, TouchableOpacity
} from 'react-native';
// import all the components we are going to use

import {SearchBar} from 'react-native-elements';
 
const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
 
  useEffect(() => {
    setFilteredDataSource(Albums);
    setMasterDataSource(Albums);

  }, []);
 
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
 
  const ItemView = ({ item }) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress ={() => getItem(item)}
        >
            {item.cover && (
            <Image
              style={{ width: 100, height: 100, margin:10 }}
              source={item.cover}
            />
            )}
            <View style={{ flexDirection: "column", marginLeft: 10 }}>
              {!!item.name && (
                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: -5,
                    color: 'white',
                    fontFamily: 'RobotoCondensed-Bold',
                    fontSize: 28,
                  }}>
                  {item.name + "\n"}
                </Text>
              )
              }
              {!!item.artist && (
                <Text
                    style={{
                    marginTop: -5,
                    fontSize: 20,
                    marginLeft: -5,
                    color: 'white',
                    fontFamily:'Roboto-Italic'
                  }}>
                  {item.artist}
                </Text>
              )
              }
            </View>
          </TouchableOpacity>
        </View>
    );
  };
 
  
 
  const getItem = (item) => {
    // Function for click on an item
    console.log(item.name);
  };
 
  return (
    <View style={{flex: 1}}>
          <View style={styles.container}>
              <View style={styles.header}>
                  <SearchBar 
                    lightTheme={true}
                    searchIcon={{size: 24}}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Which one makes your day?"
                    containerStyle={styles.searchContainer}
                    value={search}
                    inputStyle = {styles.searchGuide}     
                    placeholderTextColor="#040F38"  
                    inputContainerStyle={styles.searchBar}
                    clearIcon={{ color: 'white' }}
                  />
                </View>
                    <FlatList
                        data={filteredDataSource}
                        keyExtractor={(item, index) => index.toString()}
                        
                        renderItem={ItemView}
                        contentContainerStyle={{ paddingBottom: 200 }}
                    />
                  
                
              
        
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        marginTop: 50,
        paddingHorizontal: 24
    },
    searchContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: '#fff',
    },
    itemStyle: {
        padding: 5,
        backgroundColor: '#040F38',
        marginVertical: 5,
        marginHorizontal: 25,
        flexDirection: "row",
    },
    searchBar: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: '#040F38',
        borderBottomWidth: 1, 
        marginBottom: 10
    },
    searchGuide: {
        
        fontSize: 20,
        color: '#040F38',
        fontFamily: 'Roboto-Regular',
    },
});
 
export default SearchScreen;