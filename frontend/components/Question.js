import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';

const Question = (props) => {

    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [pressed, setPressed] = useState(Array.from(
        '0'.repeat(props.questionItem.options.length)));
    const [seconds, setSeconds] = useState(15);

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

    const goToNextQuestion = () => {
        checkAnswers();
        props.appendAnswers(answers);
        setAnswers([]);
        setPressed(Array.from(
            '0'.repeat(props.questionItem.options.length)));
        setSubmitted(true);
        props.updateQuestionIndex();
        setSeconds(15);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds - 1);
            if (seconds == 0) {
                goToNextQuestion();
            }
        }, 1000);
        return () => clearInterval(interval);
    })

    return (
        <View style={styles.view}>
            <View style={styles.questionNumberView}>            
                <Text style={styles.questionNumber}>Question {props.questionNumber}</Text>
            </View>

            <Text>{props.questionItem.playerName} asked: </Text>
            <Text>{props.questionItem.prompt}</Text>
            {
                props.questionItem.options.map((option, index) => (
                    <View >
                        <TouchableOpacity 
                            style={[styles.option, {backgroundColor: (pressed[index] ? "#EDB1AB" : "lightblue")}]}
                            onPress={() => {
                                toggleAnswers(index);
                                togglePressed(index);
                            }}>
                                <Text>
                                {(index + 10).toString(36).toUpperCase()}. {option}
                                </Text>
                            </TouchableOpacity>
                    </View>
                        )
                )}
            <Button
                style={styles.touchableOpacity, 
                    {backgroundColor: (submitted ? "white" : "lightgrey")},
                    {color: (submitted ? "black" : "darkgrey")}}
                title="Submit Answer"
                onPress={goToNextQuestion}
            />

            {result ? (
                <Text>Result: {}</Text>
            ) : (<View style={styles.timer}><Text>{seconds}</Text></View>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionNumber: {
        fontFamily: 'ChelseaMarket-Regular',
        fontSize: 40,
        textAlign: 'right'
    },
    option: {
        borderRadius: 30,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'lightyellow',
        flexDirection: 'row', 
        paddingLeft: 20,
        margin: 5,
        width: 350
    },
    timer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 30,
        margin: 10,
        borderStyle: 'solid',
    }

});

export default Question;