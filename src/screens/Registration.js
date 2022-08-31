import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import React, {useState, Fragment} from 'react'
import { firebase } from "../db/config";
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window')

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigation = useNavigation()


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
    <Fragment>
        <SafeAreaView 
        style={{
        flex: 1,
        backgroundColor: '#58641d',
        }}>
        <View style={styles.header}>
        </View>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, color: '#fff'}}>Registration</Text>
        <View style={styles.container}>
            <View style={{ marginTop: 0 }}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="First Name"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Last Name"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>
            <TouchableOpacity
                onPress={() => {  registerUser(email, password, firstName, lastName);}}
                style={styles.button}
            
            >
                <Text style={{ fontWeight: "bold", fontSize: 16, color: '#fff' }}>
                    Register
                </Text>

            </TouchableOpacity>
        </View>
        </SafeAreaView>
        <SafeAreaView
            style={{
                flex: 0,
                backgroundColor: '#f0f0f0',
            }}
        />
    </Fragment>
    )
}

export default Registration

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 20,
        paddingTop: 20,
    },
    TextInput: {
        marginTop: 6,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        width: width*0.8,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: width*0.02,
        marginBottom: 10,
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        height: 60,
        width: width*0.8,
        justifyContent: 'center',
        backgroundColor: '#8B5D33',
        borderRadius: width*0.1,
        marginTop: 50,
    }
})