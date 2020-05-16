import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Button} from 'react-native';
import Prompt from "./Prompt";
import OptionInput from "./OptionInput";
import Option from "./Option";

const JoinGame = ({ history }) => {
    const [secretCode, setSecretCode] = useState("");
    const verifySecretCode = (secretCode) => {

    };

    return (
        <View style={styles.view}>
            <Text> Enter your room's secret code here</Text>
            <TextInput
                placeholder="Secret code here. E.g., Hot Sauce"
                value={secretCode}
                onChangeText={text => setSecretCode(text)}>
            </TextInput>
            <Button title="Submit" onPress={() => verifySecretCode(secretCode)}/>
            <Button title="Return to home page" onPress={() => history.push('/')} />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {marginTop: 50, alignItems: "center"},
    text: {fontSize: 30}
});

export default JoinGame;
