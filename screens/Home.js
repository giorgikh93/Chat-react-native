import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import CustomListItem from '../components/CustomListItem';
import auth from '@react-native-firebase/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import firestore from '@react-native-firebase/firestore'
import useImagePicker from '../hooks/useImagePicker'
import Progress from '../components/ProgressBar'
function Home({ navigation }) {

    const [chats, setChats] = useState([]);
    const [progress, setProgress] = useState(0)
    const [progressVisible,setProgressVisible] = useState(false)
    const { chooseImage } = useImagePicker()

    useEffect(() => {
        const unsubscribe = firestore().collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsubscribe;
    }, [])

    //styling headers before page renders 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleStyle: {
                alignSelf: Platform.OS === 'android' && 'center'
            },
            title: 'Signal',
            headerStyle: { backgroundColor: 'white', borderBottomWidth: 1 },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 15 }}>
                    <TouchableOpacity onPress={signout}>
                        <Avatar rounded source={{ uri: auth().currentUser?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => handleUploadImage()}>
                        <Icon name='camera' size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <Icon name='pencil' size={22} />
                    </TouchableOpacity>
                </View>

            )
        })
    }, [auth().currentUser.photoURL])



    const handleUploadImage = () => {
        chooseImage(undefined, auth().currentUser, setProgress,setProgressVisible)

    }
    function signout() {
        auth().signOut()
            .then(() => navigation.replace('Login'))
    }


    function enterChat(id, chatName) {
        navigation.navigate('Chat', {
            id, chatName
        })
    }
    return (
        <SafeAreaView >
           {progressVisible && <Progress progress={progress} />}
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    < CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
});

export default Home;