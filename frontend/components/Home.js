import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';

const Home = ({ history }) => {
    return (
        <View style={styles.view}>
            <View style={styles.welcomeView}>
            <Text style={styles.welcome}>Welcome{"\n"}to{"\n"}Big Fuss!</Text>
            </View>
            <Image         
                style={styles.image}
                source={require('../assets/big_fuss.png')} 
                >

            </Image>
            <View style={styles.messageView}>
                <Text style={styles.message}>Play with your friends by submitting your own trivia questions.</Text>
            </View>
            <Button title="New Game" onPress={() => history.push('/components/NewGame')}/>
            <Button title="Join Game" onPress={() => history.push('/components/JoinGame')}/>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: "center", 
        justifyContent: "center", 
        width: '90%',
    },
    welcome: {
        textAlign: 'center',
        fontFamily: "ChelseaMarket-Regular", 
        color: "#0F5B7C",
        fontSize: 50,
        padding: 10,
        paddingTop: 20,
    },
    image: {
        width: 220,
        height: 220,
        resizeMode: "cover",
    },
    messageView: {
        margin: 10,
        marginTop: 0,
        marginBottom: 30,
    },
    message: {
        color: 'grey',
        fontFamily: "ChelseaMarket-Regular", 
        textAlign: 'center'
    },
});

export default Home;