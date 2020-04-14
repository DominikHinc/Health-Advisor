import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import DefaultButton from '../components/DefaultButton';
import DefaultText from '../components/DefaultText';
import { APIKEY } from '../constants/APIKEY';
import Colors from '../constants/Colors';



const SplashScreen = (props) => {
    const logoPosition = Dimensions.get('window').width / 2 - Dimensions.get('screen').height * 17.6 / 100 / 2
    const [loading, setLoading] = useState(true)
    const [errorHasOccured, setErrorHasOccured] = useState(false)
    const [paddingLeft, setPaddingLeft] = useState(new Animated.Value(logoPosition))
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    const [afterAnimation, setAfterAnimation] = useState(false)

    const startAnimation = () => {
        Animated.timing(paddingLeft, {
            toValue: logoPosition / 2,
            duration: 300
        }).start(() => {
            setAfterAnimation(true)
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300
            }).start()
        });
    }

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

        if (readableResponse.meta.status === 'success') {
            setLoading(false);
            setErrorHasOccured(false);
            startAnimation()
        }
    }

    useEffect(() => {
        fetchFromServer();

    }, [])
    return (
        <View style={styles.screen}>
            <LinearGradient style={styles.gradient} colors={[Colors.darkGreen, Colors.green]}>
                <View style={styles.wholeLogoContainer}>
                    <Animated.View style={[styles.logoContainer, { paddingLeft: paddingLeft }]}>
                        <Image style={styles.logo} source={require('../assets/Logo.png')} resizeMode='contain' />
                    </Animated.View>
                    {afterAnimation && <Animated.View style={[styles.textContainer, { opacity: opacity }]}>
                        <Text style={styles.logoText}>
                            Health
                        </Text>
                        <Text style={styles.logoText}>
                            Advisor
                        </Text>
                    </Animated.View>}
                </View>

                <View style={styles.startButtonContainer}>
                    {loading ? <ActivityIndicator size="large" color={Colors.darkGreen} /> :
                        <View style={styles.button}>
                            <DefaultButton title={errorHasOccured ? 'Try again' : 'Begin'} fontStyle={{ color: 'white', fontSize: 20 }} onPress={errorHasOccured ? fetchFromServer : begin} />
                        </View>
                    }
                </View>
                {!loading && <View style={styles.infoButtonConatiner}>
                    <DefaultText style={styles.infoLabel} onPress={() => { props.navigation.navigate('Credits') }}>Credits</DefaultText>
                </View>}

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
    },
    infoButtonConatiner: {
        height: '5%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',

    },
    infoLabel: {
        color: 'white',
        fontWeight: 'bold'
    }
})
export default SplashScreen
