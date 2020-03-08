import React, { useState } from 'react'
import { Animated, Clipboard, LayoutAnimation, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'
import DefaultText from './DefaultText'



const ResultItemV2 = (props) => {
    const [showReferences, setShowReferences] = useState(false);
    const [showMore, setShowMore] = useState(false)
    const CustomLayoutSpring = {
        duration: 400,
        create: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.7,
        },
    };
    let TouchableComp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComp = TouchableNativeFeedback;
    }
    if (props.forceOpacity) {
        TouchableComp = TouchableOpacity;
    }

    const handleTopClick = () => {
        LayoutAnimation.configureNext(CustomLayoutSpring);
        setShowMore(prev => !prev)
    }
    const handleBottomClick = () => {
        LayoutAnimation.configureNext(CustomLayoutSpring);
        setShowReferences(prev => !prev)
    }
    const copyReferencesToClipboard = () => {
        Clipboard.setString(props.references);
        alert('Copied to Clipboard');
    }

    
    return (
        <Animated.View>
            {props.index === 0 && <Text style={styles.title}>Your Recommendations:</Text>}
            <Animated.View style={{ ...styles.mainContainer }}>
                <View style={styles.topContainer}>
                    <TouchableComp style={{ flex: 1 }} onPress={handleTopClick}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, padding: '5%' }}>
                                {props.conditions && <DefaultText numberOfLines={showMore ? 99 : 1} style={styles.conditions}>{props.conditions}</DefaultText>}
                                <DefaultText style={{ ...styles.label }} numberOfLines={showMore ? 20 : 2} >{props.recommendation}</DefaultText>
                            </View>
                        </View>


                    </TouchableComp>

                </View>
                <View style={styles.bottomContainer}>
                    <TouchableComp style={{ flex: 1 }} onPress={handleBottomClick}>
                        <View style={{ flex: 1, paddingLeft: '5%'}}>
                            {showReferences &&
                                <View>
                                    <DefaultText style={styles.label}>References:</DefaultText>
                                    <DefaultText style={styles.label} onPress={copyReferencesToClipboard}>{props.references}</DefaultText>
                                </View>}
                            <DefaultText style={styles.referenceLabel}>{showReferences ? 'Hide References' : 'Show References'}</DefaultText>
                        </View>
                    </TouchableComp>
                </View>
            </Animated.View>
        </Animated.View>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.green,
        width: '100%',
        marginVertical: '0.5%',
        borderRadius: 10,
        overflow: 'hidden',

    },
    label: {
        color: 'white',
        fontSize: 17
    },
    bottomContainer: {
        backgroundColor: Colors.middleGreen,
        paddingVertical: '0.5%',
        flex: 1
    },
    title: {
        fontFamily: 'impact',
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
    },
    referenceLabel: {
        color: Colors.lightBlue,
        fontWeight: 'bold',
        width:'100%',
        textAlign:'center'
    },
    conditions: {
        color: Colors.lightRed,
        fontSize: 16,
        
    },
})

export default ResultItemV2
