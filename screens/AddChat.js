import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import firestore from '@react-native-firebase/firestore'

function AddChat({ navigation }) {

    const [input, setInput] = useState('')


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add New Chat',
            headerBackTitle: 'Chats'
        })
    }, [])

    async function createChat() {
        await firestore().collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        })
            .catch(err => Alert.alert(err))
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter a chat name'
                value={input}
                onChangeText={text => setInput(text)}
                leftIcon={<Icon name='wechat' type='antdesign' size={24} color='black' />}
                onSubmitEditing={createChat}
            />

            <Button
                disabled={!input}
                onPress={() => createChat()}
                title='Create new chat'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {}
});

export default AddChat;