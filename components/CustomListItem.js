import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'


function CustomListItem({ id, chatName, enterChat }) {
   const [chatMessages, setChatMessages] = useState([]);

   useEffect(() => {
      const unsubscribe = firestore().collection('chats')
         .doc(id).collection('messages')
         .orderBy('timestamp', 'asc')
         .onSnapshot(snapshot => {
            setChatMessages(snapshot.docs.map((doc) => doc.data()))
         })
      return unsubscribe;
   }, [])
   return (
      <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
         <Avatar
            rounded
            source={{ uri: chatMessages?.[chatMessages.length-1]?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
         <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '800' }}>
               {chatName}
            </ListItem.Title>
            {chatMessages.length>0 &&
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
               {chatMessages?.[chatMessages.length-1]?.displayName}: {chatMessages?.[chatMessages.length-1]?.message}
            </ListItem.Subtitle>
            }
         </ListItem.Content>

      </ListItem>
   );
}

const styles = StyleSheet.create({
   container: {}
});

export default CustomListItem;