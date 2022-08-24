import { Animated, LogBox, Easing, View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'

import { useNavigation } from '@react-navigation/native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Icon from 'react-native-vector-icons/Ionicons';
import { PanGestureHandler } from 'react-native-gesture-handler';


const {Value} = Animated
const { width, height } = Dimensions.get('window')
LogBox.ignoreAllLogs();

const slides = [
    {
        key: "1",
        image:require("../assets/1.jpg"),

    },
    {
        key: "2",
        image:require("../assets/2.jpg"),

    },
    {
        key: "3",
        image:require("../assets/3.jpg"),

    }
]

const Welcome = () => {
    const [done, setDone] = useState(false)
    const [open, setOpen] = useState(false)

    const navigation = useNavigation()


    const RenderTab = ({ onDismiss }) => {
        const translation = useRef(
            new Animated.Value(-height*0.5)
        ).current;

        const onGesture = (event) => {
            if (event.nativeEvent.translationY > 0) {
                translation.setValue(-event.nativeEvent.translationY)
            }
        }
        const onGestureEnd = (event) => {
            if (event.nativeEvent.translationY > height * 0.2) { 
                onDismiss()
            }
            else {
                translation.setValue(0)
            }
        }

        useEffect(() => {
            if (done) {
                setOpen(true)
                Animated.timing(translation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                    easing: Easing.easing
                }).start()
            }
            else {
                Animated.timing(translation, {
                    toValue: -height*0.5,
                    duration: 500,
                    useNativeDriver: false,
                    easing: Easing.linear

                }).start(() => { setOpen(false); })
            }
        }, [done])
        if (open)
            return (
                <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
                    <Animated.View style={{ ...styles.space, bottom: translation }}>
                        <TouchableOpacity
                            onPress={onDismiss}
                            style={{
                                position: "absolute",
                                height: 30,
                                width: 30,
                                top: 20,
                                backgroundColor: "#f0f0f0",
                                right: 20,
                                
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 30,

                            }}
                        >

                            <Icon name="close" color="#8B5D33" size={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.buttonLogIn}} onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.buttonTextIn}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                
                        <TouchableOpacity style={styles.buttonLog} onPress={() => navigation.navigate("Registration")}>
                            <Text style={styles.buttonText}>
                                REGISTER
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </PanGestureHandler>
        )
    }
    
        
    const renderItem = ({ item}) => {
        return (
            <View style={styles.container}>
                <View style={styles.absoluteFill} onPress={() => setDone(false)}>
                    <Image source={item.image} style={styles.image}/>
                </View>
                
                <RenderTab onDismiss={() => setDone(false)} />
                
            </View>
            
      
        )
    }


    const renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                
                <Text style={{color: "#58641d", fontSize: 20, fontWeight: "bold"}}>
                    Continue
                </Text>

        </View>
        );
    };


    return (
        
        <View style={{flex: 1}}>
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            activeDotStyle={{
                backgroundColor: 'white',
                width:30
            }}
            renderDoneButton={renderDoneButton}
            showPrevButton={false}
            showNextButton={false}
            showsHorizontalScrollIndicator={!done}
            showDoneButton={!done}
            onDone={() => setDone(true)}
                
            onSlideChange={() => setDone(false)}
        />
        </View>

        
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    buttonCircle: {
        width: width * 0.5,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        bottom: 30,
        left: -width*0.5*1.45,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    buttonLog: {
        backgroundColor: "#8B5D33",
        height: 60,
        marginHorizontal: 40,
        borderRadius: 35,
        width: width * 0.5,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonLogIn: {
        backgroundColor: "white",
        height: 60,
        marginHorizontal: 40,
        borderRadius: 50,
        width: width * 0.5,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center', 
        borderColor: "#8B5D33",
        borderWidth: 1,
        marginBottom: 25,
    },
    space: {
        zIndex: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        height: height*0.4,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.24,
        shadowRadius: 2,
        elevation: 1,
        overflow: "hidden",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonTextIn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8B5D33',
    }
})