import React, {useState, useEffect} from 'react';
import { Albums, Souvenirs } from '../db/database';
import {
    SafeAreaView, 
    View, 
    FlatList,
    StyleSheet, 
    Text, 
    Image, 
    TouchableOpacity, 
    Dimensions
} from 'react-native';

import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [checkResult, setResult] = useState(true);
  useEffect(() => {
    setFilteredDataSource(Souvenirs);
    setMasterDataSource(Souvenirs);

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
    const album = Souvenirs.find(obj => item.id === obj.id);
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: -6}}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
          <Icon name="arrow-left" size={28} style={{marginTop: 25}} color='#000' />
          </TouchableOpacity>
          <View style={styles.header}>
            <SearchBar 
              lightTheme={true}
              searchIcon={{size: 24}}
              onChangeText={(text) => {  searchFilterFunction(text)}}
              onClear={(text) => searchFilterFunction('')}
              placeholder="Which animals do you want?"
              containerStyle={styles.searchContainer}
              value={search}
              inputStyle = {styles.searchGuide}     
              placeholderTextColor="#CBD2D0"  
              inputContainerStyle={styles.searchBar}
              clearIcon={{ color: '#fff' }}
            />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredDataSource}
          keyExtractor={(index) => index.toString()}

          renderItem={ItemView}
          contentContainerStyle={{paddingBottom: 200, fontColor: '#000000' }}
        />
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    header: {
        marginTop: 10,
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
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: '#040F38',
        borderBottomWidth: 2, 
        marginBottom: 10,
        height: 40,
        width:  Dimensions.get('window').width - 90,
    },
    searchGuide: {
      fontSize: 16,
      color: '#040F38'
        //color: '#CBD2D0'
    },
});
 
export default SearchScreen;