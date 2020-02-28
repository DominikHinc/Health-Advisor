import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'
import DefaultText from './DefaultText'
import DefaultButton from './DefaultButton'


const ResultItem = (props) => {

    const [showReferences, setShowReferences] = useState(false);
    const [showMore, setShowMore] = useState(false)
    let textPreview = props.recommendation;
    textPreview = textPreview.substring(0, 45) + "..."

    return (
        <View style={styles.container}>

            <LinearGradient style={{ width: '100%', }} colors={[props.index % 2 == 0 ? Colors.green : Colors.lightGreen, props.index % 2 == 0 ? Colors.lightGreen : Colors.green]}>
                <LinearGradient style={styles.gradient} colors={[props.index % 2 == 0 ? Colors.green : Colors.middleGreen, props.index % 2 == 0 ? Colors.middleGreen : Colors.green]}>
                    {props.conditions && <DefaultText style={styles.optionalLabel}>Optional/applicable conditions:</DefaultText>}
                    {props.conditions && <DefaultText style={styles.optionalLabel}>{props.conditions}</DefaultText>}
                    {!showMore ?
                        <LinearGradient colors={['black','transparent']}>
                           <DefaultText style={styles.label}>{textPreview}</DefaultText> 
                        </LinearGradient>
                        
                        :
                        <View style={styles.button}>
                            <DefaultButton fontStyle={styles.referenceLabel} title={showReferences ? "Hide References" : 'Show References'} forceOpacity={true} onPress={() => { setShowReferences(prev => !prev) }} />
                        </View>

                    }
                    {showReferences &&
                        <View>
                            <DefaultText style={styles.label}>References:</DefaultText>
                            <DefaultText style={styles.label}>{props.references}</DefaultText>
                        </View>}
                </LinearGradient>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginVertical:'8%',
        //paddingHorizontal: '10%',
        width: Dimensions.get('window').width,
        backgroundColor: 'white'


    },
    label: {
        color: 'white',
        fontSize: 16
    },
    optionalLabel: {
        color: Colors.lightRed,
        fontSize: 16
    },
    gradient: {
        flex: 1,
        padding: '3%',
        //borderRadius: 15,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderColor: Colors.darkGreen,
        //marginVertical: '8%'
    },
    referenceLabel: {
        color: Colors.lightBlue
    },
    button: {
        paddingTop: '5%'
    }
})

export default ResultItem
