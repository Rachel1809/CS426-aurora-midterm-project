import React, {useState} from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import {Stores} from '../db/database'
import { SafeAreaView } from 'react-native-safe-area-context';

const initialState = {
  latitude: 10.787546979605876,
  longitude:  106.70618797505074,
  latitudeDelta: 0.0009,
  longitudeDelta: 0.0028,
}

const MapScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', zIndex: 3}}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Icon name="arrow-left" size={28} color='#fff' />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 135, color: '#fff'}}>Zoo Map</Text>
    </View>
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showUserLocation
        style={styles.map}
        customMapStyle= {mapStyle}
        initialRegion={initialState}

      >
        {Stores.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={marker.coordinates}
            title={marker.storeName}
            description={marker.address}
          >
            <Entypo name= "location-pin" size={50} 
            colors="#040F38" style={{zIndex: 10}}/>
          </Marker>
        ))}
      </MapView>
    </View>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    zIndex: 2,
    backgroundColor: '#58641d',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgrounđColor: 'transparent'
  },
  map: {
   ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnClose: {
    justifyContent: 'flex-end'
  },
  modalName: {
    fontSize: 20,
    color: '#040F38',
    marginTop: 20,
    fontWeight: 'bold'
  },
  modalText: {
    fontSize: 20,
    color: '#040F38',
    marginTop: 20,
},
 });
 

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

export default MapScreen;