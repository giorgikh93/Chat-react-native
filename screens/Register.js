import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform, Alert } from 'react-native';
import { Button, Input, Image, Text, } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import ImagePicker from '../components/ImagePicker'
import useImagePicker from '../hooks/useImagePicker'


function Register({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const { uploadImage } = useImagePicker()



    useLayoutEffect(() => {
        navigation.setOptions({
            title: Platform.OS === 'android' && 'Back to Login',
            headerBackTitle: 'Back to Login',
        })
    }, [navigation])

    async function register() {
        let user;
        auth().createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                user = authUser.user
                authUser.user.updateProfile({
                    displayName: name,
                })
            }).then(() => imageUrl && uploadImage(user, imageUrl))
            .catch(err => {
                console.log(err, 'ERROR')
                switch (err.code) {
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
            })
    }



    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={styles.container}>
            <Text h3 style={{ marginBottom: 50 }}>Create a Signal account</Text>
            <View style={styles.inputContainer}>

                <Input
                    placeholder='Full Name'
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <ImagePicker setImageUri={setImageUrl} imageUri={imageUrl} />
            </View>


            <Button
                title='Register'
                onPress={register}
                raised
                containerStyle={styles.button}
            />
        </KeyboardAvoidingView>
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
    }
});

export default Register;