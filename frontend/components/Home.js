import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { Button, Text } from 'react-native-elements';

const Home = ({ history }) => {
    return (
        <View style={styles.view}>
            <View style={styles.welcomeView}>
               <Text style={styles.welcome}>Welcome to Trivial!</Text>
            </View>
            <View style={styles.messageView}>
                <Text style={styles.message}>Play Trivial with your friends by submitting your own trivia questions.</Text>
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

    welcomeView: {
        width: 350,
        borderStyle: "solid",
        borderWidth: 10,
        borderRadius: 30,
        backgroundColor: '#FDEFC8',
        borderColor: "#FDD443",
        marginBottom: 30,
    },
    welcome: {
        textAlign: 'center',
        fontFamily: "ChelseaMarket-Regular", 
        color: "#0F5B7C",
        fontSize: 25,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },

    messageView: {
        margin: 10,
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#87AAA8',
        borderRadius: 10,
        opacity: 1
    },

    message: {
        color: 'white',
        textAlign: 'center'
    },
});

export default Home;