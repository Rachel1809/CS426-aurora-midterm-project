import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    View,
    Keyboard
} from "react-native"; 

import { listJars} from "../components/ListJars";
import DateTimePicker from '@react-native-community/datetimepicker';

const InputScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        //setShow(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        Keyboard.dismiss();
        setShow(true);
        setMode('date');
    };

    const hideDatepicker = () => {
        setShow(false);
    };


    const [number, onChangeNumber] = React.useState(null);
    const loadOldNum = () => {
        return 100
    }

    const submit = () => {
        if (!date || !number) {
            return;
        }
        console.log(number);
        let sum = loadOldNum() + parseFloat(number);
        for (var i in listJars) {
            listJars[i].value = sum * listJars[i].percent / 100;
        }
        navigation.navigate('Home');
    }
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image style={styles.back} source={require('../assets/left-arrow.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.summary}>
                        Add summary
                    </Text>
                </View>

            </View>
            
            <View>
                <Text style={styles.date}>
                    Date
                </Text>
                <TextInput
                    style={styles.input}
                    onFocus={showDatepicker}
                    onChange={onChange}
                    value={date.getDate() + "/" + parseFloat(date.getMonth()+1).toLocaleString()  + "/" + date.getFullYear()}
                    placeholder="0.00"
                    returnKeyType='done'
                />
                {show && (
                    <DateTimePicker style = {styles.datepicker}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        onChange={onChange}
                        display="spinner"

                    />
                )}
                <Text style={styles.balance}>
                    Balance
                </Text>
                <TextInput
                    style={styles.input}
                    onFocus={hideDatepicker}
                    onChangeText={number => onChangeNumber(number)}
                    value={number}
                    placeholder="0.00"
                    keyboardType="numeric"
                    returnKeyType='done'
                />
                <TouchableOpacity onPress={submit} style={styles.subBtn}>
                    <Text style={styles.submit}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
            

            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 25
    },
    input: {
        height: 60,
        fontSize: 40,
        margin: 50,
        marginTop: 10,
        color: '#23395d',
        borderBottomColor: "#23395d",
        fontFamily: 'Roboto-Regular',
        borderBottomWidth: 3,
        padding: 10,
    },
    back: {
        width: 30,
        height: 30,
        marginHorizontal: 15,
        resizeMode: 'contain',
    },
    summary: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        marginTop: -6,
        marginBottom: -30,
    },
    subBtn: {
        backgroundColor: "#23395d",
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50,
        marginTop: -40,
        borderRadius: 50,
    },
    submit: {
        fontSize: 25,
        fontFamily: 'RobotoCondensed-Regular',
        color: 'white',
    },
    balance: {
        fontFamily: 'Roboto-Medium',
        marginLeft: 50,
        fontSize: 30,
    },
    date: {
        fontFamily: 'Roboto-Medium',
        marginLeft: 50,
        fontSize: 30,
        marginTop: 50,
    },
    datepicker: {
        zIndex: 2,
    }
});

export default InputScreen;