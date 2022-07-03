import React, {useState, useEffect} from 'react';
import { Cart, Albums } from '../db/database';
import {
    SafeAreaView, View, FlatList, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
// import all the components we are going to use
import {SearchBar} from 'react-native-elements';

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [checkResult, setResult] = useState(true);
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
        const itemArtist = item.artist ? item.artist.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1 || itemArtist.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
      setResult(newData.length > 0);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
      setResult(masterDataSource.length > 0);
    }
  };
 
  const ItemView = ({ item }) => {
    return (
        <SafeAreaView>
        <TouchableOpacity
          onPress ={() => getItem(item)}
        >
          <View style={styles.itemStyle}>
            {item.cover && (
            <Image
              style={{ width: 100, height: 100, margin: 10 }}
              source={item.cover}
            />
            )}
            <View style={{ marginLeft: 10 }}>
              {!!item.name && (
                <Text numberOfLines={1}
                  style={{
                    marginTop: 30,
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {item.name}
                </Text>
              )}
              {!!item.artist && (
                <Text
                    style={{
                    marginTop: 10,
                    fontSize: 16,
                    color: '#000000',
                  }}>
                  {item.artist}
                </Text>
              )
              }
            </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
    );
  };
 
  const getItem = (item) => {
    // Function for click on an item
    const album = Albums.find(obj => item.id === obj.id);
    navigation.navigate('Details', album);
  };

  const printNoResult = () => {
    return (
      <View>
        <Text>No results found</Text>
      </View>
    )
  }
 
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar 
            lightTheme={true}
            searchIcon={{size: 24}}
            onChangeText={(text) => {  searchFilterFunction(text)}}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Which one makes your day?"
            containerStyle={styles.searchContainer}
            value={search}
            inputStyle = {styles.searchGuide}     
            placeholderTextColor="#CBD2D0"  
            inputContainerStyle={styles.searchBar}
            clearIcon={{ color: '#fff' }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}

          renderItem={ItemView}
          contentContainerStyle={{paddingBottom: 200, fontColor: '#000000' }}
        />
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 50,
        fontColor: '#000000',
    },
    searchContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: '#fff',
    },
    itemStyle: {
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        flexDirection: "row",
        borderRadius: 10,
        padding: 5,
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: '#040F38',
        borderBottomWidth: 2, 
        marginBottom: 10,
        height: 40
    },
    searchGuide: {
      fontSize: 16,
      color: '#040F38'
        //color: '#CBD2D0'
    },
});
 
export default SearchScreen;