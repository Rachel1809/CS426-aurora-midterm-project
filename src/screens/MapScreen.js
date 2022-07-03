import MapView, { Marker, MyCustomMarkerView, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
   backgrounđColor: 'transparent'
 },
 map: {
  ...StyleSheet.absoluteFillObject,
 },
});

const pinColor = '#8C001A';

const MapScreen = ({ navigation }) => (
   <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 21.018989225397323, 
          longitude: 105.84056326827525,
          latitudeDelta: 8.209,
          longitudeDelta: 15.728,
        }}
        showsUserLocation={true}
      >
        <Marker 
          coordinate={{ latitude : 21.033333 , longitude : 105.849998 }} 
          >
            <Icon name= "location-pin" size={50} color={"#040F38"} />
        </Marker>
     </MapView>
   </View>
);

export default MapScreen;