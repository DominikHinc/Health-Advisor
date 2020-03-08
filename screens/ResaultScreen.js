import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, LayoutAnimation, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ResetButton from '../components/ResetButton'
import ResultItemV2 from '../components/ResultItemV2'
import Colors from '../constants/Colors'
import { getResaultFromServer } from '../methods/GetResaultFromServer'
import { resetAction } from '../store/actions'
import DefaultButton from '../components/DefaultButton'
import { LinearGradient } from 'expo-linear-gradient'


const ResaultScreen = (props) => {
    const formInformation = useSelector(state => state.cards.formInfo);
    const [errorOccured, setErrorOccured] = useState(false)
    const [listOfReccomendations, setListOfReccomendations] = useState([])
    const [loading, setLoading] = useState(true)
    const [tryAgain, setTryAgain] = useState(false)
    const dispatch = useDispatch();
    const CustomLayoutSpring = {
        duration: 1000,
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

    const asyncWrapper = async () => {
            const response = await getResaultFromServer(formInformation);
            if (!response.success) {
                Alert.alert('An Error Has Occured', 'Could not fetch information from the server', [{ text: 'Ok' }]);
                setErrorOccured(true);
                setLoading(false)
            } else {
                LayoutAnimation.configureNext(CustomLayoutSpring);
                setLoading(false)
                setListOfReccomendations(response.response)
            }
    }

    useEffect(() => {
        asyncWrapper();
    }, [])
    useEffect(()=>{
        if(tryAgain){
            setTryAgain(false);
            setErrorOccured(false)
            asyncWrapper();
        }
    },[tryAgain])

    const resetButtonHandler = () => {
        Alert.alert('Reset', 'Are you sure you want to reset?', [{ text: 'No' }, { text: "Yes", onPress: reset }])
    }

    const reset = () => {
        dispatch(resetAction());
        setLoading(false);
        props.navigation.navigate('Splash')
    }

    const renderResaultV2 = ({ item, index }) => {
        if (index < listOfReccomendations.length-1) {
            return <ResultItemV2 recommendation={item.Recommendation} index={index}
                conditions={item["Optional/applicable conditions"] !== undefined ? item["Optional/applicable conditions"] : undefined}
                references={item.References} index={index} />
        }else{
            return <ResetButton onPress={resetButtonHandler} />
        }

    }

    return (
        <View style={styles.screen}>
            <FlatList data={listOfReccomendations} keyExtractor={item => item.Recommendation} renderItem={renderResaultV2} contentContainerStyle={styles.listContainer} />
            {loading && !errorOccured && <ActivityIndicator style={{ marginBottom: '100%' }} size='large' color={Colors.darkGreen} />}
            {errorOccured && !loading&& 
            <View style={styles.tryAgainButtonContainer}>
                <View style={styles.tryAgainButton}>
                    <LinearGradient style={{ flex: 1,height:50 }} start={[1, 0]} end={[0, 1]} colors={[Colors.green, Colors.lightGreen]}>
                        <DefaultButton title="Try again" fontStyle={{ color: 'white', fontSize: 20 }} 
                        onPress={()=>{setTryAgain(true)
                                        setLoading(true)}} />
                    </LinearGradient>
                </View>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        //height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    
    listContainer: {
        paddingLeft: '1%',
        paddingRight: '1%',
        paddingBottom: '5%',
        paddingTop: Dimensions.get('screen').height - Dimensions.get('window').height,
       
    },
    tryAgainButton:{
        
        height:'20%',
        backgroundColor:Colors.green,
        width:'50%',
        borderRadius:15,
        overflow:'hidden',
      
    },
    tryAgainButtonContainer:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ResaultScreen
