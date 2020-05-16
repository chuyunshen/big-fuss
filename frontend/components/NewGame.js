import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import { StyleSheet, View, Text, TextInput, Button} from 'react-native';


const NewGame = ({history}) => {
    const [roomSize, setRoomSize] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const [gameLink, setGameLink] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [json, setJson] = useState(null);
    const verifyRoomSize = (roomSize) => {
        if (!parseInt(roomSize) > 0 ) {
            alert("You need at least one person to start a game.");
            return false;
        } else {
            return true;
        }
    };
    const verifySecretCode = (secretCode) => {
        if (secretCode.trim() === '') {
            alert("Secret code cannot be blank.");
            return false;
        } else {
            return true;
        }
    };

    const startNewGame = (roomSize, secretCode, history) => {
        if (verifyRoomSize(roomSize) && verifySecretCode(secretCode)) {
            let payload = {
                host: {isHost: true, name: "testman"},
                secretCode,
                gameType: "personal"
            };
            fetch("http://localhost:8080/games", {method: 'POST',
                mode: 'cors',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }})
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    setGameLink(response._links.self.href);
                    history.push('/Room', {gameLink, secretCode});
                    }
                )
                // .catch(() => {
                // setJson("broken");
                // setIsLoading(false);
            // });
        }
    };

    return (
        <View>
            {isLoading ? <ActivityIndicator/> : (
                <Text>{json} hiiii</Text>
            )}
            <Text>How many players are there?</Text>
            <TextInput
                placeholder="Number of players"
                value={roomSize}
                onChangeText={text => setRoomSize(text)}>
            </TextInput>
            <Text>Make up a secret code such as "hot sauce", and let the other players know:</Text>
            <TextInput
                placeholder="Your secret code"
                value={secretCode}
                onChangeText={text => setSecretCode(text)}>
            </TextInput>
            <Button title="Start New Game"
                    onPress={() => {
                        startNewGame(roomSize, secretCode, history)
                    }}
                    minLength={4}
            />
            <Button title="Return to home page" onPress={() => history.push('/')} />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {marginTop: 50, alignItems: "center"},
    text: {fontSize: 30}
});

export default NewGame;
