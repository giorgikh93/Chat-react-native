import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker'
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';


let options = {
    title: 'Select Image',
    customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};



function useImagePicker(props) {


     function uploadImage(authUser, imageUrl, setProgress,setProgressVisible) {

        const fileExtension = imageUrl.split('.').pop()

        const fileName = `${uuid.v4()}.${fileExtension}`

        const reference = storage().ref(`user/${fileName}`);

        reference.putFile(imageUrl)
            .on(storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    setProgressVisible(true)
                    setProgress(snapshot.bytesTransferred / snapshot.totalBytes)
                    if (snapshot.state === storage.TaskState.SUCCESS) {
                        console.log('Success')
                        setTimeout(() => {
                            setProgressVisible(false)
                        }, 200)
                    }
                },
                error => {
                    console.log('err', error.toString())
                    return;
                },
                () => {
                    reference.getDownloadURL()
                        .then((downloadUrl) => {
                            console.log('FILE AVAILABLE AT ' + downloadUrl)
                            authUser.updateProfile({
                                photoURL: downloadUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                            })
                        })
                }
            )
    }

    const chooseImage = (setImageUri, user, setProgress,setProgressVisible) => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (user) {
                  return  uploadImage(user, response.uri, setProgress,setProgressVisible)
                }
                setImageUri(response.uri)
            }
        });
    }
    return { chooseImage, uploadImage }
}


export default useImagePicker;