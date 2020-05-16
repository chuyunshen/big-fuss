import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

const Prompt = ({item}) => {
    return (
        <View style={styles.promptView}>
            <Text style={styles.text}>{item}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    promptView: {marginTop: 60, backgroundColor: "purple", alignItems: "center", justifyContent: "center"},
    text: {fontSize: 25, color: "white"}
});

export default Prompt;