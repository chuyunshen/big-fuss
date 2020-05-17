import React, { useState, useEffect }from 'react';
import {View, Text, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {API_BASE_URL} from './URLs';

const Room = ({history, location}) => {

    const [players, setPlayers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isHost, setIsHost] = useState(true);
    const [isLoadingHost, setIsLoadingHost] = useState(true);

    const getOtherPlayersReadyInfo = () => {
        console.log(location);
        fetch(`${location.state.gameLink}`)
            .then(response => response.json())
            .then((response) => {
                console.log("lalalalal");
                console.log(response);
                console.log(response.players);;
                setPlayers(response.players);
            })
    }

    const startGame = (name) => {
        fetch(`${location.state.gameLink}`)
        history.push('/components/DraftQuestions', {name});
    }

    const checkIsHost = () => {
        fetch(`${location.state.gameLink}`)
        .then((response) => response.json())
        .then((response) => {
            if (response.players[0].name === location.state.name) {
                setIsHost(true);
            }
        })
    }


    useEffect(() => {
        checkIsHost();
    }, [getOtherPlayersReadyInfo])

    return (
        <View style={styles.view}>
            <Text>
                Hi, {location.state.name}! {"\n"} 
                Welcome to the room with secret code: {location.state.secretCode} {"\n"}
            </Text>

            { players ? <ActivityIndicator /> : (
                <FlatList
                    data={players} 
                    renderItem={({player}) => <Text>{player.name}</Text>}
                />
            )}
            <Text>Waiting for other players to join... {"\n"}
            </Text>

            { (!isLoadingHost) && isHost ? <Text>
                Not Host. Please get ready. Game will start as soon as all players have joined.
                    </Text> : (
                <View>
                    <Text>
                        You are the host! Start the game when all players have entered the room.
                    </Text>
                    <Button 
                    title="Start the game"
                    onPress= {() => {
                        startGame(location.state.name);
                    }}
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
    }
})


export default Room;
