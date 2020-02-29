import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import DefaultText from './DefaultText';
import Colors from '../constants/Colors';

const TrueFalseOptional = (props) => {
    const {id,title,removeFromAdditionalOptionArr,addToAddtionalOptionArr} =props;
    const [isChecked, setIsChecked] = useState(false)
    
    const handleChange = () =>{
        if(isChecked){
            removeFromAdditionalOptionArr(id);
        }else{
            addToAddtionalOptionArr(id);
        }
        setIsChecked(prev=>!prev)

    }

    return (
        <View style={styles.container}>
            <DefaultText style={styles.label}>{title}</DefaultText>
            <Switch value={isChecked} onChange={handleChange} trackColor={{false:Colors.mediumGreen,true:Colors.lightGreen}} thumbColor={Colors.green} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

        flexDirection:'row',
        justifyContent:'space-between',
        //paddingHorizontal:'5%'
    },
    label:{
        color:'white',
        fontSize:16,
        width:'70%'
    }
})

export default TrueFalseOptional
