import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import { API_BASE_URL } from './URLs';

const NewGame = ({history}) => {
    const [secretCode, setSecretCode] = useState('');
    const [gameLink, setGameLink] = useState(null);
    const [name, setName] = useState('');

    const verifySecretCode = (secretCode) => {
        if (secretCode.trim() === '') {
            alert("Secret code cannot be blank.");
            return false;
        } else if (secretCode.trim().length < 6){
            alert("Secret code too short.");
            return false;
        } else {
            setSecretCode(secretCode.toLowerCase());
            return true;
        }
    };

    const verifyName = (name) => {
        if (name.trim() === '') {
            alert("This is your one opportunity to name yourself");
            return false;
        } else if (name.trim().length < 6){
            alert("Name too short");
            return false;
        } else {
            return true;
        }
    };

    const goToRoom = () => {
        if (secretCode && gameLink) {
            history.push('/components/Room', {gameLink, secretCode, name, round: 0});
        }
    }

    useEffect(() => {goToRoom()})

    const startNewGame = (secretCode) => {
        if (verifySecretCode(secretCode) && verifyName(name)) {
            let payload = {
                host: {isHost: true, name},
                secretCode: secretCode.toLowerCase(),
                gameType: "personal",
            };
            fetch(`${API_BASE_URL}/games`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }})
                .then((response) => response.json())
                .then((response) => {
                    setGameLink(response._links.game.href);
                    setSecretCode(secretCode.toLowerCase());
                    }
                )
        }
    };

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Make up a secret code such as "hot sauce", {"\n"}
            and let the other players know:</Text>
            <TextInput
                placeholder="Your secret code"
                value={secretCode}
                onChangeText={text => setSecretCode(text)}>
            </TextInput>
            <Text>Give yourself a nickname:</Text>
            <TextInput
                placeholder="Your name"
                value={name}
                onChangeText={text => setName(text)}>
            </TextInput>
            <Button title="Start New Game"
                    onPress={() => {
                        startNewGame(secretCode);
                    }}
            />
            <Button title="Return to home page" onPress={() => history.push('/')} />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {marginTop: 50, justifyContent: "center", alignItems: "center"},
    text: {fontSize: 20, textAlign: "center"}
});

export default NewGame;
