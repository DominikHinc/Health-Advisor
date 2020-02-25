import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DefaultButton from './DefaultButton'
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { setFormData } from '../store/actions'

const TrueFalseForm = (props) => {
    const { objectIndetifier, isValid, setIsValid, cardTopnessIndex, currentTopIndex } = props;
    const [leftOptionChoosen, setLeftOptionChoosen] = useState(null)
    let optionLeftTitle = '';
    let optionRightTitle = '';
    const dispatch = useDispatch();

    const handleClick = (leftOption) => {
        if (cardTopnessIndex === currentTopIndex) {
            setLeftOptionChoosen(leftOption)
            setIsValid(true)
            dispatch(setFormData(objectIndetifier,leftOption))
        }
    }

    switch (objectIndetifier) {
        case 'sex':
            optionLeftTitle = 'Male'
            optionRightTitle = 'Female'
            break;
        case 'isPregnant':
        case 'isSmoking':
            optionLeftTitle = 'Yes'
            optionRightTitle = 'No'
            break;
    }
    return (
        <View style={styles.component}>
            <View style={{ ...styles.button, opacity: leftOptionChoosen === null ? 1 : (leftOptionChoosen ? 1 : 0.5) }}>
                <LinearGradient style={{ flex: 1 }} start={[1, 0]} end={[0, 1]} colors={[Colors.green, Colors.lightGreen]}>
                    <DefaultButton title={optionLeftTitle} fontStyle={styles.buttonLabel} onPress={() => { handleClick(true) }} />
                </LinearGradient>
            </View>
            <View style={{ ...styles.button, opacity: leftOptionChoosen === null ? 1 : (leftOptionChoosen ? 0.5 : 1) }}>
                <LinearGradient style={{ flex: 1 }} start={[0, 1]} end={[1, 0]} colors={[Colors.green, Colors.lightGreen]}>
                    <DefaultButton title={optionRightTitle} fontStyle={styles.buttonLabel} onPress={() => { handleClick(false) }} />
                </LinearGradient>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    component: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    button: {
        height: '35%',
        width: '40%',
        marginHorizontal: '5%',
        backgroundColor: Colors.green,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.green

    },
    buttonLabel: {
        color: 'white',
        fontSize: 17
    },
})

export default TrueFalseForm
