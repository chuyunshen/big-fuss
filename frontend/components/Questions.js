import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import {retrievePlayers, retrieveQuestions} from "../service/QuestionService";
import Question from "./Question";


const Questions = () => {

    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [numberOfQuestions, setNumbersOfQuestions] = useState(null);

    const submitAnswer = () => {
        setQuestionIndex(questionIndex + 1);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/games/5ebf0d4a05a1625ae73a2452/questions`)
            .then((response) => response.json())
            .then((json) => {
                setQuestions(json);
                console.log(json)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    return (
        <View>
            {isLoading ? <ActivityIndicator/> : (
            <Question questionItem={questions[questionIndex]} questionNumber={questionIndex + 1} onPress={submitAnswer}/>
                )}
        </View>
    );
};

export default Questions;
