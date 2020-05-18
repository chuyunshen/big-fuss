import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import { StyleSheet, View, Text, TextInput, Button} from 'react-native';
import { API_BASE_URL } from './URLs';


const NewGame = ({history}) => {
    const [secretCode, setSecretCode] = useState('');
    const [gameLink, setGameLink] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [json, setJson] = useState(null);
    const [name, setName] = useState(null);

    const verifySecretCode = (secretCode) => {
        if (secretCode.trim() === '') {
            alert("Secret code cannot be blank.");
            return false;
        } else if (secretCode.trim().length < 6){
            alert("Secret code needs to be at least 5 characters.");
            return false;
        } else {
            setSecretCode(secretCode.toLowerCase());
            return true;
        }
    };

    const startNewGame = (secretCode, history) => {
        if (verifySecretCode(secretCode)) {
            let payload = {
                host: {isHost: true, name: "hehe"},
                secretCode,
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
                    setGameLink(response._links.game);
                    setSecretCode(secretCode.toLowerCase());
                    history.push('/components/Room', {gameLink, secretCode, name, round: 0});
                    }
                )
        }
    };

    return (
        <View style={styles.view}>
            {isLoading ? <ActivityIndicator/> : (
                <Text>{json} hiiii</Text>
            )}
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
                        startNewGame(secretCode, history)
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
