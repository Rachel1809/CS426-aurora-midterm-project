import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../db/config'

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
    <View style = {styles.container}>
        <Text style={{fontWeight:"bold", fontSize:26}}>
            Login
        </Text>
          <View style={{marginTop: 40}}>
              <TextInput
                  style={styles.TextInput}
                  placeholder="Email"
                  onChangeText={(email) => setEmail(email)}
                  autoCapitalize="none"
                  autoCorrect={false}

              />
              <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  onChangeText={(password) => setPassword(password)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}

              />
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => loginUser(email, password)}
              >
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                    Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => navigation.navigate('Registration')}
                  style={{ marginTop: 20 }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Don't have an account? Register here.
                </Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}

export default Login

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
