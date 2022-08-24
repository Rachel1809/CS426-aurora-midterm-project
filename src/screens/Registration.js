import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { firebase } from "../db/config";
import { useNavigation } from '@react-navigation/native'


const Registration = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const registerUser = async (email, password, firstName, lastName) => { 
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://auth-80b8a.firebaseapp.com',
                
            })
            .then(() => {
                alert('Email verification sent')  
            })
            .catch(error => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                    firstName,
                    lastName,
                    email,
                })
            })
            .catch(error => {
                alert(error.message)
            })

        }).catch(error => {
            alert(error.message)
        }
        )
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                Registration
            </Text>
            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="First Name"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Last Name"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                />
            </View>
            <TouchableOpacity
                onPress={() => {  registerUser(email, password, firstName, lastName);}}
                style={styles.button}
            
            >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Register
                </Text>

            </TouchableOpacity>
        </View>
    )

}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    TextInput: {
        paddingTop: 20,
        paddingBottom: 20,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        height: 70,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#026efd',
        borderRadius: 50,
    }


})