import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import Colors from '../constants/Colors';
import DefaultText from './DefaultText';

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
    },
    label:{
        color:'white',
        fontSize:16,
        width:'70%'
    }
})

export default TrueFalseOptional
