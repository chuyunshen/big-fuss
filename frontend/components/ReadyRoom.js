import React, { useState, useEffect }from 'react';
import {View, ScrollView, Text, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {API_BASE_URL} from './URLs';

const ReadyRoom = ({history, location}) => {

    const [readyPlayers, setReadyPlayers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        console.log(`${location.state.gameLink}/players`);
        fetch(`${location.state.gameLink}/players`)
            .then(response => response.json())
            .then((response) => {
                let players = response.filter(player => player.isReady);
                setReadyPlayers(players);
            })
    }


    const startGame = (name) => {
        fetch(`${location.state.gameLink}`)
        history.push('/components/DraftQuestions', {name});
    }


    useEffect(() => {
        const interval = setInterval(() => {
            getReadyPlayers();
        }, 5000);
        makeReady();
        return () => clearInterval(interval);
    }, [])

    return (
        <View style={styles.view}>
            <Text>
                Hi, {location.state.name}! {"\n"} 
            </Text>

            { !readyPlayers ? <ActivityIndicator /> : (
                <ScrollView>
                    <View>
                        <Text>Players who have submitted their questions: </Text>
                        <FlatList
                            style={styles.flatList}
                            data={readyPlayers} 
                            renderItem={({item}) => <Text>{item.name}</Text>}
                            keyExtractor={({item}) => {item.name}}
                        />
                    </View>
                </ScrollView>
            )}

            <Text>Please get ready.{"\n"}
            Game will start as soon as all players have submitted their questions.</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        justifyContent: "center", alignItems: "center", flex: 1
    },
    flatList: {
        justifyContent: "center", 
        alignItems: "center", 
        flexGrow: 0
    }
})


export default ReadyRoom;
