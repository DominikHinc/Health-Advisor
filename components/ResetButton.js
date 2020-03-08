import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../constants/Colors'
import DefaultButton from './DefaultButton'


const ResetButton = (props) => {
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                    <LinearGradient style={{ flex: 1,height:50 }} start={[1, 0]} end={[0, 1]} colors={[Colors.green, Colors.lightGreen]}>
                        <DefaultButton title="Reset" fontStyle={{ color: 'white', fontSize: 20 }} onPress={props.onPress} />
                    </LinearGradient>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    button: {
        width: '50%',
        overflow: 'hidden',
        borderRadius: 12,


    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop:10
    }
})
export default ResetButton
