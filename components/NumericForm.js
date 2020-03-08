import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import validate from 'validate.js'
import Colors from '../constants/Colors'
import { setFormData } from '../store/actions'
import { threeNumbersValidation, twoNumbersValidation } from '../validation/constraints'


const NumericForm = (props) => {
    const { objectIndetifier, isValid, setIsValid } = props;
    const [textInpuValue, setTextInpuValue] = useState('');

    const dispatch = useDispatch();

    const checkIfValid = (text) => {
        if (text.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    const textInputHandler = (text) => {
        let validationResault;
        switch (objectIndetifier) {
            case 'height':
            case 'weight':
            case 'age':
            case 'sbp':
            case 'dbp':
                validationResault = validate({ value: text }, threeNumbersValidation);
                break;
            case 'pregnancyWeek':
            case 'yearsOfSmoking':
                validationResault = validate({ value: text }, twoNumbersValidation);
                break;
            case 'packOfSmoking':
                validationResault='Good Night'
                if (text - 0 == text && text[text.length-1] != ' ' && text.length < 5) {
                    console.log('Matching')
                    validationResault = undefined;
                }
                break;
        }

        if (validationResault === undefined || text === '') {
            setTextInpuValue(text);
            checkIfValid(text);
            dispatch(setFormData(objectIndetifier, text))
        }
    }

    return (
        <View style={styles.component}>
            <TextInput style={{ ...styles.textInput, borderColor: isValid ? Colors.green : Colors.red }} keyboardType='decimal-pad' value={textInpuValue} onChangeText={textInputHandler} onBlur={() => checkIfValid(textInpuValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    component: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: '20%',
        width: '70%',
        backgroundColor: 'white',
        fontSize: 15,
        paddingLeft: 10,
        borderRadius: 15,
        borderWidth: 2,
        textAlign: 'center'
    }
})

export default NumericForm
