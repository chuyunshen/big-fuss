import React, { useState, useEffect }from 'react';
import {View, ScrollView, Text, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {API_BASE_URL} from './URLs';

const ReadyRoom = ({history, location}) => {

    const [readyPlayers, setReadyPlayers] = useState(null);

    const makeReady = () => {
        fetch(`${location.state.gameLink}/players`, {
            method: 'PUT',
            body: JSON.stringify({
                isHost: location.state.isHost,
                name: location.state.name,
                isReady: true
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})

    }

    const getReadyPlayers = () => {
        fetch(`${location.state.gameLink}/players`)
            .then(response => response.json())
            .then((response) => {
                const players = response.filter(player => player.isReady);
                setReadyPlayers(players);
            })
    }

    const startGame = () => {
        // check if everyone is ready
        fetch(`${location.state.gameLink}/players`)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                const players = response.filter(player => player.isReady);
                if (players.length == response.length) {
                    history.push('/components/Questions', {
                        gameLink: location.state.gameLink,
                        question: location.state.questions,
                        isHost: location.state.isHost,
                        name: location.state.name});
                    };
            })
    }

    useEffect(() => {
        makeReady();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getReadyPlayers();
            startGame();
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <View>
            <Text>
                Hi, {location.state.name}! {"\n"} 
            </Text>

            <Text>Players who have submitted their questions: </Text>
            { !readyPlayers ? <ActivityIndicator /> : (
                <View>
                    <FlatList
                        style={styles.flatList}
                        data={readyPlayers} 
                        extraData={readyPlayers} 
                        renderItem={({item}) => <Text>{item.name}</Text>}
                        keyExtractor={(item) => {item.name}}
                    />
                </View>
            )}

            <Text>Please get ready.{"\n"}
            Game will start as soon as all players have submitted their questions.</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    flatList: {
        flexGrow: 0
    }
})


export default ReadyRoom;
