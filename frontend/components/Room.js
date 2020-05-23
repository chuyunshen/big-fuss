import React, { useState, useEffect }from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {API_BASE_URL} from './URLs';
import { Button } from 'react-native-elements';

const Room = ({history, location}) => {

    const [players, setPlayers] = useState(null);
    const [isHost, setIsHost] = useState(false);

    const getPlayers = () => {
        console.log(`${location.state.gameLink}/players`);
        fetch(`${location.state.gameLink}/players`)
            .then(response => response.json())
            .then((response) => { setPlayers(response.players)})
            .catch((error) => console.log(error))
        }

    const startGame = () => {
        history.push('/components/DraftQuestions', 
            {
                gameLink: location.state.gameLink, 
                round: location.state.round,
                name: location.state.name,
                round: location.state.round,
                isHost});
    }

    const checkIsHost = () => {
        fetch(`${location.state.gameLink}`)
        .then((response) => response.json())
        .then((response) => {
            if (response.host.name === location.state.name) {
                setIsHost(true);
            } else {
                fetch(`${location.state.gameLink}/players`, {
                    method: 'POST',
                    body: JSON.stringify({
                        isHost: false,
                        name: location.state.name,
                        isReady: false
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).catch(() => console.log(checkIsHost));
            }
        })
    }

    useEffect(() => {
        checkIsHost();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getPlayers();
        }, 2000);
        return () => clearInterval(interval);
    }, [])

    return (
        <View style={styles.view}>
            <Text>
                Hi, {location.state.name}! {"\n"} 
                Welcome to the room with secret code: {location.state.secretCode} {"\n"}
            </Text>

            { !players ? <ActivityIndicator /> : (
                <View>
                    <Text>Players that have joined: </Text>
                    <FlatList
                        style={styles.flatList}
                        data={players} 
                        extraData={players} 
                        renderItem={({item}) => <Text>{item.name}</Text>}
                        keyExtractor={(item) => {item.name}}
                    />
                </View>
            )}

            {  !isHost ? <Text>
                Waiting for other players to enter and room...
                    </Text> : (
                <View>
                    <Text>You are the host! {"\n"}
                    Start the game when all players have entered the room.
                    </Text>
                    <Button 
                    title="Start the game"
                    onPress= {() => { startGame(); }}
                    />
                </View>
            )}
            
            <Button
                title="Leave game and return to home"
                onPress={() => history.push('/')} />

        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        justifyContent: "center", alignItems: "center", flex: 1
    },
    flatList: {
        flexGrow: 0
    }
})


export default Room;
