import React, {useState, useEffect} from 'react';
import { LayoutAnimation, StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, FlatList, Modal } from 'react-native';
import { Albums, Cart } from '../db/database';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-elements';
import {
  SwipeableFlatList,
  SwipeableQuickActionButton,
  SwipeableQuickActions,
} from 'react-native-swipe-list';

const CartScreen = ({ navigation }) => { 
    const [Product, setProduct] = useState(Cart.list);
    const [visible, setVisible] = useState(false);
    const [Id, setId] = useState();
    const [isRender, setRender] = useState(false);
    const [viewProductVisible, setViewProductVisible] = useState(false);
    const addItem = (item) => { 
        const newProduct = Product.map(e => {
            if (e.id === item.id) {
                e.quantity = e.quantity + 1
                e.total = (e.price * e.quantity).toFixed(2)
                return e;
            }
            return e;
        })
        Cart.sum = Cart.list.reduce((acc, cur) => {
            let s = acc + parseFloat(cur.total)
            s = parseFloat(s.toFixed(2));
            return s;
        }, 0);
        Cart.count = Cart.list.reduce((acc, cur) => {
            return acc + cur.quantity;
        }, 0);
        setProduct(newProduct);
        setRender(!isRender);
    }

    const removeItem = (item) => { 
        if (item.quantity <= 1) {
            setId(item.id);
            setVisible(true);
            
            return;
        }
        const newProduct = Product.map(e => {
            if (e.id === item.id) {
                e.quantity = e.quantity - 1
                e.total = (e.price * e.quantity).toFixed(2)
                return e;
            }
            return e;
        })
        Cart.sum = Cart.list.reduce((acc, cur) => {
            let s = acc + parseFloat(cur.total)
            s = parseFloat(s.toFixed(2));
            return s;
        }, 0);
        Cart.count = Cart.list.reduce((acc, cur) => {
            return acc + cur.quantity;
        }, 0);
        
        setProduct(newProduct);
        setRender(!isRender);
    }

    const handleDelete = () => {
        const newProduct = Product.map(e => {
            if (e.id === Id) {
                e.quantity = 0;
                e.total = 0;
                deleteItem(e.id);
                
                return e
            }
            return e;
        })

        setProduct(newProduct);
        setVisible(false);
        setRender(!isRender);
    }

    const deleteItem = (id) => { 
        const newProduct = Product.filter(e =>  e.id !== id );
        Cart.sum = Cart.list.reduce((acc, cur) => {
            let s = acc + parseFloat(cur.total)
            s = parseFloat(s.toFixed(2));
            return s;
        }, 0);
        Cart.count = Cart.list.reduce((acc, cur) => {
            return acc + cur.quantity;
        }, 0);
        setProduct(newProduct);
        
    }

    const handleVisit = () => {
        // Function for click on an item
        const album = Albums.find(obj => Id === obj.id);
        navigation.navigate('Details', album);
    };

    const ItemView = ({ item, index }) => {
        if (item.quantity <= 0)
            return null;
        return (
            <View style={styles.itemContainer}>
            <TouchableNativeFeedback
                
                    onPress={() => { setId(item.id);  setViewProductVisible(true)}}
                >
                    <View style={styles.itemStyle}>
                        { item.cover && (
                        <Image
                            style={{ width: 100, height: 100, margin:10 }}
                            source={item.cover}
                            />
                            )}
                        <View style={{ flexDirection: "column", marginLeft: 10 }}>
                        {!!item.name && (
                            <Text
                            style={{
                                marginTop: 15,
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 20,
                            }}>
                            {item.name}
                            </Text>
                        )
                        }
                        {!!item.artist && (
                            <Text
                                style={{
                                marginTop: 2,
                                fontSize: 16,
                                color: 'black',
                                }}>
                            {item.artist}
                            </Text>
                        )
                        }
                        <View style={{flexDirection: 'column'}}>
                            {!!item.total && (
                            <Text
                                style={{
                                    marginTop: 15,
                                    color: 'black',
                                    fontFamily: 'Roboto-Black',
                                    fontSize: 25,
                                
                                }}>
                            {'$' + item.total}
                            </Text>
                            )} 
                                    <View style={{ flexDirection:'row'}}>
                                        <TouchableOpacity onPress={() => removeItem(item)}>
                                            <Icon name="minus-circle" size={25} color="#000" style={styles.iconMinus}/>
                                        </TouchableOpacity>
                                        <View>
                                                {!!item.quantity && (
                                            
                                                <Text
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            
                                                            marginTop: 16,
                                                            left: 7,
                                                            color: 'black',
                                                            fontFamily: 'Roboto-Black',
                                                            fontSize: 30,
                                                    
                                                    }}>
                                                {item.quantity < 10 ? '0' + item.quantity : item.quantity}
                                                </Text>
                                                )}   
                                        </View>
                                        <View style={{position: 'absolute', zIndex: 2, left: 120}}>
                                            <TouchableOpacity onPress={() => addItem(item)}>
                                                <Icon name="plus-circle" size={25} color="#000" style={styles.iconPlus}/>
                                            </TouchableOpacity>        
                                        </View>
                                        
                            </View>        
                        </View>        
                            
                                
                        </View>
                    </View>
                
            </TouchableNativeFeedback>
            </View>
        );
    };

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { Card.list = Product; navigation.goBack() }} style={styles.backIcon}>
                    <Icon name="chevron-left" size={25} color="#000" />
                </TouchableOpacity>
                <View style={styles.cartText}>
                    <Text style={styles.headerText}>Cart</Text>
                </View>
                
            </View>
            <View style={styles.cartContainer}>
            <SwipeableFlatList
                    data={Product}
                    keyExtractor={(item) => item.id}
                    extraData={isRender}
                    renderItem={ItemView}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderRightActions={({ item }) => (
                        <SwipeableQuickActions>
                            <SwipeableQuickActionButton
                                onPress={() => {
                                    LayoutAnimation.configureNext(
                                        LayoutAnimation.Presets.easeInEaseOut,
                                    );
                                    
                                    setId(item.id);
                                    setVisible(true);
                                }}
                                text="Delete"
                                textStyle={styles.deleteText}
                                style={styles.deleteStyle}
                            />
                        </SwipeableQuickActions>
                    )}
                    
                />
            </View>
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
                    <View style={styles.modalBtn}>
                        <TouchableOpacity style={styles.modalButtonNo} onPress={() => { setVisible(false) }}>
                            <Text style={styles.modalButtonTextNo}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButtonYes} onPress={() => handleDelete()}>
                        
                            <Text style={styles.modalButtonTextYes}>Delete</Text>
                        </TouchableOpacity>
                        
                    </View>    
                    
                    </View>
            </Modal>
            <Modal
                animationType="slide"
                visible={viewProductVisible}
                onRequestClose={() => setVisible(false)}
            >
                
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Do you want to view product details?</Text>
                    <View style={styles.modalBtn}>
                        <TouchableOpacity style={styles.modalButtonNo} onPress={() => { setViewProductVisible(false) }}>
                            <Text style={styles.modalButtonTextNo}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButtonYes} onPress={() => { setViewProductVisible(false);  handleVisit()}}>
                        
                            <Text style={styles.modalButtonTextYes}>View</Text>
                        </TouchableOpacity>
                        
                    </View>    
                    
                    </View>
            </Modal>

            {Cart.count > 0 && (
                <View style={styles.footer}>
                    <View style={styles.footerMoney}>
                    <View style={styles.footerCal}>
                        <Text style={styles.footerText}>Subtotal</Text>
                        <Text style={styles.footerNumber}>{'$' + Cart.sum}</Text>
                    </View>
                    <View style={styles.footerCal}>
                        <Text style={styles.footerText}>Shipping</Text>
                        <Text style={styles.footerNumber}>{'$' + (Cart.sum * 0.01).toFixed(2)}</Text>
                    </View>
                    <View style={styles.footerCal}>
                        <Text style={styles.footerText}>Bag Total</Text>
                        <Text style={styles.footerNumber}>{'(' + (Cart.count) + ' items )'}</Text>
                        <Text style={styles.footerNumber}>{'$' + (Cart.sum + (Cart.sum * 0.01)).toFixed(2)}</Text>
                    </View>
                    
                </View>
                <TouchableOpacity onPress={() => { Card.list = Product; navigation.navigate('Checkout') }} style={styles.checkout}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
            </View>)}
                
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor: 'white',
    },
    backIcon: {
        marginTop: 8
    },
    cartText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 130
    },
    headerText: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
    },
    header: {
        flexDirection: 'row',
        marginTop: 50,
        paddingHorizontal: 24,
        borderBottomColor: '#040F38',
        marginBottom: 40,
    },
    cartContainer: {
        flex: 5,
    },
    deleteText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
    },
    deleteStyle: {
        marginVertical: 10,
        marginRight: 20,
        marginLeft: -30,
        width: 100,
        height: '91%',
        flexDirection: "row",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'red',

    },
    itemStyle: {
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        borderRadius: 10,
        padding: 10,
    },
    iconMinus: {
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        
        fontSize: 35,
        padding: 20,
        paddingLeft: 10,
        
    },
    iconPlus: {
        borderRadius: 50,
        color: '#040F38',
        padding: 20,
        paddingLeft: 10,
        fontSize: 35,
        paddingRight: 30
    },
    footer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        
        paddingHorizontal: 30,
        borderTopColor: '#040F38',
        flex: 3,
    }, 
    footerMoney: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
        borderTopColor: '#040F38',
    },
    footerText: {
        fontSize: 20,
        fontFamily: 'Roboto-Black',
        color: '#040F38',
    },
    footerCal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    
    },
    footerNumber: {
        fontSize: 20,
        
        color: '#040F38',
    },
    checkout: {
        backgroundColor: '#040F38',
        borderRadius: 50,
        padding: 25,
        marginHorizontal: 30,
        marginBottom: 40,
        alignItems: 'center',
    },
    checkoutText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 20,
        fontFamily: 'Roboto-Black',
        color: '#040F38',
        marginTop: 20,
        width: '70%',
        textAlign: 'center',
    },
    modalBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButtonYes: {
        backgroundColor: '#040F38',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginVertical: 40,
        width: '40%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalButtonNo: {
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginVertical: 40,
        width: '40%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonTextYes: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    
    },
    modalButtonTextNo: {
        fontSize: 25,
        fontWeight: 'bold',
    
    }
})


export default CartScreen;