import MapView, { Marker, MyCustomMarkerView, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
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

const MapScreen = ({ navigation }) => (
   <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 21.033333,
          longitude: 105.849998,
          latitudeDelta: 1.209,
          longitudeDelta: 3.728,
        }}
      >
        <Marker coordinate={{ latitude : 21.033333 , longitude : 105.849998 }}></Marker>
     </MapView>
   </View>
);

export default MapScreen;