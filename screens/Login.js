import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Input, Image } from 'react-native-elements'
import auth from '@react-native-firebase/auth'

function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(authUser => {
            if (authUser) {
                navigation.replace('Home');
            }
        })

        return unsubscribe;
    }, [])

    function signIn() {
        auth().signInWithEmailAndPassword(email, password)
        .then(()=>console.log('user signed in'))
            .catch(error => {
                console.log(error)
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        Alert.alert('Email already in use !')
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('invalid-email')
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('email or password is incorrect');
                        break;
                    default:
                        Alert.alert('Unexpacted error has occured')
                }
            });
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image
                style={{ width: 150, height: 150, borderRadius: 15, }}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Signal_Blue_Icon.png' }}
            />
            <View style={styles.inputContainer}>
                <Input
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder='Email'
                    autoFocus
                    type='email'
                />
                <Input
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder='Password'
                    secureTextEntry
                    type='password'
                />
            </View>

            <Button
                title='Login'
                containerStyle={styles.button}
                onPress={signIn}

            />
            <Button
                title='Register'
                type='outline'
                containerStyle={styles.button}
                onPress={() => navigation.navigate('Register')}
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    },
});

export default Login;