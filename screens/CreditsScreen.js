import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import DefaultText from '../components/DefaultText'
import Colors from '../constants/Colors'


const CreditsScreen = (props) => {
    return (
        <View style={styles.screen}>
            <LinearGradient style={styles.gradient} colors={[Colors.darkGreen, Colors.green]}>
                <DefaultText style={styles.label}>
                    App created by <DefaultText style={{ fontWeight: 'bold' }}>Dominik Hinc </DefaultText>
                </DefaultText>
                <DefaultText style={styles.label}>
                    This application is just a "Wrapper" around GetGuidelines API which was not created by the creator of this application.
               </DefaultText>
                <DefaultText style={styles.label}>
                    GetGuidelines API was created by Adams Briscoe.
               </DefaultText>
                <DefaultText style={styles.label}>
                    GetGuidelines site : https://getguidelines.com/
               </DefaultText>
                <DefaultText style={styles.label}>
                    None of the data you input in this application is collected by it's maker.
               </DefaultText>
                <DefaultText style={styles.label}>
                    The data you input in this application is sent to GetGuidelines servers.
               </DefaultText>
                <DefaultText style={styles.label}>
                    The creator of this application does not take responsibility for what the creator of GetGuidelines is doing with data his API recieves.
               </DefaultText>
                <View style={styles.arrowContainer}>
                    <AntDesign name='arrowleft' size={30} color={Colors.darkGreen} onPress={()=>{props.navigation.navigate('Splash')}} />
                </View>
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        padding: '5%',
        paddingTop: '15%'
    },
    label: {
        color: 'white',
        fontSize: 17,
        marginBottom: '5%'
    },
    arrowContainer:{
        flex:1,
        flexDirection:'column-reverse'
    }
})

export default CreditsScreen
