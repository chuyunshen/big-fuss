import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';

const Question = (props) => {

    const backgroundShade= '#F5ECE1';
    const pressedShade = 'lightblue';
    const errorShade = '#EDB1AB';
    const correctShade = '#D0E4D1';
    const questionDuration = 15;

    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [pressed, setPressed] = useState(Array(
        props.questionItem.options.length).fill(0));
    const [seconds, setSeconds] = useState(questionDuration);
    const [colors, setColors] = useState(Array(
        props.questionItem.options.length).fill(backgroundShade));

    console.log(pressed);
    console.log(colors);
    const togglePressed = (index) => {
        let pressedCopy = [...pressed];
        if (pressedCopy[index]) {
            pressedCopy[index] = 0;
        } else {
            pressedCopy[index] = 1;
        }
        setPressed(pressedCopy);
    }

    const updateColorsToPressed = (index) => {
        let colorsCopy = [...colors];
        if (colors[index] == backgroundShade) {
            colorsCopy[index] = pressedShade;
        } else {
            colorsCopy[index] = backgroundShade;
        }
        setColors(colorsCopy);
    }

    const updateColorsCorrectAnswers = () => {
        let colorsCopy = [...colors];
        let correctIndices = correctAnswersToIndices(props.questionItem.correctAnswers);
        console.log(correctIndices);
        for (index in correctIndices) {
            console.log(index);
            if (correctIndices[index]) {
                colorsCopy[index] = correctShade;
            }
            if ((!correctIndices[index]) && colors[index] == pressedShade) {
                colorsCopy[index] = errorShade;
            }
        }
        setColors(colorsCopy);
    }

    const toggleAnswers = (index) => {
        if (!answers.includes(index)) {
            setAnswers([...answers, index])
        } else {
            setAnswers(answers.filter(answer => answer !== index));
        }
    }

    const goToNextQuestion = () => {
        props.appendAnswers(answers);
        setAnswers([]);
        setPressed(Array(props.questionItem.options.length).fill(0));
        setSubmitted(false);
        props.updateQuestionIndex();
        setSeconds(questionDuration);
        setColors(Array(props.questionItem.options.length).fill(backgroundShade));
    }

    const correctAnswersToIndices = (correctAnswers) => {
        let correctIndices = Array(props.questionItem.options.length).fill(0);
        for (correctAnswer of correctAnswers) {
            correctIndices[correctAnswers] = 1;
        }
        return correctIndices;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds - 1);
            if (seconds == 0) {
                updateColorsCorrectAnswers();
                setTimeout(goToNextQuestion, 5000);
                setSeconds(0);
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
                            disabled={submitted}
                            keyboardShouldPersistTaps='handled'
                            style={[styles.option, {backgroundColor: colors[index]}]}
                            onPress={() => {
                                toggleAnswers(index);
                                togglePressed(index);
                                updateColorsToPressed(index);
                            }}>
                                <Text>
                                {(index + 10).toString(36).toUpperCase()}. {option}
                                </Text>
                            </TouchableOpacity>
                    </View>
                        )
                )}
            <Button
                style={styles.touchableOpacity}
                disabled={submitted}
                title="Submit Answer"
                onPress={() => setSubmitted(true)}
            />

            <View style={styles.timer}><Text>{seconds}</Text></View>
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
        borderWidth: 3,
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