import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image} from 'react-native';
import Prompt from "./Prompt";
import OptionInput from "./OptionInput";
import Option from "./Option";

const QuestionNumber = ({number}) => {

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Question {number}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {marginTop: 50, alignItems: "center"},
    text: {fontSize: 30}
});

export default QuestionNumber;
