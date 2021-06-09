import React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';


function Progress({ progress }) {
    return (
        <ProgressBar  progress={progress} color={Colors.blue500} />
    );
}



export default Progress;