import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Image} from 'react-native';


const Home = ({ history }) => {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>Welcome!</Text>
            <Button title="New Game" onPress={() => history.push('/components/NewGame')}/>
            <Button title="Join Game" onPress={() => history.push('/components/JoinGame')}/>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {alignItems: "center", justifyContent: "center"},
    text: {fontSize: 30}
});

export default Home;