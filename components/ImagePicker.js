import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import useImagePicker from '../hooks/useImagePicker'

function ImagePicker({ setImageUri, imageUri }) {

const {chooseImage} = useImagePicker()
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.picker} onPress={()=>chooseImage(setImageUri)}>
                {imageUri === '' ? <Icon name='plus' size={20} style={styles.icon} /> : <Image style={styles.image} source={{ uri: imageUri }} />}
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        height: 80,

    },
    picker: {
        width: '30%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        position: 'relative',
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center'
    },
    icon: {
        
    },
    image:{
        width:'100%',
        height:'100%'
    }
});

export default ImagePicker;