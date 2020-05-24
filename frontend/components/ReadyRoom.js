import React, { useState, useEffect }from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { Text } from 'react-native-elements';

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
            }});
    }

    /* Post questions to the API */
    const sendQuestions = () => {
        for (const question of location.state.questions) {
            let options = [];
            for (const option of question.options) {
                options.push(option.option);
            }
            fetch(`${location.state.gameLink}/questions/${location.state.round}`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    playerName: location.state.name,
                    prompt: question.prompt,
                    options: options,
                    correctAnswers: question.correctAnswers
                }),
                headers: {
                    'Content-Type': 'application/json'
            }}).catch(error => console.error(error))
        }
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
                const players = response.filter(player => player.isReady);
                if (players.length == response.length) {
                    history.push('/components/Questions', {
                        gameLink: location.state.gameLink,
                        isHost: location.state.isHost,
                        name: location.state.name,
                        round: location.state.round
                    });
                    };
            })
    }

    useEffect(() => {
        makeReady();
        sendQuestions();
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
            <Text style={{textAlign: 'center'}}>Players who have submitted their questions: </Text>
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

            <Text style={{textAlign: 'center', width: 350}}>Please get ready.
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
