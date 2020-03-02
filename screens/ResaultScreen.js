import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { getResaultFromServer } from '../methods/GetResaultFromServer'
import { FlatList } from 'react-native-gesture-handler'
import ResultItem from '../components/ResultItem'
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import DefaultText from '../components/DefaultText'
import ResultItemV2 from '../components/ResultItemV2'

const ResaultScreen = (props) => {
    const formInformation = useSelector(state => state.cards.formInfo);
    const [errorOccured, setErrorOccured] = useState(false)
    const [listOfReccomendations, setListOfReccomendations] = useState([])

    useEffect(() => {
        const asyncWrapper = async () => {
            const response = await getResaultFromServer(formInformation);
            //console.log(response)
            if (!response.success) {
                Alert.alert('An Error Has Occured', 'Could not fetch information from the server', [{ text: 'Ok' }]);
                setErrorOccured(true);
            } else {
                setListOfReccomendations(response.response)
            }
        }
        asyncWrapper();
    }, [])

    const renderResault = ({ item, index }) => {
        return <ResultItem recommendation={item.Recommendation} index={index}
            conditions={item["Optional/applicable conditions"] !== undefined ? item["Optional/applicable conditions"] : undefined}
            references={item.References} index={index} />
    }
    const renderResaultV2  = ({item, index}) =>{
        return <ResultItemV2 recommendation={item.Recommendation} index={index}
        conditions={item["Optional/applicable conditions"] !== undefined ? item["Optional/applicable conditions"] : undefined}
        references={item.References} index={index} />
    }

    return (
        <View style={styles.screen}>
            {/* <LinearGradient style={styles.gradient}
                colors={[listOfReccomendations.length % 2 == 1 ? Colors.green : Colors.green, listOfReccomendations.length % 2 == 1 ? Colors.middleGreen : Colors.green]}>
                {listOfReccomendations.length === 0 && <ActivityIndicator size='large' color={Colors.darkGreen} />}
                <FlatList data={listOfReccomendations} keyExtractor={item => item.Recommendation} renderItem={renderResault} contentContainerStyle={{ paddingTop: '5%', paddingBottom: '5%' }} />
            </LinearGradient> */}
            <FlatList data={listOfReccomendations} keyExtractor={item => item.Recommendation} renderItem={renderResaultV2} contentContainerStyle={styles.listContainer} />

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%'
    },
    gradient: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer:{
        paddingLeft:'1%',
        paddingRight:'1%',
        paddingBottom:'5%',
        paddingTop: Dimensions.get('screen').height - Dimensions.get('window').height
    }
})

export default ResaultScreen
