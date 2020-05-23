import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';

//TODO: add a timer
const Question = (props) => {

    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [pressed, setPressed] = useState(Array.from(
        '0'.repeat(props.questionItem.options.length)));

    const togglePressed = (index) => {
        let pressedCopy = [...pressed];
        pressedCopy[index] = !pressedCopy[index];
        setPressed(pressedCopy);
    }

    const toggleAnswers = (index) => {
        if (!answers.includes(index)) {
            setAnswers([...answers, index])
        } else {
            setAnswers(answers.filter(answer => answer !== index));
        }
    }

    // checks answer for a single question
    const checkAnswers = () => {
        if (props.questionItem.correctAnswers.sort() === 
                answers.sort()) {
                    setResult(true);
        } else {
            setResult(false);
        }
    }

    return (
        <View>
            <Text>Question: {props.questionNumber}</Text>
            <Text>{props.questionItem.playerName} asked: </Text>
            <Text>{props.questionItem.prompt}</Text>
            {
                props.questionItem.options.map( (option, index) => (
                    <TouchableOpacity 
                        style={styles.touchableOpacity, 
                            {backgroundColor: (pressed[index] ? "white" : "lightblue")}}
                        onPress={() => {
                            toggleAnswers(index);
                            togglePressed(index);
                        }}>
                            <Text>
                            {(index + 10).toString(36).toUpperCase()}. {option}
                            </Text>
                        </TouchableOpacity>
                    )
                )}
            <TouchableOpacity
                style={styles.touchableOpacity, 
                    {backgroundColor: (submitted ? "white" : "lightgrey")},
                    {color: (submitted ? "black" : "darkgrey")}}
                onPress={() => {
                    checkAnswers();
                    props.appendAnswers(answers);
                    setAnswers([]);
                    setPressed(Array.from(
                        '0'.repeat(props.questionItem.options.length)));
                    setSubmitted(true);
                    props.updateQuestionIndex();
                }}
            >
                <Text>Submit Answer</Text>
            </TouchableOpacity>

            {result ? (
                <Text>Result: {}</Text>
            ) : (<Text>Timer</Text>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {},
    container: {flex: 1, paddingTop: 60},
});

export default Question;