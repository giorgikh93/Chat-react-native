import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


function ChatScreen({ navigation, route }) {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const { chatName, id } = route.params

    //styling upper header 
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar
                        rounded
                        source={{ uri: messages[messages.length-1]?.data.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }}
                    />
                    <Text style={styles.headerText}>{chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
                    <Icon name='long-arrow-left' size={24} color='white' />

                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 10,
                    width: 80
                }}>
                    <TouchableOpacity>
                        <Icon name='video-camera' size={24} color='white' />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])


    useLayoutEffect(() => {
        const unsubscribe = firestore().collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))))

        return unsubscribe;
    }, [route])

    function send() {
        Keyboard.dismiss();
        if (input !== '') {
            firestore().collection('chats').doc(id).collection('messages')
                .add({
                    timestamp: new Date().getTime(),
                    message: input,
                    displayName: auth().currentUser.displayName,
                    email: auth().currentUser.email,
                    photoURL: auth().currentUser.photoURL,
                })
            setInput('');
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={90}
                behavior={Platform.OS === 'ios' && 'padding'}
            >
                <>
                    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                        {messages.map(({ id, data }) => (
                            data.email === auth().currentUser.email ? (
                                <View style={styles.reciever} key={id}>
                                    <Avatar
                                        position='absolute'
                                        bottom={-15}
                                        right={-5}
                                        size={30}
                                        rounded
                                        source={{ uri: data.photoURL }} />
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                </View>
                            ) : <View key={id} style={styles.sender}>
                                <Avatar rounded position='absolute'
                                    bottom={-15}
                                    left={-5}
                                    size={30}
                                    source={{ uri: data.photoURL }}
                                />
                                <Text style={styles.senderText}>{data.message}</Text>

                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Write a message'
                            value={input}
                            onChangeText={text => setInput(text)}
                            onSubmitEditing={send}
                        />
                        <TouchableOpacity onPress={send} activeOpacity={0.5}>
                            <Ionicons name='send' size={24} color='#2B6BE6' />

                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        color: 'white',
        marginLeft: 10,
        fontWeight: '700'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        marginRight: 15,
        flex: 1,
        borderColor: 'transparent',
        backgroundColor: '#ECECEC',
        borderWidth: 1,
        padding: 10,
        color: 'grey',
        borderRadius: 30
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative'
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
    },
    reciever: {
        flexDirection: 'row',
        padding: 15,
        alignSelf: 'flex-end',
        backgroundColor: '#ECECEC',
        maxWidth: '80%',
        position: 'relative',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20
    },
    recieverText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10,
    }
});

export default ChatScreen;