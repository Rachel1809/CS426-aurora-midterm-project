import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import React, {useState, Fragment} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../db/config'

const { width, height } = Dimensions.get('window')

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            
        } catch (error) {
            alert(error.message)
        }
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
        <Text style={{fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, color: '#fff'}}>Login</Text>
        <View style = {styles.container}>
            <View style={{marginTop: 0, alignItems: 'center'}}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="done"
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType="done"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => loginUser(email, password)}
                >
                <Text style={{ fontWeight: "bold", fontSize: 16, color: '#fff' }}>
                    Login
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Registration')}
                    style={{ marginTop: 20 }}
                >
                <Text style={{fontSize: 12 }}>
                    Don't have an account? Register here.
                </Text>
                </TouchableOpacity>
            </View>
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

export default Login

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
