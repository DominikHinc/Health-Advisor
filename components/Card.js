import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Colors from '../constants/Colors'
import { NUMERIC, TRUEFALSE } from '../constants/QUESTIONS'
import { setCardValid } from '../store/actions'
import DefaultText from './DefaultText'
import NumericForm from './NumericForm'
import TrueFalseForm from './TrueFalseForm'

const Card = (props) => {
    const { id, closeThemAll, cardTopnessIndex, currentTopIndex, objectIndetifier, type, aditionalDescription } = props;
    const [showDetails, setShowDetails] = useState(true)
    const [animationState, setAnimationState] = useState(new Animated.Value(showDetails ? 1 : 0))
    const [isValid, setIsValid] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCardValid(objectIndetifier,isValid));
    },[isValid])

    useEffect(() => {
        startAnimation();
    }, [showDetails])

    useEffect(() => {
        if (closeThemAll === true && cardTopnessIndex != currentTopIndex && isValid === true) {
            setIsShowDetails(false);
        }
    }, [closeThemAll])

    const notShowDetails = () => {
        if (cardTopnessIndex != currentTopIndex && isValid === true) {
            setShowDetails(prev => !prev);
        }

    }

    const setIsShowDetails = (isShowDetails) => {
        setShowDetails(isShowDetails);
    }

    const startAnimation = () => {
        const toValue = showDetails ? 1 : 0;
        Animated.spring(animationState, {
            toValue: toValue,
            friction: 8
        }).start()
    }
    const cardHeight = animationState.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').height / 9, Dimensions.get('window').height / 3]
    }
    )
    const labelHeight = animationState.interpolate({
        inputRange: [0, 1],
        outputRange: ['65%', '16%']
    }
    )

    const bottomMargin = animationState.interpolate({
        inputRange: [0, 1],
        outputRange: ['-8%', '5%']
    }
    )

    let TouchableComp = TouchableOpacity;
    let FormComp = <Text>Loading</Text>;
    switch(type){
        case NUMERIC:
            FormComp = <NumericForm objectIndetifier={objectIndetifier} isValid={isValid} setIsValid={setIsValid} />
            break;
        case TRUEFALSE:
            FormComp = <TrueFalseForm objectIndetifier={objectIndetifier} isValid={isValid} setIsValid={setIsValid} 
                                      cardTopnessIndex={cardTopnessIndex} currentTopIndex={currentTopIndex} />
            break;
    }

    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComp = TouchableNativeFeedback;
    }

    return (
        <Animated.View style={{ ...styles.card, height: cardHeight, marginBottom: bottomMargin }}>
            <Animated.View style={{ ...styles.label, height: labelHeight }}>
                <TouchableComp style={{ flex: 1 }} onPress={notShowDetails} >
                    <View style={{ flex: 1 }}>
                        <LinearGradient style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} colors={[Colors.lightGreen, Colors.green]}>
                            <DefaultText style={styles.title}>
                                {props.title}
                            </DefaultText>
                        </LinearGradient>
                    </View>
                </TouchableComp>

            </Animated.View>
            <View style={styles.content}>
                <LinearGradient style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} colors={[Colors.green, Colors.lightGreen]}>
                    <View style={styles.bottomContainer}>
                        <DefaultText style={styles.labelText}>
                            {aditionalDescription}
                        </DefaultText>
                        {FormComp}
                    </View>

                </LinearGradient>
            </View>

        </Animated.View>
    )
}
const styles = StyleSheet.create({
    card: {
        height: '30%',
        width: Dimensions.get('window').width * 3 / 4,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: Colors.green
    },
    label: {
        height: '15%',


    },
    labelText: {
        color: 'white',
        fontSize: 17,
        fontFamily:'calibril-light',
        textAlign:'center'
    },
    title:{
        color: 'white',
        fontSize: 22,
        
    }, 
    content: {
        height: '100%',
        width: '100%',
    },
    bottomContainer:{
        flex:1,
        paddingTop:'5%',
        paddingBottom:'15%',
        width:'100%'
    }
})

export default Card
