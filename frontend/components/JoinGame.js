import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Button} from 'react-native';
import { API_BASE_URL } from './URLs';

const JoinGame = ({ history }) => {
    const [name, setName] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const [gameLink, setGameLink] = useState('');
    const verifySecretCode = (secretCode, name) => {
        fetch(`${API_BASE_URL}secretcodes/${secretCode}`)
            .then(response => response.json())
            .then((response) => {
                setGameLink(`${API_BASE_URL}games/${response.id}`);
                history.push('/components/Room', 
                {gameLink: `${API_BASE_URL}games/${response.id}`, secretCode, name})})
            .catch(() => alert("This secret code does not exist. Please retry."))
    };

    const verifyName = (name) => {
        if (name.trim() === '') {
            alert("Pick a name that's not blank")
            return false;
        } else {
            return true;
        }
    };

    return (
        <View style={styles.view}>
            <Text>Enter your room's secret code here</Text>
            <TextInput
                placeholder="Secret code here. E.g., Hot Sauce"
                value={secretCode}
                onChangeText={text => setSecretCode(text)}>
            </TextInput>
            <Text>Give yourself a nickname:</Text>
            <TextInput
                placeholder="Your name"
                value={name}
                onChangeText={text => setName(text)}>
            </TextInput>
            <Button title="Submit" onPress={() => {
                if (verifyName(name)) {
                    setSecretCode(secretCode.toLowerCase());
                    verifySecretCode(secretCode.toLowerCase(), name);
                }
                }}
                />
            <Button title="Return to home page" onPress={() => history.push('/')} />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {marginTop: 50, alignItems: "center"},
    text: {fontSize: 30}
});

export default JoinGame;
