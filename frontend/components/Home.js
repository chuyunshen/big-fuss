import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Image} from 'react-native';


const Home = ({ history }) => {
    return (
        <View>
            <Button title="New Game" onPress={() => history.push('/components/NewGame')}/>
            <Button title="Join Game" onPress={() => history.push('/components/JoinGame')}/>
        </View>
    )
};

export default Home;