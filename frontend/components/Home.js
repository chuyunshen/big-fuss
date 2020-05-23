import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { Button, Text } from 'react-native-elements';

const Home = ({ history }) => {
    return (
        <View style={styles.view}>
            <Text style={styles.welcome}>Welcome to Trivial!
            </Text>
            <Text style={styles.text}>Play Trivial with your friends by submitting your own trivia questions.</Text>
            <Button title="New Game" onPress={() => history.push('/components/NewGame')}/>
            <Button title="Join Game" onPress={() => history.push('/components/JoinGame')}/>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: "center", 
        justifyContent: "center", 
        width: '80%',
    },
    welcome: {
        fontFamily: "ChelseaMarket-Regular", 
        fontSize: 30,
        borderStyle: "solid",
        borderColor: 'blue',
        borderWidth: 1,
        margin: 10,
        backgroundColor: 'lightblue'

    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
});

export default Home;