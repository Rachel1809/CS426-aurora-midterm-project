import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Albums, Cart } from '../db/database';

const CartScreen = ({ navigation }) => { 
    const [Product, setProduct] = useState([]);
 
    useEffect(() => {
        setProduct(Cart.list);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <FlatList
                data={Product}
                keyExtractor={(item, index) => index.toString()}
                
                renderItem={ItemView}
                contentContainerStyle={{ paddingBottom: 200 }}
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
    }

})

export default CartScreen;