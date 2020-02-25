import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native'
import DefaultButton from '../components/DefaultButton'
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../components/Card'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { addQuestion, changeShowDetails, nextQuestion } from '../store/actions'

const TagsChooseScreen = () => {
    const [loaded, setLoaded] = useState(false)
    const tabOfCards = useSelector(state => state.cards.cardsInfo);
    const currentTopCardIndex = useSelector(state => state.cards.currentTopIndex)
    const dispatch = useDispatch();
    const listRef = useRef();
    const [closeThemAll, setCloseThemAll] = useState(false)

    useEffect(() => {
        if (loaded === false) {
            setLoaded(true);
            dispatch(nextQuestion())
        }

    }, [])


    const addNewCard = () => {
        dispatch(nextQuestion());
        setCloseThemAll(true);
        setTimeout(() => {
            setCloseThemAll(false)
        }, 150)
    }

    const renderCard = (itemData) => {
        return <Card id={itemData.item.id} title={itemData.item.title} objectIndetifier={itemData.item.objectIndetifier}
            closeThemAll={closeThemAll} aditionalDescription={itemData.item.aditionalDescription} type={itemData.item.type}
            cardTopnessIndex={itemData.index} currentTopIndex={currentTopCardIndex} />
    }

    // const addNewQuestion = (id,title,content)=>{
    //     const [showDetails, setShowDetails] = useState(true);
    //     tabOfCards.push({
    //         id:id,
    //         title:title,
    //         content:content,
    //         showDetails:showDetails,
    //         setShowDetails:setShowDetails
    //     })
    //     setCurrentId(prev => prev+=1)
    //     listRef.current.scrollToIndex({
    //         index:tabOfQuestions.length-1
    //     });
    // }




    return (
        <View style={styles.screen}>
            <View style={styles.listConteiner}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                    <FlatList ref={listRef} style={styles.list} contentContainerStyle={{ alignItems: 'center', paddingBottom: '50%' }}
                        data={tabOfCards} renderItem={renderCard} />
                </KeyboardAvoidingView>
            </View>



            <View style={styles.bottomBarContainer}>
                <View style={styles.button}>
                    <LinearGradient style={{ flex: 1 }} start={[1, 0]} end={[0, 1]} colors={[Colors.green, Colors.lightGreen]}>
                        <DefaultButton title="Reset" fontStyle={{ color: 'white', fontSize: 20 }} />
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
