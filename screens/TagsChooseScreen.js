import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Alert } from 'react-native'
import DefaultButton from '../components/DefaultButton'
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../components/Card'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { nextQuestion, resetAction, setFormData } from '../store/actions'
import { OTHER } from '../constants/QUESTIONS'
import AdditionalConditionsCard from '../components/AdditionalConditionsCard'


const TagsChooseScreen = (props) => {
    const [loaded, setLoaded] = useState(false)
    const [addtionalOptionsArr, setAddtionalOptionsArr] = useState([])
    const tabOfCards = useSelector(state => state.cards.cardsInfo);
    const currentTopCardIndex = useSelector(state => state.cards.currentTopIndex)
    const noMoreQuestions = useSelector(state => state.cards.noMoreQuestions)
    const dispatch = useDispatch();
    const listRef = useRef();
    const [closeThemAll, setCloseThemAll] = useState(false)
    const timeOut = useRef()

    useEffect(() => {
        console.log(addtionalOptionsArr)
    }, [addtionalOptionsArr])

    const addToAddtionalOptionArr = (id) => {
        let index = addtionalOptionsArr.findIndex(item => item === id);

        if (index !== undefined) {
            setAddtionalOptionsArr(prev => [...prev, id])
        }

    }
    const removeFromAdditionalOptionArr = (id) => {
        let copy = addtionalOptionsArr.filter(item => item !== id)
        setAddtionalOptionsArr(copy)
        
    }

    // useEffect(() => {
    //     if (loaded === false) {
    //         setLoaded(true);
    //         dispatch(nextQuestion())
    //     }

    // }, [])

    useEffect(() => {
        if (noMoreQuestions) {
            props.navigation.navigate('Resault');
            clearTimeout(timeOut.current);
        }
    }, [noMoreQuestions])

    const reset = () => {
        dispatch(resetAction());
        setLoaded(false);
        props.navigation.navigate('Splash')
    }

    const resetButtonHandler = () => {
        Alert.alert('Reset', 'Are you sure you want to reset?', [{ text: 'No' }, { text: "Yes", onPress: reset }])
    }


    const addNewCard = () => {
        dispatch(setFormData('other',addtionalOptionsArr))
        dispatch(nextQuestion());
        setCloseThemAll(true);
        timeOut.current = setTimeout(() => {
            setCloseThemAll(false)
        }, 150)


    }

    const renderCard = (itemData) => {
        if (itemData.item.type !== OTHER) {
            return <Card id={itemData.item.id} title={itemData.item.title} objectIndetifier={itemData.item.objectIndetifier}
                closeThemAll={closeThemAll} aditionalDescription={itemData.item.aditionalDescription} type={itemData.item.type}
                cardTopnessIndex={itemData.index} currentTopIndex={currentTopCardIndex} />
        } else {
            return <AdditionalConditionsCard addToAddtionalOptionArr={addToAddtionalOptionArr} removeFromAdditionalOptionArr={removeFromAdditionalOptionArr}
                id={itemData.item.id} title={itemData.item.title} objectIndetifier={itemData.item.objectIndetifier}
                closeThemAll={closeThemAll} aditionalDescription={itemData.item.aditionalDescription} type={itemData.item.type}
                cardTopnessIndex={itemData.index} currentTopIndex={currentTopCardIndex} />
        }

    }

    return (
        <View style={styles.screen}>
            <View style={styles.listConteiner}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                    <FlatList nestedScrollEnabled={true} ref={listRef} style={styles.list} contentContainerStyle={{ alignItems: 'center', paddingBottom: '50%' }}
                        data={tabOfCards} renderItem={renderCard} />
                </KeyboardAvoidingView>
            </View>


            <View style={styles.bottomBarContainer}>
                <View style={styles.button}>
                    <LinearGradient style={{ flex: 1 }} start={[1, 0]} end={[0, 1]} colors={[Colors.green, Colors.lightGreen]}>
                        <DefaultButton title="Reset" fontStyle={{ color: 'white', fontSize: 20 }} onPress={resetButtonHandler} />
                    </LinearGradient>
                </View>
                <View style={styles.button}>
                    <LinearGradient style={{ flex: 1 }} start={[0, 1]} end={[1, 0]} colors={[Colors.green, Colors.lightGreen]}>
                        <DefaultButton title="Next" fontStyle={{ color: 'white', fontSize: 20 }} onPress={addNewCard} />
                    </LinearGradient>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    listConteiner: {
        width: '100%',
        height: '85%',
        alignItems: 'center',

    },
    list: {
        flex: 1,
        paddingTop: '10%',
    },
    bottomBarContainer: {
        height: '15%',
        width: "100%",
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        width: '30%',
        marginHorizontal: '10%',
        height: '50%',
        overflow: 'hidden',
        borderRadius: 12
    }
})

export default TagsChooseScreen
