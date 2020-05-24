import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import { API_BASE_URL } from './URLs';
import { Button, Text, Input } from 'react-native-elements';

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
                {gameLink: `${API_BASE_URL}games/${response.id}`, secretCode, name, round: 0})})
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
            <Input
                placeholder="Secret code here. E.g., Hot Sauce"
                value={secretCode}
                onChangeText={text => setSecretCode(text)}>
            </Input>
            <Text>Give yourself a nickname:</Text>
            <Input
                placeholder="Your name"
                value={name}
                onChangeText={text => setName(text)}>
            </Input>
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
