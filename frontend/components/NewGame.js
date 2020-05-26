import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import { API_BASE_URL } from './URLs';

const NewGame = ({history}) => {
    const [secretCode, setSecretCode] = useState('');
    const [gameLink, setGameLink] = useState(null);
    const [name, setName] = useState('');

    const verifySecretCode = (secretCode) => {
        return new Promise ((resolve) => {
            if (secretCode.trim() === '') {
                alert("Secret code cannot be blank.");
                resolve(false);
            } else if (secretCode.trim().length < 6){
                alert("Secret code too short.");
                resolve(false);
            } else {
                // verify if this code is already taken
                fetch(`${API_BASE_URL}secretcodes/${secretCode}`)
                .then(response => response.json())
                .then((response) => {
                    Alert.alert("Sorry bro", `Secret code ${secretCode} is already taken. Please think of another one.`);
                    resolve(false);
                })
                .catch(() => {
                    setSecretCode(secretCode.toLowerCase());
                    resolve(true);
                })
            };})
        }

    const verifyName = (name) => {
        if (name.trim() === '') {
            Alert.alert("Hello?", "Please cherish your opportunity to name yourself.");
            return false;
        } else if (name.trim().length < 6){
            Alert.alert("Name too short", 'Ya.');
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

    const startNewGame = async (secretCode) => {
        const secretCodeVerified = await verifySecretCode(secretCode);
        console.log(secretCodeVerified);
        if ( secretCodeVerified && verifyName(name)) {
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
            <Text style={{textAlign: 'center'}}>Make up a secret code such as "hot sauce", 
            and let the other players know:</Text>
            <Input
                placeholder="Your secret code"
                value={secretCode}
                onChangeText={text => setSecretCode(text)}>
            </Input>
            <Text>Give yourself a nickname:</Text>
            <Input
                placeholder="Your name"
                value={name}
                onChangeText={text => setName(text)}>
            </Input>
            <Button title="Start New Game"
                    onPress={() => {
                        startNewGame(secretCode);
                    }}
            />
            <Button title="Return to home page" onPress={() => history.push('/')} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {width: '90%', marginTop: 50, justifyContent: "center", alignItems: "center"},
});

export default NewGame;
