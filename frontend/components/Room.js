import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Room = ({gameLink, secretCode}) => {
    return (
        <View>
            <Text>
                Welcome to the room with secret code: {secretCode}
                Waiting for other players to join...
            </Text>
            <Button title="I'm ready"/>
        </View>
    )
};


export default Room;
