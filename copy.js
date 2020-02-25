import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert, Dimensions } from 'react-native'
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import DefaultButton from '../components/DefaultButton';
import Animated, { Easing } from 'react-native-reanimated';
import { APIKEY } from '../constants/APIKEY';

const SplashScreen = (props) => {
    const logoPosition = Dimensions.get('window').width / 2 - Dimensions.get('screen').height * 17.6 / 100 / 2

    const [loading, setLoading] = useState(true)
    const [errorHasOccured, setErrorHasOccured] = useState(false)
    const [logoTextOpacity, setlogoTextOpacity] = useState(0.1)
    const [beginAnimation, setBeginAnimation] = useState(false)
    const { Clock, Value, timing, startClock, block, cond, stopClock, and, eq, neq, set, interpolate, Extrapolate, call } = Animated;
    const clock = new Clock();
    
    const afterAnimation = () =>{
        setlogoTextOpacity(1)
    }
    const runClockAnimation = () => {
        const state = {
            finished: new Value(0),
            position: new Value(0),
            frameTime: new Value(0),
            time: new Value(0)
        }
        const config = {
            duration: 500,
            toValue: new Value(0),
            easing: Easing.inOut(Easing.ease)
        }
        return block([
            cond(and(eq(beginAnimation, true), neq(config.toValue, 1)),
                [set(state.finished, 0),
                set(state.time, 0),
                set(state.frameTime, 0),
                set(config.toValue, 1),
                startClock(clock)]),
            cond(and(eq(beginAnimation, false), neq(config.toValue, 0)),
                [set(state.finished, 0),
                set(state.time, 0),
                set(state.frameTime, 0),
                set(config.toValue, 0),
                startClock(clock)]),
            timing(clock, state, config),
            cond(and(state.finished, eq(state.position, 1)),call([],afterAnimation)),
            cond(state.finished, stopClock(clock)),
            interpolate(state.position, {
                inputRange: [0, 1],
                outputRange: [logoPosition, logoPosition/3],
                extrapolate: Extrapolate.CLAMP
            })
        ])
    }
    const padding = runClockAnimation();

    const begin = () => {
        props.navigation.navigate('TagChoose');
    }

    const handleError = () => {
        Alert.alert('An Error Has Occured', 'Could not fetch information from the server', [{ text: 'Ok' }]);
        setErrorHasOccured(true);
        setLoading(false);
    }


    const fetchFromServer = async () => {
        let response;
        let readableResponse;
        setLoading(true);
        try {
            response = await fetch(`https://getguidelines.com/all?age=68&sex=f&cac=5conditions=dm&api_token=${APIKEY}`);
        } catch (error) {
            handleError();
            return;
        }
        try {
            readableResponse = await response.json();
        } catch (error) {
            handleError();
            return;
        }

        //console.log(readableResponse)
        if (readableResponse.meta.status === 'success') {
            setLoading(false);
            setErrorHasOccured(false);
            setBeginAnimation(true)
        }
    }

    useEffect(() => {
        fetchFromServer();

    }, [])
    return (
        <View style={styles.screen}>
            <LinearGradient style={styles.gradient} colors={[Colors.darkGreen, Colors.green]}>
                <View style={styles.wholeLogoContainer}>
                    <Animated.View style={[styles.logoContainer, { paddingLeft : padding }]}>
                        <Image style={styles.logo} source={require('../assets/Logo.png')} resizeMode='contain' />
                    </Animated.View>
                     <Animated.View style={[styles.textContainer, {opacity: logoTextOpacity}]}>
                        <Text style={styles.logoText}>
                            Health
                        </Text>
                        <Text style={styles.logoText}>
                            Recommender
                        </Text>
                    </Animated.View>
                </View>
                <View style={styles.startButtonContainer}>
                    {loading ? <ActivityIndicator size="large" color={Colors.darkGreen} /> :
                        <View style={styles.button}>
                            <DefaultButton title={errorHasOccured ? 'Try again' : 'Start'} fontStyle={{ color: 'white', fontSize: 20 }} onPress={errorHasOccured ? fetchFromServer : begin} />
                        </View>
                    }
                </View>
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1
    },
    wholeLogoContainer: {
        height: '25%',
        width: '100%',
        marginTop: '15%',
        flexDirection: 'row',
        alignItems: 'center',

    },
    logoContainer: {
        height: '100%'

    },
    logo: {
        height: '100%',
        aspectRatio: 1
    },
    textContainer: {
        paddingLeft: '5%'
    },
    logoText: {
        fontFamily: 'impact',
        fontSize: 30,
        color: 'white'
    },
    startButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '20%'
    },
    button: {
        height: '15%',
        width: '40%',
        overflow: 'hidden',
        backgroundColor: Colors.green,
        borderRadius: 15,
    }
})
export default SplashScreen
