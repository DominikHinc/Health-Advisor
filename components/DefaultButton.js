import React from 'react';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import DefaultText from './DefaultText';

const DefaultButton = (props) => {

    let TouchableComp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComp = TouchableNativeFeedback;
    }
    if(props.forceOpacity){
        TouchableComp = TouchableOpacity;
    }
    return (

        <TouchableComp style={styles.button} onPress={props.onPress} >
            <View style={styles.innerView}>
                <DefaultText style={{ ...props.fontStyle }}>
                    {props.title}
                </DefaultText>
            </View>
        </TouchableComp>

    )
}

const styles = StyleSheet.create({
    button: {
        height: '100%',
        width: '100%',
        flex:1
    },
    innerView:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DefaultButton
