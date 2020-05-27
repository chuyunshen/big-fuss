import React, { useState, useEffect }from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { Button, Text } from 'react-native-elements';

const Room = ({history, location}) => {

    const [players, setPlayers] = useState(null);
    const [isHost, setIsHost] = useState(false);

    const getPlayers = () => {
        console.log(`${location.state.gameLink}/players`);
        fetch(`${location.state.gameLink}/players`)
            .then(response => response.json())
            .then((response) => { 
                setPlayers(response);
            })
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
        }, 100000);
        return () => clearInterval(interval);
    }, [])

    return (
        <View style={styles.view}>
            <Text style={styles.welcome}>
                Hi, {location.state.name}! 
                Welcome to the room with secret code:  {"\n"}
            </Text>
            <Text style={styles.secretCode}>{location.state.secretCode}</Text>

            <View style={styles.players}>
                <Text style={{textAlign: 'center'}}>Players that have joined: </Text>
                { !players ? <ActivityIndicator /> : (
                    <View>
                        <FlatList
                            style={styles.flatList}
                            data={players} 
                            extraData={players} 
                            renderItem={({item}) => <Text style={styles.name}>{item.name}</Text>}
                            keyExtractor={(item) => {item.name}}
                        />
                    </View>
                )}
            </View>

            {  !isHost ? <Text style={styles.host}>
                Waiting for other players to enter and room...
                    </Text> : (
                <View style={styles.host}>
                    <Text style={{textAlign: 'center'}}>
                    You are the host! 
                    Start the game when all players have entered the room.
                    </Text>
                    <Button 
                    title="Start the game"
                    onPress= {startGame}
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
        justifyContent: "center", 
        alignItems: "center", 
    },
    welcome: {
        textAlign: 'center',
        width: 300,
        marginBottom: 0,
        textAlign: 'center'
    },
    secretCode: {
        marginTop: 0,
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: "ChelseaMarket-Regular",
        color: "#07A2CC"
    },
    players: {
        width: 300,
        borderRadius: 15,
        borderColor: 'lightyellow',
        borderWidth: 4,
        padding: 10,
        margin: 10,
    },

    flatList: {
        flexGrow: 0,
    },
    name: {
        marginBottom: 3,
        textAlign: 'center',
        fontFamily: "ChelseaMarket-Regular",
    },
    host: {
        textAlign: 'center',
        justifyContent: "center", 
        alignItems: "center", 
        margin: 30
        
    },
})

export default Room;
